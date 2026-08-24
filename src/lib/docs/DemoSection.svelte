<script lang="ts">
	import type { Snippet } from 'svelte';
	let { title, children, source = '// Component source will land in Phase 1.' }: { title: string; children: Snippet; source?: string } = $props();
</script>

<section class="demo-section">
	<h2>{title}</h2>
	<div class="demo-frame">{@render children()}</div>
	<details><summary>View source</summary><pre><code>{source}</code></pre></details>
</section>
