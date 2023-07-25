import { writable, type Writable } from "svelte/store";

export interface WritableArray<T> extends Writable<T[]> {
    add: (item: T) => void;
    remove: (item: T) => void;
    clear: () => void;
}

const writableArray = <T>(value: T[] = []): WritableArray<T> => {
    const { subscribe, set, update } = writable<T[]>(value);

    return {
        subscribe,
        set,
        update,
        add: (item: T) => update((items) => [...items, item]),
        remove: (item: T) => update((items) => items.filter((i) => i !== item)),
        clear: () => set([]),
    };
};

export default writableArray;