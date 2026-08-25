import { nav } from '$lib/docs/nav';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	nav.flatMap((group) => group.items.filter((item) => item.built).map(({ slug }) => ({ slug })));

export const prerender = true;

export const load: PageLoad = ({ params }) => ({ slug: params.slug });
