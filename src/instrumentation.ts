export async function register() {
    // Only run on the Node.js server runtime (not Edge, not during build)
    if (process.env.NEXT_RUNTIME === "nodejs") {
        if (process.env.NODE_ENV !== "production") {
            // Development only: use long polling for local testing
            const { getBot } = await import("@/lib/telegram/bot");
            try {
                const bot = getBot();
                await bot.api.deleteWebhook({ drop_pending_updates: true });
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
        // Production webhook is set by scripts/set-telegram-webhook.mjs at build time
    }
}
