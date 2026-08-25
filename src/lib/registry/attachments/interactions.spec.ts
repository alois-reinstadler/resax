import { describe, expect, it } from 'vitest';
import { magnetic } from './magnetic';
import { neighborLight, refreshNeighborLights } from './neighbor-light';
import { pointerPosition } from './pointer-position';
import { proximityGlow } from './proximity-glow';
import { ripple } from './ripple';
import { tilt3d } from './tilt3d';

describe('interaction attachments on the server', () => {
	it('imports without touching browser globals', () => {
		expect(proximityGlow).toBeTypeOf('function');
		expect(neighborLight).toBeTypeOf('function');
		expect(refreshNeighborLights).toBeTypeOf('function');
		expect(pointerPosition).toBeTypeOf('function');
		expect(magnetic).toBeTypeOf('function');
		expect(tilt3d).toBeTypeOf('function');
		expect(ripple).toBeTypeOf('function');
	});
});
