
"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar"
import { University, LayoutDashboard, BookOpen, Users, Handshake, LogOut, UserCircle, Settings, Folder } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation';

const navItems = [
    { href: "/admin", icon: <LayoutDashboard />, label: "Dashboard" },
    { href: "/admin/users", icon: <Users />, label: "Users" },
    { href: "/admin/sponsorships", icon: <Handshake />, label: "Sponsorships" },
    { href: "/admin/courses", icon: <BookOpen />, label: "Courses" },
    { href: "/admin/resources", icon: <Folder />, label: "Resources" },
]

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <Link href="/admin" className="flex items-center gap-2" prefetch={false}>
          <University className="h-8 w-8 text-accent" />
          <span className="font-headline text-lg font-bold text-sidebar-foreground">
            Admin Panel
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full">
                    <SidebarMenuButton 
                        isActive={pathname.startsWith(item.href) && (item.href !== "/admin" || pathname === "/admin")}
                        className="w-full"
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/dashboard" className="w-full">
                    <SidebarMenuButton>
                        <UserCircle />
                        <span>Student View</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/" className="w-full">
                    <SidebarMenuButton>
                        <LogOut />
                        <span>Log Out</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
