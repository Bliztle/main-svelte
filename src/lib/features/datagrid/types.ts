import type { HTMLInputAttributes } from 'svelte/elements';
import type { ValueOf } from '$lib/utility/types/objects';
import type { Writable } from "svelte/store";
import type { WriteableArray } from "$lib/utility/stores/writeableArray";

export interface DatagridStore<T extends DatagridRow = DatagridRow> extends Writable<DatagridStoreData<T>> {
    addRow: (row: T) => void;
    setRow: (rowIndex: number, row: T) => void;
    setCell: (rowIndex: number, columnId: DatagridContextColumn["id"], cellData: ValueOf<T>) => void;
}

export interface DatagridStoreData<T extends DatagridRow = DatagridRow> {
    loading: boolean;
    error: Error | null;
    rows: T[];
}

export interface DatagridContext<T extends DatagridRow = DatagridRow> {
    columns: WriteableArray<DatagridContextColumn>;
    editRowIndex: Writable<number | null>;
    store: DatagridStore<T>;
}

export interface DatagridContextColumn {
    label: string;
    id: string | number;
    type: `${DatagridColumnType}`;
    inputProps?: HTMLInputAttributes;
    readonly?: boolean;
};

export type DatagridRow = Record<DatagridContextColumn["id"], unknown>;

export enum DatagridColumnType {
    Text = "text",
    Number = "number",
}