# Public API reference

Generated from consumer source by `node scripts/generate-api.mjs`. Do not edit manually. The check command regenerates this file and fails when `git diff --exit-code docs/API.md` reports drift.

## accordion/accordion-item.svelte

Exports: `AccordionItemProps`

### AccordionItemProps

```ts
interface AccordionItemProps { value: string; title: string | Snippet; disabled?: boolean; icon?: Snippet; children: Snippet;
}
```

## accordion/accordion.svelte

Exports: `AccordionValue`, `AccordionProps`

### AccordionProps

```ts
interface AccordionProps { value?: AccordionValue; mode?: 'single' | 'multiple'; collapsible?: boolean; disabled?: boolean; color?: RxColor; variant?: 'default' | 'filled' | 'ghost'; effect?: 'none' | 'bounce' | 'glow' | 'slide'; onValueChange?: (value: AccordionValue) => void; children: Snippet;
}
```

## accordion/context.ts

Exports: `AccordionMode`, `AccordionVariant`, `AccordionEffect`, `AccordionContext`, `setAccordionContext`, `getAccordionContext`

## alert/alert.svelte

Exports: `AlertProps`

### AlertProps

```ts
interface AlertProps {
		variant?: 'default' | 'banner' | 'inline' | 'neon' | 'split' | 'toast';
		color?: RxColor;
		title?: string | Snippet;
		icon?: Snippet;
		closable?: boolean;
		open?: boolean;
		onClose?: () => void;
		children?: Snippet;
}
```

## alert/index.ts

Exports: `alertVariants`, `AlertVariantProps`

## ask-ai-button/ask-ai-button.svelte

Exports: `AskAiButtonProps`

### AskAiButtonProps

```ts
interface AskAiButtonProps {label?:string;loading?:boolean;sparkle?:Snippet
}
```

## avatar/avatar-group.svelte

Exports: `AvatarGroupProps`

### AvatarGroupProps

```ts
interface AvatarGroupProps { max?: number; float?: boolean; children: Snippet;
}
```

## avatar/avatar.svelte

Exports: `AvatarProps`

### AvatarProps

```ts
interface AvatarProps {
		src?: string;
		alt?: string;
		fallback?: string;
		icon?: Snippet;
		color?: RxColor;
		size?: 'xl' | 'lg' | 'default' | 'sm' | 'mini';
		shape?: 'circle' | 'square' | 'rounded';
		badge?: string | number | boolean;
		badgeColor?: RxColor;
		history?: boolean;
		loading?: boolean;
		children?: Snippet;
}
```

## avatar/context.ts

Exports: `AVATAR_GROUP`, `AvatarGroupContext`

## avatar/index.ts

Exports: `avatarVariants`, `AvatarVariantProps`

## badge/badge.svelte

Exports: `BadgeProps`

### BadgeProps

```ts
interface BadgeProps {
		variant?: 'default' | 'glow' | 'gradient' | 'pulse' | 'shimmer' | 'stripes'; color?: RxColor;
		content?: string | number; dot?: boolean; position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'; children?: Snippet;
}
```

## badge/index.ts

Exports: `badgeVariants`, `BadgeVariantProps`

## breadcrumb/breadcrumb.svelte

Exports: `BreadcrumbItem`, `BreadcrumbProps`

### BreadcrumbProps

```ts
interface BreadcrumbProps { items:BreadcrumbItem[]; color?:RxColor; variant?:'default'|'arrow'|'pill'|'slash'|'glow'; maxItems?:number; separator?:string|Snippet; onNavigate?:(item:BreadcrumbItem,index:number)=>void
}
```

## button-group/button-group.svelte

Exports: `ButtonGroupProps`

### ButtonGroupProps

```ts
interface ButtonGroupProps {orientation?:'horizontal'|'vertical';attached?:boolean;children:Snippet
}
```

## button/button.svelte

Exports: `ButtonProps`

### ButtonProps

```ts
interface ButtonProps {
		variant?: 'default' | 'flat' | 'border' | 'gradient' | 'shadow' | 'relief' | 'transparent';
		color?: RxColor;
		size?: 'xl' | 'lg' | 'default' | 'sm' | 'mini';
		shape?: 'default' | 'circle' | 'square';
		effect?: 'none' | 'glow' | 'pulse';
		block?: boolean;
		floating?: boolean;
		loading?: boolean;
		disabled?: boolean;
		href?: string;
		ripple?: boolean;
		children: Snippet;
		icon?: Snippet;
		onclick?: (event: MouseEvent) => void;
}
```

## button/index.ts

Exports: `buttonVariants`, `ButtonVariantProps`

## calendar/calendar.svelte

Exports: `CalendarValue`, `CalendarProps`

### CalendarProps

```ts
interface CalendarProps {
		value?: CalendarValue;
		mode?: 'single' | 'multiple' | 'range';
		color?: RxColor;
		minValue?: DateValue;
		maxValue?: DateValue;
		disabled?: boolean;
		isDateUnavailable?: (date: DateValue) => boolean;
		numberOfMonths?: number;
		onValueChange?: (value: CalendarValue | undefined) => void;
}
```

## calendar/date-picker.svelte

Exports: `DatePickerProps`

### DatePickerProps

```ts
interface DatePickerProps {
		value?: CalendarValue;
		mode?: 'single' | 'multiple' | 'range';
		color?: RxColor;
		minValue?: DateValue;
		maxValue?: DateValue;
		disabled?: boolean;
		isDateUnavailable?: (date: DateValue) => boolean;
		numberOfMonths?: number;
		onValueChange?: (value: CalendarValue | undefined) => void;
		label?: string;
		placeholder?: string;
		state?: 'default' | 'success' | 'danger' | 'warn';
		message?: string | Snippet;
		size?: 'lg' | 'default' | 'sm';
}
```

## card/card.svelte

Exports: `CardProps`

### CardProps

```ts
interface CardProps {
		variant?: 'default' | 'shadow' | 'border' | 'flat' | 'reveal' | 'zoom' | 'spotlight' | 'tilt-3d';
		color?: RxColor; href?: string; media?: Snippet; header?: Snippet; footer?: Snippet; children?: Snippet;
}
```

## card/index.ts

Exports: `cardVariants`, `CardVariantProps`

## checkbox/checkbox.svelte

Exports: `CheckboxProps`

### CheckboxProps

```ts
interface CheckboxProps {
		checked?: boolean;
		indeterminate?: boolean;
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		lineThrough?: boolean;
		disabled?: boolean;
		children?: Snippet;
		onCheckedChange?: (checked: boolean) => void;
}
```

## checkbox/index.ts

Exports: `checkboxVariants`, `CheckboxVariantProps`

## chip/chip.svelte

Exports: `ChipProps`

### ChipProps

```ts
interface ChipProps {
		variant?: 'default' | 'flat' | 'border' | 'gradient'; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		closable?: boolean; onClose?: () => void; disabled?: boolean; icon?: Snippet; children: Snippet;
}
```

## chip/index.ts

Exports: `chipVariants`, `ChipVariantProps`

## code/code.svelte

Exports: `CodeProps`

### CodeProps

```ts
interface CodeProps {code:string;language?:string;filename?:string;color?:RxColor;variant?:'default'|'glow'|'gradient-border'|'minimal'|'terminal'|'window';theme?:'auto'|'light'|'dark';copyable?:boolean;lineNumbers?:boolean;highlightLines?:number[];wrap?:boolean;maxHeight?:string;onCopy?:(code:string)=>void
}
```

## code/highlight.ts

Exports: `CodeToken`

## color-picker/color-picker.svelte

Exports: `ColorPickerProps`

### ColorPickerProps

```ts
interface ColorPickerProps { value?: string; alpha?: boolean; swatches?: string[]; color?: RxColor; size?: 'lg' | 'default' | 'sm'; disabled?: boolean; onValueChange?: (value: string) => void
}
```

## color-picker/hsv.ts

Exports: `HsvColor`, `rgbToHsv`, `hsvToRgb`, `hsvToHex`, `parseColor`

## context-menu/context-menu-group.svelte

Exports: `ContextMenuGroupProps`

### ContextMenuGroupProps

```ts
interface ContextMenuGroupProps { label: string; children: Snippet;
}
```

## context-menu/context-menu-item.svelte

Exports: `ContextMenuItemProps`

### ContextMenuItemProps

```ts
interface ContextMenuItemProps { icon?: Snippet; danger?: boolean; disabled?: boolean; onSelect?: (event: Event) => void; children: Snippet;
}
```

## context-menu/context-menu-sub.svelte

Exports: `ContextMenuSubProps`

### ContextMenuSubProps

```ts
interface ContextMenuSubProps { label: string; children: Snippet;
}
```

## context-menu/context-menu.svelte

Exports: `ContextMenuProps`

### ContextMenuProps

```ts
interface ContextMenuProps { open?: boolean; color?: RxColor; variant?: 'default' | 'radial'; children: Snippet; content: Snippet;
}
```

## cursor/cursor.ts

Exports: `CursorVariant`, `CursorOptions`, `cursor`

## dock/dock.svelte

Exports: `DockItem`, `DockProps`

### DockProps

```ts
interface DockProps { items:DockItem[]; color?:RxColor; variant?:'default'|'aurora'|'bounce'|'glass'|'gooey'|'magnet'|'neon'; placement?:'top'|'bottom'|'left'|'right'; magnification?:number; distance?:number; onSelect?:(item:DockItem)=>void;
}
```

## dot-stepper/dot-stepper.svelte

Exports: `DotStepperProps`

### DotStepperProps

```ts
interface DotStepperProps { current?:number; count:number; color?:RxColor; variant?:'default'|'bars'|'elastic'|'glow'|'ring'|'worm'; labels?:string[]; disabled?:boolean; onCurrentChange?:(index:number)=>void;
}
```

## drawer/drawer.svelte

Exports: `DrawerProps`

### DrawerProps

```ts
interface DrawerProps {open?:boolean;placement?:'left'|'right'|'top'|'bottom';size?:string;overlay?:boolean;preventClose?:boolean;title?:string|Snippet;footer?:Snippet;children:Snippet;trigger?:Snippet;onOpenChange?:(open:boolean)=>void
}
```

## dropdown/dropdown-group.svelte

Exports: `DropdownGroupProps`

### DropdownGroupProps

```ts
interface DropdownGroupProps { label: string; children: Snippet;
}
```

## dropdown/dropdown-item.svelte

Exports: `DropdownItemProps`

### DropdownItemProps

```ts
interface DropdownItemProps { icon?: Snippet; danger?: boolean; disabled?: boolean; onSelect?: (event: Event) => void; children: Snippet;
}
```

## dropdown/dropdown.svelte

Exports: `Side`, `DropdownProps`

### DropdownProps

```ts
interface DropdownProps {
		open?: boolean;
		trigger?: 'click' | 'hover';
		color?: RxColor;
		placement?: Side;
		children: Snippet;
		content: Snippet;
}
```

## file-tree/file-tree.svelte

Exports: `FileTreeNode`, `FileTreeProps`

### FileTreeProps

```ts
interface FileTreeProps {nodes:FileTreeNode[];expanded?:string[];selected?:string;color?:RxColor;variant?:'default'|'compact'|'glow'|'guides'|'highlight'|'reveal';selectionMode?:'single'|'none';onExpandedChange?:(ids:string[])=>void;onSelectedChange?:(id:string|undefined)=>void;onActivate?:(node:FileTreeNode)=>void
}
```

## indicator/index.ts

Exports: `indicatorVariants`, `IndicatorVariantProps`

## indicator/indicator.svelte

Exports: `IndicatorProps`

### IndicatorProps

```ts
interface IndicatorProps {
		variant?: 'dot' | 'ring' | 'pulse' | 'count' | 'odometer' | 'icon' | 'border';
		color?: RxColor;
		content?: string | number;
		icon?: Snippet;
		position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
		offset?: boolean;
		children?: Snippet;
}
```

## inline-overflow/inline-overflow.svelte

Exports: `InlineOverflowProps`

### InlineOverflowProps

```ts
interface InlineOverflowProps {items:Snippet[];gap?:string;moreLabel?:string;color?:RxColor;priority?:'start'|'end'
}
```

## input-number/input-number.svelte

Exports: `InputNumberProps`

### InputNumberProps

```ts
interface InputNumberProps {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		disabled?: boolean;
}
```

## input-otp/input-otp.svelte

Exports: `InputOtpProps`

### InputOtpProps

```ts
interface InputOtpProps { value?: string; length?: number; type?: 'numeric' | 'text'; color?: RxColor; size?: 'lg' | 'default' | 'sm'; masked?: boolean; state?: 'default' | 'success' | 'danger'; disabled?: boolean; onComplete?: (value: string) => void;
}
```

## input/index.ts

Exports: `inputVariants`, `InputVariantProps`

## input/input.svelte

Exports: `InputProps`

### InputProps

```ts
interface InputProps {
		value?: string;
		variant?: 'default' | 'shadow' | 'border' | 'filled' | 'gradient-border' | 'pulse' | 'spotlight' | 'underline';
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		label?: string;
		labelPlaceholder?: boolean;
		state?: 'default' | 'success' | 'danger' | 'warn';
		message?: string | Snippet;
		icon?: Snippet;
		iconAfter?: boolean;
		loading?: boolean;
}
```

## link-bar/link-bar.svelte

Exports: `LinkBarItem`, `LinkBarProps`

### LinkBarProps

```ts
interface LinkBarProps { items: LinkBarItem[]; active?: string; color?: RxColor; variant?: 'default'|'glow'|'magnet'|'pill'|'slide'|'underline'; onActiveChange?: (id: string) => void;
}
```

## list/list.svelte

Exports: `ListItem`, `ListProps`

### ListProps

```ts
interface ListProps {items:ListItem[];selected?:string|string[];selectionMode?:'none'|'single'|'multiple';color?:RxColor;variant?:'default'|'cards'|'glow'|'hover'|'reveal'|'stripe';onSelectedChange?:(value:string|string[]|undefined)=>void;onActivate?:(item:ListItem)=>void
}
```

## nav-menu/nav-menu.svelte

Exports: `NavMenuItem`, `NavMenuProps`

### NavMenuProps

```ts
interface NavMenuProps {items:NavMenuItem[];value?:string;color?:RxColor;variant?:'default'|'glow'|'mega'|'pill'|'spotlight'|'underline';orientation?:'horizontal'|'vertical';onValueChange?:(value:string)=>void;
}
```

## notification/notification.svelte

Exports: `NotificationProps`

### NotificationProps

```ts
interface NotificationProps { item: NotificationItem;
}
```

## notification/notify.svelte.ts

Exports: `NotifyVariant`, `NotifyPosition`, `NotifyOptions`, `NotifyHandle`, `NotificationItem`, `notificationState`, `dismissNotification`, `registerNotificationOutlet`, `pauseNotification`, `resumeNotification`, `notify`, `resetNotificationsForTesting`

## pagination/pagination.svelte

Exports: `PaginationProps`

### PaginationProps

```ts
interface PaginationProps { page?:number;count:number;perPage?:number;siblingCount?:number;color?:RxColor;variant?:'default'|'compact'|'dots'|'gooey'|'ink'|'segments';showEdges?:boolean;showControls?:boolean;showGoto?:boolean;disabled?:boolean;onPageChange?:(page:number)=>void
}
```

## pagination/range.ts

Exports: `PageToken`, `pageCount`, `clampPage`, `paginationRange`

## popup/confirm-popup.svelte

Exports: `ConfirmPopupProps`

### ConfirmPopupProps

```ts
interface ConfirmPopupProps {open?:boolean;title?:string;message:string;confirmLabel?:string;cancelLabel?:string;destructive?:boolean;color?:RxColor;onConfirm?:()=>void;onCancel?:()=>void;onOpenChange?:(open:boolean)=>void
}
```

## popup/popup.svelte

Exports: `PopupProps`

### PopupProps

```ts
interface PopupProps {open?:boolean;transition?:'zoom'|'bounce'|'flip'|'slide-up'|'fade';color?:RxColor;title?:string|Snippet;fullscreen?:boolean;preventClose?:boolean;footer?:Snippet;children:Snippet;trigger?:Snippet;onOpenChange?:(open:boolean)=>void
}
```

## progress/index.ts

Exports: `progressVariants`, `ProgressVariantProps`

## progress/progress.svelte

Exports: `ProgressProps`

### ProgressProps

```ts
interface ProgressProps {
		value?: number;
		max?: number;
		variant?: 'default' | 'glow' | 'gradient' | 'striped' | 'segments';
		shape?: 'line' | 'circle';
		segments?: number;
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		label?: Snippet | boolean;
}
```

## radio-group/context.ts

Exports: `RADIO_GROUP`, `RadioGroupContext`

## radio-group/index.ts

Exports: `radioVariants`, `RadioVariantProps`

## radio-group/radio-group.svelte

Exports: `RadioGroupProps`

### RadioGroupProps

```ts
interface RadioGroupProps {
		value?: string; color?: RxColor; size?: 'lg' | 'default' | 'sm'; orientation?: 'vertical' | 'horizontal';
		disabled?: boolean; children: Snippet; onValueChange?: (value: string) => void;
}
```

## radio-group/radio.svelte

Exports: `RadioProps`

### RadioProps

```ts
interface RadioProps {
		value: string; disabled?: boolean; children?: Snippet;
}
```

## rating/rating.svelte

Exports: `RatingProps`

### RatingProps

```ts
interface RatingProps {
		value?: number; max?: number; halves?: boolean; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		readonly?: boolean; disabled?: boolean; icon?: Snippet<[{ filled: boolean; half: boolean
}
```

## scrollbar/scrollbar.svelte

Exports: `ScrollbarProps`

### ScrollbarProps

```ts
interface ScrollbarProps { orientation?:'vertical'|'horizontal'|'both'; color?:RxColor; variant?:'default'|'dots'|'glow'|'gradient'|'minimal'|'rounded'; size?:'sm'|'default'|'lg'; hideDelay?:number; children:Snippet;
}
```

## select/context.ts

Exports: `SelectContext`, `setSelectContext`, `getSelectContext`

## select/select-group.svelte

Exports: `SelectGroupProps`

### SelectGroupProps

```ts
interface SelectGroupProps { label: string; children: Snippet;
}
```

## select/select-item.svelte

Exports: `SelectItemProps`

### SelectItemProps

```ts
interface SelectItemProps { value: string; label?: string; disabled?: boolean; children?: Snippet;
}
```

## select/select.svelte

Exports: `SelectProps`

### SelectProps

```ts
interface SelectProps {
		value?: string | string[]; multiple?: boolean; filter?: boolean; chips?: boolean;
		label?: string; placeholder?: string; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		variant?: 'default' | 'floating' | 'pill' | 'search' | 'slide' | 'underline';
		state?: 'default' | 'success' | 'danger' | 'warn'; message?: string | Snippet;
		disabled?: boolean; loading?: boolean; children: Snippet;
		onValueChange?: (value: string | string[]) => void;
}
```

## separator/separator.svelte

Exports: `SeparatorOrientation`, `SeparatorVariant`, `SeparatorProps`

### SeparatorProps

```ts
interface SeparatorProps { orientation?: SeparatorOrientation; variant?: SeparatorVariant; color?: RxColor; children?: Snippet;
}
```

## sidebar/sidebar.svelte

Exports: `SidebarItem`, `SidebarProps`

### SidebarProps

```ts
interface SidebarProps {items:SidebarItem[];active?:string;open?:boolean;collapsed?:boolean;color?:RxColor;variant?:'default'|'classic'|'floating'|'glow'|'gradient'|'minimal'|'rail';side?:'left'|'right';header?:Snippet;footer?:Snippet;onActiveChange?:(id:string)=>void;
}
```

## skeleton/skeleton.svelte

Exports: `SkeletonVariant`, `SkeletonShape`, `SkeletonProps`

### SkeletonProps

```ts
interface SkeletonProps { variant?: SkeletonVariant; shape?: SkeletonShape; loading?: boolean; children?: Snippet;
}
```

## slide-confirm/slide-confirm.svelte

Exports: `SlideConfirmProps`

### SlideConfirmProps

```ts
interface SlideConfirmProps { confirmed?:boolean;color?:RxColor;label?:string;confirmedLabel?:string;threshold?:number;disabled?:boolean;loading?:boolean;resettable?:boolean;icon?:Snippet;confirmedIcon?:Snippet;onConfirm?:()=>void;onConfirmedChange?:(confirmed:boolean)=>void;
}
```

## slider/slider.svelte

Exports: `SliderProps`

### SliderProps

```ts
interface SliderProps {
		value?: number[]; min?: number; max?: number; step?: number; color?: RxColor;
		size?: 'lg' | 'default' | 'sm'; knob?: 'circle' | 'square';
		tooltip?: 'hover' | 'always' | 'none'; ticks?: boolean; disabled?: boolean;
		onValueChange?: (value: number[]) => void;
}
```

## spacer/spacer.svelte

Exports: `SpacerProps`

### SpacerProps

```ts
interface SpacerProps { width?: string; height?: string; grow?: boolean;
}
```

## spinner/spinner.svelte

Exports: `SpinnerType`, `SpinnerSize`, `SpinnerProps`, `spinnerSizeClass`

### SpinnerProps

```ts
interface SpinnerProps {
		type?: SpinnerType;
		color?: RxColor;
		size?: SpinnerSize;
		text?: Snippet;
}
```

## split-button/split-button.svelte

Exports: `SplitButtonProps`

### SplitButtonProps

```ts
interface SplitButtonProps {label:string;color?:RxColor;variant?:ButtonProps['variant'];disabled?:boolean;loading?:boolean;onclick?:(event:MouseEvent)=>void;menu:Snippet;icon?:Snippet
}
```

## steps/context.ts

Exports: `StepRecord`, `StepsContext`, `setStepsContext`, `getStepsContext`

## steps/step.svelte

Exports: `StepProps`

### StepProps

```ts
interface StepProps { title:string; description?:string; icon?:Snippet; disabled?:boolean; error?:boolean; optional?:boolean; children?:Snippet;
}
```

## steps/steps.svelte

Exports: `StepsProps`

### StepsProps

```ts
interface StepsProps { current?: number; orientation?: 'horizontal'|'vertical'; color?: RxColor; variant?: 'default'|'arrow'|'bar'|'circular'|'pills'|'timeline'; linear?: boolean; clickable?: boolean; onCurrentChange?: (index:number)=>void; children: Snippet;
}
```

## switch/index.ts

Exports: `switchVariants`, `SwitchVariantProps`

## switch/switch.svelte

Exports: `SwitchProps`

### SwitchProps

```ts
interface SwitchProps {
		checked?: boolean; color?: RxColor; size?: 'lg' | 'default' | 'sm'; shape?: 'pill' | 'square';
		loading?: boolean; disabled?: boolean; on?: Snippet; off?: Snippet;
		onCheckedChange?: (checked: boolean) => void;
}
```

## table/table.svelte

Exports: `SortDirection`, `TableColumn`, `TableProps`

### TableProps

```ts
interface TableProps {data:T[];columns:TableColumn<T>[];rowId:(row:T)=>string;color?:RxColor;variant?:'default'|'bordered'|'cards'|'glow'|'minimal'|'striped';sorting?:{id:string;direction:SortDirection
}
```

## tabs/context.ts

Exports: `TabsVariant`, `TabsContext`, `setTabsContext`, `getTabsContext`

## tabs/tabs-content.svelte

Exports: `TabsContentProps`

### TabsContentProps

```ts
interface TabsContentProps {value:string;children:Snippet
}
```

## tabs/tabs-list.svelte

Exports: `TabsListProps`

### TabsListProps

```ts
interface TabsListProps { children: Snippet
}
```

## tabs/tabs-trigger.svelte

Exports: `TabsTriggerProps`

### TabsTriggerProps

```ts
interface TabsTriggerProps { value: string; disabled?: boolean; icon?: Snippet; children: Snippet;
}
```

## tabs/tabs.svelte

Exports: `TabsProps`

### TabsProps

```ts
interface TabsProps { value?:string; orientation?:'horizontal'|'vertical'; activationMode?:'automatic'|'manual'; color?:RxColor; variant?:'default'|'bubble'|'card'|'chrome'|'gooey'|'neon'; onValueChange?:(value:string)=>void; children:Snippet;
}
```

## textarea/textarea.svelte

Exports: `TextareaProps`

### TextareaProps

```ts
interface TextareaProps {
		value?: string;
		variant?: 'default' | 'shadow' | 'border' | 'filled' | 'gradient-border' | 'pulse' | 'spotlight' | 'underline' | 'code';
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		label?: string;
		labelPlaceholder?: boolean;
		state?: 'default' | 'success' | 'danger' | 'warn';
		message?: string | Snippet;
		autoResize?: boolean;
}
```

## tick-rail/tick-rail.svelte

Exports: `TickRailProps`

### TickRailProps

```ts
interface TickRailProps {value?:number;min?:number;max?:number;step?:number;color?:RxColor;orientation?:'horizontal'|'vertical';formatValue?:(value:number)=>string;onValueChange?:(value:number)=>void
}
```

## timeline/timeline.svelte

Exports: `TimelineItem`, `TimelineProps`

### TimelineProps

```ts
interface TimelineProps {items:TimelineItem[];color?:RxColor;variant?:'default'|'alternating'|'cards'|'compact'|'glow'|'gradient';orientation?:'vertical'|'horizontal'
}
```

## tooltip/tooltip.svelte

Exports: `TooltipProps`

### TooltipProps

```ts
interface TooltipProps {
		content: string | Snippet;
		side?: 'top' | 'right' | 'bottom' | 'left';
		align?: 'start' | 'center' | 'end';
		color?: RxColor;
		variant?: 'default' | 'border' | 'shadow';
		delayDuration?: number;
		children: Snippet;
}
```

## transform/transform.svelte

Exports: `TransformProps`

### TransformProps

```ts
interface TransformProps {show?:boolean;variant?:'expand'|'fade'|'flip'|'scale'|'slide';direction?:'up'|'right'|'down'|'left';duration?:number;keepMounted?:boolean;onComplete?:(show:boolean)=>void;children:Snippet
}
```

## upload/upload.svelte

Exports: `UploadFile`, `UploadRejection`, `UploadProps`

### UploadProps

```ts
interface UploadProps { files?: UploadFile[]; accept?: string; multiple?: boolean; maxSize?: number; maxFiles?: number; color?: RxColor; disabled?: boolean; label?: string | Snippet; onFilesAdded?: (added: UploadFile[]) => void; onFileRemoved?: (file: UploadFile) => void; onRejected?: (rejections: UploadRejection[]) => void
}
```
