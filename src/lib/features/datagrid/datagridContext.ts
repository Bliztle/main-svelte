import type { DatagridContext } from "./types";
import defineContext from "$lib/utility/context";

const [get, set] = defineContext<DatagridContext>();

export const getDatagridContext = get;
export const setDatagridContext = set;