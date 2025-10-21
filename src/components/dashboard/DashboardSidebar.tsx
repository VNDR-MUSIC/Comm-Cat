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
import { University, LayoutDashboard, BookOpen, MessageSquare, Award, Folder, LifeBuoy, LogOut, UserCircle, Notebook, Calendar } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation';

const navItems = [
    { href: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
    { href: "/dashboard/courses", icon: <BookOpen />, label: "My Courses" },
    { href: "/dashboard/progress", icon: <Award />, label: "Progress" },
    { href: "/dashboard/notes", icon: <Notebook />, label: "Notes" },
    { href: "/dashboard/discussion", icon: <MessageSquare />, label: "Discussion" },
    { href: "/dashboard/schedule", icon: <Calendar />, label: "Schedule" },
    { href: "/dashboard/resources", icon: <Folder />, label: "Resources" },
    { href: "/dashboard/support", icon: <LifeBuoy />, label: "Support" },
]

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
          <University className="h-8 w-8 text-accent" />
          <span className="font-headline text-lg font-bold text-sidebar-foreground">
            Catalyst Academy
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full">
                    <SidebarMenuButton 
                        isActive={pathname.startsWith(item.href) && (item.href !== "/dashboard" || pathname === "/dashboard")}
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
                <Link href="/dashboard/profile" className="w-full">
                    <SidebarMenuButton isActive={pathname === '/dashboard/profile'}>
                        <UserCircle />
                        <span>Profile</span>
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
