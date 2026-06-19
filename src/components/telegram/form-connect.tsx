import { Button } from "../ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface FormConnectTelegramProps {
    clerkUserId: string;
    hasConnectedTelegram: boolean;
}

export async function FormConnectTelegram({ clerkUserId, hasConnectedTelegram }: FormConnectTelegramProps) {
    const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
    const telegramBotUrl = `https://t.me/${botUsername}?start=${clerkUserId}`;

    return (
        <>
            {hasConnectedTelegram ? (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-green-800 dark:text-green-400">
                        <CheckCircle2 className="h-4 w-4 text-green-600" /> Status: Terhubung
                    </div>
                    <p className="text-xs text-green-700/80 dark:text-green-500">
                        Akun Anda sudah tersambung ke database Prisma. Notifikasi jadwal akan otomatis dikirimkan langsung oleh Bot.
                    </p>
                </div>
            ) : (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-400">
                        <AlertCircle className="h-4 w-4 text-amber-600" /> Belum Terhubung
                    </div>
                    <p className="text-xs text-amber-700/80 dark:text-amber-500">
                        Anda tidak akan menerima notifikasi jika belum menyambungkan Telegram Anda ke database aplikasi.
                    </p>
                </div>
            )}

            <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
                <a href={telegramBotUrl} target="_blank" rel="noopener noreferrer">
                    {hasConnectedTelegram ? "Buka Obrolan Bot" : "⚡ Sambungkan Otomatis ke Telegram"}
                </a>
            </Button>
        </>
    )
}