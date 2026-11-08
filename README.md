# Spitogo

A photo-led property website for Greek homes, operated by Spitogo with BlueGreen Tourism. Public browsing includes distinct sale, rental and Golden Visa categories; owners can submit listings for administrator review. Cloudflare D1 stores listings and consultation requests, while R2 stores listing photos.

## Run locally

1. Install Node.js 20.9 or newer.
2. In this folder run `npm install` and `npm run dev`.
3. Open `http://localhost:3000`; the public pages use clearly labelled preview homes until verified listings are added.

## Google sign-in and admins

Google sign-in is available to external Google accounts. Admin permissions remain limited to the comma-separated addresses in the Cloudflare `ADMIN_EMAIL` secret. For local Cloudflare preview, copy `.dev.vars.example` to `.dev.vars`, provide valid secrets and add localhost as an authorized Google OAuth origin and callback. Never commit `.dev.vars` or OAuth credentials.

## Main commands

```sh
npm install
npm run dev
npm test
npm run build
npm run cf:preview
npm run cf:deploy
```

`cf:deploy` applies any pending remote D1 migrations, builds the Cloudflare Worker and deploys it. See [the deployment guide](docs/free-deployment.md) for OAuth, domain and admin setup.
