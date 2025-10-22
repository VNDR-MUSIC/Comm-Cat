
"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { LayoutDashboard, BookOpen, MessageSquare, Award, Folder, LifeBuoy, Notebook, Calendar, BrainCircuit } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { UserNav } from "./UserNav";

const navItems = [
    { href: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
    { href: "/dashboard/courses", icon: <BookOpen />, label: "My Program" },
    { href: "/dashboard/progress", icon: <Award />, label: "Progress" },
    { href: "/dashboard/notes", icon: <Notebook />, label: "Notes" },
    { href: "/dashboard/discussion", icon: <MessageSquare />, label: "Discussion" },
    { href: "/dashboard/schedule", icon: <Calendar />, label: "Schedule" },
    { href: "/dashboard/resources", icon: <Folder />, label: "Resources" },
    { href: "/dashboard/knowledge-base", icon: <BrainCircuit />, label: "Knowledge Base" },
    { href: "/dashboard/support", icon: <LifeBuoy />, label: "Support" },
]

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <UserNav />
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
    </Sidebar>
  )
}
