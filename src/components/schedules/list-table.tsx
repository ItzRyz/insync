import React from "react";
import { getUserSchedules } from "@/actions/schedules";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export async function ScheduleListTable() {
    const { data: schedules } = await getUserSchedules();

    if (schedules.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed rounded-lg border-zinc-200 dark:border-zinc-800 text-zinc-400 text-sm">
                Belum ada jadwal pengingat yang dibuat.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <table className="w-full text-left text-sm border-collapse">
                <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 font-medium">
                        <th className="p-4">Nama Pengingat</th>
                        <th className="p-4">Kategori</th>
                        <th className="p-4">Siklus</th>
                        <th className="p-4">Waktu Eksekusi</th>
                        <th className="p-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {schedules.map((item) => (
                        <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                            <td className="p-4">
                                <div className="font-semibold">{item.title}</div>
                                {item.description && <div className="text-xs text-zinc-400 max-w-xs truncate">{item.description}</div>}
                            </td>
                            <td className="p-4 text-xs text-zinc-600 dark:text-zinc-400">{item.category.name}</td>
                            <td className="p-4 text-xs text-zinc-600 dark:text-zinc-400">{item.type.name}</td>
                            <td className="p-4 text-xs font-mono">{format(new Date(item.remindAt), "Pp")}</td>
                            <td className="p-4">
                                <span
                                    className={cn(
                                        "px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide",
                                        item.status.code === "STATUS_PENDING" && "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
                                        item.status.code === "STATUS_SENT" && "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400",
                                        item.status.code === "STATUS_FAILED" && "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                                    )}
                                >
                                    {item.status.name}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}