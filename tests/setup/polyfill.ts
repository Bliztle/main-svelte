import { beforeAll } from 'vitest';
import resizeObserverPolyfill from 'resize-observer-polyfill';

beforeAll(() => {
    window.ResizeObserver = resizeObserverPolyfill;
});