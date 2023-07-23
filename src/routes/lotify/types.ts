import type { DatagridStore } from "$lib/features/datagrid/types";
import type { Indexable } from "$lib/utility/types/objects";

export type LotifyPointData = Indexable<{
    id: number;
    note: string;
    distance: number;
}>;

export interface LotifyContext {
    pointsDataStore: DatagridStore<LotifyPointData>;
}