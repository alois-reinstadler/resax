<script lang="ts">
	import { nav } from '$lib/docs/nav';
	import { base } from '$app/paths';
	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | undefined;
	const componentCount = nav.reduce((total, group) => total + group.items.filter((item) => item.built).length, 0);
	const registryBase = 'https://alois-reinstadler.github.io/resax/r';
	const install = `npx shadcn-svelte@latest add ${registryBase}/button.json`;
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
			<div class="hero-actions"><a class="home-button primary" href={`${base}/components/button`}>Explore components <span aria-hidden="true">→</span></a><a class="home-button" href="#installation">Install Resax</a></div>
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
				<a class="feature-card feature-{index + 1}" href={`${base}/components/${item.slug}`}>
					<div class="feature-preview"><span>{item.mark}</span></div>
					<div class="feature-copy"><div><strong>{item.name}</strong><small>{item.note}</small></div><span aria-hidden="true">↗</span></div>
				</a>
			{/each}
		</div>
		<div class="category-grid">
			{#each nav as group}
				<section><span>{String(group.items.filter((item) => item.built).length).padStart(2, '0')}</span><h3>{group.category}</h3><p>{group.items.filter((item) => item.built).slice(0, 4).map((item) => item.name).join(', ')}</p><a href={`${base}/components/${group.items.find((item) => item.built)?.slug}`}>Browse <span aria-hidden="true">→</span></a></section>
			{/each}
		</div>
	</section>

	<section class="install-section" id="installation">
		<div class="install-copy"><p class="eyebrow">Registry install</p><h2>Copy the source.<br />Keep the control.</h2><p>Resax is distributed exclusively through the shadcn-svelte registry. Install only what you need; dependencies, theme tokens, and official primitives follow automatically.</p><ol><li><span>1</span><div><strong>Install the theme</strong><small>Add the shared <code>--rx-*</code> token layer once.</small></div></li><li><span>2</span><div><strong>Add a component</strong><small>The CLI resolves local and official dependencies.</small></div></li><li><span>3</span><div><strong>Make it yours</strong><small>The Svelte source lives inside your app.</small></div></li></ol></div>
		<div class="install-panel"><div class="terminal-head"><span></span><span></span><span></span><small>Terminal</small></div><div class="terminal-body"><p><span>$</span> Install the shared theme</p><code>npx shadcn-svelte@latest add<br />{registryBase}/theme.json</code><p><span>$</span> Add any component</p><div class="copy-row"><code>{install}</code><button type="button" onclick={copy} aria-label="Copy button install command">{copied ? 'Copied' : 'Copy'}</button></div></div></div>
	</section>

	<section class="theme-section">
		<div><p class="eyebrow">Theme layer</p><h2>One accent.<br />Every expression.</h2><p>Semantic RGB tokens power states, depth, glow, and runtime color props across light and dark surfaces.</p><a href={`${base}/components/button`}>See color variants <span aria-hidden="true">→</span></a></div>
		<div class="theme-preview"><div class="theme-surface light"><span>Light</span><strong>Primary action</strong><i></i><i></i><i></i></div><div class="theme-surface dark"><span>Dark</span><strong>Primary action</strong><i></i><i></i><i></i></div></div>
	</section>

	<section class="home-cta"><p>Ready to make Svelte feel different?</p><h2>Start with one component.</h2><a class="home-button primary" href={`${base}/components/button`}>Browse all components <span aria-hidden="true">→</span></a></section>
</div>

<style>
	.home-page { --home-line: rgb(var(--rx-border)); width: min(100%, 1180px); margin: 0 auto; color: rgb(var(--rx-text)); }
	.home-hero { display: grid; grid-template-columns: minmax(0, .86fr) minmax(360px, 1.14fr); align-items: center; gap: clamp(36px, 6vw, 76px); min-height: min(680px, calc(100dvh - 130px)); padding: 28px 0 56px; }
	.eyebrow { display: flex; align-items: center; gap: 9px; margin: 0 0 14px; color: rgb(var(--rx-text-secondary)); font-size: 10px; font-weight: 600; letter-spacing: .09em; text-transform: uppercase; }
	.eyebrow > span { width: 18px; height: 1px; background: rgb(var(--rx-primary)); }
	.home-hero h1 { margin: 0; color: rgb(var(--rx-text)); font-size: clamp(52px, 6vw, 82px); font-weight: 650; letter-spacing: -.065em; line-height: .92; }
	.home-hero h1 em { color: rgb(var(--rx-primary)); font-style: normal; }
	.lede { max-width: 560px; margin: 24px 0 0; color: rgb(var(--rx-text-secondary)); font-size: 14px; line-height: 1.7; }
	.hero-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
	.home-button { display: inline-flex; min-height: 40px; align-items: center; justify-content: center; gap: 24px; box-sizing: border-box; border: 1px solid rgb(var(--rx-border)); border-radius: var(--rx-control-r-md); padding: 0 14px; color: rgb(var(--rx-text)); background: rgb(var(--rx-surface)); font-size: 12px; font-weight: 600; text-decoration: none; transition: border-color 200ms var(--rx-ease-out), background 200ms var(--rx-ease-out), transform 240ms var(--rx-ease-spring), box-shadow 240ms var(--rx-ease-out); }
	.home-button:hover { border-color: rgb(var(--rx-border-hover)); background: rgb(var(--rx-surface-2)); transform: translateY(-2px); }
	.home-button.primary { border-color: transparent; color: rgb(var(--rx-primary-contrast-rgb)); background: rgb(var(--rx-primary)); box-shadow: 0 14px 32px -16px rgb(var(--rx-primary) / .8); }
	.hero-facts { display: flex; gap: 26px; margin: 34px 0 0; padding: 20px 0 0; border-top: 1px solid var(--home-line); list-style: none; }
	.hero-facts li { display: grid; gap: 3px; }
	.hero-facts strong { font-size: 13px; font-weight: 600; }
	.hero-facts span { color: rgb(var(--rx-text-secondary)); font-size: 10px; }
	.hero-stage { position: relative; min-height: 500px; overflow: hidden; border: 1px dashed rgb(var(--rx-border-strong)); border-radius: 14px; background: rgb(var(--rx-background)); box-shadow: inset 0 0 150px rgb(0 0 0 / .42); isolation: isolate; }
	.stage-grid { position: absolute; inset: 0; opacity: .45; background-image: linear-gradient(rgb(var(--rx-text) / .025) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--rx-text) / .025) 1px, transparent 1px); background-size: 32px 32px; mask-image: linear-gradient(to bottom, black, transparent 90%); }
	.stage-orb { position: absolute; border-radius: 50%; filter: blur(16px); }
	.stage-orb.one { top: -24%; right: -18%; width: 62%; aspect-ratio: 1; background: radial-gradient(circle, rgb(var(--rx-primary) / .55), rgb(var(--rx-primary) / 0) 68%); }
	.stage-orb.two { bottom: -28%; left: -20%; width: 70%; aspect-ratio: 1; background: radial-gradient(circle, rgb(var(--rx-ai-cyan) / .28), rgb(var(--rx-ai-cyan) / 0) 68%); }
	.stage-window { position: absolute; inset: 56px 38px; overflow: hidden; border: 1px solid rgb(var(--rx-border)); border-radius: 20px; color: rgb(var(--rx-text)); background: rgb(var(--rx-surface) / .88); box-shadow: var(--rx-shadow); backdrop-filter: blur(18px); transform: rotate(1.25deg); transition: transform 480ms var(--rx-ease-spring); }
	.hero-stage:hover .stage-window { transform: rotate(0deg) translateY(-4px); }
	.stage-bar { display: flex; height: 42px; align-items: center; gap: 6px; border-bottom: 1px solid rgb(var(--rx-border)); padding: 0 14px; }
	.stage-bar i { width: 7px; height: 7px; border-radius: 50%; background: rgb(var(--rx-text-muted)); }
	.stage-bar i:first-child { background: rgb(var(--rx-danger)); } .stage-bar i:nth-child(2) { background: rgb(var(--rx-warn)); } .stage-bar i:nth-child(3) { background: rgb(var(--rx-success)); }
	.stage-bar span { margin-left: auto; color: rgb(var(--rx-text-secondary)); font: 10px ui-monospace, monospace; }
	.stage-content { display: flex; height: calc(100% - 42px); flex-direction: column; align-items: flex-start; justify-content: center; box-sizing: border-box; padding: clamp(24px, 5vw, 50px); }
	.stage-label { color: rgb(var(--rx-ai-cyan)); font: 600 10px ui-monospace, monospace; letter-spacing: .08em; text-transform: uppercase; }
	.stage-title { margin-top: 14px; font-size: clamp(30px, 4vw, 48px); font-weight: 600; letter-spacing: -.05em; line-height: .95; }
	.stage-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 20px; }
	.stage-pills span { border: 1px solid rgb(var(--rx-border)); border-radius: 999px; padding: 6px 9px; color: rgb(var(--rx-text-secondary)); background: rgb(var(--rx-background) / .4); font-size: 10px; }
	.stage-action { margin-top: 26px; border-radius: var(--rx-control-r-md); padding: 10px 12px; color: rgb(var(--rx-primary-contrast-rgb)); background: rgb(var(--rx-primary)); font-size: 11px; font-weight: 650; }
	.stage-action b { margin-left: 24px; }
	.home-section, .install-section, .theme-section { padding: 76px 0; border-top: 1px solid var(--home-line); }
	.section-heading { display: grid; grid-template-columns: 1fr minmax(280px, .62fr); align-items: end; gap: 42px; margin-bottom: 28px; }
	.section-heading h2, .install-copy h2, .theme-section h2, .home-cta h2 { margin: 0; font-size: clamp(36px, 5vw, 58px); font-weight: 600; letter-spacing: -.055em; line-height: .96; }
	.section-heading > p, .install-copy > p, .theme-section > div > p { margin: 0; color: rgb(var(--rx-text-secondary)); font-size: 13px; line-height: 1.7; }
	.featured-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
	.feature-card { overflow: hidden; border: 1px solid var(--home-line); border-radius: 20px; color: inherit; background: rgb(var(--rx-surface)); box-shadow: var(--rx-shadow-float); text-decoration: none; transition: border-color 200ms var(--rx-ease-out), transform 260ms var(--rx-ease-spring); }
	.feature-card:hover { border-color: rgb(var(--rx-border-hover)); transform: translateY(-4px); }
	.feature-preview { display: grid; min-height: 190px; place-items: center; border-bottom: 1px solid var(--home-line); background: radial-gradient(circle at 50% 45%, rgb(var(--rx-primary) / .16), transparent 48%), rgb(var(--rx-background)); }
	.feature-preview > span { border: 1px solid rgb(var(--rx-border)); border-radius: var(--rx-control-r-md); padding: 11px 14px; color: rgb(var(--rx-text)); background: rgb(var(--rx-surface)); box-shadow: var(--rx-shadow-float); font: 600 11px ui-monospace, monospace; white-space: pre; }
	.feature-1 .feature-preview > span, .feature-4 .feature-preview > span { border-color: transparent; color: rgb(var(--rx-primary-contrast-rgb)); background: rgb(var(--rx-primary)); }
	.feature-copy { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 15px 17px; }
	.feature-copy > div { display: grid; gap: 4px; } .feature-copy strong { font-size: 13px; font-weight: 600; } .feature-copy small { color: rgb(var(--rx-text-secondary)); font-size: 10px; line-height: 1.45; } .feature-copy > span { color: rgb(var(--rx-text-secondary)); }
	.category-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 42px; border-top: 1px solid var(--home-line); border-left: 1px solid var(--home-line); }
	.category-grid section { min-height: 150px; border-right: 1px solid var(--home-line); border-bottom: 1px solid var(--home-line); padding: 18px; }
	.category-grid section > span { color: rgb(var(--rx-primary)); font: 600 10px ui-monospace, monospace; } .category-grid h3 { margin: 24px 0 7px; font-size: 13px; font-weight: 600; } .category-grid p { min-height: 36px; margin: 0; color: rgb(var(--rx-text-secondary)); font-size: 10px; line-height: 1.55; }
	.category-grid a, .theme-section a { display: inline-flex; gap: 14px; margin-top: 12px; color: rgb(var(--rx-text-secondary)); font-size: 11px; font-weight: 600; text-decoration: none; } .category-grid a:hover, .theme-section a:hover { color: rgb(var(--rx-primary)); }
	.install-section { display: grid; grid-template-columns: minmax(0, .8fr) minmax(360px, 1.2fr); align-items: center; gap: clamp(44px, 8vw, 90px); }
	.install-copy > p { max-width: 460px; margin-top: 20px; }
	.install-copy ol { display: grid; gap: 12px; margin: 26px 0 0; padding: 0; list-style: none; } .install-copy li { display: flex; align-items: center; gap: 11px; } .install-copy li > span { display: grid; width: 27px; height: 27px; place-items: center; border: 1px solid var(--home-line); border-radius: 50%; color: rgb(var(--rx-primary)); font: 600 10px ui-monospace, monospace; } .install-copy li div { display: grid; gap: 2px; } .install-copy li strong { font-size: 12px; font-weight: 600; } .install-copy li small { color: rgb(var(--rx-text-secondary)); font-size: 10px; }
	.install-panel { overflow: hidden; border: 1px solid rgb(var(--rx-border)); border-radius: 20px; color: rgb(var(--rx-text)); background: rgb(var(--rx-surface)); box-shadow: var(--rx-shadow); }
	.terminal-head { display: flex; height: 42px; align-items: center; gap: 6px; border-bottom: 1px solid rgb(var(--rx-border)); padding: 0 14px; } .terminal-head > span { width: 7px; height: 7px; border-radius: 50%; background: rgb(var(--rx-text-muted)); } .terminal-head small { margin-left: auto; color: rgb(var(--rx-text-secondary)); font: 10px ui-monospace, monospace; }
	.terminal-body { display: grid; gap: 12px; padding: 24px; } .terminal-body p { margin: 12px 0 0; color: rgb(var(--rx-text-secondary)); font: 10px ui-monospace, monospace; } .terminal-body p span { color: rgb(var(--rx-ai-cyan)); } .terminal-body > code { overflow-wrap: anywhere; color: rgb(var(--rx-text-secondary)); font: 11px/1.8 ui-monospace, monospace; }
	.copy-row { display: flex; align-items: center; gap: 12px; border: 1px solid rgb(var(--rx-border)); border-radius: var(--rx-control-r-md); padding: 10px; background: rgb(var(--rx-background)); } .copy-row code { min-width: 0; flex: 1; overflow: hidden; color: rgb(var(--rx-text-secondary)); font: 10px ui-monospace, monospace; text-overflow: ellipsis; white-space: nowrap; } .copy-row button { border: 0; border-radius: 8px; padding: 7px 9px; color: rgb(var(--rx-primary-contrast-rgb)); background: rgb(var(--rx-primary)); font-size: 10px; font-weight: 650; cursor: pointer; }
	.theme-section { display: grid; grid-template-columns: minmax(280px, .7fr) minmax(400px, 1.3fr); align-items: center; gap: clamp(44px, 8vw, 90px); } .theme-section > div > p { max-width: 420px; margin-top: 20px; } .theme-preview { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; transform: rotate(-1deg); }
	.theme-surface { position: relative; display: flex; min-height: 280px; flex-direction: column; align-items: flex-start; justify-content: flex-end; overflow: hidden; border: 1px solid rgb(var(--rx-border)); border-radius: 20px; padding: 18px; } .theme-surface.light { color: #171717; background: #fff; } .theme-surface.dark { color: #ededed; background: #000; } .theme-surface > span { position: absolute; top: 16px; left: 16px; opacity: .5; font: 600 10px ui-monospace, monospace; } .theme-surface > strong { position: relative; z-index: 2; border-radius: var(--rx-control-r-md); padding: 10px 12px; color: rgb(var(--rx-primary-contrast-rgb)); background: rgb(var(--rx-primary)); font-size: 10px; } .theme-surface i { position: absolute; border-radius: 50%; background: rgb(var(--rx-primary)); } .theme-surface i:nth-of-type(1) { top: 20%; left: 15%; width: 72px; height: 72px; opacity: .12; } .theme-surface i:nth-of-type(2) { top: 38%; right: 12%; width: 110px; height: 110px; opacity: .2; } .theme-surface i:nth-of-type(3) { bottom: -15%; left: 25%; width: 145px; height: 145px; opacity: .12; }
	.home-cta { display: flex; flex-direction: column; align-items: center; padding: 84px 16px 28px; border-top: 1px solid var(--home-line); text-align: center; } .home-cta p { margin: 0 0 12px; color: rgb(var(--rx-text-secondary)); font-size: 11px; } .home-cta h2 { margin-bottom: 24px; }

	@media (max-width: 1360px) { .home-hero { grid-template-columns: 1fr; } .hero-stage { min-height: 480px; } .category-grid { grid-template-columns: repeat(2, 1fr); } .install-section, .theme-section { grid-template-columns: 1fr; } }
	@media (max-width: 620px) { .home-hero { min-height: 0; padding-top: 10px; } .home-hero h1 { font-size: clamp(46px, 15vw, 68px); } .hero-stage { min-height: 420px; } .stage-window { inset: 36px 14px; transform: none; } .section-heading { grid-template-columns: 1fr; gap: 14px; } .featured-grid { grid-template-columns: 1fr; } .category-grid { grid-template-columns: 1fr 1fr; } .theme-preview { gap: 6px; } .theme-surface { min-height: 210px; padding: 12px; } }
	@media (max-width: 430px) { .hero-actions { display: grid; } .home-button { width: 100%; } .hero-facts li:last-child { display: none; } .category-grid, .theme-preview { grid-template-columns: 1fr; } }
	@media (prefers-reduced-motion: reduce) { .home-button, .stage-window, .feature-card { transition: none; } }
</style>
