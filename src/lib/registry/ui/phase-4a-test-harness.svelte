<script lang="ts">
	import { Accordion, AccordionItem } from './accordion';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
	import { Breadcrumb, type BreadcrumbItem } from './breadcrumb';
	import { Pagination } from './pagination';
	let accordion = $state<string | string[]>('one');
	let tab = $state('one');
	let page = $state(2);
	let navigated = $state('');
	const crumbs: BreadcrumbItem[] = [
		{ label: 'Home', href: '/home' }, { label: 'Docs', href: '/docs' },
		{ label: 'Components', href: '/components' }, { label: 'Current' }
	];
</script>

<output data-testid="accordion-value">{JSON.stringify(accordion)}</output>
<Accordion bind:value={accordion}>
	<AccordionItem value="one" title="First">First panel</AccordionItem>
	<AccordionItem value="two" title="Second">Second panel</AccordionItem>
</Accordion>
<output data-testid="tab-value">{tab}</output>
<Tabs bind:value={tab} activationMode="manual">
	<TabsList><TabsTrigger value="one">Overview</TabsTrigger><TabsTrigger value="two">Settings</TabsTrigger></TabsList>
	<TabsContent value="one">Overview panel</TabsContent><TabsContent value="two">Settings panel</TabsContent>
</Tabs>
<output data-testid="navigated">{navigated}</output>
<Breadcrumb items={crumbs} maxItems={3} onNavigate={(item) => navigated = item.label} />
<output data-testid="page-value">{page}</output>
<Pagination bind:page count={100} perPage={10} showGoto />
