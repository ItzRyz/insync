import { FormConnectTelegram } from "@/components/telegram/form-connect";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Bell } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

export const revalidate = 0;

export default async function TelegramPage() {
    const { userId } = await auth();

    if (!userId) return <div>Unauthorized</div>;

    const profile = await prisma.userProfile.findUnique({
        where: { id: userId },
        select: { telegramChatId: true },
    });

    const hasConnected = !!profile?.telegramChatId;
    return (
        <Card className="w-full max-w-7xl shadow-sm border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-600" />
                    Integrasi Telegram
                </CardTitle>
            </CardHeader>
            <CardContent>
                <FormConnectTelegram clerkUserId={userId} hasConnectedTelegram={hasConnected} />
            </CardContent>
        </Card>
    )
}