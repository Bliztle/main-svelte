import type { MapContext } from "./types";
import defineContext from "$lib/utility/context";

const [get, set] = defineContext<MapContext>();

/** Get the map service */
export const getMapContext = get;
export const setMapContext = set;