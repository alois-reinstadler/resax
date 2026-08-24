<script lang="ts">
	import { User } from '@lucide/svelte';
	import DemoSection from '../DemoSection.svelte';
	import { Avatar, AvatarGroup } from '$lib/registry/ui/avatar';
	const portrait = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23195bff"/%3E%3Ccircle cx="50" cy="38" r="20" fill="%23f4f7f8"/%3E%3Cpath d="M16 100c2-27 18-40 34-40s32 13 34 40" fill="%23f4f7f8"/%3E%3C/svg%3E';
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Avatar</h1><p>Images, resilient fallbacks, presence badges, story rings, and overlapping groups.</p></div>
<DemoSection title="Sizes" source={'<Avatar size="lg" fallback="RX" />'}><div class="demo-row" data-demo-section="avatar-sizes"><Avatar src={portrait} alt="Resax user" size="xl" /><Avatar fallback="LG" size="lg" color="success" /><Avatar fallback="RX" /><Avatar fallback="SM" size="sm" color="warn" /><Avatar fallback="MI" size="mini" color="danger" /></div></DemoSection>
<DemoSection title="Shapes and fallbacks"><div class="demo-row" data-demo-section="avatar-fallbacks"><Avatar src={portrait} alt="Circle portrait" /><Avatar fallback="SQ" shape="square" /><Avatar fallback="RD" shape="rounded" color="warn" /><Avatar src="/broken-avatar.png" fallback="BF" alt="Broken image fallback" /> <Avatar alt="Icon fallback">{#snippet icon()}<User size={20} />{/snippet}</Avatar></div></DemoSection>
<DemoSection title="Badges and history"><div class="demo-row" data-demo-section="avatar-badges"><Avatar src={portrait} badge history color="primary" /><Avatar fallback="KT" badge={7} badgeColor="success" history color="danger" /><Avatar fallback="99" badge="new" color="warn" /><Avatar fallback="…" loading /></div></DemoSection>
<DemoSection title="Group overflow" source={'<AvatarGroup max={3}>…</AvatarGroup>'}><div data-demo-section="avatar-group"><AvatarGroup max={3} float>{#each ['AB', 'CD', 'EF', 'GH', 'IJ'] as initials}<Avatar fallback={initials} color="primary" />{/each}</AvatarGroup></div></DemoSection>
<style>.demo-row { display: flex; align-items: center; flex-wrap: wrap; gap: 1.25rem; width: 100%; }</style>
