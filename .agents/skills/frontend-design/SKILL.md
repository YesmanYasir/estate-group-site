---
name: frontend-design
description: Create distinctive, accessible React and Tailwind interfaces with strong visual hierarchy and polished, working behavior.
license: Apache-2.0; based on better-react-web-ui, which includes attribution to Anthropic's frontend-design skill.
metadata:
  source: https://github.com/aladicf/better-react-web-ui/tree/main/skills/frontend-design
  argument-hint: "[page, flow, or component]"
---

# Frontend design for this project

Use for all React page and component design work. Read `AGENTS.md`, `DESIGN.md`, and the relevant current code first. This project uses Next.js App Router, React 19, TypeScript, Tailwind CSS 4, R3F, and a premium Greek real-estate identity.

## Priorities

- Preserve the creative idea **The Mediterranean, drawn in light**: limestone, mineral pine, copper, restrained sea-glass, editorial typography, precise rules, generous photography. Do not drift into a generic luxury template.
- Make property exploration and owner listing creation obvious. Keep content truthful; never invent property facts, credentials, reviews, contact details, or scarcity. Preserve explicit preview notices.
- Build working interactions and cover mobile, empty, error, and success states. Prefer semantic HTML and existing project components.
- Keep all core text and CTAs in HTML. Keep the 3D hero client-only and decorative with an accessible fallback.
- Check keyboard access, visible focus, labels, contrast, descriptive image alt, zoom, responsive layouts, and reduced-motion behavior.
- Verify in the target project. Report only the build, browser, accessibility, and performance checks actually completed.

## Reference index

| Task | Load these files in `reference/` |
|---|---|
| Landing/hero story | `landing-page-storytelling.md`, `hero-sections-ux.md`, `reference-fidelity.md` |
| Hierarchy/type/spacing | `hierarchy-checklist.md`, `spacing-system.md`, `typography.md`, `design-principles.md` |
| Color/imagery | `color-and-contrast.md`, `image-treatment.md`, `ai-slop-detection.md` |
| Interaction/forms | `interaction-design.md`, `form-validation-patterns.md`, `error-recovery.md`, `interface-honesty.md` |
| Responsive/accessibility | `responsive-design.md`, `component-accessibility.md` |
| Motion/performance | `motion-design.md`, `core-web-vitals.md` |
| Search and listings | `search-and-filtering-ux.md`, `ux-writing.md` |
| Final verification | `react-tailwind-implementation-review.md`, `visual-verification.md` |

Keep the implementation proportional to the request. Avoid speculative features, unnecessary animation, and added dependencies where existing project tools already solve the task.
