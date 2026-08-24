<script lang="ts">
	import Alert from './alert.svelte';
	let { onClose = () => {} }: { onClose?: () => void } = $props();
	let open = $state(true);
</script>
<Alert bind:open closable {onClose} title="Notice">Message</Alert>
<output aria-label="open state">{String(open)}</output>
