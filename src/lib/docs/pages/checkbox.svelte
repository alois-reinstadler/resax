<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Checkbox } from '$lib/registry/ui/checkbox';
	let bound = $state(false);
	let indeterminate = $state(true);
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Checkbox</h1><p>Animated, accessible selections with indeterminate and line-through treatments.</p></div>
<DemoSection title="Colors and sizes" source={'<Checkbox color="success">Enabled</Checkbox>'}>
	<div class="toggle-demo-row" data-demo-section="colors-sizes"><Checkbox checked size="lg">Large primary</Checkbox><Checkbox checked color="success">Success</Checkbox><Checkbox checked color="danger" size="sm">Small danger</Checkbox></div>
</DemoSection>
<DemoSection title="States" source={'<Checkbox bind:indeterminate>Partial</Checkbox>'}>
	<div class="toggle-demo-row" data-demo-section="states"><Checkbox bind:checked={bound}>Bound: {bound ? 'on' : 'off'}</Checkbox><Checkbox bind:indeterminate>Indeterminate</Checkbox><Checkbox disabled>Disabled</Checkbox></div>
</DemoSection>
<DemoSection title="Line through" source={'<Checkbox lineThrough checked>Completed task</Checkbox>'}>
	<Checkbox lineThrough checked color="success">Completed task</Checkbox>
</DemoSection>
