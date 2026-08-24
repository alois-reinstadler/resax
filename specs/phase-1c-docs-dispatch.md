# Spec: Phase 1c — Demo-page dispatch refactor (small, sequential)

Status: ready for implementation. Runs directly on `main` (no worktree). Purpose: eliminate shared-file merge conflicts before parallel component streams fan out.

## Problem

Every component stream currently edits `src/routes/(docs)/components/[slug]/+page.svelte` and `src/lib/docs/nav.ts` (built flags), causing conflicts between parallel branches.

## Change

1. **Per-component doc pages:** create `src/lib/docs/pages/<slug>.svelte`, one per built component, by extracting the existing demo content verbatim (visuals must not change):
   - `button.svelte` (move `src/lib/docs/ButtonPage.svelte` here; delete the old file)
   - `spinner.svelte`, `skeleton.svelte`, `separator.svelte`, `spacer.svelte` (extract each branch of the current `[slug]/+page.svelte`, including the styles each needs)
2. **Glob dispatch:** `[slug]/+page.svelte` becomes a thin dispatcher: `import.meta.glob('$lib/docs/pages/*.svelte', { eager: true })`, resolve the component by slug, render it; unknown slug renders the existing "coming soon" shell. No per-component imports remain.
3. **Nav auto-built flags:** in `nav.ts`, derive `built` from `import.meta.glob('$lib/docs/pages/*.svelte')` keys instead of the hardcoded array, so new streams never edit nav either.

After this, a new component stream touches only: its `src/lib/registry/ui/<name>/` dir, its `src/lib/docs/pages/<slug>.svelte`, `registry.json`, and tests.

## Acceptance criteria

1. `pnpm check` 0 errors; `pnpm vitest run` all pass; `pnpm registry:build && pnpm registry:check` pass; `pnpm build` succeeds.
2. Dev-server: `/components/button|spinner|skeleton|separator|spacer` render the same demo content as before (curl markers: `rx-button`, `rx-spinner--waves`, `rx-skeleton--shine`, `aria-orientation="vertical"`, `rx-spacer`); an unbuilt slug (e.g. `/components/alert`) still shows coming-soon; sidebar built flags unchanged.
3. `ButtonPage.svelte` no longer exists; `[slug]/+page.svelte` contains no component-specific imports.
