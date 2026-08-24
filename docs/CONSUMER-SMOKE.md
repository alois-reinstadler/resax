# Phase 6 consumer registry smoke test

Date: 2026-08-24

## Environment

- Registry/consumer CLI: shadcn-svelte 1.5.0 (`pnpm dlx shadcn-svelte@latest`).
- Scaffold: `sv create` 0.17.0, Svelte 5.56.10, SvelteKit 2.70.3, pnpm 11.23.0.
- Registry served locally from `http://127.0.0.1:4179/r/` after `pnpm registry:build`.
- Consumers used explicit `/var/tmp/resax-fix-*.XXXXXX` `mktemp` directories outside the repository and CLI preset `a0`.

## Packaging corrections proved by the smoke test

- Every Resax UI file is `registry:ui` and has an alias-relative `resax/<item>/<file>` target. This preserves compound item directories and isolates Resax wrappers from official shadcn components.
- Shared files use alias-relative `registry:lib` targets under `registry/lib`, `registry/attachments`, and `registry/ui/cursor`.
- Registry source aliases match `$lib`, `$lib/components`, `$lib/utils`, and `$lib/hooks`, so the CLI rewrites imports for custom consumer aliases.
- Internal `rx-button`, `rx-skeleton`, and `rx-separator` dependency aliases avoid identity collisions between same-named Resax and official dependency items.
- Official bases with the same item name as their Resax wrapper are shipped at the standard UI-alias path by the wrapper registry item. This applies to Tooltip, Context Menu, Sidebar, and Button Group. Button also carries the official compatibility base required by Dialog and Sheet.

## Representative default-alias matrix

Clean app; installed `button`, `calendar`, `popup`, `notification`, `tabs`, `sidebar`, `table`, `code`, `cursor`, and `split-button`.

```text
pnpm dlx shadcn-svelte@latest add -y -o <10 local item URLs>
└ Success! Components added.

pnpm check
svelte-check found 0 errors and 0 warnings

pnpm build
✓ built in 2.44s
✔ done
```

## All-items matrix

Clean app; installed every item in `static/r/index.json` (62 items, including three collision-free internal dependency aliases).

```text
pnpm dlx shadcn-svelte@latest add -y -o <all 62 local item URLs>
└ Success! Components added.

pnpm check
svelte-check found 0 errors and 0 warnings

pnpm build
exit 0
✔ done
```

## Non-default aliases

Clean app initialized with:

- components: `$lib/widgets`
- ui: `$lib/widgets/ui`
- lib: `$lib/kernel`
- utils: `$lib/shared/utils`
- hooks: `$lib/runtime/hooks`

Installed the dependency-heavy `button`, `popup`, `sidebar`, `table`, `code`, and `split-button` set.

```text
pnpm dlx shadcn-svelte@latest add -y -o <6 local item URLs>
└ Success! Components added.

pnpm check
svelte-check found 0 errors and 0 warnings

pnpm build
✓ built in 2.79s
✔ done
```

## Outcome

The representative matrix, all-items install, and non-default-alias consumer all install, typecheck, and build successfully with the current CLI. The original flattening, doubled `src/lib` targets, import rewriting failures, and official/Resax name collisions are resolved.
