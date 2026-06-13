const ROOM_TTL_MS = 1000 * 60 * 60 * 6;
const ROOM_EMPTY_TTL_MS = 1000 * 60 * 5;
const ROOM_ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

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
