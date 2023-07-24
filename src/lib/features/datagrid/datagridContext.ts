import type { DatagridContext, DatagridRow } from "./types";

import defineContext from "$lib/utility/context";

const [get, set] = defineContext<DatagridContext>();

export const getDatagridContext = <T extends DatagridRow>() => get() as DatagridContext<T>;
export const setDatagridContext = <T extends DatagridRow>(context: DatagridContext<T>) => set(context as DatagridContext) as DatagridContext<T>;