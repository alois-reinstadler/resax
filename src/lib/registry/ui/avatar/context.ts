export const AVATAR_GROUP = Symbol('rx-avatar-group');

export interface AvatarGroupContext {
	register: (id: symbol) => () => void;
	isVisible: (id: symbol) => boolean;
	isExtra: (id: symbol) => boolean;
	flipLabel?: string;
}
