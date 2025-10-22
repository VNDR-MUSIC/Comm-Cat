
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/shared/data-table';
import { columns, type ResourceData } from './columns';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminResourcesPage() {
    const firestore = useFirestore();

    const resourcesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'resources'), orderBy('title', 'asc'));
    }, [firestore]);

    const { data: resources, isLoading } = useCollection<ResourceData>(resourcesQuery);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8 flex items-center justify-between">
                 <div>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Resource Management
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Create, edit, and manage all learning resources.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/resources/new">Add New Resource</Link>
                </Button>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>All Resources</CardTitle>
                    <CardDescription>
                        A list of all documents, links, and materials available on the platform.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     {isLoading ? (
                         <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-accent" />
                         </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <DataTable columns={columns} data={resources || []} filterColumnId="title" filterPlaceholder="Filter by title..." />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
