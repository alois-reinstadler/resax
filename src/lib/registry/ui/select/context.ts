import { getContext, setContext } from 'svelte';

const SELECT_CONTEXT = Symbol('rx-select');

export interface SelectContext {
	filter: () => boolean;
	query: () => string;
	remove: (value: string) => void;
}

export function setSelectContext(context: SelectContext) {
	setContext(SELECT_CONTEXT, context);
}

export function getSelectContext() {
	return getContext<SelectContext>(SELECT_CONTEXT);
}
