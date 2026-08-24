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

## Commands (once Phase 0 lands)

- `pnpm dev` — docs/demo site (also the registry host)
- `pnpm check` — svelte-check, must be 0 errors
- `pnpm test` — vitest
- `pnpm registry:build` — build registry JSON to `static/r/`
- `pnpm build` — production build of the docs site

## Report format

End every task with: (1) acceptance-criteria checklist, pass/fail, each with the actual command output line proving it; (2) tree of files added/changed; (3) deviations from spec, with reasons; (4) anything broken, skipped, or uncertain — stated plainly, never papered over.
