# Reference archive architecture

This document proposes a lossless, component-owned layout for the files currently under `scrape/`. It is a move plan only: no source file has been moved. The complete per-file mapping, byte size, SHA-256 digest, inferred family, variant/state hints, and proposed destination are in [`reference-inventory.json`](./reference-inventory.json). Regenerate it with:

```sh
node scripts/inventory-references.mjs
```

## Inventory

| Source | Files | Artifact type |
| --- | ---: | --- |
| `scrape/vuesax/wc/` | 328 | Shipped vanilla web-component JavaScript |
| `scrape/vuesax/shadow-css/` | 328 | Extracted shadow-DOM CSS |
| `scrape/vuesax/islands/` | 308 | Compiled Vue playground islands/helpers |
| `scrape/vuesax/css/` | 117 | 82 component-scoped Vue CSS bundles and 35 shared docs-site CSS bundles |
| `scrape/vuesax/` root files | 4 | Catalog/family metadata, global tokens, provenance README |
| `scrape/vuesax-clean-room/` | 7 | Clean-room aggregate documents and metadata |
| **Total** | **1,092** | **8,056,549 bytes** |

The raw catalog contains 328 variants in 57 families. The clean-room dataset covers 55 families and deliberately has no entries for `AskAiButton` or `SplitButton`.

## Proposed layout

```text
references/
├── <component-key>/
│   ├── metadata/
│   │   ├── manifest.json          # generated index for this component
│   │   └── catalog.json           # derived catalog subset, not a moved original
│   ├── clean-room/
│   │   └── spec.json              # optional derived clean-room subset
│   ├── web-component/             # original wc/<slug>.js files
│   ├── css/
│   │   ├── shadow/                # original shadow-css/<slug>.css files
│   │   └── vue-scoped/            # original matched css/Vs*.css bundles
│   └── compiled/
│       └── vue/                    # original islands/Vs*.js bundles/helpers
└── _shared/
    ├── manifest.json
    ├── metadata/                   # catalog.json, families.json
    ├── theme/                      # tokens.css
    ├── provenance/                 # raw scrape README
    ├── clean-room/                 # seven original aggregate files
    └── docs-css/
        ├── blocks/                 # 24 Blk*.css files
        └── infrastructure/         # 11 host/page/shared CSS files
```

Component keys are the kebab-case `familyLabel` from `catalog.json`, so examples are `ask-ai-button`, `avatar-group`, `radio-group`, and `upload-file`. Original basenames are retained. This gives zero destination collisions and makes a move reversible from the manifest alone.

The aggregate catalog, family list, clean-room documents, and token files remain single shared originals. Per-component catalog/spec files are derived indexes, not duplicates masquerading as originals.

## Deterministic mapping rules

Rules are evaluated in this order:

1. `vuesax/wc/<slug>.js` and `vuesax/shadow-css/<slug>.css` map by exact `catalog.json` slug. All 328 files in each directory match.
2. A compiled Vue island or scoped CSS filename has its extension and final content-hash segment removed. The remaining stem maps by exact `catalog.json.title`. This maps 306 of 308 islands and 81 CSS files.
3. `VsAskAiButton.*` explicitly maps to catalog slug `vs-ask-ai-button`; the shipped compiled name differs from its catalog title, `VsButtonAskAi`. This accounts for one island and one CSS file.
4. `VsFileTreeNode.*.js` explicitly maps to FileTree as a `helper-node` artifact. It has no independent catalog variant.
5. Unmatched `Blk*.css` files are shared docs showcase blocks. Other unmatched CSS files are shared docs infrastructure. Names alone are not sufficient evidence to assign `FeedbackWidget`, `NotificationHost`, or `TooltipHost` to similarly named component families.
6. Root raw-scrape files and all clean-room aggregate files remain shared. Their manifests record the set of families represented inside them.

Variant hints come from the catalog slug after the kebab-case family prefix (`base` for the unsuffixed variant). State hints are deterministic keyword observations from the catalog title and description: active, checked, selected, disabled, hover, focus, pressed, loading, open, expanded, collapsed, dragging, dropping, error, success, indeterminate, dismissed, keyboard, and pointer. They are discovery hints, not normalized API claims.

## Manifest format

Use a repository-level manifest with one entry per original file, and generate smaller component manifests from it:

```json
{
  "schemaVersion": 1,
  "sourceRoot": "scrape",
  "proposedRoot": "references",
  "movePerformed": false,
  "inventory": [
    {
      "originalPath": "scrape/vuesax/wc/vs-accordion-bounce.js",
      "proposedPath": "references/accordion/web-component/vs-accordion-bounce.js",
      "bytes": 12345,
      "sha256": "...",
      "artifactType": "web-component-source",
      "ownership": "component",
      "family": "VsAccordion",
      "component": "Accordion",
      "componentKey": "accordion",
      "variant": "bounce",
      "variantSlug": "vs-accordion-bounce",
      "stateHints": ["open", "expanded"],
      "mappingRule": "exact catalog slug filename match",
      "confidence": "exact"
    }
  ]
}
```

Required integrity checks before and after a move:

- file count remains 1,092;
- total byte count remains 8,056,549;
- every SHA-256 digest remains unchanged;
- every original path appears exactly once;
- every destination appears exactly once;
- the catalog still resolves all 328 web-component and all 328 shadow-CSS variants;
- no component manifest treats a shared original as a private copy.

## Shared, ambiguous, and unmapped assets

The proposal has 1,046 component-owned files and 46 shared files, with zero ambiguous files, zero unmapped files, and zero proposed destination collisions.

The 46 shared files are:

- 7 clean-room aggregate files;
- 4 raw root files (`README.md`, `catalog.json`, `families.json`, `tokens.css`);
- 24 `Blk*.css` showcase bundles;
- 11 docs infrastructure bundles: `CmItems`, `FeedbackWidget`, `NotificationHost`, `PricingPanel`, `TooltipHost`, three `_slug_` bundles, `animations`, `components`, and `mobilePreview`.

The empty `scrape/vuesax/pages/` directory has no file inventory entry. If empty-directory preservation matters, record it separately in a move transaction rather than inventing a placeholder source artifact.

## Provenance boundary

`scrape/vuesax-clean-room/README.md` states that raw `wc`, `shadow-css`, and compiled/scoped assets must not be used as implementation input without written authorization. The archive layout must preserve that boundary. Raw files should carry a restricted provenance label in `_shared/manifest.json` and component manifests; clean-room summaries should be the only implementation-facing reference tier unless maintainers document additional rights.
