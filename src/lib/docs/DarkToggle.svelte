<script lang="ts">
	let dark = $state(true);

	$effect(() => {
		dark = document.documentElement.classList.contains('dark');
	});

	function toggle() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		document.documentElement.dataset.theme = dark ? 'dark' : 'light';
		document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
		localStorage.setItem('resax-mode', dark ? 'dark' : 'light');
	}
</script>

<button class="theme-toggle" type="button" onclick={toggle} aria-label={`Use ${dark ? 'light' : 'dark'} theme`} aria-pressed={dark} title={`Use ${dark ? 'light' : 'dark'} theme`}>
	{#if dark}
		<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path></svg>
	{:else}
		<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.1A8.5 8.5 0 0 1 8.9 3.5 8.5 8.5 0 1 0 20.5 15.1Z"></path></svg>
	{/if}
</button>

<style>
	.theme-toggle { display: inline-flex; width: 32px; height: 32px; flex: none; align-items: center; justify-content: center; border: 1px solid rgb(var(--rx-border)); border-radius: var(--rx-control-r-sm); padding: 0; color: rgb(var(--rx-text-secondary)); background: rgb(var(--rx-background) / .6); cursor: pointer; backdrop-filter: blur(8px); transition: color 160ms ease, background 160ms ease, transform 240ms var(--rx-ease-spring); }
	.theme-toggle:hover { color: rgb(var(--rx-text)); background: rgb(var(--rx-surface-2)); }
	.theme-toggle:active { transform: scale(.94); }
	.theme-toggle:focus-visible { outline: 2px solid rgb(var(--rx-primary)); outline-offset: 1px; }
	.theme-toggle svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
	@media (prefers-reduced-motion: reduce) { .theme-toggle { transition: none; } }
	@media (forced-colors: active) { .theme-toggle { border: 1px solid CanvasText; } }
</style>
