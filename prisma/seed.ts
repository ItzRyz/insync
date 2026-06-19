import prisma from "@/lib/prisma";

async function main() {
    console.log("🌱 Memulai proses seeding database...");
    console.log("- Seeding MasterParam (STATUS)...");
    const statuses = [
        { code: "STATUS_PENDING", name: "Pending / Menunggu", group: "STATUS" },
        { code: "STATUS_SENT", name: "Sent / Terkirim", group: "STATUS" },
        { code: "STATUS_FAILED", name: "Failed / Gagal", group: "STATUS" },
        { code: "STATUS_ACTIVE", name: "Active / Aktif", group: "STATUS" },
        { code: "STATUS_INACTIVE", name: "Inactive / Non-Aktif", group: "STATUS" },
    ];

    for (const status of statuses) {
        await prisma.masterParam.upsert({
            where: { code: status.code },
            update: {},
            create: status,
        });
    }

    console.log("- Seeding MasterParam (TYPE)...");
    const types = [
        { code: "TYPE_ONCE", name: "Sekali Saja", group: "TYPE" },
        { code: "TYPE_DAILY", name: "Harian", group: "TYPE" },
        { code: "TYPE_WEEKLY", name: "Mingguan", group: "TYPE" },
        { code: "TYPE_MONTHLY", name: "Bulanan", group: "TYPE" },
    ];

    for (const type of types) {
        await prisma.masterParam.upsert({
            where: { code: type.code },
            update: {},
            create: type,
        });
    }

    console.log("- Seeding MasterParam (CATEGORY)...");
    const categories = [
        { code: "CAT_WORK", name: "Pekerjaan", group: "CATEGORY" },
        { code: "CAT_HEALTH", name: "Kesehatan", group: "CATEGORY" },
        { code: "CAT_FINANCE", name: "Keuangan", group: "CATEGORY" },
        { code: "CAT_PERSONAL", name: "Pribadi", group: "CATEGORY" },
    ];

    for (const category of categories) {
        await prisma.masterParam.upsert({
            where: { code: category.code },
            update: {},
            create: category,
        });
    }

    console.log("- Seeding Roles...");
    const roles = [
        { name: "org:admin" },
        { name: "org:member" },
    ];

    const createdRoles: Record<string, any> = {};
    for (const role of roles) {
        const r = await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
        createdRoles[role.name] = r;
    }

    console.log("- Seeding Menus...");
    const menus = [
        { id: 1, name: "Dashboard User", url: "/dashboard", icon: "LayoutDashboard", order: 1, parentId: null },
        { id: 2, name: "Kelola Pengingat", url: "/dashboard/schedules", icon: "Calendar", order: 2, parentId: null },
        { id: 3, name: "Integrasi Telegram", url: "/dashboard/telegram", icon: "Send", order: 3, parentId: null },
        { id: 4, name: "Admin Panel", url: "/dashboard/admin", icon: "Shield", order: 4, parentId: null },
        { id: 5, name: "Manajemen Menu", url: "/dashboard/admin/menus", icon: "Menu", order: 5, parentId: 4 }, // Sub-menu dari Admin Panel
        { id: 6, name: "Hak Akses (RBAC)", url: "/dashboard/admin/rbac", icon: "Lock", order: 6, parentId: 4 }, // Sub-menu dari Admin Panel
    ];

    for (const menu of menus) {
        await prisma.menu.upsert({
            where: { id: menu.id },
            update: {
                name: menu.name,
                url: menu.url,
                icon: menu.icon,
                order: menu.order,
                parentId: menu.parentId,
            },
            create: menu,
        });
    }

    console.log("- Seeding Menu Access Matrix...");
    const adminRole = createdRoles["org:admin"];
    const memberRole = createdRoles["org:member"];

    const memberAccess = [1, 2, 3];
    for (const menuId of memberAccess) {
        await prisma.menuAccess.deleteMany({ where: { roleId: memberRole.id, menuId: menuId } });
        await prisma.menuAccess.create({
            data: { roleId: memberRole.id, menuId: menuId, canRead: true, canCreate: true, canUpdate: true, canDelete: true },
        });
    }

    const adminAccess = [1, 2, 3, 4, 5, 6];
    for (const menuId of adminAccess) {
        await prisma.menuAccess.deleteMany({ where: { roleId: adminRole.id, menuId: menuId } });
        await prisma.menuAccess.create({
            data: { roleId: adminRole.id, menuId: menuId, canRead: true, canCreate: true, canUpdate: true, canDelete: true },
        });
    }

    console.log("✅ Seeding selesai dengan sukses!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });