import type { DatagridContextColumn, DatagridRow, DatagridStore, DatagridStoreData } from "./types";

import type { ValueOf } from "$lib/utility/types/objects";
import { writable } from "svelte/store";

export const datagridStore = <T extends DatagridRow>(rows?: T[] | null, url?: string | null): DatagridStore<T> => {

    const { subscribe, set, update } = writable<DatagridStoreData<T>>();

    const init = async () => {

        // Handle data if given
        if (rows)
            return set({ loading: false, error: null, rows });

        // Otherwise fetch data
        if (url) {
            try {
                set({ loading: true, error: null, rows: [] });
                const response = await fetch(url);

                if (!response.ok)
                    throw new Error(response.statusText);
                const rows = await response.json();
                set({ loading: false, error: null, rows });

            } catch (e) {
                set({ loading: false, error: e as Error, rows: [] });
            }
            return;
        }

        // Otherwise set empty data
        set({ loading: false, error: null, rows: [] });

    };

    init();

    return {
        subscribe,
        set,
        update,
        setRow: (rowIndex: number, row: T) => update((data) => {
            return {
                ...data,
                rows: data.rows.map((r, i) => i === rowIndex ? row : r),
            };
        }),
        setCell: (rowIndex: number, columnId: DatagridContextColumn["id"], cellData: ValueOf<T>) => update((data) => {
            return {
                ...data,
                rows: data.rows.map((r, i) => i === rowIndex ? { ...r, [columnId]: cellData } : r)
            };
        }),
    };
};