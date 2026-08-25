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
interface AccordionProps { value?: AccordionValue; mode?: 'single' | 'multiple'; collapsible?: boolean; disabled?: boolean; color?: RxColor; variant?: 'default' | 'filled' | 'ghost'; effect?: 'none' | 'bounce' | 'glow' | 'slide'; layout?: 'separated' | 'contained' | 'line'; size?: 'sm' | 'md' | 'lg'; radius?: 'none' | 'subtle' | 'rounded' | 'squircle'; tone?: 'default' | 'danger' | 'warning' | 'success'; onValueChange?: (value: AccordionValue) => void; children: Snippet;
}
```

## accordion/context.ts

Exports: `AccordionMode`, `AccordionVariant`, `AccordionEffect`, `AccordionLayout`, `AccordionSize`, `AccordionRadius`, `AccordionTone`, `AccordionContext`, `setAccordionContext`, `getAccordionContext`

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
		dismissAfter?: number;
		onClose?: () => void;
		onOpenChange?: (open: boolean) => void;
		children?: Snippet;
}
```

## alert/index.ts

Exports: `alertVariants`, `AlertVariantProps`

## ask-ai-button/ask-ai-button.svelte

Exports: `AskAiButtonProps`

### AskAiButtonProps

```ts
interface AskAiButtonProps {
		label?: string;
		loading?: boolean;
		color?: RxColor;
		speed?: number;
		glow?: number;
		radius?: 'rounded' | 'none' | 'subtle' | 'pill' | 'squircle';
		sparkle?: Snippet;
		onask?: (detail: { label: string
}
```

## avatar/avatar-group.svelte

Exports: `AvatarGroupProps`

### AvatarGroupProps

```ts
interface AvatarGroupProps { max?: number; float?: boolean; variant?: 'base' | 'fan' | 'flip' | 'grid' | 'ring' | 'wave'; columns?: number; flipLabel?: string; children: Snippet;
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
		variant?: 'base' | 'glow' | 'ring' | 'squircle' | 'status' | 'tilt';
		badge?: string | number | boolean;
		badgeColor?: RxColor;
		status?: 'online' | 'idle' | 'dnd' | 'offline';
		statusPulse?: boolean;
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
		appearance?: 'soft' | 'solid' | 'outline'; animated?: boolean; duration?: number;
		content?: string | number; dot?: boolean; position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'; children?: Snippet;
}
```

## badge/index.ts

Exports: `badgeVariants`, `BadgeVariantProps`

## breadcrumb/breadcrumb.svelte

Exports: `BreadcrumbItem`, `BreadcrumbProps`

### BreadcrumbProps

```ts
interface BreadcrumbProps { items:BreadcrumbItem[]; color?:RxColor; variant?:'default'|'arrow'|'collapse'|'pill'|'slash'|'glow'; maxItems?:number; separator?:string|Snippet; onNavigate?:(item:BreadcrumbItem,index:number)=>void
}
```

## button-group/button-group.svelte

Exports: `ButtonGroupProps`

### ButtonGroupProps

```ts
interface ButtonGroupProps {orientation?:'horizontal'|'vertical';attached?:boolean;block?:boolean;gap?:number;disabled?:boolean;children:Snippet
}
```

## button/button.svelte

Exports: `ButtonVariant`, `ButtonProps`

### ButtonProps

```ts
interface ButtonProps {
		variant?: ButtonVariant;
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
		reach?: number;
		stiffness?: number;
		damping?: number;
		lag?: number;
		gooStrength?: number;
		squash?: number;
		filaments?: 0 | 1 | 2;
		droplets?: 0 | 1 | 2 | 3 | 4;
		gravity?: number;
		drag?: number;
		sag?: number;
		/** Chrome rim width in pixels (source: 1–6). */
		thickness?: number;
		/** Chrome field playback speed as a percentage (source: 0–400). */
		speed?: number;
		/** Chrome shard drift/noise amount as a percentage (source: 0–100). */
		chaos?: number;
		/** Chrome prismatic dispersion as a percentage (source: 0–100). */
		prism?: number;
		/** Invert label motion blur in pixels (source: 0–14). */
		blur?: number;
		children: Snippet;
		icon?: Snippet;
		onclick?: (event: MouseEvent) => void;
}
```

## button/index.ts

Exports: `buttonVariants`, `ButtonVariantProps`

## calendar/calendar.svelte

Exports: `CalendarValue`, `CalendarVariant`, `CalendarProps`

### CalendarProps

```ts
interface CalendarProps {
		value?: CalendarValue; mode?: 'single' | 'multiple' | 'range'; variant?: CalendarVariant;
		color?: RxColor; size?: 'sm' | 'default' | 'lg'; radius?: 'none' | 'subtle' | 'rounded' | 'pill' | 'squircle';
		minValue?: DateValue; maxValue?: DateValue; disabled?: boolean; glow?: boolean;
		isDateUnavailable?: (date: DateValue) => boolean; events?: (date: DateValue) => boolean | number;
		numberOfMonths?: number; onValueChange?: (value: CalendarValue | undefined) => void;
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
		variant?: CalendarVariant;
		radius?: 'none' | 'subtle' | 'rounded' | 'pill' | 'squircle';
		glow?: boolean;
		events?: (date: DateValue) => boolean | number;
		onValueChange?: (value: CalendarValue | undefined) => void;
		label?: string;
		placeholder?: string;
		state?: 'default' | 'success' | 'danger' | 'warn';
		message?: string | Snippet;
		size?: 'lg' | 'default' | 'sm';
}
```

## card/card.svelte

Exports: `CardSlide`, `CardProps`

### CardProps

```ts
interface CardProps {
		variant?: 'default' | 'shadow' | 'border' | 'flat' | 'reveal' | 'zoom' | 'asset' | 'glow' | 'gradient-border' | 'lift' | 'slider' | 'spotlight' | 'tilt-3d';
		color?: RxColor;
		href?: string;
		size?: 'sm' | 'md' | 'lg';
		radius?: 'rounded' | 'none' | 'subtle' | 'pill' | 'squircle';
		disabled?: boolean;
		media?: Snippet;
		header?: Snippet;
		footer?: Snippet;
		actions?: Snippet;
		children?: Snippet;
		slides?: CardSlide[];
		autoplay?: number;
		onslidechange?: (index: number) => void;
}
```

## card/index.ts

Exports: `cardVariants`, `CardVariantProps`

## checkbox/checkbox.svelte

Exports: `CheckboxVariant`, `CheckboxRadius`, `CheckboxProps`

### CheckboxProps

```ts
interface CheckboxProps {
		checked?: boolean; indeterminate?: boolean; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		variant?: CheckboxVariant; radius?: CheckboxRadius; labelPosition?: 'left' | 'right'; glow?: boolean;
		lineThrough?: boolean; disabled?: boolean; children?: Snippet; description?: Snippet;
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
		variant?: 'default' | 'flat' | 'border' | 'bounce' | 'fill' | 'glow' | 'gradient' | 'outline'; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		closable?: boolean; onClose?: () => void; disabled?: boolean; selectable?:boolean; selected?:boolean; onSelectedChange?:(selected:boolean)=>void; icon?: Snippet; children: Snippet;
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
interface ColorPickerProps { value?: string; variant?:'base'|'compact'|'palette'|'ring'|'slider'|'swatches'; alpha?: boolean; swatches?: string[]; color?: RxColor; size?: 'lg' | 'default' | 'sm'; disabled?: boolean; open?:boolean; onValueChange?: (value: string) => void
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
interface ContextMenuItemProps { icon?: Snippet; value?: string; selected?: boolean; shortcut?: string; href?: string; external?: boolean; danger?: boolean; disabled?: boolean; onSelect?: (event: Event, value?: string) => void; children: Snippet;
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

Exports: `ContextMenuVariant`, `ContextMenuSize`, `ContextMenuRadius`, `ContextMenuProps`

### ContextMenuProps

```ts
interface ContextMenuProps {open?:boolean;color?:RxColor;variant?:ContextMenuVariant;size?:ContextMenuSize;radius?:ContextMenuRadius;glow?:boolean;disabled?:boolean;children:Snippet;content:Snippet;onOpenChange?:(open:boolean)=>void
}
```

## cursor/cursor.ts

Exports: `CursorVariant`, `CursorOptions`, `cursor`

## dock/dock.svelte

Exports: `DockItem`, `DockProps`

### DockProps

```ts
interface DockProps {
		items:DockItem[]; active?:string; color?:RxColor; variant?:'default'|'aurora'|'bounce'|'glass'|'gooey'|'magnet'|'neon';
		placement?:'top'|'bottom'|'left'|'right'; size?:'sm'|'default'|'lg'; radius?:'none'|'subtle'|'rounded'|'pill'|'squircle'; tone?:'default'|'danger'|'warn'|'success'; magnification?:number; distance?:number;
		magnify?:boolean; bounce?:boolean; tilt?:boolean; goo?:boolean; magnetic?:boolean; tooltips?:boolean; pulse?:boolean; disabled?:boolean; onSelect?:(item:DockItem)=>void; onActiveChange?:(id:string)=>void;
}
```

## dot-stepper/dot-stepper.svelte

Exports: `DotStepperProps`

### DotStepperProps

```ts
interface DotStepperProps { current?:number; count:number; color?:RxColor; variant?:'default'|'bars'|'elastic'|'glow'|'ring'|'worm'; orientation?:'horizontal'|'vertical'; labels?:string[]; disabled?:boolean; onCurrentChange?:(index:number)=>void;
}
```

## drawer/drawer.svelte

Exports: `DrawerPlacement`, `DrawerVariant`, `DrawerFrost`, `DrawerBounce`, `DrawerProps`

### DrawerProps

```ts
interface DrawerProps {open?:boolean;placement?:DrawerPlacement;variant?:DrawerVariant;size?:string;color?:RxColor;overlay?:boolean;gradient?:boolean;preventClose?:boolean;closeHidden?:boolean;title?:string|Snippet;footer?:Snippet;children:Snippet;trigger?:Snippet;blurAmount?:number;frost?:DrawerFrost;bounce?:DrawerBounce;pushScale?:boolean;slideDepth?:number;onOpenChange?:(open:boolean)=>void
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
interface DropdownItemProps { icon?: Snippet; value?: string; selected?: boolean; shortcut?: string; badge?: string; href?: string; external?: boolean; danger?: boolean; disabled?: boolean; onSelect?: (event: Event, value?: string) => void; children: Snippet;
}
```

## dropdown/dropdown.svelte

Exports: `Side`, `DropdownVariant`, `DropdownSize`, `DropdownRadius`, `DropdownProps`

### DropdownProps

```ts
interface DropdownProps {open?:boolean;trigger?:'click'|'hover';color?:RxColor;placement?:Side;variant?:DropdownVariant;size?:DropdownSize;radius?:DropdownRadius;disabled?:boolean;blur?:number;depth?:number;intensity?:number;distance?:number;bounce?:number;children:Snippet;content:Snippet;onOpenChange?:(open:boolean)=>void
}
```

## file-tree/file-tree.svelte

Exports: `FileTreeNode`, `FileTreeProps`

### FileTreeProps

```ts
interface FileTreeProps {nodes:FileTreeNode[];expanded?:string[];selected?:string;color?:RxColor;variant?:'default'|'compact'|'glow'|'guides'|'highlight'|'reveal';radius?:'subtle'|'rounded'|'pill'|'squircle';selectionMode?:'single'|'none';disabled?:boolean;ariaLabel?:string;onExpandedChange?:(ids:string[])=>void;onSelectedChange?:(id:string|undefined)=>void;onActivate?:(node:FileTreeNode)=>void
}
```

## indicator/index.ts

Exports: `indicatorVariants`, `IndicatorVariantProps`

## indicator/indicator.svelte

Exports: `IndicatorProps`

### IndicatorProps

```ts
interface IndicatorProps {
		variant?: 'base' | 'dot' | 'bounce' | 'odometer' | 'ping' | 'ring' | 'shake' | 'pulse' | 'count' | 'icon' | 'border';
		color?: RxColor;
		content?: string | number;
		count?: number;
		max?: number;
		dot?: boolean;
		showZero?: boolean;
		pulse?: boolean;
		size?: 'sm' | 'md' | 'lg';
		roll?: number;
		icon?: Snippet;
		position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
		offset?: boolean;
		children?: Snippet;
}
```

## inline-overflow/inline-overflow.svelte

Exports: `InlineOverflowItem`, `InlineOverflowProps`

### InlineOverflowProps

```ts
interface InlineOverflowProps { items:Array<InlineOverflowItem|Snippet|string>; visible?:number; open?:boolean; size?:'sm'|'md'|'lg'; radius?:'pill'|'rounded'|'squircle'; color?:RxColor; stiffness?:number; damping?:number; stagger?:number; lag?:number; blur?:number; squash?:number; disabled?:boolean; onOpenChange?:(open:boolean)=>void; onSelect?:(item:InlineOverflowItem,index:number)=>void
}
```

## input-number/input-number.svelte

Exports: `InputNumberVariant`, `InputNumberProps`

### InputNumberProps

```ts
interface InputNumberProps {
		value?: number; min?: number; max?: number; step?: number; color?: RxColor;
		size?: 'lg' | 'default' | 'sm'; variant?: InputNumberVariant; disabled?: boolean;
		frame?: 'default' | 'bare'; prefix?: string; suffix?: string; decimals?: number; separator?: string; pad?: number; gap?: number;
		duration?: number; intensity?: number; draggable?: boolean; controlsSide?: 'left' | 'right'; glow?: boolean; startOnView?: boolean;
		onValueChange?: (value: number) => void; onComplete?: (value: number) => void;
}
```

## input-otp/input-otp.svelte

Exports: `InputOtpVariant`, `InputOtpProps`

### InputOtpProps

```ts
interface InputOtpProps {
		value?: string; length?: number; type?: 'numeric' | 'text'; color?: RxColor;
		size?: 'lg' | 'default' | 'sm'; variant?: InputOtpVariant;
		radius?: 'subtle' | 'rounded' | 'pill' | 'squircle'; masked?: boolean;
		state?: 'default' | 'success' | 'danger'; disabled?: boolean;
		autoFocus?: boolean; autofocus?: boolean;
		onComplete?: (value: string) => void;
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
		clearable?: boolean;
		onClear?: () => void;
}
```

## link-bar/link-bar.svelte

Exports: `LinkBarItem`, `LinkBarProps`

### LinkBarProps

```ts
interface LinkBarProps { items:LinkBarItem[];active?:string;color?:RxColor;variant?:'default'|'glow'|'magnet'|'pill'|'slide'|'underline';size?:'sm'|'md'|'lg';tone?:'default'|'danger'|'success'|'warn';separated?:boolean;strength?:number;ariaLabel?:string;onActiveChange?:(id:string)=>void
}
```

## list/list.svelte

Exports: `ListItem`, `ListAction`, `ListProps`

### ListProps

```ts
interface ListProps {items:ListItem[];actions?:ListAction[];leadingActions?:ListAction[];selected?:string|string[];active?:string;selectionMode?:'none'|'single'|'multiple';ariaLabel?:string;color?:RxColor;variant?:'default'|'cards'|'glow'|'hover'|'reveal'|'stripe';size?:'sm'|'md'|'lg';radius?:'none'|'subtle'|'rounded'|'pill'|'squircle';plain?:boolean;gap?:number;lift?:number;glowSize?:number;stagger?:number;stripe?:number;threshold?:number;fullSwipeRatio?:number;swipeToDelete?:boolean;reorderable?:boolean;disabled?:boolean;glow?:boolean;onSelectedChange?:(value:string|string[]|undefined)=>void;onActivate?:(item:ListItem)=>void;onAction?:(item:ListItem,action:ListAction)=>void;onRemove?:(item:ListItem)=>void;onReorder?:(items:ListItem[])=>void
}
```

## nav-menu/nav-menu.svelte

Exports: `NavMenuItem`, `NavMenuProps`

### NavMenuProps

```ts
interface NavMenuProps {items:NavMenuItem[];value?:string;active?:string;color?:RxColor;variant?:'default'|'glow'|'mega'|'pill'|'spotlight'|'underline';surface?:'solid'|'ghost';tone?:'default'|'danger'|'warn'|'success';radius?:'subtle'|'rounded'|'pill'|'squircle';orientation?:'horizontal'|'vertical';bounce?:number;intensity?:number;stagger?:number;fill?:number;spotlight?:number;thickness?:number;disabled?:boolean;onValueChange?:(value:string)=>void;onSelect?:(item:NavMenuItem)=>void;
}
```

## notification/notification.svelte

Exports: `NotificationProps`, `notificationIn`, `notificationOut`

### NotificationProps

```ts
interface NotificationProps {item:NotificationItem
}
```

## notification/notify.svelte.ts

Exports: `NotifyVariant`, `NotifySurface`, `NotifyPosition`, `NotifyState`, `NotifyAction`, `NotifyOptions`, `NotifyHandle`, `NotificationItem`, `notificationState`, `dismissNotification`, `registerNotificationOutlet`, `pauseNotification`, `resumeNotification`, `notify`, `resetNotificationsForTesting`

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
interface ConfirmPopupProps {open?:boolean;title?:string;message:string;confirmLabel?:string;cancelLabel?:string;destructive?:boolean;color?:RxColor;preventClose?:boolean;onConfirm?:()=>void;onCancel?:()=>void;onOpenChange?:(open:boolean)=>void
}
```

## popup/popup.svelte

Exports: `PopupTransition`, `PopupSize`, `PopupRadius`, `PopupProps`

### PopupProps

```ts
interface PopupProps {open?:boolean;transition?:PopupTransition;color?:RxColor;title?:string|Snippet;size?:PopupSize;width?:string;radius?:PopupRadius;fullscreen?:boolean;preventClose?:boolean;closeHidden?:boolean;bodyScroll?:boolean;speed?:number;confirm?:boolean;footer?:Snippet;children:Snippet;trigger?:Snippet;onOpenChange?:(open:boolean)=>void
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
		animationDuration?: number;
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		label?: Snippet | boolean;
}
```

## radio-group/context.ts

Exports: `RADIO_GROUP`, `RadioGroupVariant`, `RadioGroupContext`

## radio-group/index.ts

Exports: `radioVariants`, `RadioVariantProps`

## radio-group/radio-group.svelte

Exports: `RadioGroupProps`

### RadioGroupProps

```ts
interface RadioGroupProps {
		value?: string; color?: RxColor; size?: 'lg' | 'default' | 'sm'; orientation?: 'vertical' | 'horizontal';
		variant?: RadioGroupVariant; disabled?: boolean; children: Snippet; onValueChange?: (value: string) => void;
}
```

## radio-group/radio.svelte

Exports: `RadioVariant`, `RadioProps`

### RadioProps

```ts
interface RadioProps {
		value: string; disabled?: boolean; variant?: RadioVariant; glow?: boolean; labelPosition?: 'left' | 'right'; children?: Snippet; description?: Snippet;
}
```

## rating/rating.svelte

Exports: `RatingVariant`, `RatingProps`

### RatingProps

```ts
interface RatingProps {
		value?: number; max?: number; halves?: boolean; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		variant?: RatingVariant; readonly?: boolean; disabled?: boolean; clearable?: boolean; showValue?: boolean;
		grayscale?: boolean; flat?: boolean; intensity?: 'low' | 'high'; beat?: 'soft' | 'strong'; shape?: 'square' | 'circle';
		icon?: 'star' | 'heart' | 'circle' | Snippet<[{ filled: boolean; half: boolean
}
```

## scrollbar/scrollbar.svelte

Exports: `ScrollbarProps`

### ScrollbarProps

```ts
interface ScrollbarProps {
		orientation?: 'vertical' | 'horizontal' | 'both'; ariaLabel?: string; color?: RxColor;
		variant?: 'default' | 'dots' | 'glow' | 'gradient' | 'minimal' | 'rounded';
		size?: 'sm' | 'default' | 'lg'; mode?: 'embedded' | 'bare' | 'page'; hideDelay?: number;
		autoHide?: boolean; smoothness?: number; smooth?: boolean; ghost?: boolean; ghostGradient?: boolean; overscroll?: boolean;
		intensity?: number; color2?: RxColor; showTrack?: boolean; maxHeight?: number; children?: Snippet;
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
interface SeparatorProps {orientation?:SeparatorOrientation;variant?:SeparatorVariant;color?:RxColor;tone?:'default'|'danger'|'warn'|'success';labelPosition?:'start'|'center'|'end';speed?:number;dash?:number;zigzagSize?:number;children?:Snippet;icon?:Snippet
}
```

## sidebar/sidebar.svelte

Exports: `SidebarItem`, `SidebarProps`

### SidebarProps

```ts
interface SidebarProps {items:SidebarItem[];active?:string;open?:boolean;collapsed?:boolean;color?:RxColor;variant?:'default'|'classic'|'floating'|'glow'|'gradient'|'minimal'|'rail';side?:'left'|'right';title?:string;collapsible?:boolean;dividers?:boolean;subDots?:boolean;glow?:boolean;scrollbar?:boolean;full?:boolean;flush?:boolean;disabled?:boolean;header?:Snippet;footer?:Snippet;onActiveChange?:(id:string)=>void
}
```

## skeleton/skeleton.svelte

Exports: `SkeletonVariant`, `SkeletonShape`, `SkeletonProps`

### SkeletonProps

```ts
interface SkeletonProps { variant?: SkeletonVariant; shape?: SkeletonShape; loading?: boolean; duration?: number; index?: number; angle?: number; intensity?: number; glow?: number; direction?: 'ltr' | 'rtl'; children?: Snippet;
}
```

## slide-confirm/slide-confirm.svelte

Exports: `SlideConfirmProps`

### SlideConfirmProps

```ts
interface SlideConfirmProps { confirmed?:boolean;color?:RxColor;label?:string;confirmedLabel?:string;threshold?:number;size?:'sm'|'md'|'lg';radius?:'none'|'subtle'|'rounded'|'pill'|'squircle';tone?:'default'|'success'|'danger'|'warning';stiffness?:number;damping?:number;block?:boolean;glow?:boolean;disabled?:boolean;loading?:boolean;resettable?:boolean;icon?:Snippet;confirmedIcon?:Snippet;onInput?:(progress:number)=>void;onCancel?:(progress:number)=>void;onReset?:()=>void;onConfirm?:()=>void;onConfirmedChange?:(confirmed:boolean)=>void;
}
```

## slider/slider.svelte

Exports: `SliderVariant`, `SliderStop`, `SliderProps`

### SliderProps

```ts
interface SliderProps {
		value?: number[]; min?: number; max?: number; step?: number; color?: RxColor;
		size?: 'lg' | 'default' | 'sm'; variant?: SliderVariant; knob?: 'circle' | 'square';
		tooltip?: 'hover' | 'always' | 'none'; ticks?: boolean; tickCount?: number; disabled?: boolean;
		label?: string; showValue?: boolean; radius?: 'none' | 'subtle' | 'rounded' | 'pill' | 'squircle';
		intensity?: number; fromColor?: RxColor; toColor?: RxColor; showNotches?: boolean;
		stops?: SliderStop[]; snap?: boolean; threshold?: number; dotCount?: number; dots?: boolean;
		stiffness?: number; damping?: number; lag?: number; blur?: number; squash?: number;
		block?: boolean; bare?: boolean;
		onValueChange?: (value: number[]) => void;
}
```

## spacer/spacer.svelte

Exports: `SpacerProps`

### SpacerProps

```ts
interface SpacerProps { size?:'none'|'xs'|'sm'|'md'|'lg'|'xl'|number|string; flex?:number; demo?:boolean; width?: string; height?: string; grow?: boolean;
}
```

## spinner/spinner.svelte

Exports: `SpinnerType`, `SpinnerSize`, `SpinnerProps`, `spinnerSizeClass`

### SpinnerProps

```ts
interface SpinnerProps {
		type?: SpinnerType;
		variant?: 'arc' | 'dual' | 'gradient';
		color?: RxColor;
		size?: SpinnerSize;
		duration?: number;
		easing?: 'linear' | 'ease' | 'ease-in-out';
		thickness?: number;
		track?: boolean;
		overlay?: boolean;
		label?: string;
		text?: Snippet;
}
```

## split-button/split-button.svelte

Exports: `SplitButtonProps`

### SplitButtonProps

```ts
interface SplitButtonProps {
		label: string;
		color?: RxColor;
		variant?: ButtonProps['variant'];
		size?: 'sm' | 'md' | 'lg';
		radius?: 'none' | 'subtle' | 'rounded' | 'pill' | 'squircle';
		tone?: 'default' | 'danger' | 'warn' | 'success';
		disabled?: boolean;
		loading?: boolean;
		open?: boolean;
		gap?: number;
		goo?: boolean;
		collapseOnSelect?: boolean;
		items?: string[];
		onclick?: (event: MouseEvent) => void;
		onopenchange?: (open: boolean) => void;
		onselect?: (detail: { index: number; value: string
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

Exports: `SwitchVariant`, `SwitchProps`

### SwitchProps

```ts
interface SwitchProps {
		checked?: boolean; color?: RxColor; size?: 'lg' | 'default' | 'sm'; shape?: 'pill' | 'rounded' | 'square'; variant?: SwitchVariant;
		loading?: boolean; disabled?: boolean; glow?: boolean; labelPosition?: 'left' | 'right'; on?: Snippet; off?: Snippet;
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
interface TabsProps { value?:string; orientation?:'horizontal'|'vertical'; activationMode?:'automatic'|'manual'; color?:RxColor; variant?:'default'|'bubble'|'card'|'chrome'|'gooey'|'neon'; size?:'sm'|'md'|'lg'; radius?:'none'|'subtle'|'rounded'|'pill'|'squircle'; block?:boolean; onValueChange?:(value:string)=>void; children:Snippet;
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
		resize?: 'none' | 'vertical' | 'horizontal' | 'both';
		clearable?: boolean;
		labelMaxChars?: number;
		block?: boolean;
		glow?: boolean;
		onClear?: () => void;
}
```

## tick-rail/tick-rail.svelte

Exports: `TickRailItem`, `TickRailProps`

### TickRailProps

```ts
interface TickRailProps { items?:TickRailItem[]; active?:number; value?:number; side?:'left'|'right'; size?:'sm'|'md'|'lg'; tone?:'default'|'danger'|'warning'|'success'; reach?:number; magnify?:number; stiffness?:number; damping?:number; stagger?:number; lag?:number; blur?:number; squash?:number; block?:boolean; disabled?:boolean; color?:RxColor; ariaLabel?:string; onActiveChange?:(index:number)=>void; onSelect?:(item:TickRailItem,index:number)=>void
}
```

## timeline/timeline.svelte

Exports: `TimelineItem`, `TimelineProps`

### TimelineProps

```ts
interface TimelineProps { items:TimelineItem[];color?:RxColor;variant?:'default'|'alternating'|'cards'|'compact'|'glow'|'gradient';orientation?:'vertical'|'horizontal';size?:'sm'|'md'|'lg';align?:'left'|'right'|'alternate';lineStyle?:'solid'|'dashed';progress?:number;flow?:boolean;pulse?:boolean;reveal?:boolean;glow?:boolean
}
```

## tooltip/tooltip.svelte

Exports: `TooltipMotion`, `TooltipSurface`, `TooltipRadius`, `TooltipProps`

### TooltipProps

```ts
interface TooltipProps { open?:boolean;content:string|Snippet;side?:'top'|'right'|'bottom'|'left';align?:'start'|'center'|'end';color?:RxColor;variant?:TooltipMotion;surface?:TooltipSurface;radius?:TooltipRadius;offset?:number;delayDuration?:number;disabled?:boolean;children:Snippet;onOpenChange?:(open:boolean)=>void
}
```

## transform/transform.svelte

Exports: `TransformProps`

### TransformProps

```ts
interface TransformProps {show?:boolean;open?:boolean;variant?:'morph'|'expand'|'fade'|'flip'|'scale'|'slide';direction?:'up'|'right'|'down'|'left';from?:'top'|'right'|'bottom'|'left';axis?:'x'|'y';placement?:'anchor'|'center';side?:'over'|'up'|'down';align?:'start'|'center';speed?:number;duration?:number;keepMounted?:boolean;label?:string;trigger?:Snippet;size?:'sm'|'md'|'lg';radius?:'none'|'subtle'|'rounded'|'pill'|'squircle';tone?:'default'|'danger'|'warn'|'success';disabled?:boolean;dismissable?:boolean;backdrop?:boolean;glow?:boolean;bounce?:boolean;blur?:number;softFade?:boolean;onComplete?:(show:boolean)=>void;onOpenChange?:(open:boolean)=>void;children:Snippet
}
```

## upload/upload.svelte

Exports: `UploadFile`, `UploadRejection`, `UploadProps`, `uploadFileMotion`

### UploadProps

```ts
interface UploadProps { files?: UploadFile[]; accept?: string; multiple?: boolean; maxSize?: number; maxFiles?: number; color?: RxColor; variant?: 'base'|'button'|'compact'|'dropzone'|'gallery'|'glow'; disabled?: boolean; label?: string | Snippet; onFilesAdded?: (added: UploadFile[]) => void; onFileRemoved?: (file: UploadFile) => void; onRejected?: (rejections: UploadRejection[]) => void
}
```
