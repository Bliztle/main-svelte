import { writable, type Writable } from "svelte/store";

export interface WriteableArray<T> extends Writable<T[]> {
    add: (item: T) => void;
    remove: (item: T) => void;
    clear: () => void;
}

const writeableArray = <T>(value: T[] = []): WriteableArray<T> => {
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

export default writeableArray;