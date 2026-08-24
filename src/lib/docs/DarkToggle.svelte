<script lang="ts">
	let dark = $state(false);

	$effect(() => {
		dark = document.documentElement.classList.contains('dark');
	});

	function toggle() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('resax-mode', dark ? 'dark' : 'light');
	}
</script>

<button class="theme-toggle" type="button" onclick={toggle} aria-label="Toggle dark mode" aria-pressed={dark}>
	{#if dark}
		<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path></svg>
		<span>Light</span>
	{:else}
		<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.1A8.5 8.5 0 0 1 8.9 3.5 8.5 8.5 0 1 0 20.5 15.1Z"></path></svg>
		<span>Dark</span>
	{/if}
</button>
