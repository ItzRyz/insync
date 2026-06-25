// Registers the Telegram bot webhook after Vercel build.
// Runs automatically via the "postbuild" npm script.

const token = process.env.TELEGRAM_BOT_TOKEN;
const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/+$/, "");

if (!token || !appUrl) {
    console.warn("⚠️ Skipping webhook setup: TELEGRAM_BOT_TOKEN or NEXT_PUBLIC_APP_URL not set");
    process.exit(0);
}

const webhookUrl = `${appUrl}/api/webhooks/telegram`;

fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`)
    .then((res) => res.json())
    .then((data) => {
        if (data.ok) {
            console.log(`✅ Telegram webhook set: ${webhookUrl}`);
        } else {
            console.error("❌ Failed to set webhook:", data.description);
            process.exit(1);
        }
    })
    .catch((err) => {
        console.error("❌ Webhook request failed:", err);
        process.exit(1);
    });
