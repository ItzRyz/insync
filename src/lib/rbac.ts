import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export interface NavItem {
    id: number;
    name: string;
    url: string;
    icon: string;
    order: number;
    parentId: number | null;
    children?: NavItem[];
}

export async function getDynamicMenu(): Promise<NavItem[]> {
    const { userId, orgId } = await auth();

    if (!userId) return [];

    const membership = await prisma.organizationMembership.findFirst({
        where: {
            userId: userId,
            ...(orgId ? { organizationId: orgId } : {}),
        },
        include: {
            role: {
                include: {
                    menuAccess: {
                        where: { canRead: true },
                        include: { menu: true },
                    },
                },
            },
        },
    });

    let allowedMenus = membership?.role.menuAccess.map((ma) => ma.menu) || [];

    if (allowedMenus.length === 0) {
        const defaultRole = await prisma.role.findUnique({
            where: { name: "org:member" },
            include: {
                menuAccess: {
                    where: { canRead: true },
                    include: { menu: true },
                },
            },
        });
        allowedMenus = defaultRole?.menuAccess.map((ma) => ma.menu) || [];
    }

    const menuMap: Record<number, NavItem> = {};

    allowedMenus.forEach((menu) => {
        menuMap[menu.id] = { ...menu, children: [] };
    });

    const rootMenus: NavItem[] = [];

    allowedMenus.sort((a, b) => a.order - b.order).forEach((menu) => {
        const item = menuMap[menu.id];
        if (menu.parentId && menuMap[menu.parentId]) {
            menuMap[menu.parentId].children?.push(item);
        } else {
            rootMenus.push(item);
        }
    });

    return rootMenus;
}