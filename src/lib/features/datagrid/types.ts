import type { Writable } from "svelte/store";
import type { WriteableArray } from "$lib/utility/stores/writeableArray";

export interface DatagridContext {
    columns: WriteableArray<DatagridContextColumn>;
    editRowIndex: Writable<number | null>;
}

export interface DatagridContextColumn {
    label: string;
    id: string | number;
    type: `${DatagridColumnType}`;
}

export type DatagridRowData = Record<DatagridContextColumn["id"], unknown>;

export interface DatagridRow {
    index: number;
    data: DatagridRowData;
}

export enum DatagridColumnType {
    Text = "text",
    Number = "number",
}