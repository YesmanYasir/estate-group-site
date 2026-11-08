# Performance guidelines

- Prefer server components. Keep client-side code to controls that need state.
- The hero loads one optimized-for-delivery property photo; do not autoplay video or create a WebGL scene.
- Below-the-fold property photos stay lazy-loaded. Use accurate `sizes`, meaningful alt text, and compressed images.
- Use CSS scroll snapping and browser-native scrolling for carousels. Avoid scroll hijacking and animation packages for basic effects.
- Upload property photos to R2, cap uploads at 8 MB, and keep immutable cache headers.
- Check mobile loading, keyboard use, and reduced-motion behavior after adding real listing photos.
