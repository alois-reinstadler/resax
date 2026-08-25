<script lang="ts">
	import { useSidebar } from '$lib/components/ui/sidebar/context.svelte.js';
	import { untrack } from 'svelte';

	let { open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void } = $props();
	const sidebar = useSidebar();
	const originalSetOpenMobile = sidebar.setOpenMobile;
	const originalToggle = sidebar.toggle;

	function setOpenMobile(value: boolean) {
		originalSetOpenMobile(value);
		onOpenChange(value);
	}

	function toggle() {
		if (!sidebar.isMobile) return originalToggle();
		const next = !sidebar.openMobile;
		originalSetOpenMobile(next);
		onOpenChange(next);
		return next;
	}

	sidebar.setOpenMobile = setOpenMobile;
	sidebar.toggle = toggle;
	const initialOpen = untrack(() => open);
	if (sidebar.isMobile && sidebar.openMobile !== initialOpen) originalSetOpenMobile(initialOpen);

	$effect(() => {
		if (sidebar.isMobile && sidebar.openMobile !== open) originalSetOpenMobile(open);
	});

	$effect(() => () => {
		if (sidebar.setOpenMobile === setOpenMobile) sidebar.setOpenMobile = originalSetOpenMobile;
		if (sidebar.toggle === toggle) sidebar.toggle = originalToggle;
	});
</script>
