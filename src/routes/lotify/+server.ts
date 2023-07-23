import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const pointData = await request.json();
    return json({
        id: 7,
        ...pointData,
    });
};