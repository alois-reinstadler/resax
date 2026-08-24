# Spec: Phase 6 — Registry release, accessibility audit, migration guide

Status: blocked until all Phase 0–5 component specs land. Maintainer decision: keep the docs site's design aligned with the Vuesax reference site. This stream owns the final fidelity pass; preserve the existing Resax implementation where it already matches rather than redesigning for novelty.

This is a verification/deployment-readiness stream, not a component implementation stream. Follow AGENTS.md and report every command/output honestly.

## Required references

- Registry schema and authoring: https://ui.shadcn.com/docs/registry/registry-json and https://www.shadcn-svelte.com/docs/registry
- shadcn-svelte CLI: https://www.shadcn-svelte.com/docs/cli
- Svelte accessibility: https://svelte.dev/docs/svelte/compiler-warnings#Accessibility-warnings
- axe rules: https://dequeuniversity.com/rules/axe/
- Project inventory: `scrape/vuesax/families.json`, every file in `specs/`, `registry.json`, and built `static/r/*.json`.

Fetch current live documentation and record CLI/package versions. If current registry schema differs from existing specs, make the smallest schema-correct migration and document it.

## 1. Inventory and registry integrity

- Produce a machine-readable or Markdown coverage table mapping every family in `scrape/vuesax/families.json` to exactly one Resax registry item, or to an explicitly documented merge (for example AvatarGroup into Avatar). No family may be silently omitted.
- Verify each item contains every consumer-required file, npm dependency, official plain-name registry dependency, and `local:` Resax dependency.
- Verify local dependency graph is acyclic and every `local:` target exists.
- Verify `scripts/check-registry.ts` derives/validates current counts rather than relying on a stale hand-maintained number.
- Build `static/r/` from a clean generated-output state using the supported build command. Do not delete unrelated static assets.

## 2. Real consumer install smoke tests

Create temporary SvelteKit test applications outside the repository with `mktemp -d`; do not commit them.

- Serve the built registry locally and install representative leaf items plus dependency-heavy items using the current `npx shadcn-svelte@latest add` syntax.
- Minimum matrix: `button`, `calendar`, `popup`, `notification`, `tabs`, `sidebar`, `table`, `code`, `cursor`, `split-button`.
- Also install all registry items into one clean app to detect path collisions and missing transitive dependencies.
- Run the generated consumer's typecheck and production build.
- Test both the repository's default alias configuration and one non-default component alias supported by the CLI, if the current CLI permits it.
- Record exact commands, CLI version, installed item list, and failures. Temporary directories must be removed after evidence is captured.

## 3. Accessibility audit

Use the project's existing test stack if already present; otherwise add the smallest supported Playwright + axe setup. Do not couple tests to a pending docs redesign.

- Audit every auto-discovered component fixture page at desktop and mobile widths in light and dark modes.
- Zero serious or critical axe violations. Moderate violations must be fixed or individually documented with rule, selector, reason, and follow-up owner; blanket exclusions are forbidden.
- Add keyboard smoke coverage for every interactive registry family: Tab reachability, visible focus, activation, escape/close where applicable, and arrow-key patterns for composite widgets.
- Test forced-colors and `prefers-reduced-motion` at least once per relevant visual/motion family.
- Verify no fixture leaves focus trapped, global listeners, body styles, portals, timers, or mounted outlets behind after navigation/unmount.

## 4. Docs fidelity, public API, and migration documentation

Keep the established Vuesax docs visual language and page structure. Use the captured pages under `scrape/vuesax/pages/` plus the live site as the design reference, while retaining Resax naming and Svelte examples.

- Match the Vuesax docs shell's information hierarchy, navigation behavior, component-family pages, demo framing, spacing, typography, responsive behavior, and light/dark presentation. Do not introduce a competing visual system.
- Preserve auto-discovered component fixture pages and the existing registry host routes; fidelity work must not replace registry functionality or hardcode a second component list.
- Every completed registry family appears in navigation and has an install command, interactive examples, variant coverage, public API reference, and relevant accessibility/SSR notes.
- Add screenshot coverage for the docs shell and representative family pages at desktop/mobile in light/dark mode. Compare against captured/live Vuesax references and document intentional Resax differences.
- Update repository documentation needed to consume the registry:

- Root README: prerequisites, registry URL/config, install commands, theme installation/order, imports, Svelte 5 snippet/bindable examples, SSR notes, and local development commands.
- Migration table: every scraped Vuesax family mapped to its Resax item; important Vue prop/event/slot patterns mapped to Svelte props/callbacks/snippets/bindables; merged variant families documented as `variant`/`effect` values.
- Generated or checked API reference may be Markdown/JSON in-repo; do not build a new docs UI. It must list exported components/functions/types and public Props from the source of truth, with a documented regeneration/check command if generated.
- Clearly list intentional v1 exclusions accumulated in component specs.

## 5. Release metadata and CI

- Registry distribution remains source-only; do not add npm publication.
- Ensure CI runs install with frozen lockfile, `pnpm check`, `pnpm test`, `pnpm registry:check`, `pnpm registry:build`, `pnpm build`, consumer smoke test, and accessibility audit.
- Generated registry drift must fail CI (build then compare tracked output, using a non-destructive check).
- Choose/document the initial registry release version and changelog policy already supported by repository conventions. Do not publish, deploy, tag, commit, or push unless explicitly requested in that session.
- Document the expected production registry base URL as a placeholder if hosting has not been chosen; do not guess a domain.

## Acceptance criteria

- Coverage audit proves every `scrape/vuesax/families.json` family maps to an implemented registry item or documented merge.
- `pnpm check` — 0 errors and 0 warnings.
- `pnpm test` — all tests pass without unhandled output.
- `pnpm registry:check` — schema, file existence, dependency validity, cycles, generated drift, and family coverage pass.
- `pnpm registry:build` — succeeds; generated output is complete and deterministic.
- `pnpm build` — production docs/registry host succeeds.
- Consumer smoke matrix and all-items install both typecheck and build successfully.
- Accessibility suite completes with zero serious/critical violations and no unexplained moderate violations.
- CI configuration contains all required gates and is syntax-valid.
- README, migration mapping, public API reference, and v1 exclusions are present and checked for drift where applicable.
- Docs shell and family pages retain the Vuesax reference design, pass the screenshot matrix, and document intentional differences.
- Final report includes actual output lines for every gate, versions, temporary-test scope, accessibility findings, coverage totals, file tree, deviations, and anything skipped/uncertain.

## Explicit non-goals

- A new visual identity or information architecture unrelated to Vuesax, hosted deployment, analytics, npm publication, and release execution.
- Hosting and release execution still require explicit maintainer authorization after the destination is chosen.
