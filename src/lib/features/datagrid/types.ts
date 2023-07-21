import type { WriteableArray } from "$lib/utility/stores/writeableArray";

export interface DatagridContext {
    columns: WriteableArray<DatagridContextColumn>;
}

export interface DatagridContextColumn {
    label: string;
    id: string | number;
    type: `${DatagridColumnType}`;
}

export type DatagridData = Record<DatagridContextColumn["id"], unknown>;

export enum DatagridColumnType {
    Text = "text",
    Number = "number",
}