import { bot } from "@/lib/telegram/bot";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await bot.handleUpdate(body);
        return new Response("OK", { status: 200 });
    } catch (error) {
        console.error("Error pada Webhook Telegram:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}