import type { LotifyPointData } from "./types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {

    const pointsData: LotifyPointData[] = Array.from({ length: 2 }, (_, i) => ({
        id: i,
        note: 'A',
        distance: 10000
    }));

    return {
        pointsData
    };
};