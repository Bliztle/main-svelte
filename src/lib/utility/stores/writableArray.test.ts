import { beforeEach, describe, expect, it } from "vitest";

import type { WritableArray } from "./writableArray";
import writableArray from "./writableArray";

describe('writeableArray', () => {

    const defaultElements = [1, 2, 3];
    let elements: number[];
    let store: WritableArray<number>;

    beforeEach(() => {
        store = writableArray(defaultElements);
        store.subscribe((v => (elements = v)));
    });

    it('exposes store functions', () => {
        expect(typeof store.set).toBe('function');
        expect(typeof store.subscribe).toBe('function');
        expect(typeof store.update).toBe('function');
    });

    it('allows adding new elements', () => {
        expect(elements).toEqual(defaultElements);
        store.add(4);
        expect(elements).toEqual([...defaultElements, 4]);
    });

    it('allows clearing', () => {
        store.clear();
        expect(elements).empty;
    });
});