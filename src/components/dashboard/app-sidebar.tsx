import Link from "next/link";
import { getDynamicMenu, NavItem } from "@/lib/rbac";
import * as LucideIcons from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "../ui/sidebar";

const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) return <LucideIcons.HelpCircle className={className} />;
    return <IconComponent className={className} />;
};

// export async function AppSidebar() {
//     const menus = await getDynamicMenu();

//     return (
//         <aside className="w-64 h-screen bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between p-4 fixed left-0 top-0">
//             <div className="space-y-6">
//                 <div className="flex items-center gap-3 px-2">
//                     <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
//                         DR
//                     </div>
//                     <span className="font-bold text-lg tracking-tight">InSync</span>
//                 </div>
//                 <nav className="space-y-1">
//                     {menus.map((menu: NavItem) => (
//                         <div key={menu.id} className="space-y-1">
//                             <Link
//                                 href={menu.url}
//                                 className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
//                             >
//                                 <IconRenderer name={menu.icon} className="h-4 w-4 text-zinc-500" />
//                                 {menu.name}
//                             </Link>

//                             {menu.children && menu.children.length > 0 && (
//                                 <div className="pl-6 space-y-1 border-l border-zinc-200 dark:border-zinc-800 ml-5">
//                                     {menu.children.map((child) => (
//                                         <Link
//                                             key={child.id}
//                                             href={child.url}
//                                             className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
//                                         >
//                                             {child.name}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </nav>
//             </div>

//             <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex items-center justify-between px-2">
//                 <div className="flex items-center gap-3">
//                     <UserButton />
//                     <div className="flex flex-col">
//                         <span className="text-xs font-semibold max-w-[120px] truncate">Akun Saya</span>
//                         <span className="text-[10px] text-zinc-400">Workspace Aktif</span>
//                     </div>
//                 </div>
//             </div>
//         </aside>
//     );
// }

export async function AppSidebar() {
    const menus = await getDynamicMenu();
    return (
        <Sidebar className="w-64 h-screen flex flex-col justify-between">
            <SidebarHeader className="flex flex-row items-center gap-3 p-4">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                    In
                </div>
                <span className="font-bold text-lg tracking-tight">InSync</span>
            </SidebarHeader>
            <SidebarContent className="px-4 py-2">
                {menus.map((menu: NavItem) => (
                    <div key={menu.id} className="space-y-1">
                        <Link
                            href={menu.url}
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
                        >
                            <IconRenderer name={menu.icon} className="h-4 w-4 text-zinc-500" />
                            {menu.name}
                        </Link>

                        {menu.children && menu.children.length > 0 && (
                            <div className="pl-6 space-y-1 border-l border-zinc-200 dark:border-zinc-800 ml-5">
                                {menu.children.map((child) => (
                                    <Link
                                        key={child.id}
                                        href={child.url}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                    >
                                        {child.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <div className="border-t border-accent py-4 flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <UserButton userProfileMode="modal" showName={true} />
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}