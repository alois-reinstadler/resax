<script lang="ts">
	import { Button, type ButtonProps } from './index';
	let { href, loading = false, disabled = false, color, variant = 'default', size = 'default', reach, stiffness, damping, lag, gooStrength, squash, filaments, droplets, gravity, drag, sag, thickness, speed, chaos, prism, blur }:
		{ href?: string; loading?: boolean; disabled?: boolean; color?: string; variant?: ButtonProps['variant']; size?: 'default' | 'sm'; reach?:number;stiffness?:number;damping?:number;lag?:number;gooStrength?:number;squash?:number;filaments?:0|1|2;droplets?:0|1|2|3|4;gravity?:number;drag?:number;sag?:number;thickness?:number;speed?:number;chaos?:number;prism?:number;blur?:number } = $props();
	let clicks = $state(0);
</script>

<Button {href} {loading} {disabled} {color} {variant} {size} {reach} {stiffness} {damping} {lag} {gooStrength} {squash} {filaments} {droplets} {gravity} {drag} {sag} {thickness} {speed} {chaos} {prism} {blur} onclick={() => clicks++}>Press me</Button>
<output aria-label="click count">{clicks}</output>
