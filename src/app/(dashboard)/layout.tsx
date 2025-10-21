import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
            <div className="min-h-dvh">
                {children}
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
