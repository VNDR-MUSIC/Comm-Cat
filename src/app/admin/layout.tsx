
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';


interface UserProfile {
    isAdmin?: boolean;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, `users/${user.uid}`);
  }, [firestore, user?.uid]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  useEffect(() => {
    const isLoading = isUserLoading || isProfileLoading;
    
    if (!isLoading && (!user || !userProfile?.isAdmin)) {
      router.push('/login');
    }
  }, [user, userProfile, isUserLoading, isProfileLoading, router]);

  if (isUserLoading || isProfileLoading || !userProfile?.isAdmin) {
    return (
        <div className="flex h-dvh w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-accent"/>
                <p className="text-muted-foreground">Verifying administrator access...</p>
            </div>
        </div>
    );
  }

  return (
      <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
              <div className="min-h-dvh">
                  {children}
              </div>
          </SidebarInset>
      </SidebarProvider>
  );
}
