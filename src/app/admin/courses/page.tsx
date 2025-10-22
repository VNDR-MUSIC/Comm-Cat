
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/shared/data-table';
import { columns, type CourseData } from './columns';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminCoursesPage() {
    const firestore = useFirestore();

    const coursesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'courses'), orderBy('title', 'asc'));
    }, [firestore]);

    const { data: courses, isLoading } = useCollection<CourseData>(coursesQuery);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8 flex items-center justify-between">
                 <div>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Course Management
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Create, edit, and organize all curriculum content.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/courses/new">Add New Course</Link>
                </Button>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>All Courses</CardTitle>
                    <CardDescription>
                        A list of all courses offered on the Catalyst Academy platform.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     {isLoading ? (
                         <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-accent" />
                         </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <DataTable columns={columns} data={courses || []} filterColumnId="title" filterPlaceholder="Filter by title..." />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
