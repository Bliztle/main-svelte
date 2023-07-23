import type { LotifyContext } from "./types";
import defineContext from "$lib/utility/context";

const [get, set] = defineContext<LotifyContext>();

export const getLotifyContext = get;
export const setLotifyContext = set;