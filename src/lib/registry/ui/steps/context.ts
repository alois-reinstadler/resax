import { getContext, setContext } from 'svelte';
import type { Snippet } from 'svelte';

export interface StepRecord { title: string; description?: string; icon?: Snippet; disabled: boolean; error: boolean; optional: boolean; }
export interface StepsContext { register: (step: StepRecord) => number; state: () => { current: number; orientation: 'horizontal'|'vertical'; variant: string; clickable: boolean; linear: boolean }; choose: (index: number) => void; }
const KEY = Symbol('rx-steps');
export const setStepsContext = (value: StepsContext) => setContext(KEY, value);
export const getStepsContext = () => getContext<StepsContext>(KEY);
