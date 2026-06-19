import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay, addDays, format } from "date-fns";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { MetricsWidget } from "@/components/dashboard/metrics-widget";
import { UpcomingSchedules } from "@/components/dashboard/upcoming-schedules";
import { Card, CardContent } from "@/components/ui/card";

export const revalidate = 0;

export default async function DashboardPage() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized: Anda harus login.");
    }

    const userProfile = await prisma.userProfile.findUnique({
        where: { id: userId },
    });

    const userName = userProfile?.fullName || "Pengguna";

    const schedules = await prisma.schedule.findMany({
        where: { userId },
        include: {
            type: true,
            category: true,
            status: true,
        },
        orderBy: { remindAt: "asc" },
    });

    const total = schedules.length;
    const pending = schedules.filter(s => s.status.code === "STATUS_PENDING").length;
    const sent = schedules.filter(s => s.status.code === "STATUS_SENT").length;
    const failed = schedules.filter(s => s.status.code === "STATUS_FAILED").length;

    const upcomingSchedules = schedules
        .filter(s => s.status.code === "STATUS_PENDING")
        .slice(0, 5);
    const categoryCounts: Record<string, { name: string; count: number; color: string }> = {};
    const standardCategories: Record<string, { name: string; color: string }> = {
        CAT_WORK: { name: "Pekerjaan", color: "#3b82f6" },
        CAT_PERSONAL: { name: "Pribadi", color: "#10b981" },
        CAT_FINANCE: { name: "Keuangan", color: "#f59e0b" },
    };

    schedules.forEach(s => {
        const cat = s.category;
        if (!categoryCounts[cat.code]) {
            categoryCounts[cat.code] = {
                name: cat.name,
                count: 0,
                color: standardCategories[cat.code]?.color || "#8b5cf6",
            };
        }
        categoryCounts[cat.code].count += 1;
    });

    const categoryData = Object.values(categoryCounts);
    const timelineData = Array.from({ length: 7 }).map((_, index) => {
        const dayDate = addDays(startOfDay(new Date()), index);
        const dayLabel = format(dayDate, "dd MMM");

        const daySchedules = schedules.filter(s => {
            const rem = new Date(s.remindAt);
            return rem >= startOfDay(dayDate) && rem <= endOfDay(dayDate);
        });

        return {
            date: dayLabel,
            count: daySchedules.length,
            pending: daySchedules.filter(s => s.status.code === "STATUS_PENDING").length,
            sent: daySchedules.filter(s => s.status.code === "STATUS_SENT").length,
        };
    });

    return (
        <div className="space-y-8">
            <Card>
                <CardContent className="flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Halo, {userName}! 👋
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        Berikut adalah ringkasan jadwal pengingat dan statistik aktivitas Anda hari ini.
                    </p>
                </CardContent>
            </Card>

            <MetricsWidget total={total} pending={pending} sent={sent} failed={failed} />
            <DashboardCharts timelineData={timelineData} categoryData={categoryData} />
            <UpcomingSchedules upcomingSchedules={upcomingSchedules} />
        </div>
    );
}