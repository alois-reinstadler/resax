# Resax source-to-port parity summary

This release audit combines the generated Phase 0–3 audit with the Phase 4–5 implementation specs and the authoritative `scrape/vuesax/catalog.json` catalog.

## Result

**57/57 Vuesax families are represented and all 328 catalog variant records are assessed.** Phase 0–3 accounts for 33 families and 210 records; Phase 4–5 accounts for 24 families and 118 records.

| Scope | Families | Catalog records | Component source | Docs fixture | Assessment |
| --- | ---: | ---: | --- | --- | --- |
| Phase 0–3 | 33/33 | 210/210 | Present | Present | Audited variant by variant in `PHASE0-3-PARITY.md` |
| Phase 4–5 | 24/24 | 118/118 | Present | Present | Implemented against the Phase 4a–5c specifications |
| Total | **57/57** | **328/328** | **57/57** | **57/57** | Complete family coverage |

## Phase 4–5 family coverage

- Disclosure/navigation: Accordion, Breadcrumb, Pagination, Tabs, Steps, DotStepper, Timeline, FileTree, NavMenu, Sidebar.
- Data display: Table, List, Code.
- Special interactions: Scrollbar, Cursor, Transform, Dock, InlineOverflow, TickRail.
- Composites: ButtonGroup, SplitButton, AskAiButton, SlideConfirm, LinkBar.

Each family has a registry implementation and an auto-discovered Vuesax-style page under `src/lib/docs/pages/`. Variant names that describe a whole demo rather than a reusable state are represented through orthogonal props, snippets, or composition; they are still assessed rather than silently omitted.

## Fidelity fixes verified

- Popup and Drawer are no longer excluded: Popup wraps official shadcn-svelte Dialog and supplies all transition presets plus ConfirmPopup; Drawer wraps official Sheet with all four placements.
- Card exposes `spotlight` and `tilt-3d` treatments with reduced-motion fallbacks.
- Indicator exposes `odometer` with tabular digits and reduced-motion behavior.
- ContextMenu exposes the `radial` layout while retaining accessible menu semantics.
- Input, Textarea, and Select expose the source-specific focus/surface variants identified by the scrape.
- Spinner accepts every canonical scraped name while retaining legacy aliases.

## Remaining fidelity notes

No material family or catalog record is unassessed. Some source-demo names intentionally map to composition instead of a same-named prop—for example Drawer blur/glass use theme surfaces, Card asset/slider use media snippets, and several motion-only demos use the component's accessible state transition. These are API-shape differences, not missing families or behaviors.
