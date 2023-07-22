import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {

    const gridData = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        note: 'A',
        distance: 10000
    }));

    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
        gridData
    };
};