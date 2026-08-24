export const AVATAR_GROUP = Symbol('rx-avatar-group');

export interface AvatarGroupContext {
	register: (id: symbol) => () => void;
	isVisible: (id: symbol) => boolean;
}
