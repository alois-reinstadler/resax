# Resax

Resax ports the expressive Vuesax component language to Svelte 5. Components are distributed exclusively through a shadcn-svelte registry—there is no Resax npm package.

## Requirements

- Svelte 5 and SvelteKit
- Tailwind CSS 4
- Node.js 20 or newer
- A configured `components.json` for shadcn-svelte

## Install from the registry

The production registry is hosted with the documentation site at `https://alois-reinstadler.github.io/resax/r`. Override `RESAX_REGISTRY` only when testing another deployment or a local registry build.

```sh
RESAX_REGISTRY=https://alois-reinstadler.github.io/resax/r
npx shadcn-svelte@latest add "$RESAX_REGISTRY/theme.json"
npx shadcn-svelte@latest add "$RESAX_REGISTRY/button.json"
```

For local development, use `RESAX_REGISTRY=http://localhost:5173/r`; the consumer smoke test continues to supply its own localhost registry URL.

Install `theme` first. Registry items then bring in their declared Resax utilities, official shadcn-svelte components, and npm dependencies transitively. Import installed files through the component alias configured in the consumer app.

```svelte
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Steps, Step } from '$lib/components/ui/steps';
  let current = $state(0);
</script>

<Button color="primary">Continue</Button>
<Steps bind:current clickable>
  <Step title="Account" />
  <Step title="Review">Review content uses a Svelte 5 snippet.</Step>
</Steps>
```

Resax uses callback props instead of dispatched Vue-style events, snippets instead of slots, and `$bindable` props for two-way state. See [the migration guide](docs/MIGRATION.md) and [generated API reference](docs/API.md).

The current version is the unreleased `0.0.1` preview. Registry snapshots follow Semantic Versioning; breaking, additive, and patch-level changes are recorded in the [changelog](CHANGELOG.md). No release, tag, deployment, or npm publication is performed by the repository build.

## Theme and SSR

Import the installed theme CSS once in the application layout after Tailwind. Components avoid browser globals during SSR; DOM-dependent behavior starts after mount. Code highlighting renders an escaped plain-text SSR fallback and progressively enhances on the client.

Colors flow through the `--rx-*` token layer. Override tokens at `:root`, a theme class, or a component boundary rather than editing component source.

## Development

```sh
pnpm install --frozen-lockfile
pnpm registry:build
pnpm dev
pnpm check
pnpm test
pnpm registry:check
pnpm build
node scripts/generate-api.mjs
```

Consumer-facing source lives in `src/lib/registry/`; docs-only code lives in `src/lib/docs/` and `src/routes/`. Generated registry JSON is served from `static/r/`.

## Accessibility

Components use semantic HTML, keyboard-operable composite patterns, visible focus, reduced-motion fallbacks, and token-based forced-color-compatible styling. Run the release accessibility suite at desktop/mobile widths in light and dark modes before publishing a registry revision.
