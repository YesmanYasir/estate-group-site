---
name: motion-design
description: Use when adding transitions, scroll reveals, camera movement, or smooth scrolling.
---

# Motion design

Read `MOTION_GUIDELINES.md`. Assign each animated element to one system only. Use `@gsap/react` for scoped GSAP cleanup, synchronize Lenis with ScrollTrigger, use Framer Motion for discrete UI state, and keep native scrolling. Preserve all content under reduced motion. Avoid scroll locking or motion that delays the primary action.
