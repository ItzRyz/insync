"use server";

import { Schedule, MasterParam } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export type ScheduleWithRelations = Schedule & {
    type: MasterParam;
    category: MasterParam;
    status: MasterParam;
};

interface GetUserSchedulesParams {
    page: number
    limit: number
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
}

export async function createSchedule(formData: {
    title: string;
    description?: string;
    remindAt: Date;
    typeCode: string;
    categoryCode: string;
}) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized: Anda harus login.");

    const params = await prisma.masterParam.findMany({
        where: {
            code: { in: [formData.typeCode, formData.categoryCode, "STATUS_PENDING"] },
        },
    });

    const typeId = params.find((p) => p.group === "TYPE")?.id;
    const categoryId = params.find((p) => p.group === "CATEGORY")?.id;
    const statusId = params.find((p) => p.group === "STATUS")?.id;

    if (!typeId || !categoryId || !statusId) {
        throw new Error("Gagal memproses data: Parameter master tidak valid.");
    }

    const newSchedule = await prisma.schedule.create({
        data: {
            userId,
            title: formData.title,
            description: formData.description,
            remindAt: formData.remindAt,
            typeId,
            categoryId,
            statusId,
        },
    });

    revalidatePath("/dashboard/schedules");
    revalidatePath("/dashboard");
    return { success: true, data: newSchedule };
}

export async function getUserSchedules({
    page = 1,
    limit = 10,
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
}: Partial<GetUserSchedulesParams> = {}): Promise<{
    data: ScheduleWithRelations[];
    pageCount: number;
    total: number;
}> {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized: Anda harus login.");

    const skip = (page - 1) * limit;

    const where = search
        ? {
            OR: [
                { title: { contains: search, mode: "insensitive" as const } },
                { description: { contains: search, mode: "insensitive" as const } },
            ],
        }
        : {}

    const orderByInput =
        sortBy === "status"
            ? { status: { name: sortOrder } }
            : sortBy === "type"
                ? { type: { name: sortOrder } }
                : sortBy === "category"
                    ? { category: { name: sortOrder } }
                    : { [sortBy]: sortOrder };

    const [data, total] = await Promise.all([
        prisma.schedule.findMany({
            where,
            skip,
            take: limit,
            orderBy: orderByInput,
            include: {
                type: true,
                category: true,
                status: true,
            },
        }),
        prisma.schedule.count({ where }),
    ])

    return {
        data,
        pageCount: Math.ceil(total / limit),
        total,
    };
}

export async function deleteSchedule(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized: Anda harus login.");

    const schedule = await prisma.schedule.findUnique({
        where: { id },
    });

    if (!schedule || schedule.userId !== userId) {
        throw new Error("Schedule tidak ditemukan atau Anda tidak memiliki akses.");
    }

    await prisma.schedule.delete({
        where: { id },
    });

    revalidatePath("/dashboard/schedules");
    revalidatePath("/dashboard");
    return { success: true };
}

export async function updateSchedule(
    id: string,
    formData: {
        title: string;
        description: string | null;
        remindAt: Date;
        typeCode: string;
        categoryCode: string;
    }
) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized: You must be logged in.");

    const existing = await prisma.schedule.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
        throw new Error("Schedule not found or you do not have access.");
    }

    const params = await prisma.masterParam.findMany({
        where: {
            code: { in: [formData.typeCode, formData.categoryCode] },
        },
    });

    const typeId = params.find((p) => p.group === "TYPE")?.id;
    const categoryId = params.find((p) => p.group === "CATEGORY")?.id;

    if (!typeId || !categoryId) {
        throw new Error("Failed to process data: Invalid master parameters.");
    }

    const updated = await prisma.schedule.update({
        where: { id },
        data: {
            title: formData.title,
            description: formData.description,
            remindAt: formData.remindAt,
            typeId,
            categoryId,
        },
    });

    revalidatePath("/dashboard/schedules");
    revalidatePath("/dashboard");
    return { success: true, data: updated };
}