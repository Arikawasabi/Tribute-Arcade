# Tribute Arcade Cloudflare Deploy

This package hosts the game and multiplayer room server at the same public URL.

## Deploy

The easiest path is to run:

```powershell
.\host_online.bat
```

It copies the latest game HTML, installs Wrangler if needed, opens Cloudflare login if needed, and deploys.

Manual deploy:

```powershell
npm install
npx wrangler login
npm run deploy
```

Wrangler will print a public `workers.dev` URL. Open that URL, press `Host Game`, then copy the invite link.

## Update After Editing

After changing `../tribute_four.html`, copy it into `public/tribute_four.html`, then deploy again:

```powershell
.\host_online.bat
```

## Notes

- Rooms are stored in Cloudflare Durable Objects and expire after about 6 hours of inactivity.
- The game still uses polling for sync, so very heavy traffic may hit free-tier limits. Small playtests should be fine.
- The deployed page and API share the same origin, so invite links no longer point at `localhost`.
