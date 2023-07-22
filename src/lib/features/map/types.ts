import type Map from "ol/Map";
import type { Readable } from "svelte/store";

export interface MapContext {
    map: Readable<Map>;
}