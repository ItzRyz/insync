"use client"
import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function ScheduleTemplate({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <Card className="w-full max-w-7xl shadow-sm border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-600" />{title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}