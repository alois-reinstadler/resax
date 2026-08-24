<script lang="ts" module>
	import type { Snippet } from 'svelte'; import type { RxColor } from '$lib/registry/lib/color';
	export interface SlideConfirmProps { confirmed?:boolean;color?:RxColor;label?:string;confirmedLabel?:string;threshold?:number;disabled?:boolean;loading?:boolean;resettable?:boolean;icon?:Snippet;confirmedIcon?:Snippet;onConfirm?:()=>void;onConfirmedChange?:(confirmed:boolean)=>void; }
</script>
<script lang="ts">
	import {styleColor} from '$lib/registry/lib/color'; import {RX_DURATION,RX_EASE} from '$lib/registry/lib/easing';
	let {confirmed=$bindable(false),color,label='Slide to confirm',confirmedLabel='Confirmed',threshold=.85,disabled=false,loading=false,resettable=false,icon,confirmedIcon,onConfirm,onConfirmedChange}:SlideConfirmProps=$props();
	let root:HTMLElement;let thumb:HTMLButtonElement;let progress=$state(confirmed?1:0);let dragging=$state(false);let pointerId:number|undefined;let start=0;let travel=$state(0);let rtl=$state(false);
	const inactive=$derived(disabled||loading);const valueText=$derived(confirmed?confirmedLabel:`${Math.round(progress*100)}% — ${label}`);
	function measure(){if(!root||!thumb)return;const rr=root.getBoundingClientRect(),tr=thumb.getBoundingClientRect();travel=Math.max(0,rr.width-tr.width-8);rtl=getComputedStyle(root).direction==='rtl'}
	function settle(value:number){progress=value}
	function change(next:boolean){if(confirmed===next)return;confirmed=next;onConfirmedChange?.(next);if(next)onConfirm?.();settle(next?1:0)}
	function cancel(){if(pointerId!==undefined&&thumb.hasPointerCapture?.(pointerId))thumb.releasePointerCapture(pointerId);pointerId=undefined;dragging=false;settle(confirmed?1:0)}
	function down(e:PointerEvent){if(inactive||confirmed&&!resettable)return;measure();pointerId=e.pointerId;start=e.clientX;dragging=true;thumb.setPointerCapture?.(e.pointerId);e.preventDefault()}
	function move(e:PointerEvent){if(!dragging||e.pointerId!==pointerId)return;const delta=(e.clientX-start)*(rtl?-1:1);progress=Math.max(0,Math.min(1,((confirmed?travel:0)+delta)/Math.max(1,travel)))}
	function up(e:PointerEvent){if(!dragging||e.pointerId!==pointerId)return;const reached=progress>=Math.max(0,Math.min(1,threshold));cancel();if(reached)change(true)}
	function keydown(e:KeyboardEvent){if(inactive)return;const confirmKey=e.key==='End'||e.key==='Enter'||e.key===' '||(!rtl&&e.key==='ArrowRight')||(rtl&&e.key==='ArrowLeft');if(confirmKey){e.preventDefault();change(true)}else if(e.key==='Home'&&resettable){e.preventDefault();change(false)}}
	function watch(node:HTMLElement){root=node;let active=true;const observer=new ResizeObserver(()=>{if(!active)return;cancel();measure()});observer.observe(node);queueMicrotask(()=>{if(active)measure()});return()=>{active=false;cancel();observer.disconnect()}}
	$effect(()=>{if(inactive)cancel();if(confirmed&&!dragging)progress=1;else if(!confirmed&&!dragging)progress=0});
</script>
<div class="rx-slide" class:rx-slide--confirmed={confirmed} class:rx-slide--dragging={dragging} class:rx-slide--inactive={inactive} style={`${styleColor(color)??'--rx-color:var(--rx-primary)'};--rx-progress:${progress};--rx-duration:${RX_DURATION.base}ms;--rx-ease:${RX_EASE}`} {@attach watch}>
	<div class="rx-slide__fill" aria-hidden="true"></div><span class="rx-slide__label">{confirmed?confirmedLabel:label}</span>
	<button bind:this={thumb} class="rx-slide__thumb" style={`transform:translateX(${progress*travel*(rtl?-1:1)}px)`} type="button" role="slider" aria-label={label} aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress*100)} aria-valuetext={valueText} aria-disabled={inactive?'true':undefined} disabled={inactive} onpointerdown={down} onpointermove={move} onpointerup={up} onpointercancel={cancel} onkeydown={keydown}>
		{#if loading}<span class="rx-slide__spinner" aria-hidden="true"></span>{:else if confirmed&&confirmedIcon}{@render confirmedIcon()}{:else if icon}{@render icon()}{:else}{confirmed?'✓':'→'}{/if}
	</button>
</div>
<style>
	.rx-slide{position:relative;display:flex;align-items:center;box-sizing:border-box;width:min(100%,25rem);height:3.5rem;border:1px solid rgb(var(--rx-color)/.18);border-radius:999px;padding:.25rem;overflow:hidden;color:rgb(var(--rx-text));background:rgb(var(--rx-text)/.06);user-select:none;touch-action:pan-y}.rx-slide__fill{position:absolute;inset:0;background:linear-gradient(90deg,rgb(var(--rx-color)/.2),rgb(var(--rx-color)/.48));transform:scaleX(var(--rx-progress));transform-origin:left;transition:transform var(--rx-duration) var(--rx-ease)}:global([dir=rtl]) .rx-slide__fill{transform-origin:right}.rx-slide__label{position:absolute;inset-inline:3.9rem 1rem;text-align:center;font-size:.88rem;font-weight:650;opacity:.72}.rx-slide__thumb{position:relative;z-index:1;display:grid;place-items:center;width:3rem;height:3rem;flex:none;border:0;border-radius:999px;color:rgb(var(--rx-light));background:rgb(var(--rx-color));box-shadow:0 7px 18px rgb(var(--rx-color)/.35);transition:transform var(--rx-duration) var(--rx-ease);cursor:grab}.rx-slide--dragging .rx-slide__thumb{transition:none;cursor:grabbing}.rx-slide--inactive{opacity:.55}.rx-slide__spinner{width:1rem;height:1rem;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:rx-slide-spin .7s linear infinite}@keyframes rx-slide-spin{to{rotate:1turn}}@media(prefers-reduced-motion:reduce){.rx-slide__thumb,.rx-slide__fill{transition:none}.rx-slide__spinner{animation-duration:1ms;animation-iteration-count:1}}
</style>
