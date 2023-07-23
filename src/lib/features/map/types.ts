import type { Readable, Writable } from "svelte/store";

import type Map from "ol/Map";

export interface ControlContainers {
    left: HTMLDivElement;
    middle: HTMLDivElement;
    right: HTMLDivElement;
}

export interface MapContext {
    map: Readable<Map>;
    controlContainers: Writable<ControlContainers>;
}