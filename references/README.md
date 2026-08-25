# Vuesax source references

This directory is a lossless archive of the Vuesax scrape, organized by component. Raw scraped artifacts and clean-room material are deliberately separated by provenance.

## Provenance boundary

The raw web-component, extracted CSS, compiled Vue, and scoped CSS artifacts are **restricted reference material**. The archived clean-room README says they must not be used as implementation input without documented written authorization. On 2026-08-25, after this restriction was explicitly raised, the maintainer directed the Resax port to proceed. That authorization is recorded in `AUTHORIZATION.md` and is scoped to this project; the original provenance files remain intact.

- `<component>/web-component`: extracted web-component implementation
- `<component>/css/shadow`: extracted shadow-root CSS
- `<component>/compiled/vue`: compiled Vue island output
- `<component>/css/vue-scoped`: compiled Vue scoped CSS
- `<component>/metadata/manifest.json`: variants, original paths, state hints, sizes, and SHA-256 hashes
- `_shared/clean-room`: clean-room specifications and coverage records
- `_shared/metadata`: original catalogs
- `_shared/theme`: shared source tokens
- `_shared/docs-css`: docs-only bundles that are not component implementations

The files retain their original basenames. Use `pnpm references:check` to verify that the organization is complete and byte-for-byte intact.
