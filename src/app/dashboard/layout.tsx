import React from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppBreadcrumb } from "@/components/dashboard/app-breadcrumb";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="min-h-screen w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
                <AppSidebar />
                <main className="pl-64 min-h-screen">
                    <div className="p-4 max-w-7xl mx-auto">
                        <AppBreadcrumb />
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}