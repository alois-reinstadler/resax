<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';
	export interface SelectProps {
		value?: string | string[]; multiple?: boolean; filter?: boolean; chips?: boolean;
		label?: string; placeholder?: string; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		variant?: 'default' | 'floating' | 'pill' | 'search' | 'slide' | 'underline';
		state?: 'default' | 'success' | 'danger' | 'warn'; message?: string | Snippet;
		disabled?: boolean; loading?: boolean; children: Snippet;
		onValueChange?: (value: string | string[]) => void;
	}
</script>

<script lang="ts">
	import { Combobox, Select as BitsSelect } from 'bits-ui';
	import { Chip } from '../chip';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE, rxSlideUp } from '$lib/registry/lib/easing';
	import { setSelectContext } from './context';
	let { value = $bindable(''), multiple = false, filter = false, chips = false, label, placeholder = 'Select an option',
		color, size = 'default', variant = 'default', state: validationState = 'default', message, disabled = false, loading = false,
		children, onValueChange }: SelectProps = $props();
	let open = $state(false);
	let query = $state('');
	let menuElement = $state<HTMLElement | null>(null);
	const uid = $props.id();
	const messageId = `${uid}-message`;
	const stateColor = $derived(validationState === 'default' ? color : validationState);
	const hasValue = $derived(Array.isArray(value) ? value.length > 0 : value.length > 0);
	const controlPlaceholder = $derived(label && variant !== 'floating' && !open && !hasValue ? '' : placeholder);
	const inlineStyle = $derived(`${styleColor(stateColor) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}`);
	function change(next: string | string[]) { value = next; onValueChange?.(next); }
	function remove(item: string) { if (Array.isArray(value)) change(value.filter((entry) => entry !== item)); }
	function menuIndicator(node:HTMLElement){const indicator=document.createElement('span');indicator.className='rx-select__moving-indicator';indicator.setAttribute('aria-hidden','true');node.prepend(indicator);let frame=0;const measure=(target:HTMLElement|null)=>{if(!target)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const box=node.getBoundingClientRect(),rect=target.getBoundingClientRect();node.style.setProperty('--select-i-x',`${rect.left-box.left}px`);node.style.setProperty('--select-i-y',`${rect.top-box.top}px`);node.style.setProperty('--select-i-w',`${rect.width}px`);node.style.setProperty('--select-i-h',`${rect.height}px`);node.style.setProperty('--select-i-on','1')})};const find=(event?:Event)=>{const target=(event?.target as Element|null)?.closest<HTMLElement>('.rx-select__item')??node.querySelector<HTMLElement>('.rx-select__item[data-selected],.rx-select__item[aria-selected=true]');measure(target)};const leave=()=>find();node.addEventListener('pointermove',find);node.addEventListener('focusin',find);node.addEventListener('pointerleave',leave);const observer=new MutationObserver(()=>find());observer.observe(node,{attributes:true,subtree:true,attributeFilter:['data-selected','aria-selected']});queueMicrotask(()=>find());return()=>{cancelAnimationFrame(frame);observer.disconnect();node.removeEventListener('pointermove',find);node.removeEventListener('focusin',find);node.removeEventListener('pointerleave',leave);indicator.remove()}}
	$effect(()=>{const node=menuElement;if(!node)return;return menuIndicator(node)});
	setSelectContext({ filter: () => filter, query: () => query, remove });
</script>

<div class="rx-select rx-select--{size} rx-select--{variant}" class:rx-select--open={open} class:rx-select--floated={open || hasValue || (filter && query.length > 0)} class:rx-select--chips={multiple && chips} class:rx-select--loading={loading} style={inlineStyle}>
	{#if filter}
		{#if multiple}
			<Combobox.Root type="multiple" value={Array.isArray(value) ? value : []} onValueChange={change} bind:open {disabled}>
				<div class="rx-select__control">
					{#if multiple && chips && Array.isArray(value) && value.length}<span class="rx-select__chips">{#each value as item (item)}<Chip size="sm" closable onClose={() => remove(item)}>{item}</Chip>{/each}</span>{/if}
					<Combobox.Input class="rx-select__input" oninput={(event) => query = event.currentTarget.value} placeholder={controlPlaceholder} aria-label={label ?? placeholder} aria-invalid={validationState === 'danger' ? 'true' : undefined} aria-describedby={validationState === 'danger' && message ? messageId : undefined} />
					<span class="rx-select__chevron" aria-hidden="true">⌄</span>{#if loading}<span class="rx-select__loader" aria-hidden="true"></span>{/if}{#if label}<span class="rx-select__label">{label}</span>{/if}
				</div>
				<Combobox.Portal><Combobox.Content bind:ref={menuElement} class={`rx-select__content rx-select__content--${variant}`} sideOffset={6}><Combobox.Viewport>{@render children()}</Combobox.Viewport></Combobox.Content></Combobox.Portal>
			</Combobox.Root>
		{:else}
			<Combobox.Root type="single" value={typeof value === 'string' ? value : ''} onValueChange={change} bind:open {disabled}>
				<div class="rx-select__control"><Combobox.Input class="rx-select__input" oninput={(event) => query = event.currentTarget.value} placeholder={controlPlaceholder} aria-label={label ?? placeholder} aria-invalid={validationState === 'danger' ? 'true' : undefined} aria-describedby={validationState === 'danger' && message ? messageId : undefined} /><span class="rx-select__chevron" aria-hidden="true">⌄</span>{#if loading}<span class="rx-select__loader" aria-hidden="true"></span>{/if}{#if label}<span class="rx-select__label">{label}</span>{/if}</div>
				<Combobox.Portal><Combobox.Content bind:ref={menuElement} class={`rx-select__content rx-select__content--${variant}`} sideOffset={6}><Combobox.Viewport>{@render children()}</Combobox.Viewport></Combobox.Content></Combobox.Portal>
			</Combobox.Root>
		{/if}
	{:else}
		{#if multiple}
			<BitsSelect.Root type="multiple" value={Array.isArray(value) ? value : []} onValueChange={change} bind:open {disabled}>
				<div class="rx-select__control-wrap">
					<BitsSelect.Trigger class="rx-select__control" aria-label={label ?? placeholder} aria-invalid={validationState === 'danger' ? 'true' : undefined} aria-describedby={validationState === 'danger' && message ? messageId : undefined}>
						<BitsSelect.Value placeholder={chips && Array.isArray(value) && value.length ? `${value.length} selected` : controlPlaceholder} /><span class="rx-select__chevron" aria-hidden="true">⌄</span>{#if loading}<span class="rx-select__loader" aria-hidden="true"></span>{/if}
					</BitsSelect.Trigger>
					{#if label}<span class="rx-select__label">{label}</span>{/if}
				</div>
				{#if chips && Array.isArray(value) && value.length}<span class="rx-select__chips rx-select__chips--outside" aria-label="Selected values">{#each value as item (item)}<Chip size="sm" closable onClose={() => remove(item)}>{item}</Chip>{/each}</span>{/if}
				<BitsSelect.Portal><BitsSelect.Content bind:ref={menuElement} class={`rx-select__content rx-select__content--${variant}`} sideOffset={6}><BitsSelect.Viewport>{@render children()}</BitsSelect.Viewport></BitsSelect.Content></BitsSelect.Portal>
			</BitsSelect.Root>
		{:else}
			<BitsSelect.Root type="single" value={typeof value === 'string' ? value : ''} onValueChange={change} bind:open {disabled}>
				<div class="rx-select__control-wrap">
					<BitsSelect.Trigger class="rx-select__control" aria-label={label ?? placeholder} aria-invalid={validationState === 'danger' ? 'true' : undefined} aria-describedby={validationState === 'danger' && message ? messageId : undefined}><BitsSelect.Value placeholder={controlPlaceholder} /><span class="rx-select__chevron" aria-hidden="true">⌄</span>{#if loading}<span class="rx-select__loader" aria-hidden="true"></span>{/if}</BitsSelect.Trigger>
					{#if label}<span class="rx-select__label">{label}</span>{/if}
				</div>
				<BitsSelect.Portal><BitsSelect.Content bind:ref={menuElement} class={`rx-select__content rx-select__content--${variant}`} sideOffset={6}><BitsSelect.Viewport>{@render children()}</BitsSelect.Viewport></BitsSelect.Content></BitsSelect.Portal>
			</BitsSelect.Root>
		{/if}
	{/if}
	{#if message}<div id={messageId} class="rx-select__message" transition:rxSlideUp aria-live="polite">{#if typeof message === 'string'}{message}{:else}{@render message()}{/if}</div>{/if}
</div>

<style>
	.rx-select { display: inline-grid; gap: .3rem; width: 100%; color: rgb(var(--rx-text)); }
	.rx-select__control-wrap{position:relative;width:100%}
	.rx-select__control { position: relative; display: flex; width: 100%; align-items: center; box-sizing: border-box; border: 0; border-radius: var(--rx-radius); outline: 0; background: rgb(var(--rx-surface-2)); color: inherit; font: inherit; text-align: left; cursor: pointer; transition: box-shadow var(--rx-duration) var(--rx-ease), background var(--rx-duration) var(--rx-ease); }
	.rx-select__control::after { content: ''; position: absolute; inset: auto 0 0; height: 2px; border-radius: 9999px; background: rgb(var(--rx-color)); transform: scaleX(0); transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-select--open .rx-select__control::after, .rx-select__control:focus-visible::after, .rx-select__control:focus-within::after { transform: scaleX(1); }
	.rx-select__control > :global([data-select-value]) { flex: 1; min-width: 0; padding: 1.05rem 2.6rem .42rem .9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.rx-select__input { width: 100%; min-width: 0; box-sizing: border-box; border: 0; outline: 0; border-radius: inherit; padding: 1.05rem 2.6rem .42rem .9rem; background: transparent; color: inherit; font: inherit; }
	.rx-select__input::placeholder { color: rgb(var(--rx-text-muted)); }
	.rx-select__label { position: absolute; left: .9rem; top: 50%; color: rgb(var(--rx-text-secondary)); pointer-events: none; transform: translateY(-50%); transform-origin: left center; transition: transform var(--rx-duration) var(--rx-ease), color var(--rx-duration) var(--rx-ease), top var(--rx-duration) var(--rx-ease); }
	.rx-select--floated .rx-select__label { top: .42rem; color: color-mix(in srgb, rgb(var(--rx-color)) 50%, rgb(var(--rx-text))); transform: translateY(0) scale(.72); }
	:global(:root[data-theme='dark']) .rx-select--floated .rx-select__label{color:color-mix(in srgb,rgb(var(--rx-color)) 78%,rgb(var(--rx-light)))}
	.rx-select__chevron { position: absolute; right: .9rem; color: rgb(var(--rx-color)); transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-select--open .rx-select__chevron { transform: rotate(180deg); }
	.rx-select__loader { position: absolute; right: 2.1rem; width: 1rem; height: 1rem; border: 2px solid rgb(var(--rx-color) / .3); border-top-color: rgb(var(--rx-color)); border-radius: 9999px; animation: rx-select-spin .7s linear infinite; }
	.rx-select__message { padding-left: .35rem; color: color-mix(in srgb, rgb(var(--rx-color)) 50%, rgb(var(--rx-text))); font-size: .76rem; line-height: 1.25; }
	.rx-select__chips { display: flex; flex: 1; flex-wrap: wrap; gap: .3rem; padding: .65rem 4rem .35rem .65rem; }
	.rx-select--chips .rx-select__control { min-height: 3rem; }
	.rx-select--lg .rx-select__control { min-height: 3.5rem; font-size: 1rem; }
	.rx-select--size-default .rx-select__control { min-height: 3rem; font-size: .9rem; }
	.rx-select--sm .rx-select__control { min-height: 2.5rem; font-size: .82rem; }
	.rx-select--pill .rx-select__control { border-radius: 9999px; }
	.rx-select--search .rx-select__control { box-shadow: 0 8px 24px rgb(var(--rx-dark) / var(--rx-shadow-opacity)); }
	.rx-select--slide .rx-select__control::after { transform-origin: left; }
	.rx-select--underline .rx-select__control { border-radius: 0; background: transparent; }
	.rx-select--floating .rx-select__control { box-shadow: 0 12px 30px rgb(var(--rx-color) / .14); transform: translateY(-1px); }
	.rx-select__control{border:1px solid rgb(var(--rx-border));transition:transform 240ms cubic-bezier(.34,1.56,.64,1),border-color 200ms cubic-bezier(.22,1,.36,1),background-color 200ms}.rx-select__control:hover{border-color:rgb(var(--rx-gray-5))}.rx-select--open .rx-select__control{border-color:rgb(var(--rx-color))}.rx-select__chevron{transition:transform 240ms cubic-bezier(.34,1.56,.64,1)}
	.rx-select--pill .rx-select__control{border-radius:999px;background:rgb(var(--rx-color)/.06)}.rx-select--pill.rx-select--open .rx-select__control{background:rgb(var(--rx-color)/.11)}.rx-select--floating .rx-select__control{box-shadow:none;transform:none}.rx-select--floating .rx-select__label{max-width:0;overflow:hidden;transition:max-width 220ms cubic-bezier(.34,1.4,.5,1),transform 240ms cubic-bezier(.34,1.4,.5,1),color 220ms}.rx-select--floating.rx-select--floated .rx-select__label{max-width:80%;}.rx-select--underline .rx-select__control{border:0;border-bottom:1px solid rgb(var(--rx-border))}.rx-select--underline .rx-select__control::after{transform-origin:center;transition:transform 320ms cubic-bezier(.22,1,.36,1)}
	:global(.rx-select__control[data-disabled]), :global(.rx-select__control:disabled) { cursor: not-allowed; opacity: .55; }
	@keyframes rx-select-spin { to { transform: rotate(1turn); } }
	@media (prefers-reduced-motion: reduce) { .rx-select__control, .rx-select__control::after, .rx-select__label, .rx-select__chevron { transition-duration: 0ms; } .rx-select__loader { animation-duration: 1ms; animation-iteration-count: 1; } }
	:global(.rx-select__content) { z-index: 50; min-width: var(--bits-select-anchor-width); max-height: min(20rem, var(--bits-select-content-available-height)); overflow: auto; border: 1px solid rgb(var(--rx-border)); border-radius: var(--rx-radius); padding: .35rem; background: rgb(var(--rx-surface)); color: rgb(var(--rx-text)); box-shadow:0 18px 50px -18px rgb(var(--rx-dark)/.55),0 6px 18px -10px rgb(var(--rx-dark)/.3),inset 0 1px rgb(var(--rx-light)/.04);backdrop-filter:blur(20px) saturate(180%);transform-origin:var(--bits-select-content-transform-origin);animation:rx-select-in 240ms cubic-bezier(.34,1.42,.5,1) both; }
	:global(.rx-select__content[data-state='closed']) { animation:rx-select-out 220ms cubic-bezier(.4,0,1,1) both; }
	:global(.rx-select__item) { position:relative;isolation:isolate;display: flex; align-items: center; gap: .55rem; padding: .55rem .65rem; border-radius: calc(var(--rx-radius) * .7); outline: 0; cursor: pointer;animation:rx-select-item-in 280ms cubic-bezier(.34,1.42,.5,1) both }
	:global(.rx-select__item[data-highlighted]) { color: rgb(var(--rx-color)); background: hsl(from rgb(var(--rx-color)) h s l / .13); }
	:global(.rx-select__moving-indicator){position:absolute;z-index:0;left:var(--select-i-x,0);top:var(--select-i-y,0);width:var(--select-i-w,0);height:var(--select-i-h,34px);border-radius:calc(var(--rx-radius)*.7);background:rgb(var(--rx-color)/.11);opacity:var(--select-i-on,0);pointer-events:none;transition:left 280ms cubic-bezier(.34,1.42,.5,1),top 280ms cubic-bezier(.34,1.42,.5,1),width 280ms cubic-bezier(.34,1.42,.5,1),height 280ms cubic-bezier(.34,1.42,.5,1),opacity 160ms}.rx-select__content--pill :global(.rx-select__moving-indicator){border-radius:999px}.rx-select__content--pill :global(.rx-select__item[data-selected]),.rx-select__content--pill :global(.rx-select__item[aria-selected=true]){background:transparent}:global(.rx-select__item)>*{position:relative;z-index:1}
	:global(.rx-select__item[data-disabled]) { opacity: .45; cursor: not-allowed; }
	:global(.rx-select__check) { width: 1rem; color: rgb(var(--rx-color)); font-weight: 800; }
	:global(.rx-select__group-heading) { padding: .5rem .65rem .25rem; color: rgb(var(--rx-text-muted)); font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
	:global(.rx-select__content--floating){box-shadow:0 12px 40px rgb(var(--rx-dark)/.5);animation:rx-select-floating-in 320ms cubic-bezier(.34,1.56,.64,1) both}:global(.rx-select__content--floating[data-state=closed]){animation:rx-select-floating-out 160ms ease both}:global(.rx-select__content--slide .rx-select__item){opacity:0;transform:translateY(-6px);animation:rx-select-option 300ms cubic-bezier(.22,1,.36,1) forwards}:global(.rx-select__content--slide .rx-select__item:nth-child(1)){animation-delay:80ms}:global(.rx-select__content--slide .rx-select__item:nth-child(2)){animation-delay:106ms}:global(.rx-select__content--slide .rx-select__item:nth-child(3)){animation-delay:132ms}:global(.rx-select__content--slide .rx-select__item:nth-child(4)){animation-delay:158ms}:global(.rx-select__content--slide .rx-select__item:nth-child(5)){animation-delay:184ms}:global(.rx-select__content--slide .rx-select__item:nth-child(6)){animation-delay:210ms}:global(.rx-select__content--slide[data-state=closed]){animation:rx-select-slide-out 160ms ease both}:global(.rx-select__content--search){padding-top:.5rem}:global(.rx-select__content--pill){border-radius:20px}
	@keyframes rx-select-in { from { opacity:0;transform:translateY(-6px) scale(.97);filter:blur(6px) } to{opacity:1;transform:none;filter:none} }@keyframes rx-select-item-in{from{opacity:0;transform:translateY(-3px)}to{opacity:1;transform:none}}
	@keyframes rx-select-out { to { opacity:0;transform:translateY(-6px) scale(.97);filter:blur(6px) } }@keyframes rx-select-option{to{opacity:1;transform:none}}@keyframes rx-select-floating-in{from{opacity:0;transform:translateY(-6px) scaleY(.9);filter:blur(6px)}}@keyframes rx-select-floating-out{to{opacity:0;transform:translateY(-6px) scaleY(.9);filter:blur(6px)}}@keyframes rx-select-slide-out{to{opacity:0;transform:translateY(-8px) scaleY(.55);filter:blur(8px)}}
	@media (prefers-reduced-motion: reduce) { :global(.rx-select__content) { animation-duration: 1ms; } }
</style>
