# Vuesax component scrape (2026-08-24)

Source: https://vuesax.com/components — an Astro site whose components ship as
framework-agnostic **vanilla web components** (`/_astro/wc-vanilla/*.js` chunks).
Those chunks contain readable, unminified shadow-DOM CSS + behavior per variant;
they are the authoritative "exact styles" source. A second copy of the same visual
styles exists as Vue SFC scoped CSS (`css/`) used by the docs-site playground.

## Contents

| Path | What it is |
|---|---|
| `catalog.json` | All 328 component variants: slug, title, url, description, family, wc chunk |
| `families.json` | 57 component families (Accordion, Alert, Button, …) with their variant slugs |
| `tokens.css` | Full global theme bundle: `:root` (dark) + `[data-theme=light]` tokens — `--ctrl-*`, `--inp-*`, `--btn-*`, `--sel-*`, `--ease-*`, colors, radii, fonts — plus shared keyframes |
| `wc/<slug>.js` | Per-variant vanilla custom element implementation (shadow CSS template + behavior), as shipped |
| `shadow-css/<slug>.css` | The shadow-DOM CSS extracted from each `wc/*.js` into a plain stylesheet |
| `css/` | Vue SFC scoped CSS bundles (`data-v-*` attrs; classes like `.btn2`, `.alert`) from the playground islands |
| `islands/` | Compiled Vue island chunks (playground implementations: render fn + props defs — useful for reading prop names/defaults) |
| `pages/` | Raw HTML of every `/c/<slug>` page |

## Notes for porting to Svelte 5 / shadcn-svelte

- Components reference tokens with inline fallbacks, e.g. `var(--ctrl-h-md, 40px)`,
  so they render standalone, but porting should map them onto the Resax `--rx-*`
  token layer.
- Prop names/defaults are easiest to read from `islands/Vs*.js`
  (`props:{variant:{default:"primary"},...}`) and the wc files' `observedAttributes`.
- Motion uses two signature easings: `--ease-out: cubic-bezier(.22,1,.36,1)` and
  `--ease-spring: cubic-bezier(.34,1.56,.64,1)`; several components have
  `prefers-reduced-motion` handling already in the shadow CSS.
