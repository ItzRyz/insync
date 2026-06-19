"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { createSchedule } from "@/actions/schedules";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Link from "next/link";

interface OptionItem {
    code: string;
    name: string;
}

interface FormProps {
    categories: OptionItem[];
    types: OptionItem[];
}

export function FormCreateSchedule({ categories, types }: FormProps) {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState("");
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date || !time) {
            setMessage({ type: "error", text: "Silakan pilih tanggal dan waktu pengingat." });
            return;
        }

        setLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const typeCode = formData.get("typeCode") as string;
        const categoryCode = formData.get("categoryCode") as string;

        const [hours, minutes] = time.split(":").map(Number);
        const finalReminderDateTime = new Date(date);
        finalReminderDateTime.setHours(hours, minutes, 0, 0);

        try {
            const res = await createSchedule({
                title,
                description,
                remindAt: finalReminderDateTime,
                typeCode,
                categoryCode,
            });

            if (res.success) {
                setMessage({ type: "success", text: "Pengingat berhasil dijadwalkan!" });
                (e.target as HTMLFormElement).reset();
                setDate(undefined);
                setTime("");
            }
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "Terjadi kesalahan." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
                <div
                    className={cn(
                        "p-3 rounded-md text-xs font-medium",
                        message.type === "success"
                            ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                            : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                    )}
                >
                    {message.text}
                </div>
            )}

            <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Judul Aktivitas</label>
                <Input name="title" placeholder="Contoh: Minum Vitamin / Daily Standup" required />
            </div>

            <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Deskripsi (Opsional)</label>
                <Textarea name="description" placeholder="Tulis catatan tambahan di sini..." rows={3} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 flex flex-col">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Pilih Tanggal</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal text-sm h-10",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={date} onSelect={setDate} />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Pilih Waktu (Jam)</label>
                    <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="h-10" required />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Select name="typeCode" required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {types.map((t) => (
                                    <SelectItem value={t.code} key={t.code}>{t.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Select name="categoryCode" required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories.map((c) => (
                                    <SelectItem value={c.code} key={c.code}>{c.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-end gap-2 ">
                <Link href="/dashboard/schedules">
                    <Button className="h-10 bg-transparent border border-red-500 hover:bg-red-700 text-red-500 hover:text-white mt-2">
                        Cancel
                    </Button>
                </Link>
                <Button type="submit" className="h-10 bg-transparent border border-blue-500 hover:bg-blue-700 text-blue-500 hover:text-white mt-2" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Jadwalkan Pengingat"}
                </Button>
            </div>
        </form>
    );
}