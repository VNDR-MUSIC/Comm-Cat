
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import Footer from '@/components/layout/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user data has loaded and there is no user, redirect to login.
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  // While checking auth state, show a loading indicator to prevent content flicker.
  if (isUserLoading || !user) {
    return (
        <div className="flex h-dvh w-full items-center justify-center bg-background">
            <p>Loading...</p>
        </div>
    );
  }

  // If user is logged in, render the dashboard layout.
  return (
    <SidebarProvider>
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-h-dvh">
            <SidebarInset>
                {children}
            </SidebarInset>
            <Footer />
        </div>
    </SidebarProvider>
  );
}
