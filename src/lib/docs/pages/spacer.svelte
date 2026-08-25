<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Spacer } from '$lib/registry/ui/spacer';
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Spacer</h1><p>An invisible elastic flex item by default; a size turns it into an exact fixed spacer.</p></div>

<DemoSection title="Fixed and flexible spacing" source={'<Spacer size="lg" />'}><div class="spacer-demo"><span>Fixed</span><Spacer size="lg" /><span>24px gap</span></div><div class="spacer-demo"><span>Elastic</span><Spacer flex={1} /><span>edge</span></div></DemoSection><DemoSection title="Playground visualization"><Spacer size="xl" demo /></DemoSection>

<style>
	.spacer-demo { display: flex; align-items: center; gap: 1.5rem; width: 100%; }
	.spacer-demo { padding: .75rem; border: 1px solid rgb(var(--rx-gray)); border-radius: var(--rx-radius); }
</style>
