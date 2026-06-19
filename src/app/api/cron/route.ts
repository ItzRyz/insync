import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse("Unauthorized Access: Invalid Token", { status: 401 });
    }

    try {
        const now = new Date();

        const statusPending = await prisma.masterParam.findUnique({ where: { code: "STATUS_PENDING" } });
        const statusSent = await prisma.masterParam.findUnique({ where: { code: "STATUS_SENT" } });
        const statusFailed = await prisma.masterParam.findUnique({ where: { code: "STATUS_FAILED" } });

        if (!statusPending || !statusSent || !statusFailed) {
            return NextResponse.json({ error: "Master status metadata missing" }, { status: 500 });
        }

        const dueSchedules = await prisma.schedule.findMany({
            where: {
                statusId: statusPending.id,
                remindAt: { lte: now },
            },
            include: {
                user: true,
                category: true,
            },
        });

        if (dueSchedules.length === 0) {
            return NextResponse.json({ success: true, message: "Tidak ada antrean pengingat saat ini." });
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!botToken) {
            return NextResponse.json({ error: "Server Configuration Error: Token Telegram Kosong" }, { status: 500 });
        }

        const deliveryPromises = dueSchedules.map(async (schedule) => {
            if (!schedule.user.telegramChatId) {
                await prisma.schedule.update({
                    where: { id: schedule.id },
                    data: { statusId: statusFailed.id },
                });
                return;
            }

            const messageText =
                `🔔 *[PENGINGAT AKTIVITAS]*\n` +
                `----------------------------------------\n` +
                `📂 *Kategori:* ${schedule.category.name}\n` +
                `📌 *Aktivitas:* *${schedule.title}*\n` +
                `📝 *Catatan:* _${schedule.description || "-"}_\n\n` +
                `_Sistem Daily Reminder App_`;

            const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

            try {
                const response = await fetch(telegramUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: schedule.user.telegramChatId,
                        text: messageText,
                        parse_mode: "Markdown",
                    }),
                });

                if (response.ok) {
                    await prisma.schedule.update({ where: { id: schedule.id }, data: { statusId: statusSent.id } });
                } else {
                    const errorData = await response.json();
                    console.error(`Telegram API Error untuk Jadwal ID ${schedule.id}:`, errorData);
                    await prisma.schedule.update({ where: { id: schedule.id }, data: { statusId: statusFailed.id } });
                }
            } catch (err) {
                console.error(`Network Error mengirim ke Telegram untuk ID ${schedule.id}:`, err);
                await prisma.schedule.update({ where: { id: schedule.id }, data: { statusId: statusFailed.id } });
            }
        });

        await Promise.all(deliveryPromises);

        return NextResponse.json({
            success: true,
            processedCount: dueSchedules.length,
            message: `${dueSchedules.length} antrean notifikasi berhasil diproses.`
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}