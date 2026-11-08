# AIM Estate Group

A lightweight, photo-led property website inspired by the supplied luxury-property reference: full-bleed hero photography, a clear search bar, featured homes, browse-by-type cards, listing details, and a visible admin sign-in. The implementation uses its own copy, identity, and imagery; it does not copy the reference site's source or assets.

## Run locally

1. Install Node.js 20.9 or newer.
2. In this folder run `npm.cmd install` then `npm.cmd run dev` (works in Windows CMD and PowerShell even when the PowerShell script wrapper is disabled).
3. Open `http://localhost:3000`. The homepage is `/`; the admin login is `/admin`.

The public pages use labeled preview listings until real properties are added. To test persistent admin listing creation locally, configure Cloudflare bindings and local secrets as described in [the setup guide](docs/free-deployment.md).

## Technology

- Next.js App Router, React 19, TypeScript, and small custom CSS.
- Cloudflare Workers + OpenNext for deployment, D1 for listings, and R2 for photos.
- Native CSS and browser scrolling for transitions and carousels. No WebGL/3D or large animation framework is loaded by the public pages.
- Vitest for unit tests. Agentation remains an optional development-only visual feedback tool.
- Repository agent profiles live under `.github/agents/`; reusable UI and workflow skills live under `.agents/skills/`.

## Useful commands

```cmd
npm.cmd run dev
npm.cmd test
npm.cmd run build
npm.cmd run cf:preview
npm.cmd run cf:deploy
```

See [free deployment and admin setup](docs/free-deployment.md) before publishing. Replace sample listings and verify company contact details first.
