<script lang="ts">
	import { User } from '@lucide/svelte';
	import DemoSection from '../DemoSection.svelte';
	import { Avatar, AvatarGroup } from '$lib/registry/ui/avatar';
	const portrait = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23195bff"/%3E%3Ccircle cx="50" cy="38" r="20" fill="%23f4f7f8"/%3E%3Cpath d="M16 100c2-27 18-40 34-40s32 13 34 40" fill="%23f4f7f8"/%3E%3C/svg%3E';
	const variants = ['base','glow','ring','squircle','status','tilt'] as const;
	const groupVariants = ['base','fan','flip','grid','ring','wave'] as const;
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Avatar</h1><p>Images, resilient fallbacks, presence badges, story rings, and overlapping groups.</p></div>
<DemoSection title="Sizes" source={'<Avatar size="lg" fallback="RX" />'}><div class="demo-row" data-demo-section="avatar-sizes"><Avatar src={portrait} alt="Resax user" size="xl" /><Avatar fallback="LG" size="lg" color="success" /><Avatar fallback="RX" /><Avatar fallback="SM" size="sm" color="warn" /><Avatar fallback="MI" size="mini" color="danger" /></div></DemoSection>
<DemoSection title="Shapes and fallbacks"><div class="demo-row" data-demo-section="avatar-fallbacks"><Avatar src={portrait} alt="Circle portrait" /><Avatar fallback="SQ" shape="square" /><Avatar fallback="RD" shape="rounded" color="warn" /><Avatar src="data:image/png;base64,AA==" fallback="BF" alt="Broken image fallback" /> <Avatar alt="Icon fallback">{#snippet icon()}<User size={20} />{/snippet}</Avatar></div></DemoSection>
<DemoSection title="Badges and history"><div class="demo-row" data-demo-section="avatar-badges"><Avatar src={portrait} badge history color="primary" /><Avatar fallback="KT" badge={7} badgeColor="success" history color="danger" /><Avatar fallback="99" badge="new" color="warn" /><Avatar fallback="…" loading /></div></DemoSection>
<DemoSection title="Source variants" source={'<Avatar variant="tilt" fallback="RX" />'}><div class="variant-grid" data-demo-section="avatar-source-variants">{#each variants as variant}<div class="variant-item"><Avatar {variant} src={portrait} alt={`${variant} avatar`} color={variant==='status'?'success':'primary'} /><code>{variant}</code></div>{/each}</div></DemoSection>
<DemoSection title="Group overflow" source={'<AvatarGroup max={3}>…</AvatarGroup>'}><div data-demo-section="avatar-group"><AvatarGroup max={3} float>{#each ['AB', 'CD', 'EF', 'GH', 'IJ'] as initials}<Avatar fallback={initials} alt={`Profile ${initials}`} color="primary" />{/each}</AvatarGroup><p>Activate +2 to open the source-style fixed menu; Escape closes it and restores focus.</p></div></DemoSection>
<DemoSection title="Source group variants"><div class="group-stack" data-demo-section="avatar-group-variants">{#each groupVariants as variant}<div class="group-sample"><code>{variant}</code><AvatarGroup {variant} max={4}>{#each ['AB','CD','EF','GH'] as initials}<Avatar fallback={initials} color="primary" />{/each}</AvatarGroup></div>{/each}</div></DemoSection>
<style>.demo-row,.variant-grid{display:flex;align-items:center;flex-wrap:wrap;gap:1.25rem;width:100%}.variant-item{display:grid;justify-items:center;gap:.65rem;padding:1rem}.group-stack{display:grid;gap:2rem;width:100%}.group-sample{display:grid;grid-template-columns:5rem 1fr;align-items:center;min-height:6rem}</style>
