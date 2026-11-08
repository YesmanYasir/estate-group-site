# Project guidance for coding agents

## Purpose
Build a high-quality, multilingual-ready property discovery website with listings maintained in Sanity Studio. The default visitor experience is English; keep visible copy in English until the owner supplies approved translations.

## Product constraints
- Preserve a calm, premium Greek real-estate editorial feel: deep olive, warm ivory, muted stone, restrained bronze accents, generous photography, readable type.
- Do not copy AIM's site code, exact text, logo, or images. This is an independently implemented reference-inspired starter.
- Sample properties, values, and image links are illustrative, not real listings. Keep the demo disclaimer visible until the owner replaces them.
- Do not fabricate company credentials, testimonials, legal/investment advice, inventory, or property facts.
- Public website code must never contain a Sanity write token or other secret.
- Every interaction must work on mobile and with keyboard navigation; respect reduced-motion preferences.
- Keep property fields consistent between `studio/schemas/property.ts`, `site/js/data.js`, and docs.

## Working conventions
- Prefer small, dependency-light changes. No framework is required for the public site.
- Use semantic HTML, CSS custom properties, accessible labels, and explicit empty/error states.
- Keep external images replaceable from the CMS; add useful alt text and avoid fake availability claims.
- Put repeatable agent workflows in `.agents/skills/`. Use reviewer agents for bounded, read-only audits.
- Before delivery, inspect the changed pages at desktop and narrow mobile widths, and report any unverified external setup steps.

## Always-on coding skill
- At the start of every coding, design, review, or maintenance task in this repository, read and apply `.agents/skills/karpathy-guidelines/SKILL.md` before planning or changing files.
- Apply it throughout the full project lifecycle; the user does not need to repeat this instruction in each prompt.
- This is a project-level instruction for any coding agent that reads `AGENTS.md`; it does not replace tests, browser checks, or human review.
