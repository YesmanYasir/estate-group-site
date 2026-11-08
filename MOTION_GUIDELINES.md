# Motion guidelines

- Lenis remains a thin enhancement to native scrolling and is disabled for `prefers-reduced-motion`.
- GSAP + ScrollTrigger handles small opacity/transform reveals only. Use `@gsap/react` cleanup; do not hijack scroll.
- Framer Motion owns menu and UI-state transitions only. Do not animate an element simultaneously with GSAP.
- Theatre.js core/Studio is a local authoring option for a future composed camera timeline. The studio package is dev-only and must never enter production client bundles; the initial home model remains deliberately lightweight.
