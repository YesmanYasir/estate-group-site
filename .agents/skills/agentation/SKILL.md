---
name: agentation
description: Use the development-only Agentation toolbar to inspect and annotate the live Next.js estate website during visual review.
license: PolyForm-Shield-1.0.0
---

# Agentation visual feedback

Agentation is installed as a development dependency and mounted in the Next.js app only when `NODE_ENV=development`. It is omitted from production output.

## Workflow
1. Run `npm run dev` from the repository root and open the local URL.
2. Use Agentation to select the actual page element and record structured feedback.
3. Copy its feedback into the coding agent prompt and update the matching source component/style.
4. Verify the page again at desktop and phone sizes.

The toolbar supports local copy. Do not claim live MCP annotation sync unless a server is configured and a test annotation is read successfully.
