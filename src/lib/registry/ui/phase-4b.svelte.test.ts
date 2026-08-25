import { render, fireEvent } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './phase-4b-test-harness.svelte';

describe('phase 4b navigation', () => {
 it('binds step state and enforces linear progress', async()=>{const view=render(Harness);const steps=view.getAllByRole('button',{name:/Step/});await fireEvent.click(steps[2]);expect(view.getByTestId('state').textContent).toContain('0:0:-1');await fireEvent.click(steps[1]);expect(view.getByTestId('state').textContent).toContain('1:0:1')});
 it('uses labelled buttons for dots',async()=>{const view=render(Harness);const gamma=view.getByRole('button',{name:'Gamma'});await fireEvent.click(gamma);expect(view.getByTestId('state').textContent).toContain('0:2:2');expect(gamma.getAttribute('aria-current')).toBe('step')});
 it('renders timeline as an ordered list',()=>{const view=render(Harness);expect(view.getAllByRole('list')).toHaveLength(2);expect(view.getByText('Done')).toBeTruthy()});
	it('traverses and expands the file tree while skipping disabled nodes',async()=>{const view=render(Harness);const root=view.container.querySelector<HTMLElement>('[data-id="root"]')!;root.focus();await fireEvent.keyDown(root,{key:'ArrowDown'});expect(document.activeElement?.getAttribute('data-id')).toBe('a');const a=view.container.querySelector<HTMLElement>('[data-id="a"]')!;expect(a.querySelector('button')).toBeNull();await fireEvent.keyDown(a,{key:'ArrowDown'});expect(document.activeElement?.getAttribute('data-id')).toBe('dir');const dir=view.container.querySelector<HTMLElement>('[data-id="dir"]')!;expect(view.getByRole('button',{name:'Expand dir'})).toBeTruthy();expect(dir.getAttribute('aria-expanded')).toBe('false');await fireEvent.keyDown(dir,{key:'ArrowRight'});expect(dir.getAttribute('aria-expanded')).toBe('true');expect(view.container.querySelector('[data-id="b"]')?.getAttribute('aria-hidden')).toBe(null)});
});
