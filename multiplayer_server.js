const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 8765);
const ROOT = __dirname;
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

function roomId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 5; i += 1) {
    id += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return rooms.has(id) ? roomId() : id;
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
      rooms.set(id, {
        id,
        rev: 1,
        snapshot: body.snapshot,
        updatedAt: Date.now()
      });
      return send(res, 200, { id, rev: 1 });
    }

    if (req.method === "GET" && url.pathname === "/api/state") {
      const id = (url.searchParams.get("room") || "").toUpperCase();
      const room = rooms.get(id);
      if (!room) return send(res, 404, { error: "Room not found" });
      return send(res, 200, room);
    }

    if (req.method === "POST" && url.pathname === "/api/sync") {
      const body = await readBody(req);
      const id = String(body.room || "").toUpperCase();
      const room = rooms.get(id);
      if (!room) return send(res, 404, { error: "Room not found" });
      if (!body.snapshot || Number(body.baseRev) < room.rev) {
        return send(res, 409, room);
      }
      room.rev += 1;
      room.snapshot = body.snapshot;
      room.updatedAt = Date.now();
      return send(res, 200, room);
    }
  } catch (error) {
    return send(res, 500, { error: error.message });
  }

  staticFile(req, res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Tribute Arcade multiplayer server: http://127.0.0.1:${PORT}/`);
});
