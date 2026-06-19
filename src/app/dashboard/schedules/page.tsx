import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ScheduleTemplate } from "@/components/schedules/template";
import { getUserSchedules } from "@/actions/schedules";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const revalidate = 0;
interface PageProps {
    searchParams: Promise<{
        page?: string
        limit?: string
        search?: string
        sort?: string
        order?: "asc" | "desc"
    }>
}

export default async function SchedulesPage({ searchParams }: PageProps) {
    const params = await searchParams

    const page = Number(params.page) || 1
    const limit = Number(params.limit) || 10
    const search = params.search || undefined
    const sortBy = params.sort || "createdAt"
    const sortOrder = params.order || "desc"

    const { data, pageCount } = await getUserSchedules({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
    })
    return (
        <ScheduleTemplate title="Schedules Management">
            <Suspense
                fallback={
                    <div className="flex flex-col items-center justify-center py-20 text-sm text-zinc-400 gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                        <span>Memuat data antrean...</span>
                    </div>
                }
            >
                <DataTable columns={columns} data={data} pageCount={pageCount} />
            </Suspense>
        </ScheduleTemplate>
    );
}