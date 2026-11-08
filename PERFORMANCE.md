# Performance

- Dynamically import R3F scene with SSR disabled and a CSS fallback. Keep geometry/material counts low and cap pixel ratio.
- Use image dimensions/`sizes`; prioritize only initially visible listing images and lazy-load other media via Next Image defaults.
- Avoid remote model/HDRI fetches. Upload property media to R2, limit uploads to 8 MB, and use immutable cache headers.
- Keep motion on transform/opacity and respect reduced motion. Preserve native touch/keyboard scrolling.
- Recheck Core Web Vitals and real-device GPU use after authentic photo assets are added.
