
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/shared/data-table';
import { columns, SponsorshipData } from './columns';
import { Loader2 } from 'lucide-react';

export default function AdminSponsorshipsPage() {
    const firestore = useFirestore();

    const sponsorshipsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'sponsorships'), orderBy('createdAt', 'desc'));
    }, [firestore]);

    const { data: sponsorships, isLoading } = useCollection<SponsorshipData>(sponsorshipsQuery);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    Sponsorship Applications
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Review and manage all incoming sponsorship requests.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>All Applications</CardTitle>
                    <CardDescription>A complete list of individuals and organizations interested in sponsoring students.</CardDescription>
                </CardHeader>
                <CardContent>
                     {isLoading ? (
                         <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-accent" />
                         </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <DataTable columns={columns} data={sponsorships || []} filterColumnId="email" filterPlaceholder="Filter by email..." />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
