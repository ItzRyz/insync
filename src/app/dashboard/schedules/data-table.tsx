"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pageCount: number
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageCount,
}: DataTableProps<TData, TValue>) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 10
    const search = searchParams.get("search") || ""
    const sort = searchParams.get("sort") || "createdAt"
    const order = searchParams.get("order") || "desc"

    const createQueryString = React.useCallback(
        (params: Record<string, string | null>) => {
            const current = new URLSearchParams(searchParams.toString())
            for (const [key, value] of Object.entries(params)) {
                if (value === null) current.delete(key)
                else current.set(key, value)
            }
            return current.toString()
        },
        [searchParams]
    )

    const sorting: SortingState = [{ id: sort, desc: order === "desc" }]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        pageCount: pageCount,
        state: {
            sorting,
            pagination: { pageIndex: page - 1, pageSize: limit },
        },
        onSortingChange: (updater) => {
            const nextState = typeof updater === "function" ? updater(sorting) : updater
            if (nextState.length) {
                router.push(`${pathname}?${createQueryString({ sort: nextState[0].id, order: nextState[0].desc ? "desc" : "asc", page: "1" })}`)
            }
        },
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between py-4 gap-4">
                <Input
                    placeholder="Filter names or emails..."
                    defaultValue={search}
                    onChange={(event) => {
                        router.push(`${pathname}?${createQueryString({ search: event.target.value || null, page: "1" })}`)
                    }}
                    className="max-w-sm"
                />
                <Link href={"/dashboard/schedules/create"}><Button>Create</Button></Link>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`${pathname}?${createQueryString({ page: String(page - 1) })}`)}
                    disabled={page <= 1}
                >
                    Previous
                </Button>
                <div className="text-sm font-medium">
                    Page {page} of {pageCount || 1}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`${pathname}?${createQueryString({ page: String(page + 1) })}`)}
                    disabled={page >= pageCount}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
