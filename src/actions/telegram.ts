"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateTelegramChatId(chatId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized: Anda harus login.");

    const cleanChatId = chatId.trim();
    if (!/^\d+$/.test(cleanChatId)) {
        throw new Error("Format Chat ID tidak valid. Harus berupa deretan angka.");
    }

    await prisma.userProfile.update({
        where: { id: userId },
        data: { telegramChatId: cleanChatId },
    });

    revalidatePath("/dashboard/telegram");
    return { success: true, message: "Telegram Chat ID berhasil ditautkan!" };
}

export async function getTelegramProfile() {
    const { userId } = await auth();
    if (!userId) return null;

    return await prisma.userProfile.findUnique({
        where: { id: userId },
        select: { telegramChatId: true },
    });
}