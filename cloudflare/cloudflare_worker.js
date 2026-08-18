const ROOM_TTL_MS = 1000 * 60 * 60 * 6;
const ROOM_EMPTY_TTL_MS = 1000 * 60 * 5;
const ROOM_ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const MAX_UPLOAD_IMAGE_BYTES = 1_500_000;
const BOORU_SOURCES = {
  gelbooru: "https://gelbooru.com/index.php",
  hgoon: "https://hgoon.booru.org/index.php"
};
const REDDITERY_ENDPOINT = "https://www.redditery.com/load.php";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function roomId() {
  let id = "";
  for (let i = 0; i < 5; i += 1) {
    id += ROOM_ID_ALPHABET[Math.floor(Math.random() * ROOM_ID_ALPHABET.length)];
  }
  return id;
}

function roomStub(env, id) {
  const objectId = env.ROOMS.idFromName(id.toUpperCase());
  return env.ROOMS.get(objectId);
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

function base64ToBytes(base64) {
  const binary = atob(base64.replace(/\s/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function imageFromDataUrl(dataUrl) {
  const match = /^data:(image\/(?:png|jpe?g|gif|webp|bmp));base64,([a-z0-9+/=\s]+)$/i.exec(String(dataUrl || ""));
  if (!match) throw new Error("Upload must be a PNG, JPG, GIF, WebP, or BMP image.");
  const type = match[1].toLowerCase();
  const bytes = base64ToBytes(match[2]);
  if (!bytes.length) throw new Error("Upload was empty.");
  if (bytes.byteLength > MAX_UPLOAD_IMAGE_BYTES) throw new Error("Image is too large for upload.");
  return { type, bytes };
}

async function uploadImageToCatbox(body, env) {
  const image = imageFromDataUrl(body && body.dataUrl);
  const extension = imageExtensionForType(image.type);
  const safeName = String((body && body.name) || `tribute-upload.${extension}`)
    .replace(/[^\w.-]+/g, "_")
    .replace(/^_+/, "")
    .slice(0, 80) || `tribute-upload.${extension}`;
  const form = new FormData();
  form.append("reqtype", "fileupload");
  if (env && env.CATBOX_USERHASH) form.append("userhash", env.CATBOX_USERHASH);
  form.append("fileToUpload", new Blob([image.bytes], { type: image.type }), safeName);
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
    .replace(/[^\w:~.+\- ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return raw.slice(0, 160) || "feet sort:score";
}

function normalizeBooruPost(post) {
  if (!post || typeof post !== "object") return null;
  const fileUrl = String(post.file_url || post.fileUrl || post.image || post.source || "").trim();
  const sampleUrl = String(post.sample_url || post.sampleUrl || post.preview_url || post.previewUrl || "").trim();
  const previewUrl = String(post.preview_url || post.previewUrl || post.thumbnail_url || post.thumbnailUrl || sampleUrl || fileUrl).trim();
  const url = sampleUrl || fileUrl || previewUrl;
  if (!/^https?:\/\/.+\.(?:png|jpe?g|gif|webp)(?:[?#].*)?$/i.test(url)) return null;
  return {
    id: String(post.id || post.md5 || url),
    url,
    previewUrl: /^https?:\/\//i.test(previewUrl) ? previewUrl : url,
    fileUrl: /^https?:\/\//i.test(fileUrl) ? fileUrl : url,
    score: Number(post.score || 0) || 0,
    rating: String(post.rating || ""),
    tags: String(post.tags || "").slice(0, 300)
  };
}

async function fetchBooruGallery(searchParams, env) {
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
    if (env && env.GELBOORU_USER_ID) endpoint.searchParams.set("user_id", env.GELBOORU_USER_ID);
    if (env && env.GELBOORU_API_KEY) endpoint.searchParams.set("api_key", env.GELBOORU_API_KEY);
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

function isRedditImageUrl(value) {
  return /^https?:\/\/(?:i|preview)\.redd\.it\/.+\.(?:png|jpe?g|gif|webp)(?:[?#].*)?$/i.test(String(value || ""));
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

function normalizeRedditeryPost(match, index, allowTinyPreview = false) {
  const id = String(match[1] || `redditery-${index}`);
  const block = match[2] || "";
  const imageMatches = [...block.matchAll(/<img\b[^>]*\bsrc=['"]([^'"]+)['"][^>]*>/gi)];
  const hrefMatches = [...block.matchAll(/<a\b[^>]*\bhref=['"]([^'"]+)['"][^>]*>/gi)];
  const directHref = hrefMatches
    .map((item) => decodeHtmlEntities(item[1]))
    .find((href) => isRedditImageUrl(href) && (allowTinyPreview || !isTinyRedditPreview(href)));
  const previewUrl = imageMatches
    .map((item) => decodeHtmlEntities(item[1]))
    .find((src) => isRedditImageUrl(src) && (allowTinyPreview || !isTinyRedditPreview(src)));
  const url = directHref || previewUrl;
  if (!url) return null;
  const titleMatch = block.match(/<h4[^>]*>\s*<a\b[^>]*>([\s\S]*?)<\/a>/i);
  const title = decodeHtmlEntities(String(titleMatch && titleMatch[1] || "Redditery image").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  return {
    id,
    url,
    previewUrl: previewUrl || url,
    title,
    source: "redditery",
    index
  };
}

async function fetchRedditeryGallery(searchParams) {
  const subreddit = safeRedditerySubreddit(searchParams.get("subreddit"));
  const limit = Math.max(1, Math.min(24, Number(searchParams.get("limit") || 18) || 18));
  const body = new URLSearchParams({
    r: subreddit,
    t: "",
    after: "",
    ID: "",
    likes: ""
  });
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
  if (/Couldn't connect to www\.reddit\.com/i.test(html)) throw new Error("Redditery could not connect to Reddit. Try again in a minute.");
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
  return { source: "redditery", subreddit, items: posts };
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

function nextRoomAlarm(room) {
  const now = Date.now();
  if (room.emptySince) return Math.max(now + 1000, Number(room.emptySince) + ROOM_EMPTY_TTL_MS);
  return Math.max(now + 1000, Number(room.updatedAt || now) + ROOM_TTL_MS);
}

function newSeatSecret() {
  if (crypto && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function ensureLobby(snapshot) {
  snapshot.onlineLobby = snapshot.onlineLobby || {};
  snapshot.onlineLobby.seats = snapshot.onlineLobby.seats || { one: false, two: false };
  snapshot.onlineLobby.seatSecrets = snapshot.onlineLobby.seatSecrets || { one: "", two: "" };
  snapshot.onlineLobby.playerNames = snapshot.onlineLobby.playerNames || { one: "", two: "" };
  snapshot.onlineLobby.roleChoices = snapshot.onlineLobby.roleChoices || { one: null, two: null };
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

export class RoomObject {
  constructor(state) {
    this.state = state;
  }

  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/room/create") {
      const body = await request.json();
      const room = {
        id: url.searchParams.get("room"),
        rev: 1,
        snapshot: body.snapshot,
        updatedAt: Date.now(),
        emptySince: null
      };
      markRoomActivity(room);
      await this.state.storage.put("room", room);
      await this.state.storage.setAlarm(nextRoomAlarm(room));
      return json({ id: room.id, rev: room.rev });
    }

    const room = await this.state.storage.get("room");
    if (!room) return json({ error: "Room not found" }, 404);
    if (isRoomExpired(room)) {
      await this.state.storage.deleteAll();
      return json({ error: "Room expired" }, 404);
    }

    if (request.method === "GET" && url.pathname === "/room/state") {
      return json(room);
    }

    if (request.method === "POST" && url.pathname === "/room/sync") {
      const body = await request.json();
      if (!body.snapshot || Number(body.baseRev) < room.rev) {
        return json(room, 409);
      }
      room.rev += 1;
      room.snapshot = preserveSeatClaims(room.snapshot, body.snapshot);
      markRoomActivity(room);
      await this.state.storage.put("room", room);
      await this.state.storage.setAlarm(nextRoomAlarm(room));
      return json(room);
    }

    if (request.method === "POST" && url.pathname === "/room/claim") {
      const body = await request.json();
      const claim = claimSeat(room, body);
      await this.state.storage.put("room", room);
      await this.state.storage.setAlarm(nextRoomAlarm(room));
      return json({ ...room, claim });
    }

    if (request.method === "POST" && url.pathname === "/room/leave") {
      const body = await request.json();
      if (!releaseSeat(room, body)) return json({ error: "Seat claim does not match" }, 403);
      await this.state.storage.put("room", room);
      await this.state.storage.setAlarm(nextRoomAlarm(room));
      return json(room);
    }

    return json({ error: "Not found" }, 404);
  }

  async alarm() {
    const room = await this.state.storage.get("room");
    if (room && isRoomExpired(room)) {
      await this.state.storage.deleteAll();
    } else if (room) {
      await this.state.storage.setAlarm(nextRoomAlarm(room));
    }
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (request.method === "POST" && url.pathname === "/api/create") {
        const body = await request.json();
        const id = roomId();
        return roomStub(env, id).fetch(new Request(`${url.origin}/room/create?room=${id}`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ snapshot: body.snapshot })
        }));
      }

      if (request.method === "POST" && url.pathname === "/api/upload-image") {
        const body = await request.json();
        const uploadedUrl = await uploadImageToCatbox(body, env);
        return json({ url: uploadedUrl });
      }

      if (request.method === "GET" && url.pathname === "/api/booru-gallery") {
        const gallery = await fetchBooruGallery(url.searchParams, env);
        return json(gallery);
      }

      if (request.method === "GET" && url.pathname === "/api/redditery-gallery") {
        const gallery = await fetchRedditeryGallery(url.searchParams);
        return json(gallery);
      }

      if (request.method === "GET" && url.pathname === "/api/state") {
        const id = (url.searchParams.get("room") || "").toUpperCase();
        if (!id) return json({ error: "Room required" }, 400);
        return roomStub(env, id).fetch(new Request(`${url.origin}/room/state`));
      }

      if (request.method === "POST" && url.pathname === "/api/sync") {
        const body = await request.json();
        const id = String(body.room || "").toUpperCase();
        if (!id) return json({ error: "Room required" }, 400);
        return roomStub(env, id).fetch(new Request(`${url.origin}/room/sync`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body)
        }));
      }

      if (request.method === "POST" && url.pathname === "/api/claim") {
        const body = await request.json();
        const id = String(body.room || "").toUpperCase();
        if (!id) return json({ error: "Room required" }, 400);
        return roomStub(env, id).fetch(new Request(`${url.origin}/room/claim`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body)
        }));
      }

      if (request.method === "POST" && url.pathname === "/api/leave") {
        const body = await request.json();
        const id = String(body.room || "").toUpperCase();
        if (!id) return json({ error: "Room required" }, 400);
        return roomStub(env, id).fetch(new Request(`${url.origin}/room/leave`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body)
        }));
      }
    } catch (error) {
      return json({ error: error.message || "Server error" }, 500);
    }

    if (url.pathname === "/") {
      return env.ASSETS.fetch(new Request(`${url.origin}/tribute_four.html`, {
        method: "GET",
        headers: request.headers
      }));
    }
    return env.ASSETS.fetch(request);
  }
};
