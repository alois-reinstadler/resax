import { getContext, setContext } from 'svelte';
import type { RxColor } from '$lib/registry/lib/color';

export type AccordionMode = 'single' | 'multiple';
export type AccordionVariant = 'default' | 'filled' | 'ghost';
export type AccordionEffect = 'none' | 'bounce' | 'glow' | 'slide';
export type AccordionContext = { variant: AccordionVariant; effect: AccordionEffect; color?: RxColor };
const key = Symbol('rx-accordion');
export const setAccordionContext = (value: AccordionContext) => setContext(key, value);
export const getAccordionContext = () => getContext<AccordionContext>(key);
