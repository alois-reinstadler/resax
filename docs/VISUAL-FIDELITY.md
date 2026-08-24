# Documentation visual fidelity

The Resax docs retain Vuesax's hierarchy: a persistent categorized component rail, compact utility header, large expressive page title, centered bordered demonstrations, source disclosure immediately following each demo, rounded surfaces, strong primary accents, and responsive light/dark presentation.

The release screenshot matrix covers the home shell plus Button, Tabs, and Table at desktop/mobile widths in both color modes. Baselines are generated only after maintainer review; tests intentionally fail when screenshots are absent or drift.

Intentional Resax differences:

- Names and examples use Svelte 5 and Resax instead of Vue/Vuesax.
- Install commands target shadcn-svelte registry JSON instead of npm/plugin registration.
- The component list is generated from fixture modules, not copied from the reference navigation.
- Focus, forced-color, and reduced-motion affordances take precedence over pixel matching.
- `scrape/vuesax/pages/` is currently empty, so live Vuesax documentation and scraped per-component CSS/assets are the available references. Captured page comparisons must be repeated if page assets are added later.

Required shared development dependencies: `@playwright/test` and `@axe-core/playwright`. Required scripts should run `playwright test tests/e2e/docs-a11y.spec.ts` and `playwright test tests/e2e/docs-visual.spec.ts`.
