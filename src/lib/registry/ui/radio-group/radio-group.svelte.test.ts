import { fireEvent, render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Harness from './radio-group-test-harness.svelte';
import source from './radio-group.svelte?raw';
describe('RadioGroup', () => {
	afterEach(()=>vi.unstubAllGlobals());
	it('round-trips value and fires its callback', async () => { render(Harness); await fireEvent.click(screen.getByRole('radio', { name: 'Two' })); expect(screen.getByLabelText('radio value').textContent).toBe('two'); expect(screen.getByLabelText('radio calls').textContent).toBe('1'); await fireEvent.click(screen.getByText('Set radio')); expect(screen.getByRole('radio', { name: 'Two' }).getAttribute('data-state')).toBe('checked'); });
	it('uses bits-ui arrow navigation', async () => { render(Harness); const one = screen.getByRole('radio', { name: 'One' }); one.focus(); await fireEvent.keyDown(one, { key: 'ArrowDown', code: 'ArrowDown' }); expect(screen.getByLabelText('radio value').textContent).toBe('two'); });
	it('blocks disabled interaction', async () => { render(Harness, { disabled: true }); await fireEvent.click(screen.getByRole('radio', { name: 'Two' })); expect(screen.getByLabelText('radio value').textContent).toBe('one'); });
	it('propagates group color and size through context', () => { render(Harness); const item = screen.getByRole('radio', { name: 'One' }); expect(item.className).toContain('rx-radio--lg'); expect(item.getAttribute('style')).toContain('--rx-color: var(--rx-success)'); });
	it.each(['base','cards','glow','pill','segment','slide'] as const)('maps the %s group layout',async(variant)=>{render(Harness,{variant});const group=screen.getByRole('radiogroup');expect(group.className).toContain(`rx-radio-group--variant-${variant}`);await Promise.resolve();if(['pill','segment','slide'].includes(variant))expect(group.querySelector('.rx-radio-group__indicator')).not.toBeNull()});
	it.each(['base','bounce','card','fill','glow','ring'] as const)('maps the %s radio treatment',(radioVariant)=>{render(Harness,{radioVariant});expect(screen.getByRole('radio',{name:'One'}).className).toContain(`rx-radio--variant-${radioVariant}`)});
	it('renders the masked neighbor-light receiver layers and responds to a nearby lamp', async () => {
		const lamp = document.createElement('span'); lamp.dataset.rxLamp = ''; lamp.style.setProperty('--rx-color-rgb', '255 0 0'); document.body.append(lamp);
		Object.defineProperty(lamp, 'getBoundingClientRect', { value: () => ({ left: 0, top: 0, width: 20, height: 20, right: 20, bottom: 20, x: 0, y: 0, toJSON() {} }) });
		try {
			render(Harness); const item = screen.getByRole('radio', { name: 'One' });
			Object.defineProperty(item, 'getBoundingClientRect', { value: () => ({ left: 28, top: 0, width: 24, height: 24, right: 52, bottom: 24, x: 28, y: 0, toJSON() {} }) });
			expect(item.querySelector('.rx-radio__neighbor-fill')).not.toBeNull(); expect(item.querySelector('.rx-radio__neighbor-ring')).not.toBeNull();
			window.dispatchEvent(new Event('resize'));
			await vi.waitFor(() => { expect(item.style.getPropertyValue('--rx-neighbor-lit')).toBe('1'); expect(item.style.getPropertyValue('--rx-neighbor-ring')).toContain('radial-gradient'); });
		} finally { lamp.remove(); }
	});
	it('restarts the checked pop through two animation frames', async () => { render(Harness); const item = screen.getByRole('radio', { name: 'Two' }); await fireEvent.click(item); await vi.waitFor(() => expect(item.classList.contains('rx-radio--pop')).toBe(true)); });
	it('keeps active pill ink on an atomic contrast backdrop while the indicator animates', () => { render(Harness,{variant:'pill'});const item=screen.getByRole('radio',{name:'One'}),copy=item.closest('.rx-radio-field')?.querySelector('.rx-radio__label>span:first-child');expect(copy).not.toBeNull();expect(copy?.matches('.rx-radio-group--variant-pill .rx-radio-field:has(.rx-radio[data-state="checked"]) .rx-radio__label>span:first-child')).toBe(true);expect(source).toContain('.rx-radio-group--variant-pill .rx-radio-field{transition:none}');expect(source).toContain('color:var(--rx-color-foreground,rgb(var(--rx-dark)))');expect(source).toContain('.rx-radio__label>span:first-child{border-radius:2px;background:rgb(var(--rx-color));box-shadow:0 0 0 2px rgb(var(--rx-color))}'); });
	it('forces a layout read before restarting bounce', async () => { render(Harness, { radioVariant: 'bounce' }); const item = screen.getByRole('radio', { name: 'Two' }); const measured = vi.fn(() => 24); Object.defineProperty(item, 'offsetWidth', { configurable: true, get: measured }); await fireEvent.click(item); await vi.waitFor(() => expect(item.classList.contains('rx-radio--bounce-fire')).toBe(true)); expect(measured).toHaveBeenCalled(); });
	it('forces a layout read before restarting the group glow ripple', async () => { render(Harness, { variant: 'glow' }); const item = screen.getByRole('radio', { name: 'Two' }); const measured = vi.fn(() => 24); Object.defineProperty(item, 'offsetWidth', { configurable: true, get: measured }); await fireEvent.click(item); await vi.waitFor(() => expect(item.classList.contains('rx-radio--group-glow-fire')).toBe(true)); expect(measured).toHaveBeenCalled(); });
	it('coalesces indicator observer measurements in requestAnimationFrame', async () => {
		const callbacks: FrameRequestCallback[] = []; let resize: ResizeObserverCallback | undefined;
		vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => { callbacks.push(callback); return callbacks.length; })); vi.stubGlobal('cancelAnimationFrame', vi.fn());
		vi.stubGlobal('ResizeObserver', class { constructor(callback: ResizeObserverCallback) { resize = callback; } observe() {} disconnect() {} unobserve() {} });
		render(Harness, { variant: 'pill' }); await Promise.resolve();
		expect(callbacks.filter((callback) => callback.name === 'paintIndicator')).toHaveLength(1);
		resize?.([], {} as ResizeObserver); resize?.([], {} as ResizeObserver);
		expect(callbacks.filter((callback) => callback.name === 'paintIndicator')).toHaveLength(1);
		const paint = callbacks.find((callback) => callback.name === 'paintIndicator'); paint?.(0);
		resize?.([], {} as ResizeObserver); resize?.([], {} as ResizeObserver);
		expect(callbacks.filter((callback) => callback.name === 'paintIndicator')).toHaveLength(2);
	});
	it('creates staggered inner and outer radio ripples',async()=>{render(Harness);const item=screen.getByRole('radio',{name:'Two'});Object.defineProperty(item,'getBoundingClientRect',{value:()=>({left:0,top:0,width:24,height:24,right:24,bottom:24,x:0,y:0,toJSON(){}})});await fireEvent.pointerDown(item,{clientX:6,clientY:8});expect(item.querySelectorAll('.rx-radio__ripple')).toHaveLength(2);expect(item.querySelector('.rx-radio__ripple--inner')).not.toBeNull()});
	it('suppresses radio waves and retrigger classes when reduced motion is requested',async()=>{vi.stubGlobal('matchMedia',()=>({matches:true}));render(Harness,{radioVariant:'bounce'});const item=screen.getByRole('radio',{name:'Two'});await fireEvent.pointerDown(item,{clientX:4,clientY:7});await fireEvent.click(item);await Promise.resolve();expect(document.querySelectorAll('.rx-radio__ripple')).toHaveLength(0);expect(item.classList.contains('rx-radio--bounce-fire')).toBe(false)});
});
