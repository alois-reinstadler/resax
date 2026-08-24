<script lang="ts">
	import { Button } from './index';
	let { href, loading = false, disabled = false, color, variant = 'default', size = 'default' }:
		{ href?: string; loading?: boolean; disabled?: boolean; color?: string; variant?: 'default' | 'flat'; size?: 'default' | 'sm' } = $props();
	let clicks = $state(0);
</script>

<Button {href} {loading} {disabled} {color} {variant} {size} onclick={() => clicks++}>Press me</Button>
<output aria-label="click count">{clicks}</output>
