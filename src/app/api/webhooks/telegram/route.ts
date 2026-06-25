import { getBot } from "@/lib/telegram/bot";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const bot = getBot();

        // Ensure bot is initialized (fetches botInfo from Telegram API).
        // This is a no-op if the bot was already initialized by instrumentation.
        if (!bot.isInited()) {
            await bot.init();
        }

        await bot.handleUpdate(body);
        return new Response("OK", { status: 200 });
    } catch (error) {
        // Log but always return 200 to Telegram so it doesn't retry.
        // Telegram retries on non-2xx responses, which can cause duplicate processing.
        console.error("Error pada Webhook Telegram:", error);
        return new Response("OK", { status: 200 });
    }
}