# Project guidance for coding agents

## Product
Build an independently implemented, premium Greek property-discovery website inspired by the provided reference. Do not copy AIM's exact page code, text, logos, or images. Keep content truthful; demo listings are explicitly illustrative until replaced with owner-verified facts. Default visitor language is English.

## Architecture
- Next.js App Router, React 19, TypeScript and small, project-owned CSS.
- Use semantic HTML, native browser scrolling, and CSS for modest transitions and carousels. Keep the public bundle free of WebGL and large animation dependencies.
- Keep server-rendered pages by default. Add client components only for interactions that need browser state.
- Cloudflare Workers via OpenNext, D1 for listing records, R2 for uploaded images. Secrets must remain server-side.

## Working conventions
- Apply `.agents/skills/karpathy-guidelines/SKILL.md` before coding. For UI work, use the local `frontend-design`, `emil-design-eng`, `impeccable`, and `design-taste-frontend` skills; follow the incumbent identity in `DESIGN.md` and load only relevant references. After cloning, run `npm run setup:skills` once to restore the locked upstream skills and enable the Impeccable design hook.
- Read the relevant design and quality skills before changing public flows.
- Keep public details, prices, photos, availability, company claims, and contact information verifiable. Do not ship demo listing content as real inventory without a visible notice.
- Every flow must work with keyboard, small screens, clear focus, descriptive image alt text, and reduced motion.
- Admin authentication uses Google OAuth through Auth.js. Only the verified email configured in the `ADMIN_EMAIL` Worker secret is authorized. OAuth credentials and `AUTH_SECRET` are runtime secrets; never commit `.dev.vars`.
- Use Cloudflare D1/R2 for production persistence; local JSON preview data is not writable persistence.
- Keep secrets, environment files, node_modules and generated builds out of commits.

## Reusable agent workflow
1. Creative Director defines one distinctive visual idea and honest story.
2. UI/UX Designer converts it into page hierarchy, flows, responsive states, and accessibility requirements.
3. Motion Engineer keeps interactions native, restrained, and reduced-motion friendly.
4. Senior Developer / QA integrates, checks security/performance, and reports only verified outcomes.

These are reusable repository agent profiles, not five continuously running bots. Dispatch only bounded independent reviews when useful.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
