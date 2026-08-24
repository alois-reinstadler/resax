<script lang="ts">
	import { ripple } from '$lib/registry/attachments/ripple';
	const colors = ['primary', 'success', 'danger', 'warn', 'dark', 'light', 'background', 'text'];
</script>

<svelte:head><title>Token kitchen sink — Resax</title></svelte:head>
<div class="page-heading">
	<p class="eyebrow">Kitchen sink</p>
	<h1>Token palette</h1>
	<p>Toggle dark mode to verify the adaptive tokens. Press the button to verify the ripple attachment.</p>
</div>
<div class="swatch-grid">
	{#each colors as color}
		<article class="swatch-card">
			<div class="swatch" style={`background: rgb(var(--rx-${color}))`}></div>
			<strong>--rx-{color}</strong>
		</article>
	{/each}
</div>
<button class="ripple-demo bg-rx-primary" type="button" {@attach ripple()}>Press for ripple</button>
