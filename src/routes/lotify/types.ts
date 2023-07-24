import type { Coordinate } from "ol/coordinate";
import type { DatagridStore } from "$lib/features/datagrid/types";

// type to enable indexing
export type LotifyPointData = {
    id: number;
    note: string;
    coordinates: Coordinate;
    distance?: number;
};

export interface LotifyContext {
    pointsDataStore: DatagridStore<LotifyPointData>;
}