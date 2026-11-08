---
name: agentation
description: Use the Agentation visual-feedback toolbar to inspect and annotate this estate website during local UI and design review.
license: PolyForm-Shield-1.0.0
---

# Agentation for this project

Agentation is installed as a development dependency and mounted only in the local visual-feedback preview. It is not part of the public website.

## Start the annotation preview

1. From the repository root, run `npm install` if dependencies are not installed.
2. Run `npm run dev:agentation` and open the local URL printed by Vite.
3. Use the preview bar to switch between Home, Properties, Property detail, and Admin.
4. Use Agentation's toolbar to click or select a page element and add a precise visual note.
5. Copy the structured feedback and apply it to the corresponding source files. The preview iframe is same-origin so selectors and annotations can target the existing static pages.

## Agent sync

Manual copy/paste is the default. If the user explicitly requests live MCP sync, configure the existing coding agent with `npx -y agentation-mcp server`, point `<Agentation endpoint>` to the same HTTP URL, and verify an actual test annotation is readable by the agent. Do not claim live sync is enabled just because the package or server is present.

## Constraints

- Keep the Agentation toolbar and React preview shell development-only.
- Do not mount Agentation in `site/*.html` or production bundles.
- Do not migrate the public website to React just to use Agentation; the preview shell is an isolated React host for the static site.
- Agentation requires React 18 or newer and desktop browser interaction.
- If the tool cannot inspect an iframe element, provide the user with the copied feedback workflow and state what could not be verified.
