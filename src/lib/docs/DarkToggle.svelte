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
	{dark ? 'Light' : 'Dark'} mode
</button>
