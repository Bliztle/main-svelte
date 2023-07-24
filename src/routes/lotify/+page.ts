import type { LotifyPointData } from "./types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {

    // const pointsData: LotifyPointData[] = Array.from({ length: 2 }, (_, i) => ({
    //     id: i,
    //     note: 'A'
    // }));

    const pointsData: LotifyPointData[] = [
        {
            id: 1,
            note: 'A',
            coordinates: [1886683.8235579715, 5982916.655547064]
        },
        {
            id: 2,
            note: 'B',
            coordinates: [1886053.2180746188, 5983160.298574722]
        }
    ];

    return {
        pointsData
    };
};