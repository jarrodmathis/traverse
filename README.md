# Traverse

A daily verse-finding game, served at playtraverse.com by Cloudflare Workers.

- `public/index.html` is the whole game.
- `pools.json` lists which verses are in the easy, medium and hard pools.
- `build.mjs` runs on every deploy and writes `public/data.js` from the Berean Standard Bible (public domain).

Every push to `main` deploys automatically through Cloudflare's Git integration.
