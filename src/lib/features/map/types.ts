import type Map from "ol/Map";

export interface MapContext {
    getMap: () => Map;
}