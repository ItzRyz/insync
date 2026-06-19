import { Bot } from "grammy";
import { linkTelegramAccount } from "./db";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error("TELEGRAM_BOT_TOKEN missing");

export const bot = new Bot(token);

bot.command("start", async (ctx) => {
    const payload = ctx.match;
    const telegramChatId = ctx.from?.id.toString();

    if (!telegramChatId) {
        return await ctx.reply("Gagal mendeteksi informasi akun Telegram Anda.");
    }

    if (payload) {
        await ctx.reply("⏳ Sedang menyambungkan akun Anda ke sistem website...");

        const result = await linkTelegramAccount(payload, telegramChatId);

        if (result.success) {
            return await ctx.reply(
                `🎉 *Koneksi Berhasil!*\n\n` +
                `Halo *${result.fullName}*, akun Telegram Anda telah resmi tersambung dengan aplikasi *Daily Reminder*.\n\n` +
                `Anda akan menerima notifikasi pengingat langsung di sini.`,
                { parse_mode: "Markdown" }
            );
        } else {
            return await ctx.reply(`❌ *Koneksi Gagal:* ${result.message}`);
        }
    }

    await ctx.reply(
        `Halo! 👋 Selamat datang di *Daily Reminder Bot*.\n\n` +
        `Untuk menghubungkan bot ini, silakan klik tombol *Sinkronkan ke Telegram* melalui halaman dashboard website Anda.\n\n` +
        `🆔 *ID Telegram Anda:* \`${telegramChatId}\``,
        { parse_mode: "Markdown" }
    );
});