## Project Configuration

- **Language**: TypeScript
- **Package Manager**: pnpm
- **Add-ons**: tailwindcss, vitest

---

# Resax — instructions for implementation agents

Resax is a port of the Vuesax component library (vuesax.com/components) to Svelte 5, distributed **exclusively via shadcn-svelte component registries** — no npm package. `PLAN.md` is the overall plan; you don't need to re-read it in full each session unless a spec points into it.

## How work is organized

- Specs live in `specs/` and are the authoritative work orders, written by a separate planning agent. Implement the spec you were pointed at; do not start work that has no spec.
- If a spec is wrong, ambiguous, or fights reality (a CLI changed, a schema differs), make the smallest sensible deviation and **record it** in a "Deviations" section of your final report so the planner can amend the spec. Never silently reinterpret scope.
- Each spec ends with acceptance criteria. Before reporting done, verify every criterion by actually running the command it implies and include the proving output in your report. A criterion you didn't run is a fail, not a pass.

## Hard rules

- **Registry-first.** Every consumer-facing artifact (components, theme/tokens, utils, attachments) must be a registry item in `registry.json`, built to `static/r/*.json`, installable with `npx shadcn-svelte@latest add`. Code that consumers receive lives under `src/lib/registry/`; docs-site-only code lives under `src/lib/docs/` and `src/routes/`.
- **Svelte 5 only.** Runes (`$props`, `$state`, `$derived`, `$effect`, `$bindable`), snippets (not legacy slots), callback props (no `createEventDispatcher`), `{@attach}` attachments for DOM behaviors. TypeScript everywhere; no `any` in public APIs.
- **Live docs over memory** for shadcn-svelte registry schema/CLI and bits-ui APIs — both move fast. Each spec lists the URLs to check.
- **Theming discipline.** All colors go through the `--rx-*` token layer / `--rx-color` indirection (see PLAN.md §3 and the theme spec). No hardcoded colors in components.
- **Git:** do not commit or push unless the user explicitly asks in that session.

## Established conventions (learned in earlier phases — follow these)

- **Build on official shadcn-svelte components** (user directive, 2026-08-24, applies from Phase 3 on): when the official shadcn-svelte registry has a matching component (dialog, tooltip, dropdown-menu, context-menu, sonner, sheet, …), install it as the base — declare it as a plain-name entry in `registryDependencies` (plain names resolve to the official registry; that is now the *intended* behavior for these deps) and build the Vuesax-skinned Resax component on top of it, importing from the consumer-standard path it installs to. Only build directly on bits-ui when no official component exists (or when the spec says so). The Phase 1–2 components predate this directive; do not retrofit them unless a spec asks.

- **`registryDependencies` must use the `local:` prefix** for items in this registry (e.g. `"local:theme"`). Plain names resolve to the *official shadcn-svelte registry* and break consumer installs.
- **Demo pages:** one file per component at `src/lib/docs/pages/<slug>.svelte`, auto-discovered by glob. Never edit `src/routes/(docs)/components/[slug]/+page.svelte` or `src/lib/docs/nav.ts` — built flags and routing derive from the glob.
- **Exemplar:** `src/lib/registry/ui/button/button.svelte` shows the house style — module-script Props interface, `tv()` variants in `index.ts`, `styleColor()` for the color prop, easing tokens in inline style, snippets, `{@attach}`.
- When adding registry items, update the expected counts in `scripts/check-registry.ts`.
- Runtime-derived accent colors use CSS relative color (`hsl(from rgb(var(--rx-color)) …)`) — never precomputed hexes.
- Every animation needs a `prefers-reduced-motion` story.

## Commands (once Phase 0 lands)

- `pnpm dev` — docs/demo site (also the registry host)
- `pnpm check` — svelte-check, must be 0 errors
- `pnpm test` — vitest
- `pnpm registry:build` — build registry JSON to `static/r/`
- `pnpm build` — production build of the docs site

## Report format

End every task with: (1) acceptance-criteria checklist, pass/fail, each with the actual command output line proving it; (2) tree of files added/changed; (3) deviations from spec, with reasons; (4) anything broken, skipped, or uncertain — stated plainly, never papered over.
