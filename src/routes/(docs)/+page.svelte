<script lang="ts">
	import { nav } from '$lib/docs/nav';
	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | undefined;
	const componentCount = nav.reduce((total, group) => total + group.items.filter((item) => item.built).length, 0);
	const install = 'npx shadcn-svelte@latest add http://localhost:5173/r/button.json';
	const featured = [
		{ name: 'Button', slug: 'button', note: 'Expressive variants, arbitrary accents, loading, and ripple motion.', mark: 'Continue' },
		{ name: 'Tabs', slug: 'tabs', note: 'Accessible keyboard navigation with Vuesax-style animated indicators.', mark: 'Overview  Activity' },
		{ name: 'Table', slug: 'table', note: 'Typed TanStack foundations with selection, sorting, and pagination.', mark: 'Name       Status' },
		{ name: 'Popup', slug: 'popup', note: 'Dialog primitives with confirmation flows and polished transitions.', mark: 'Open dialog' }
	];
	$effect(() => () => { if (copyTimer) clearTimeout(copyTimer); });
	async function copy() {
		try {
			await navigator.clipboard.writeText(install);
			copied = true;
			if (copyTimer) clearTimeout(copyTimer);
			copyTimer = setTimeout(() => copied = false, 1800);
		} catch { copied = false; }
	}
</script>

<svelte:head>
	<title>Resax — expressive Svelte 5 components</title>
	<meta name="description" content="Vuesax-inspired, accessible Svelte 5 components delivered through the shadcn-svelte registry." />
</svelte:head>

<div class="home-page">
	<section class="home-hero">
		<div class="hero-copy">
			<p class="eyebrow"><span></span>Svelte 5 · registry-first</p>
			<h1>Interfaces with<br /><em>more character.</em></h1>
			<p class="lede">The expressive visual language of Vuesax, rebuilt with Svelte 5 runes, snippets, accessibility, and components you own.</p>
			<div class="hero-actions"><a class="home-button primary" href="/components/button">Explore components <span aria-hidden="true">→</span></a><a class="home-button" href="#installation">Install Resax</a></div>
			<ul class="hero-facts" aria-label="Library facts"><li><strong>{componentCount}</strong><span>component showcases</span></li><li><strong>57</strong><span>Vuesax families covered</span></li><li><strong>62</strong><span>registry items</span></li></ul>
		</div>
		<div class="hero-stage" aria-label="Resax visual preview">
			<div class="stage-grid"></div><span class="stage-orb one"></span><span class="stage-orb two"></span>
			<div class="stage-window"><div class="stage-bar"><i></i><i></i><i></i><span>resax / components</span></div><div class="stage-content"><div class="stage-label">Build something vivid</div><div class="stage-title">Svelte components<br />that feel alive.</div><div class="stage-pills"><span>Accessible</span><span>Themeable</span><span>Source-owned</span></div><div class="stage-action">Start building <b>→</b></div></div></div>
		</div>
	</section>

	<section class="home-section" id="components">
		<div class="section-heading"><div><p class="eyebrow">Components</p><h2>A system, not a uniform.</h2></div><p>Every component shares dependable foundations while keeping the distinctive motion and visual freedom that made Vuesax memorable.</p></div>
		<div class="featured-grid">
			{#each featured as item, index}
				<a class="feature-card feature-{index + 1}" href={`/components/${item.slug}`}>
					<div class="feature-preview"><span>{item.mark}</span></div>
					<div class="feature-copy"><div><strong>{item.name}</strong><small>{item.note}</small></div><span aria-hidden="true">↗</span></div>
				</a>
			{/each}
		</div>
		<div class="category-grid">
			{#each nav as group}
				<section><span>{String(group.items.filter((item) => item.built).length).padStart(2, '0')}</span><h3>{group.category}</h3><p>{group.items.filter((item) => item.built).slice(0, 4).map((item) => item.name).join(', ')}</p><a href={`/components/${group.items.find((item) => item.built)?.slug}`}>Browse <span aria-hidden="true">→</span></a></section>
			{/each}
		</div>
	</section>

	<section class="install-section" id="installation">
		<div class="install-copy"><p class="eyebrow">Registry install</p><h2>Copy the source.<br />Keep the control.</h2><p>Resax is distributed exclusively through the shadcn-svelte registry. Install only what you need; dependencies, theme tokens, and official primitives follow automatically.</p><ol><li><span>1</span><div><strong>Install the theme</strong><small>Add the shared <code>--rx-*</code> token layer once.</small></div></li><li><span>2</span><div><strong>Add a component</strong><small>The CLI resolves local and official dependencies.</small></div></li><li><span>3</span><div><strong>Make it yours</strong><small>The Svelte source lives inside your app.</small></div></li></ol></div>
		<div class="install-panel"><div class="terminal-head"><span></span><span></span><span></span><small>Terminal</small></div><div class="terminal-body"><p><span>$</span> Install the shared theme</p><code>npx shadcn-svelte@latest add<br />http://localhost:5173/r/theme.json</code><p><span>$</span> Add any component</p><div class="copy-row"><code>{install}</code><button type="button" onclick={copy} aria-label="Copy button install command">{copied ? 'Copied' : 'Copy'}</button></div></div></div>
	</section>

	<section class="theme-section">
		<div><p class="eyebrow">Theme layer</p><h2>One accent.<br />Every expression.</h2><p>Semantic RGB tokens power states, depth, glow, and runtime color props across light and dark surfaces.</p><a href="/components/button">See color variants <span aria-hidden="true">→</span></a></div>
		<div class="theme-preview"><div class="theme-surface light"><span>Light</span><strong>Primary action</strong><i></i><i></i><i></i></div><div class="theme-surface dark"><span>Dark</span><strong>Primary action</strong><i></i><i></i><i></i></div></div>
	</section>

	<section class="home-cta"><p>Ready to make Svelte feel different?</p><h2>Start with one component.</h2><a class="home-button primary" href="/components/button">Browse all components <span aria-hidden="true">→</span></a></section>
</div>
