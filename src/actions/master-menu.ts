"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createMasterMenu(data: {
    name: string;
    url: string;
    icon: string;
    order: number;
    parentId?: number;
}) {
    const { orgRole } = await auth();

    if (orgRole !== "org:admin") {
        throw new Error("Forbidden: only administrator can create master menu");
    }

    const newMenu = await prisma.menu.create({
        data: {
            name: data.name,
            url: data.url,
            icon: data.icon,
            order: data.order,
            parentId: data.parentId || null,
        },
    });

    revalidatePath("/dashboard");
    return { success: true, data: newMenu };
}

export async function updateMenuAccess(matrix: {
    roleId: number;
    menuId: number;
    canRead: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
}) {
    const { orgRole } = await auth();
    if (orgRole !== "org:admin") throw new Error("Forbidden: only administrator can update menu access matrix");

    const existingAccess = await prisma.menuAccess.findFirst({
        where: { roleId: matrix.roleId, menuId: matrix.menuId }
    });

    if (existingAccess) {
        await prisma.menuAccess.update({
            where: { id: existingAccess.id },
            data: { canRead: matrix.canRead, canCreate: matrix.canCreate, canUpdate: matrix.canUpdate, canDelete: matrix.canDelete }
        });
    } else {
        await prisma.menuAccess.create({
            data: {
                roleId: matrix.roleId,
                menuId: matrix.menuId,
                canRead: matrix.canRead,
                canCreate: matrix.canCreate,
                canUpdate: matrix.canUpdate,
                canDelete: matrix.canDelete
            }
        });
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Menu access matrix successfully updated!" };
}