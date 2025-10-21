
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/shared/data-table';
import { columns, UserData } from './columns';
import { Loader2 } from 'lucide-react';

export default function AdminUsersPage() {
    const firestore = useFirestore();

    const usersQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'users'), orderBy('enrollmentDate', 'desc'));
    }, [firestore]);

    const { data: users, isLoading } = useCollection<UserData>(usersQuery);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    User Management
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    View and manage all registered users on the platform.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>A complete list of all Catalyst Academy participants.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                         <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-accent" />
                         </div>
                    ) : (
                        <DataTable columns={columns} data={users || []} filterColumnId="email" filterPlaceholder="Filter by email..." />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
