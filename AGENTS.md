# Project guidance for coding agents

## Product
Build an independently implemented, premium Greek property-discovery website inspired by the provided reference. Do not copy AIM's exact page code, text, logos, or images. Keep content truthful; demo listings are explicitly illustrative until replaced with owner-verified facts. Default visitor language is English.

## Architecture
- Next.js App Router, React 19, TypeScript and Tailwind CSS 4.
- Three.js / React Three Fiber / Drei power one restrained, client-only architectural hero. Keep key content and navigation in HTML; preserve reduced-motion and fallback behavior.
- GSAP + ScrollTrigger handles editorial scroll reveals; Lenis may smooth native scrolling; Framer Motion handles small interface transitions. Do not animate the same element with multiple systems.
- Zustand contains only shared listing-filter state.
- Cloudflare Workers via OpenNext, D1 for listing records, R2 for uploaded images. Secrets must remain server-side.
- Theatre.js Studio is a development-time option only; do not import Studio into the public client bundle.

## Working conventions
- Apply `.agents/skills/karpathy-guidelines/SKILL.md` before coding. Apply the local `frontend-design` skill for visual implementation and load only relevant references.
- Read specialist skill files when touching 3D, motion, creative direction, or visual review.
- Keep public details, prices, photos, availability, company claims, and contact information verifiable. Do not ship demo listing content as real inventory without a visible notice.
- Every flow must work with keyboard, small screens, clear focus, descriptive image alt text, and reduced motion.
- Admin authentication is password-based with a signed HttpOnly cookie. Password and session secret are runtime secrets; never commit `.dev.vars`.
- Use Cloudflare D1/R2 for production persistence; local JSON preview data is not writable persistence.
- Keep secrets, environment files, node_modules and generated builds out of commits.

## Reusable agent workflow
1. Creative Director defines one distinctive visual idea and honest story.
2. UI/UX Designer converts it into page hierarchy, flows, responsive states, and accessibility requirements.
3. 3D Engineer implements a performant decorative scene with a non-WebGL fallback.
4. Motion Engineer adds restrained interactions and reduced-motion behavior.
5. Senior Developer / QA integrates, checks security/performance, and reports only verified outcomes.

These are reusable repository agent profiles, not five continuously running bots. Dispatch only bounded independent reviews when useful.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
