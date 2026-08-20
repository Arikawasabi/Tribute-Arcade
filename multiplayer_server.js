const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 8765);
const ROOT = __dirname;
const ROOM_TTL_MS = Number(process.env.ROOM_TTL_MS || 1000 * 60 * 60 * 6);
const ROOM_EMPTY_TTL_MS = Number(process.env.ROOM_EMPTY_TTL_MS || 1000 * 60 * 5);
const MAX_UPLOAD_IMAGE_BYTES = Number(process.env.MAX_UPLOAD_IMAGE_BYTES || 1_500_000);
const rooms = new Map();
const BOORU_SOURCES = {
  gelbooru: "https://gelbooru.com/index.php",
  hgoon: "https://hgoon.booru.org/index.php"
};
const REDDITERY_ENDPOINT = "https://www.redditery.com/load.php";
const PEEKSTR_REDDIT_ENDPOINT = "https://www.peekstr.com/api/reddit";
const DANBOORU_ENDPOINT = "https://danbooru.donmai.us/posts.json";
const DANBOORU_AUTOCOMPLETE_ENDPOINT = "https://danbooru.donmai.us/autocomplete.json";
const BLOCKED_GOONER_IMAGE_TOKENS = new Set([
  "nlcgqrfwvvfh1"
]);
const DANBOORU_CATEGORY_TAGS = {
  feet: ["feet", "soles", "barefoot"],
  boobs: ["huge_breasts order:score", "large_breasts order:score age:<1month", "large_breasts order:score age:<3months", "large_breasts score:>100", "sideboob order:score", "underboob order:score", "breast_focus order:score"],
  butt: ["ass", "ass_focus"],
  armpits: ["armpits"],
  femboys: ["femboy"]
};

function send(res, status, data, type = "application/json") {
  const body = type === "application/json" ? JSON.stringify(data) : data;
  res.writeHead(status, {
    "Content-Type": type,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 6_000_000) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function imageExtensionForType(type) {
  const normalized = String(type || "").toLowerCase();
  if (normalized === "image/jpeg" || normalized === "image/jpg") return "jpg";
  if (normalized === "image/png") return "png";
  if (normalized === "image/gif") return "gif";
  if (normalized === "image/webp") return "webp";
  if (normalized === "image/bmp") return "bmp";
  return "";
}

function imageFromDataUrl(dataUrl) {
  const match = /^data:(image\/(?:png|jpe?g|gif|webp|bmp));base64,([a-z0-9+/=\s]+)$/i.exec(String(dataUrl || ""));
  if (!match) throw new Error("Upload must be a PNG, JPG, GIF, WebP, or BMP image.");
  const type = match[1].toLowerCase();
  const buffer = Buffer.from(match[2].replace(/\s/g, ""), "base64");
  if (!buffer.length) throw new Error("Upload was empty.");
  if (buffer.length > MAX_UPLOAD_IMAGE_BYTES) throw new Error("Image is too large for upload.");
  return { type, buffer };
}

async function uploadImageToCatbox(body) {
  if (typeof fetch !== "function" || typeof FormData !== "function" || typeof Blob !== "function") {
    throw new Error("This server needs Node 20+ for Catbox uploads.");
  }
  const image = imageFromDataUrl(body && body.dataUrl);
  const extension = imageExtensionForType(image.type);
  const safeName = String((body && body.name) || `tribute-upload.${extension}`)
    .replace(/[^\w.-]+/g, "_")
    .replace(/^_+/, "")
    .slice(0, 80) || `tribute-upload.${extension}`;
  const form = new FormData();
  form.append("reqtype", "fileupload");
  if (process.env.CATBOX_USERHASH) form.append("userhash", process.env.CATBOX_USERHASH);
  form.append("fileToUpload", new Blob([image.buffer], { type: image.type }), safeName);
  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: form
  });
  const text = (await response.text()).trim();
  if (!response.ok || !/^https:\/\/files\.catbox\.moe\/[A-Za-z0-9._-]+$/.test(text)) {
    throw new Error(text || "Catbox upload failed.");
  }
  return text;
}

function safeBooruTags(value) {
  const raw = String(value || "feet sort:score")
    .replace(/[^\w:~.+\-<> ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return raw.slice(0, 160) || "feet sort:score";
}

function safeDanbooruCategory(value) {
  const key = String(value || "feet").toLowerCase().replace(/[^a-z0-9_]+/g, "");
  return DANBOORU_CATEGORY_TAGS[key] ? key : "feet";
}

function safeDanbooruPage(value) {
  return Math.max(1, Math.min(50, Number(value || 1) || 1));
}

function safeDanbooruAutocompleteQuery(value) {
  const raw = String(value || "")
    .replace(/[^\w +\-:~.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return raw.slice(0, 80);
}

function safeDanbooruDateFilter(value) {
  const key = String(value || "all").toLowerCase();
  return ["all", "12m", "3m", "1m"].includes(key) ? key : "all";
}

function danbooruDateFilterTag(value) {
  const key = safeDanbooruDateFilter(value);
  if (key === "12m") return "age:<1year";
  if (key === "3m") return "age:<3months";
  if (key === "1m") return "age:<1month";
  return "";
}

function applyDanbooruDateFilter(tags, dateFilter) {
  const baseTags = safeBooruTags(tags)
    .split(/\s+/)
    .filter((tag) => !/^age:/i.test(tag))
    .join(" ");
  const dateTag = danbooruDateFilterTag(dateFilter);
  return safeBooruTags(dateTag ? `${baseTags} ${dateTag}` : baseTags);
}

function danbooruTagsForCategory(category, page, dateFilter = "all") {
  const tags = DANBOORU_CATEGORY_TAGS[safeDanbooruCategory(category)] || DANBOORU_CATEGORY_TAGS.feet;
  const tag = tags[(Math.max(1, Number(page) || 1) - 1) % tags.length] || tags[0];
  return applyDanbooruDateFilter(/\s/.test(tag) ? tag : `${tag} order:score`, dateFilter);
}

function danbooruTagsForCustomTag(tag, dateFilter = "all") {
  const cleanTag = safeBooruTags(tag).split(/\s+/)[0] || "feet";
  const mappedTag = cleanTag === "breasts" || cleanTag === "boobs" ? "large_breasts" : cleanTag;
  return applyDanbooruDateFilter(`${mappedTag} order:score`, dateFilter);
}

function isImageMediaUrl(value) {
  return /^https?:\/\/.+\.(?:png|jpe?g|gif|webp)(?:[?#].*)?$/i.test(String(value || ""));
}

function isVideoMediaUrl(value) {
  return /^https?:\/\/.+\.(?:mp4|webm)(?:[?#].*)?$/i.test(String(value || ""));
}

function normalizeBooruPost(post, options = {}) {
  if (!post || typeof post !== "object") return null;
  const includeVideos = Boolean(options.includeVideos);
  const fileUrl = String(post.file_url || post.large_file_url || post.fileUrl || post.image || post.source || "").trim();
  const sampleUrl = String(post.sample_url || post.large_file_url || post.sampleUrl || post.preview_file_url || post.preview_url || post.previewUrl || "").trim();
  const previewUrl = String(post.preview_file_url || post.preview_url || post.previewUrl || post.thumbnail_url || post.thumbnailUrl || sampleUrl || fileUrl).trim();
  const url = sampleUrl || fileUrl || previewUrl;
  const isVideo = isVideoMediaUrl(url);
  if (!isImageMediaUrl(url) && !(includeVideos && isVideo)) return null;
  return {
    id: String(post.id || post.md5 || url),
    url,
    previewUrl: /^https?:\/\//i.test(previewUrl) ? previewUrl : url,
    fileUrl: /^https?:\/\//i.test(fileUrl) ? fileUrl : url,
    mediaType: isVideo ? "video" : "image",
    score: Number(post.score || 0) || 0,
    rating: String(post.rating || ""),
    tags: String(post.tags || post.tag_string || "").slice(0, 300),
    width: Number(post.image_width || post.width || 0) || 0,
    height: Number(post.image_height || post.height || 0) || 0
  };
}

async function fetchBooruGallery(searchParams) {
  if (typeof fetch !== "function") throw new Error("This server needs Node 20+ for booru fetches.");
  const source = BOORU_SOURCES[searchParams.get("source") || "gelbooru"] ? (searchParams.get("source") || "gelbooru") : "gelbooru";
  const tags = safeBooruTags(searchParams.get("tags"));
  const limit = Math.max(1, Math.min(24, Number(searchParams.get("limit") || 12) || 12));
  const endpoint = new URL(BOORU_SOURCES[source]);
  endpoint.searchParams.set("page", "dapi");
  endpoint.searchParams.set("s", "post");
  endpoint.searchParams.set("q", "index");
  endpoint.searchParams.set("json", "1");
  endpoint.searchParams.set("limit", String(limit));
  endpoint.searchParams.set("tags", tags);
  if (source === "gelbooru") {
    if (process.env.GELBOORU_USER_ID) endpoint.searchParams.set("user_id", process.env.GELBOORU_USER_ID);
    if (process.env.GELBOORU_API_KEY) endpoint.searchParams.set("api_key", process.env.GELBOORU_API_KEY);
  }
  const response = await fetch(endpoint, {
    headers: {
      "Accept": "application/json,text/plain;q=0.8,*/*;q=0.5",
      "User-Agent": "TributeArcade/1.0"
    }
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${source} returned ${response.status}. ${source === "gelbooru" ? "Gelbooru may require GELBOORU_USER_ID and GELBOORU_API_KEY on the server." : "The source may be blocking API access."}`);
  }
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error("The booru returned non-JSON content.");
  }
  const posts = Array.isArray(parsed)
    ? parsed
    : (Array.isArray(parsed.post) ? parsed.post : (Array.isArray(parsed.posts) ? parsed.posts : []));
  return {
    source,
    tags,
    items: posts.map(normalizeBooruPost).filter(Boolean)
  };
}

async function fetchDanbooruGallery(searchParams) {
  if (typeof fetch !== "function") throw new Error("This server needs Node 20+ for Danbooru fetches.");
  const category = safeDanbooruCategory(searchParams.get("category"));
  const page = safeDanbooruPage(searchParams.get("page"));
  const customTag = safeDanbooruAutocompleteQuery(searchParams.get("tag"));
  const dateFilter = safeDanbooruDateFilter(searchParams.get("dateFilter"));
  const rawTags = searchParams.get("tags") || (customTag ? danbooruTagsForCustomTag(customTag, dateFilter) : danbooruTagsForCategory(category, page, dateFilter));
  const tags = applyDanbooruDateFilter(rawTags, dateFilter);
  const limit = Math.max(1, Math.min(24, Number(searchParams.get("limit") || 16) || 16));
  const includeVideos = String(searchParams.get("includeVideos") || "").toLowerCase() === "true";
  const requestLimit = Math.max(limit * 4, 80);
  const endpoint = new URL(DANBOORU_ENDPOINT);
  endpoint.searchParams.set("tags", tags);
  endpoint.searchParams.set("limit", String(Math.min(100, requestLimit)));
  endpoint.searchParams.set("page", String(page));
  if (process.env.DANBOORU_LOGIN) endpoint.searchParams.set("login", process.env.DANBOORU_LOGIN);
  if (process.env.DANBOORU_API_KEY) endpoint.searchParams.set("api_key", process.env.DANBOORU_API_KEY);
  const response = await fetch(endpoint, {
    headers: {
      "Accept": "application/json,text/plain;q=0.8,*/*;q=0.5",
      "User-Agent": "TributeArcade/1.0"
    }
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Danbooru returned ${response.status}.`);
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error("Danbooru returned non-JSON content.");
  }
  const posts = Array.isArray(parsed) ? parsed : [];
  return {
    source: "danbooru",
    category,
    page,
    tags,
    dateFilter,
    includeVideos,
    items: posts.map((post) => normalizeBooruPost(post, { includeVideos })).filter(Boolean).slice(0, limit)
  };
}

async function fetchDanbooruAutocomplete(searchParams) {
  if (typeof fetch !== "function") throw new Error("This server needs Node 20+ for Danbooru autocomplete.");
  const query = safeDanbooruAutocompleteQuery(searchParams.get("query"));
  const limit = Math.max(1, Math.min(16, Number(searchParams.get("limit") || 10) || 10));
  if (!query) return { source: "danbooru", query, items: [] };
  const endpoint = new URL(DANBOORU_AUTOCOMPLETE_ENDPOINT);
  endpoint.searchParams.set("search[query]", query);
  endpoint.searchParams.set("search[type]", "tag_query");
  endpoint.searchParams.set("limit", String(limit));
  const response = await fetch(endpoint, {
    headers: {
      "Accept": "application/json,text/plain;q=0.8,*/*;q=0.5",
      "User-Agent": "TributeArcade/1.0"
    }
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Danbooru autocomplete returned ${response.status}.`);
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error("Danbooru autocomplete returned non-JSON content.");
  }
  const items = (Array.isArray(parsed) ? parsed : [])
    .map((item) => ({
      label: String(item.label || item.value || "").replace(/\s+/g, " ").trim(),
      value: safeDanbooruAutocompleteQuery(item.value || item.label),
      postCount: Number(item.post_count || item.tag && item.tag.post_count || 0) || 0,
      antecedent: String(item.antecedent || "").slice(0, 80),
      category: Number(item.category || item.tag && item.tag.category || 0) || 0
    }))
    .filter((item) => item.value)
    .slice(0, limit);
  return { source: "danbooru", query, items };
}

function decodeHtmlEntities(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function safeRedditerySubreddit(value) {
  const raw = String(value || "gooninghentai").toLowerCase().replace(/[^a-z0-9_]+/g, "");
  return raw.slice(0, 32) || "gooninghentai";
}

function safeGoonerGallerySource(value) {
  return String(value || "").toLowerCase() === "redditery" ? "redditery" : "peekstr";
}

function safeGoonerAfterToken(value) {
  return String(value || "").replace(/[^a-z0-9_:-]+/gi, "").slice(0, 160);
}

function isRedditImageUrl(value) {
  return /^https?:\/\/(?:i|preview)\.redd\.it\/.+\.(?:png|jpe?g|gif|webp)(?:[?#].*)?$/i.test(String(value || ""));
}

function isBlockedGoonerImageUrl(value) {
  let raw = String(value || "").toLowerCase();
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      raw = decodeURIComponent(raw);
    } catch (error) {
      break;
    }
  }
  return [...BLOCKED_GOONER_IMAGE_TOKENS].some((token) => raw.includes(token));
}

function isTinyRedditPreview(value) {
  const raw = String(value || "");
  if (!/^https?:\/\/preview\.redd\.it\//i.test(raw)) return false;
  let url;
  try {
    url = new URL(raw);
  } catch (error) {
    return true;
  }
  const width = Number(url.searchParams.get("width"));
  const height = Number(url.searchParams.get("height"));
  const hasSize = Number.isFinite(width) || Number.isFinite(height);
  if (!hasSize) return false;
  return Math.max(width || 0, height || 0) < 480;
}

function dimensionsFromRedditImageUrl(value) {
  let url;
  try {
    url = new URL(String(value || ""));
  } catch (error) {
    return { width: 0, height: 0 };
  }
  const width = Number(url.searchParams.get("width"));
  const height = Number(url.searchParams.get("height"));
  return {
    width: Number.isFinite(width) ? width : 0,
    height: Number.isFinite(height) ? height : 0
  };
}

function peekstrMediaDimensions(media, fallbackUrl = "") {
  const item = media || {};
  const source = item.s || {};
  const width = Number(source.x || item.width || item.w || 0);
  const height = Number(source.y || item.height || item.h || 0);
  if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
    return { width, height };
  }
  return dimensionsFromRedditImageUrl(fallbackUrl);
}

function normalizeRedditeryPost(match, index, allowTinyPreview = false) {
  const id = String(match[1] || `redditery-${index}`);
  const block = match[2] || "";
  const imageMatches = [...block.matchAll(/<img\b[^>]*\bsrc=['"]([^'"]+)['"][^>]*>/gi)];
  const hrefMatches = [...block.matchAll(/<a\b[^>]*\bhref=['"]([^'"]+)['"][^>]*>/gi)];
  const directHref = hrefMatches
    .map((item) => decodeHtmlEntities(item[1]))
    .find((href) => isRedditImageUrl(href) && !isBlockedGoonerImageUrl(href) && (allowTinyPreview || !isTinyRedditPreview(href)));
  const previewUrl = imageMatches
    .map((item) => decodeHtmlEntities(item[1]))
    .find((src) => isRedditImageUrl(src) && !isBlockedGoonerImageUrl(src) && (allowTinyPreview || !isTinyRedditPreview(src)));
  const url = directHref || previewUrl;
  if (!url) return null;
  const titleMatch = block.match(/<h4[^>]*>\s*<a\b[^>]*>([\s\S]*?)<\/a>/i);
  const title = decodeHtmlEntities(String(titleMatch && titleMatch[1] || "Redditery image").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  return {
    id,
    url,
    previewUrl: previewUrl || url,
    ...dimensionsFromRedditImageUrl(url),
    title,
    source: "redditery",
    index
  };
}

function collectPeekstrImageCandidates(postOrMedia) {
  const candidates = [];
  const push = (value) => {
    const decoded = decodeHtmlEntities(value);
    if (decoded) candidates.push(decoded);
  };
  const item = postOrMedia || {};
  push(item.url);
  push(item.s && item.s.gif);
  push(item.s && item.s.u);
  if (Array.isArray(item.p)) {
    item.p.slice().reverse().forEach((preview) => push(preview && preview.u));
  }
  if (Array.isArray(item.o)) {
    item.o.forEach((original) => push(original && original.u));
  }
  const previews = item.preview && Array.isArray(item.preview.images) ? item.preview.images : [];
  previews.forEach((image) => {
    push(image && image.variants && image.variants.gif && image.variants.gif.source && image.variants.gif.source.url);
    push(image && image.source && image.source.url);
    if (Array.isArray(image && image.resolutions)) {
      image.resolutions.slice().reverse().forEach((resolution) => push(resolution && resolution.url));
    }
  });
  return candidates;
}

function normalizePeekstrMediaItem(post, media, id, title, index, galleryIndex = 0) {
  const candidates = collectPeekstrImageCandidates(media);
  const url = candidates.find((candidate) => isRedditImageUrl(candidate) && !isBlockedGoonerImageUrl(candidate) && !isTinyRedditPreview(candidate));
  if (!url) return null;
  const previewUrl = candidates.find((candidate) => isRedditImageUrl(candidate) && !isBlockedGoonerImageUrl(candidate)) || url;
  const dimensions = peekstrMediaDimensions(media, url);
  return {
    id: String(id || post.id || `peekstr-${index}-${galleryIndex}`),
    url,
    previewUrl,
    width: dimensions.width,
    height: dimensions.height,
    title,
    source: "peekstr",
    index
  };
}

function normalizePeekstrPost(child, index) {
  const post = child && child.data ? child.data : child;
  if (!post) return [];
  const title = String(post.title || "Gooner gallery image").trim();
  const metadata = post.media_metadata || {};
  const galleryItems = post.gallery_data && Array.isArray(post.gallery_data.items)
    ? post.gallery_data.items
    : [];
  if (galleryItems.length) {
    return galleryItems
      .map((galleryItem, galleryIndex) => {
        const mediaId = galleryItem && galleryItem.media_id;
        const media = mediaId && metadata[mediaId];
        return normalizePeekstrMediaItem(post, media, `${post.id || "peekstr"}-${mediaId || galleryIndex}`, `${title} (${galleryIndex + 1})`, index, galleryIndex);
      })
      .filter(Boolean);
  }
  const metadataItems = Object.entries(metadata);
  if (metadataItems.length) {
    return metadataItems
      .map(([mediaId, media], galleryIndex) => normalizePeekstrMediaItem(post, media, `${post.id || "peekstr"}-${mediaId || galleryIndex}`, `${title} (${galleryIndex + 1})`, index, galleryIndex))
      .filter(Boolean);
  }
  const solo = normalizePeekstrMediaItem(post, post, post.id || `peekstr-${index}`, title, index, 0);
  return solo ? [solo] : [];
}

function interleavePeekstrPostItems(children, limit) {
  const groups = (Array.isArray(children) ? children : [])
    .map((child, index) => normalizePeekstrPost(child, index))
    .filter((group) => group.length);
  const mixed = [];
  for (let depth = 0; mixed.length < limit; depth += 1) {
    let added = false;
    for (const group of groups) {
      if (group[depth]) {
        mixed.push(group[depth]);
        added = true;
        if (mixed.length >= limit) break;
      }
    }
    if (!added) break;
  }
  return mixed;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchRedditeryHtml(body, attempt = 1) {
  const response = await fetch(REDDITERY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "text/html,*/*;q=0.8",
      "User-Agent": "TributeArcade/1.0"
    },
    body
  });
  const html = await response.text();
  if (!response.ok) throw new Error(`Redditery returned ${response.status}.`);
  if (/Couldn't connect to www\.reddit\.com/i.test(html)) {
    if (attempt < 3) {
      await wait(800 * attempt);
      return fetchRedditeryHtml(body, attempt + 1);
    }
    throw new Error("Redditery could not connect to Reddit after a few tries. Try again in a minute.");
  }
  return html;
}

function redditeryAfterToken(html) {
  const match = String(html || "").match(/a\s*=\s*'([^']+)'/);
  return match ? match[1] : "";
}

async function fetchRedditeryGallery(searchParams) {
  if (typeof fetch !== "function") throw new Error("This server needs Node 20+ for Redditery fetches.");
  const subreddit = safeRedditerySubreddit(searchParams.get("subreddit"));
  const limit = Math.max(1, Math.min(24, Number(searchParams.get("limit") || 18) || 18));
  const page = Math.max(0, Math.min(30, Number(searchParams.get("page") || 0) || 0));
  const windowSize = Math.max(1, Math.min(5, Number(searchParams.get("window") || 1) || 1));
  const cursorAfter = safeGoonerAfterToken(searchParams.get("after"));
  const body = new URLSearchParams({
    r: subreddit,
    t: "",
    after: cursorAfter,
    ID: "",
    likes: ""
  });
  let html = await fetchRedditeryHtml(body);
  let after = redditeryAfterToken(html);
  for (let pageIndex = cursorAfter ? page : 0; pageIndex < page && after; pageIndex += 1) {
    body.set("after", after);
    html = await fetchRedditeryHtml(body);
    after = redditeryAfterToken(html);
  }
  const matches = [...html.matchAll(/<div class=['"]nsfw['"] id=['"]([^'"]+)['"]>([\s\S]*?)(?=<div class=['"]nsfw['"] id=|<script\b|$)/gi)];
  let posts = matches
    .map((match, index) => normalizeRedditeryPost(match, index, false))
    .filter(Boolean)
    .slice(0, limit);
  if (!posts.length) {
    posts = matches
      .map((match, index) => normalizeRedditeryPost(match, index, true))
      .filter(Boolean)
      .slice(0, limit);
  }
  return { source: "redditery", subreddit, page, after, items: posts };
}

async function fetchPeekstrGallery(searchParams) {
  if (typeof fetch !== "function") throw new Error("This server needs Node 20+ for gallery fetches.");
  const subreddit = safeRedditerySubreddit(searchParams.get("subreddit"));
  const limit = Math.max(1, Math.min(24, Number(searchParams.get("limit") || 18) || 18));
  const page = Math.max(0, Math.min(30, Number(searchParams.get("page") || 0) || 0));
  const cursorAfter = safeGoonerAfterToken(searchParams.get("after"));
  const windowSize = Math.max(1, Math.min(5, Number(searchParams.get("window") || 1) || 1));
  const params = new URLSearchParams({
    subreddit,
    sort: "hot",
    time: "all",
    limit: String(Math.max(limit, 18)),
    includeNSFW: "true",
    isMultireddit: "false"
  });
  if (cursorAfter) params.set("after", cursorAfter);
  const collectedChildren = [];
  let data = null;
  let after = "";
  const startPage = cursorAfter ? page : 0;
  const endPage = Math.max(page, startPage + windowSize - 1);
  for (let pageIndex = startPage; pageIndex <= endPage; pageIndex += 1) {
    if (after) params.set("after", after);
    const response = await fetch(`${PEEKSTR_REDDIT_ENDPOINT}?${params.toString()}`, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "TributeArcade/1.0"
      }
    });
    data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(`Peekstr returned ${response.status}.`);
    after = data && data.data && data.data.after ? String(data.data.after) : "";
    const children = data && data.data && Array.isArray(data.data.children) ? data.data.children : [];
    collectedChildren.push(...children);
    if (!after) break;
  }
  const posts = interleavePeekstrPostItems(collectedChildren, limit);
  return { source: "peekstr", subreddit, page, after, items: posts };
}

async function fetchGoonerGallery(searchParams) {
  return safeGoonerGallerySource(searchParams.get("source")) === "redditery"
    ? fetchRedditeryGallery(searchParams)
    : fetchPeekstrGallery(searchParams);
}

function roomId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 5; i += 1) {
    id += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return rooms.has(id) ? roomId() : id;
}

function roomHasPlayers(snapshot) {
  const seats = snapshot && snapshot.onlineLobby && snapshot.onlineLobby.seats;
  return Boolean(seats && (seats.one || seats.two));
}

function markRoomActivity(room) {
  const now = Date.now();
  room.updatedAt = now;
  room.emptySince = roomHasPlayers(room.snapshot) ? null : (room.emptySince || now);
}

function isRoomExpired(room, now = Date.now()) {
  if (!room) return true;
  if (room.emptySince && now - Number(room.emptySince || 0) >= ROOM_EMPTY_TTL_MS) return true;
  return now - Number(room.updatedAt || 0) >= ROOM_TTL_MS;
}

function cleanupRooms() {
  const now = Date.now();
  for (const [id, room] of rooms) {
    if (isRoomExpired(room, now)) rooms.delete(id);
  }
}

function newSeatSecret() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function ensureLobby(snapshot) {
  snapshot.onlineLobby = snapshot.onlineLobby || {};
  snapshot.onlineLobby.seats = snapshot.onlineLobby.seats || { one: false, two: false };
  snapshot.onlineLobby.seatSecrets = snapshot.onlineLobby.seatSecrets || { one: "", two: "" };
  snapshot.onlineLobby.playerNames = snapshot.onlineLobby.playerNames || { one: "", two: "" };
  snapshot.onlineLobby.roleChoices = snapshot.onlineLobby.roleChoices || { one: null, two: null };
  snapshot.onlineLobby.ready = snapshot.onlineLobby.ready || { one: false, two: false };
  snapshot.onlineLobby.spectators = snapshot.onlineLobby.spectators || {};
  return snapshot.onlineLobby;
}

function claimSeat(room, body) {
  const snapshot = room.snapshot || {};
  const lobby = ensureLobby(snapshot);
  const savedSeat = body.savedSeat === "one" || body.savedSeat === "two" || body.savedSeat === "spectator" ? body.savedSeat : null;
  const preferredSeat = body.preferredSeat === "one" || body.preferredSeat === "two" || body.preferredSeat === "spectator" ? body.preferredSeat : null;
  let seat = null;
  let secret = String(body.secret || "");

  if (savedSeat === "one" || savedSeat === "two") {
    if (secret && lobby.seatSecrets[savedSeat] === secret) seat = savedSeat;
  } else if (savedSeat === "spectator" && secret) {
    seat = "spectator";
  }

  if (!seat && preferredSeat === "spectator") seat = "spectator";
  if (!seat && preferredSeat && preferredSeat !== "spectator" && !lobby.seatSecrets[preferredSeat]) seat = preferredSeat;
  if (!seat && !lobby.seatSecrets.two) seat = "two";
  if (!seat && !lobby.seatSecrets.one) seat = "one";
  if (!seat) seat = "spectator";
  if (!secret) secret = newSeatSecret();

  if (seat !== "spectator") {
    lobby.seats[seat] = true;
    lobby.seatSecrets[seat] = secret;
    lobby.playerNames[seat] = lobby.playerNames[seat] || "";
    lobby.roleChoices[seat] = lobby.roleChoices[seat] || null;
    lobby.ready[seat] = Boolean(lobby.ready[seat]);
  }

  room.rev += 1;
  room.snapshot = snapshot;
  markRoomActivity(room);
  return { seat, secret };
}

function preserveSeatClaims(previousSnapshot, nextSnapshot) {
  const previous = ensureLobby(previousSnapshot || {});
  const next = ensureLobby(nextSnapshot || {});
  for (const seat of ["one", "two"]) {
    if (previous.seatSecrets[seat] && next.seatSecrets[seat] !== previous.seatSecrets[seat]) {
      next.seats[seat] = previous.seats[seat];
      next.seatSecrets[seat] = previous.seatSecrets[seat];
      next.playerNames[seat] = previous.playerNames[seat];
      next.roleChoices[seat] = previous.roleChoices[seat];
      next.ready[seat] = previous.ready[seat];
    }
  }
  return nextSnapshot;
}

function releaseSeat(room, body) {
  const snapshot = room.snapshot || {};
  const lobby = ensureLobby(snapshot);
  const seat = body.seat === "one" || body.seat === "two" ? body.seat : null;
  const secret = String(body.secret || "");
  if (!seat || !secret || lobby.seatSecrets[seat] !== secret) {
    return false;
  }
  lobby.seats[seat] = false;
  lobby.seatSecrets[seat] = "";
  lobby.playerNames[seat] = "";
  lobby.roleChoices[seat] = null;
  lobby.ready[seat] = false;
  snapshot.active = false;
  if (body.leaveNotice) {
    snapshot.settings = {
      ...(snapshot.settings || {}),
      leaveNotice: body.leaveNotice
    };
  }
  room.rev += 1;
  room.snapshot = snapshot;
  markRoomActivity(room);
  return true;
}

function staticFile(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  const fileName = urlPath === "/" ? "tribute_four.html" : urlPath.slice(1);
  const filePath = path.resolve(ROOT, fileName);
  if (!filePath.startsWith(ROOT)) return send(res, 403, "Forbidden", "text/plain");
  fs.readFile(filePath, (error, data) => {
    if (error) return send(res, 404, "Not found", "text/plain");
    const ext = path.extname(filePath).toLowerCase();
    const types = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css"
    };
    send(res, 200, data, types[ext] || "application/octet-stream");
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return send(res, 204, {});
  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (req.method === "POST" && url.pathname === "/api/create") {
      const body = await readBody(req);
      const id = roomId();
      const room = {
        id,
        rev: 1,
        snapshot: body.snapshot,
        updatedAt: Date.now(),
        emptySince: null
      };
      markRoomActivity(room);
      rooms.set(id, room);
      return send(res, 200, { id, rev: 1 });
    }

    if (req.method === "POST" && url.pathname === "/api/upload-image") {
      const body = await readBody(req);
      const uploadedUrl = await uploadImageToCatbox(body);
      return send(res, 200, { url: uploadedUrl });
    }

    if (req.method === "GET" && url.pathname === "/api/booru-gallery") {
      const gallery = await fetchBooruGallery(url.searchParams);
      return send(res, 200, gallery);
    }

    if (req.method === "GET" && url.pathname === "/api/danbooru-gallery") {
      const gallery = await fetchDanbooruGallery(url.searchParams);
      return send(res, 200, gallery);
    }

    if (req.method === "GET" && url.pathname === "/api/danbooru-autocomplete") {
      const suggestions = await fetchDanbooruAutocomplete(url.searchParams);
      return send(res, 200, suggestions);
    }

    if (req.method === "GET" && url.pathname === "/api/redditery-gallery") {
      const gallery = await fetchGoonerGallery(url.searchParams);
      return send(res, 200, gallery);
    }

    if (req.method === "GET" && url.pathname === "/api/state") {
      const id = (url.searchParams.get("room") || "").toUpperCase();
      const room = rooms.get(id);
      if (!room) return send(res, 404, { error: "Room not found" });
      if (isRoomExpired(room)) {
        rooms.delete(id);
        return send(res, 404, { error: "Room expired" });
      }
      return send(res, 200, room);
    }

    if (req.method === "POST" && url.pathname === "/api/sync") {
      const body = await readBody(req);
      const id = String(body.room || "").toUpperCase();
      const room = rooms.get(id);
      if (!room) return send(res, 404, { error: "Room not found" });
      if (isRoomExpired(room)) {
        rooms.delete(id);
        return send(res, 404, { error: "Room expired" });
      }
      if (!body.snapshot || Number(body.baseRev) < room.rev) {
        return send(res, 409, room);
      }
      room.rev += 1;
      room.snapshot = preserveSeatClaims(room.snapshot, body.snapshot);
      markRoomActivity(room);
      return send(res, 200, room);
    }

    if (req.method === "POST" && url.pathname === "/api/claim") {
      const body = await readBody(req);
      const id = String(body.room || "").toUpperCase();
      const room = rooms.get(id);
      if (!room) return send(res, 404, { error: "Room not found" });
      if (isRoomExpired(room)) {
        rooms.delete(id);
        return send(res, 404, { error: "Room expired" });
      }
      const claim = claimSeat(room, body);
      return send(res, 200, { ...room, claim });
    }

    if (req.method === "POST" && url.pathname === "/api/leave") {
      const body = await readBody(req);
      const id = String(body.room || "").toUpperCase();
      const room = rooms.get(id);
      if (!room) return send(res, 404, { error: "Room not found" });
      if (isRoomExpired(room)) {
        rooms.delete(id);
        return send(res, 404, { error: "Room expired" });
      }
      if (!releaseSeat(room, body)) return send(res, 403, { error: "Seat claim does not match" });
      return send(res, 200, room);
    }
  } catch (error) {
    return send(res, 500, { error: error.message });
  }

  staticFile(req, res);
});

setInterval(cleanupRooms, Math.min(ROOM_EMPTY_TTL_MS, 1000 * 60)).unref();

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Tribute Arcade multiplayer server: http://127.0.0.1:${PORT}/`);
});
