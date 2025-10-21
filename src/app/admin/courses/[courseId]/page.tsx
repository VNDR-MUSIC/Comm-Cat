
'use client';

import { useParams } from 'next/navigation';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Loader2, BookOpen, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AddModuleDialog } from './AddModuleDialog';

interface CourseData {
  title: string;
  description: string;
  duration: string;
}

interface ModuleData {
    id: string;
    title: string;
}

export default function CourseDetailPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const firestore = useFirestore();

    const courseDocRef = useMemoFirebase(() => {
        if (!firestore || !courseId) return null;
        return doc(firestore, `courses/${courseId}`);
    }, [firestore, courseId]);
    
    const modulesQuery = useMemoFirebase(() => {
        if (!firestore || !courseId) return null;
        return query(collection(firestore, `courses/${courseId}/modules`), orderBy('title', 'asc'));
    }, [firestore, courseId]);

    const { data: course, isLoading: isCourseLoading } = useDoc<CourseData>(courseDocRef);
    const { data: modules, isLoading: areModulesLoading } = useCollection<ModuleData>(modulesQuery);

    const isLoading = isCourseLoading || areModulesLoading;

    if (isLoading) {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-6 w-1/2 mt-2" />
                </header>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/4" />
                        <Skeleton className="h-5 w-2/5 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-destructive">
                        Course Not Found
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        The course you are looking for does not exist.
                    </p>
                    <Button asChild variant="outline" className="mt-4">
                        <Link href="/admin/courses" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Courses</span>
                        </Link>
                    </Button>
                </header>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <div className="mb-4">
                    <Button asChild variant="outline">
                        <Link href="/admin/courses" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span>All Courses</span>
                        </Link>
                    </Button>
                </div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    {course.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    {course.description}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Modules</CardTitle>
                                <CardDescription>The modules that make up this course.</CardDescription>
                            </div>
                           <AddModuleDialog courseId={courseId} />
                        </CardHeader>
                        <CardContent>
                           {modules && modules.length > 0 ? (
                               <div className="border rounded-md">
                                   {modules.map((module, index) => (
                                        <Link key={module.id} href={`/admin/courses/${courseId}/modules/${module.id}`}>
                                            <div className={`flex items-center justify-between p-4 hover:bg-accent/10 ${index < modules.length - 1 ? 'border-b' : ''}`}>
                                                <p className="font-medium">{module.title}</p>
                                                <Button variant="ghost" size="icon">
                                                    <ChevronRight className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </Link>
                                   ))}
                               </div>
                           ) : (
                             <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg">
                                <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
                                <h3 className="text-xl font-bold">No Modules Yet</h3>
                                <p className="text-muted-foreground mt-2">
                                    Click "Add New Module" to start building your course.
                                </p>
                            </div>
                           )}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                     <Card>
                        <CardHeader>
                            <CardTitle>Course Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold">Duration</h4>
                                <p className="text-muted-foreground">{course.duration}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold">Course ID</h4>
                                <p className="text-muted-foreground text-sm break-all">{courseId}</p>
                            </div>
                            <Button variant="outline" className="w-full">Edit Course Details</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
