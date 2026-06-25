export async function register() {
    // Only start the Telegram bot on the Node.js server runtime (not Edge, not build)
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { getBot } = await import("@/lib/telegram/bot");

        try {
            const bot = getBot();

            // Delete any existing webhook so long polling works
            await bot.api.deleteWebhook({ drop_pending_updates: true });

            // Start long polling (fire-and-forget; the promise never resolves while running)
            bot.start({
                onStart: (botInfo) => {
                    console.log(
                        `✅ Telegram bot @${botInfo.username} is running (long polling)`
                    );
                },
            });
        } catch (error) {
            console.error("❌ Failed to start Telegram bot:", error);
        }
    }
}
