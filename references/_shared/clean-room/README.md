# Clean-room reference (provenance)

Contents copied from the `vuesax-components-full-reference.zip` dataset
(captured from https://vuesax.com on 2026-08-24):

- `CLEAN_ROOM_HANDOFF.md` — independent implementation brief
- `CLEAN_ROOM_COMPONENT_SPECS.{md,json}` — observable API/motion specs, 55 families
- `COVERAGE_MATRIX.{md,json}` — 328/328 variants coverage
- `tokens.json` — observed light/dark token values

These are the files the dataset itself designates as safe implementation input
(observable design at a high level). The raw machine-readable scrape and any
extracted component source/CSS in this repo (`scrape/vuesax/wc/`,
`scrape/vuesax/shadow-css/`, `scrape/vuesax/css/`) must NOT be used as
implementation input: Vuesax's ToS (https://vuesax.com/terms#license) prohibits
bulk-scraped assets being used to build a competing catalog/UI kit without
written authorization. Implementation must be an independent reimplementation
from the observations in these clean-room documents only.
