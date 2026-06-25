export async function register() {
    // Only run on the Node.js server runtime (not Edge, not during build)
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { getBot } = await import("@/lib/telegram/bot");

        try {
            const bot = getBot();

            if (process.env.NODE_ENV === "production") {
                // Production (Vercel): register webhook so Telegram pushes updates
                // to our /api/webhooks/telegram endpoint.
                const rawHost =
                    process.env.NEXT_PUBLIC_APP_URL ||
                    (process.env.VERCEL_URL
                        ? `https://${process.env.VERCEL_URL}`
                        : null);

                if (rawHost) {
                    const host = rawHost.replace(/\/+$/, ""); // strip trailing slashes
                    const webhookUrl = `${host}/api/webhooks/telegram`;
                    await bot.api.setWebhook(webhookUrl, {
                        secret_token: process.env.CRON_SECRET,
                    });
                    console.log(`✅ Telegram webhook registered: ${webhookUrl}`);
                } else {
                    console.warn(
                        "⚠️ Cannot register Telegram webhook: no NEXT_PUBLIC_APP_URL or VERCEL_URL found"
                    );
                }
            } else {
                // Development: use long polling for local testing
                await bot.api.deleteWebhook({ drop_pending_updates: true });
                bot.start({
                    onStart: (botInfo) => {
                        console.log(
                            `✅ Telegram bot @${botInfo.username} is running (long polling)`
                        );
                    },
                });
            }
        } catch (error) {
            console.error("❌ Failed to start Telegram bot:", error);
        }
    }
}
