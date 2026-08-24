<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Spacer } from '$lib/registry/ui/spacer';
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Spacer</h1><p>Resax visual primitive with theme-token styling.</p></div>

<DemoSection title="Fixed and flexible spacing" source={'<Spacer width="2rem" />'}><div class="spacer-demo"><span>Fixed</span><Spacer width="3rem" height="1rem" /><span>gap</span></div><div class="spacer-demo"><span>Flexible</span><Spacer grow /><span>edge</span></div></DemoSection>

<style>
	.spacer-demo { display: flex; align-items: center; gap: 1.5rem; width: 100%; }
	.spacer-demo { padding: .75rem; border: 1px solid rgb(var(--rx-gray)); border-radius: var(--rx-radius); }
</style>
