import prisma from "../prisma";

export async function linkTelegramAccount(clerkUserId: string, telegramChatId: string) {
    try {
        const user = await prisma.userProfile.findUnique({
            where: { id: clerkUserId },
        });

        if (!user) {
            return { success: false, message: "Akun Anda belum terdaftar di sistem website." };
        }

        await prisma.userProfile.update({
            where: { id: clerkUserId },
            data: { telegramChatId: telegramChatId },
        });

        return { success: true, fullName: user.fullName };
    } catch (error) {
        console.error("Gagal menyambungkan ke Prisma:", error);
        return { success: false, message: "Terjadi kesalahan pada sistem database." };
    }
}