import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './avatar-test-harness.svelte';
describe('Avatar', () => {
	it('renders its fallback', () => { render(Harness); expect(screen.getByText('RX')).toBeTruthy(); });
	it('falls back from a bad image to initials', async () => { render(Harness, { mode: 'broken' }); await fireEvent.error(screen.getByRole('img')); expect(screen.getByText('RX')).toBeTruthy(); });
	it('shows a context-counted group overflow and source menu', async () => {
		const view = render(Harness, { mode: 'group', max: 2 });
		const overflow = screen.getByRole('button', { name: '2 more' });
		expect(overflow.textContent).toBe('+2');
		expect((screen.getByText('C').closest('.rx-avatar') as HTMLElement).dataset.groupExtra).toBe('true');
		await fireEvent.click(overflow);
		expect(overflow.getAttribute('aria-expanded')).toBe('true');
		expect(document.querySelector('[role="menu"]')).toBeTruthy();
		await fireEvent.keyDown(document, { key: 'Escape' });
		expect(overflow.getAttribute('aria-expanded')).toBe('false');
		expect(document.activeElement).toBe(overflow);
		view.unmount();
		expect(document.querySelector('.rx-avatar-group__portal')).toBeNull();
	});
	it('distinguishes an accessible status dot from a count', () => { const dot = render(Harness, { badge: true }); expect(screen.getByRole('status', { name: 'Status' }).classList.contains('rx-avatar__badge--dot')).toBe(true); dot.unmount(); render(Harness, { badge: 4 }); expect(screen.getByRole('status', { name: '4' }).textContent).toBe('4'); });
	it.each(['base','glow','ring','squircle','status','tilt'] as const)('maps the source %s avatar variant',(variant)=>{const {container}=render(Harness,{variant});expect(container.querySelector(`.rx-avatar--${variant}`)).toBeTruthy()});
	it.each(['base','fan','flip','grid','ring','wave'] as const)('maps the source %s group variant',(variant)=>{const {container}=render(Harness,{mode:'group',variant});expect(container.querySelector(`.rx-avatar-group--${variant}`)).toBeTruthy()});
	it('creates a pointer-origin ripple, applies source press perspective, and releases',async()=>{const view=render(Harness,{variant:'base'});const avatar=view.container.querySelector('.rx-avatar') as HTMLElement;Object.defineProperty(avatar,'getBoundingClientRect',{value:()=>({left:0,top:0,right:48,bottom:48,width:48,height:48,x:0,y:0,toJSON(){return{}}})});await fireEvent.pointerDown(avatar,{clientX:8,clientY:9});expect(avatar.querySelector('.rx-avatar__ripple')).toBeTruthy();expect(avatar.style.transform).toContain('perspective(320px)');expect(avatar.style.transform).toContain('scale(.94)');await fireEvent.pointerUp(avatar);expect(avatar.style.transform).toBe('');expect(()=>view.unmount()).not.toThrow()});
});
