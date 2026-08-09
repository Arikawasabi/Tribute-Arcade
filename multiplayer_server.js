const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 8765);
const ROOT = __dirname;
const ROOM_TTL_MS = Number(process.env.ROOM_TTL_MS || 1000 * 60 * 60 * 6);
const ROOM_EMPTY_TTL_MS = Number(process.env.ROOM_EMPTY_TTL_MS || 1000 * 60 * 5);
const MAX_UPLOAD_IMAGE_BYTES = Number(process.env.MAX_UPLOAD_IMAGE_BYTES || 1_500_000);
const rooms = new Map();

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
