# Resax

Resax ports the expressive Vuesax component language to Svelte 5. It is distributed exclusively as a shadcn-svelte registry: there is no Resax npm package.

## Repository layout

- `src/lib/registry/` — consumer-facing theme, utilities, attachments, and later UI components.
- `src/lib/docs/` — documentation-site-only components and navigation.
- `src/routes/` — the SvelteKit registry host and component gallery.
- `registry.json` — registry source manifest.
- `static/r/` — generated registry JSON (gitignored).

## Development

```sh
pnpm install
pnpm registry:build
pnpm dev
```

Quality gates are `pnpm check`, `pnpm test`, `pnpm registry:check`, and `pnpm build`.

## Registry

`pnpm registry:build` reads `registry.json`, inlines each source file, and emits installable item JSON under `static/r/`. SvelteKit serves that directory at `/r/`.

With the development server running, a consumer can install an item directly:

```sh
npx shadcn-svelte@latest add http://localhost:5173/r/theme.json
npx shadcn-svelte@latest add http://localhost:5173/r/utils-color.json
```

The available Phase 0 items are `theme`, `utils-color`, `utils-easing`, and `ripple`.
