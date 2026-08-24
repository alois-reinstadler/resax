<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Tooltip } from '$lib/registry/ui/tooltip';
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Tooltip</h1><p>Focus- and hover-accessible hints with Vuesax surface styles.</p></div>
<DemoSection title="Variants and placement" source={'<Tooltip content="Helpful detail">...</Tooltip>'}>
	<div class="demo-row">
		<Tooltip content="A compact default tooltip">Default</Tooltip>
		<Tooltip content="Outlined information" variant="border" color="primary" side="bottom">Border</Tooltip>
		<Tooltip content="Elevated success hint" variant="shadow" color="success" side="right">Shadow</Tooltip>
	</div>
</DemoSection>
<style>.demo-row { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; }</style>
