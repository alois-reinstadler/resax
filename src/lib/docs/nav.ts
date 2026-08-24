export interface NavGroup {
	category: string;
	items: Array<{ name: string; slug: string; built: boolean }>;
}

const groups: Record<string, string[]> = {
	Disclosure: ['Accordion'],
	Feedback: ['Alert', 'Badge', 'Notification', 'Popup', 'Progress', 'Skeleton', 'Spinner'],
	'Data display': ['Avatar', 'Code', 'Indicator', 'List', 'Table'],
	Inputs: ['Button', 'Calendar', 'Checkbox', 'Chip', 'ColorPicker', 'Input', 'Number', 'Otp', 'Radio', 'RadioGroup', 'Rating', 'Select', 'Slider', 'Switch', 'Textarea', 'UploadFile'],
	Navigation: ['Breadcrumb', 'ContextMenu', 'Cursor', 'Dock', 'DotStepper', 'Dropdown', 'FileTree', 'InlineOverflow', 'LinkBar', 'NavMenu', 'Pagination', 'Sidebar', 'Steps', 'Tabs'],
	Layout: ['Card', 'Scrollbar', 'Separator', 'Spacer'],
	Overlay: ['Drawer'],
	Misc: ['SlideConfirm', 'TickRail', 'Transform']
};

const slugify = (name: string) => name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export const nav: NavGroup[] = Object.entries(groups).map(([category, items]) => ({
	category,
	items: items.map((name) => ({ name, slug: slugify(name), built: false }))
}));
