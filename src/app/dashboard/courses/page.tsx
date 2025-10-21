
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenCheck, Loader2 } from "lucide-react";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { CourseProgressCard } from './CourseProgressCard';

interface Course {
    id: string;
    title: string;
    description: string;
}

export default function CoursesPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const coursesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'courses'), orderBy('title', 'asc'));
    }, [firestore]);

    const { data: courses, isLoading: coursesLoading } = useCollection<Course>(coursesQuery);
    
    if (coursesLoading) {
        return (
             <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh flex items-center justify-center">
                <Loader2 className="animate-spin h-12 w-12 text-accent" />
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        My Program
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Your learning journey continues here.
                    </p>
                </header>

                {courses && courses.length > 0 ? (
                    <div className="grid gap-6">
                        {courses.map(course => (
                            <CourseProgressCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Enrolled Courses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg">
                                <BookOpenCheck className="w-16 h-16 text-muted-foreground mb-4" />
                                <h3 className="text-xl font-bold">No Courses Available</h3>
                                <p className="text-muted-foreground mt-2">
                                    Your enrolled courses will appear here once you begin the program.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
