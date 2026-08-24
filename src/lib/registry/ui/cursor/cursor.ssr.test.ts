import {describe,expect,it} from 'vitest';import {cursor} from './cursor';
describe('cursor SSR',()=>{it('imports without browser globals',()=>{expect(typeof cursor).toBe('function')})});
