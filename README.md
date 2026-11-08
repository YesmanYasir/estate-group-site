# AIM Estate Group website

A premium, editorial property-discovery website with an accessible Three.js/R3F architectural hero and a simple custom `/admin` listing editor. The visual direction references Mediterranean architecture and light without copying the reference website's code or assets.

## Local preview

- Node.js 20.9+
- `npm install`
- Copy `.dev.vars.example` to `.dev.vars` and choose private secrets.
- Configure local Cloudflare resources in `wrangler.jsonc` and apply migrations, or run `npm run dev` to preview the demo fallback content.
- Open `http://localhost:3000`; admin is at `/admin`.

For full-stack deployment steps see [`docs/free-deployment.md`](docs/free-deployment.md). The current demo listings are illustrative and must be replaced with owner-verified details before launch.

## Stack and repos

- [Next.js](https://github.com/vercel/next.js) + React/TypeScript + [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [Three.js](https://github.com/mrdoob/three.js), [React Three Fiber](https://github.com/pmndrs/react-three-fiber), [Drei](https://github.com/pmndrs/drei)
- [GSAP](https://github.com/greensock/GSAP), [Framer Motion](https://github.com/motiondivision/motion), [Lenis](https://github.com/darkroomengineering/lenis), [Theatre.js](https://github.com/theatre-js/theatre) (dev-time animation authoring only)
- [Zustand](https://github.com/pmndrs/zustand) for shared listing-filter state
- [Better React Web UI](https://github.com/aladicf/better-react-web-ui) `frontend-design` skill installed in `.agents/skills/frontend-design/`
- [Agentation](https://github.com/benjitaylor/agentation) remains a development visual-feedback helper.

The repository stores five role profiles in `.github/agents/` and reusable project guidance under `.agents/skills/`. They guide AI coding tools; they are not continuously running hosted agents.
