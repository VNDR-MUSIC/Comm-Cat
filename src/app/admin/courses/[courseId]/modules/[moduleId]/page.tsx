
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, BookOpen, ChevronRight, Video, Users, Pencil, Building, Landmark, Mic, Trophy, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AddLessonDialog } from './AddLessonDialog';

interface ModuleData {
  title: string;
  courseId: string;
}

interface LessonData {
    id: string;
    title: string;
    duration: string;
    activityType: string;
}

const getIconForType = (type: string) => {
    switch (type) {
        case "Video & Reflection": return <Video />;
        case "Interactive Workshop": return <Users />;
        case "Expert Session": return <Pencil />;
        case "Practical Workshop": return <Landmark />;
        case "Guest Speaker": return <Building />;
        case "Role-play simulation": return <Users />;
        case "Certification": return <CheckCircle2 />;
        case "Group Discussion": return <Users />;
        case "Legal Clinic": return <Landmark />;
        case "Strategy Workshop": return <Users />;
        case "Public Speaking for Leaders": return <Mic />;
        case "Final Presentation": return <Trophy />;
        default: return <BookOpen />;
    }
}


export default function ModuleDetailPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const moduleId = params.moduleId as string;
    const firestore = useFirestore();

    const moduleDocRef = useMemoFirebase(() => {
        if (!firestore || !courseId || !moduleId) return null;
        return doc(firestore, `courses/${courseId}/modules/${moduleId}`);
    }, [firestore, courseId, moduleId]);
    
    const lessonsQuery = useMemoFirebase(() => {
        if (!firestore || !courseId || !moduleId) return null;
        return query(collection(firestore, `courses/${courseId}/modules/${moduleId}/lessons`), orderBy('title', 'asc'));
    }, [firestore, courseId, moduleId]);

    const { data: module, isLoading: isModuleLoading } = useDoc<ModuleData>(moduleDocRef);
    const { data: lessons, isLoading: areLessonsLoading } = useCollection<LessonData>(lessonsQuery);

    const isLoading = isModuleLoading || areLessonsLoading;

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

    if (!module) {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-destructive">
                        Module Not Found
                    </h1>
                </header>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <div className="mb-4">
                    <Button asChild variant="outline">
                        <Link href={`/admin/courses/${courseId}`} className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Course</span>
                        </Link>
                    </Button>
                </div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    {module.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Manage the lessons within this module.
                </p>
            </header>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Lessons</CardTitle>
                        <CardDescription>The lessons that make up this module.</CardDescription>
                    </div>
                   <AddLessonDialog courseId={courseId} moduleId={moduleId} />
                </CardHeader>
                <CardContent>
                   {lessons && lessons.length > 0 ? (
                       <div className="border rounded-md">
                           {lessons.map((lesson, index) => (
                                <div key={lesson.id} className={`flex items-start gap-4 p-4 ${index < lessons.length - 1 ? 'border-b' : ''}`}>
                                    <div className="text-accent mt-1">{getIconForType(lesson.activityType)}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold">{lesson.title}</h4>
                                            <div className="text-right text-xs text-muted-foreground">
                                                <p>{lesson.duration}</p>
                                                <p className="font-semibold">{lesson.activityType}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                           ))}
                       </div>
                   ) : (
                     <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg">
                        <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-bold">No Lessons Yet</h3>
                        <p className="text-muted-foreground mt-2">
                            Click "Add New Lesson" to start building your module.
                        </p>
                    </div>
                   )}
                </CardContent>
            </Card>

        </div>
    )
}
