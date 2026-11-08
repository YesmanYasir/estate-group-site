# 3D guidelines

- Keep the signature scene to a single authored low-poly limestone house, restrained sea-glass and copper details, soft key light, and a quiet ground plane.
- Load the Canvas client-side. Cap DPR at 1.5 and keep all text, navigation, and listing content in HTML.
- Avoid remote models/HDRIs, large particle fields, heavy post-processing, and unnecessary WebGPU dependencies.
- For reduced motion, WebGL failure, or narrow screens, provide an accessible non-WebGL fallback; never gate content or CTA behind Canvas.
- Keep model movement minimal and stop/drop complexity if performance measurements show a material cost.
