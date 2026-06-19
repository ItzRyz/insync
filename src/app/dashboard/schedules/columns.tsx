"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Calendar, Tag, Layers, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScheduleWithRelations, deleteSchedule } from "@/actions/schedules"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export type ScheduleRow = ScheduleWithRelations;

const ActionsCell = ({ id }: { id: string }) => {
    const router = useRouter()

    const handleDelete = async () => {
        if (confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
            try {
                await deleteSchedule(id)
                router.refresh()
            } catch (error) {
                alert(error instanceof Error ? error.message : "Gagal menghapus jadwal")
            }
        }
    }

    const handleEdit = () => {
        router.push(`/dashboard/schedules/${id}`)
    }

    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete}>
                <Trash className="h-4 w-4 text-zinc-500 hover:text-red-600 dark:hover:text-red-400" />
            </Button>
        </div>
    )
}

export const columns: ColumnDef<ScheduleRow>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="-ml-4 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const title = row.getValue("title") as string
            const description = row.original.description
            return (
                <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</span>
                    {description && (
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 max-w-[280px] truncate">
                            {description}
                        </span>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "remindAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="-ml-4 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Remind At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue("remindAt") as Date
            return (
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 font-medium">
                    <Calendar className="h-4 w-4 text-zinc-400" />
                    <span className="font-mono text-sm">{format(new Date(date), "Pp")}</span>
                </div>
            )
        }
    },
    {
        id: "type",
        header: "Type",
        cell: ({ row }) => {
            const type = row.original.type
            return (
                <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                    <Layers className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{type.name}</span>
                </div>
            )
        }
    },
    {
        id: "category",
        header: "Category",
        cell: ({ row }) => {
            const category = row.original.category
            return (
                <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                    <Tag className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{category.name}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="-ml-4 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.original.status
            return (
                <span
                    className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all",
                        status.code === "STATUS_PENDING" && "bg-amber-50/80 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50",
                        status.code === "STATUS_SENT" && "bg-emerald-50/80 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50",
                        status.code === "STATUS_FAILED" && "bg-rose-50/80 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/50"
                    )}
                >
                    <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        status.code === "STATUS_PENDING" && "bg-amber-500",
                        status.code === "STATUS_SENT" && "bg-emerald-500",
                        status.code === "STATUS_FAILED" && "bg-rose-500"
                    )} />
                    {status.name}
                </span>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionsCell id={row.original.id} />
    }
]
