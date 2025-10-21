
'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookText, FileText, HelpCircle, Download, MessageSquare, CheckCircle2, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { cn } from "@/lib/utils";
import { useMemo, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Lesson {
    id: string;
    title: string;
}

interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

interface Course {
    id: string;
    title: string;
    description: string;
    modules: Module[];
}

interface UserLessonProgress {
    lessonId: string;
}

export default function DashboardPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const progressQuery = useMemoFirebase(() => {
        if (!firestore || !user?.uid) return null;
        return query(
            collection(firestore, 'userLessonProgress'),
            where('userId', '==', user.uid)
        );
    }, [firestore, user?.uid]);

    const { data: lessonProgress, isLoading: progressLoading } = useCollection<UserLessonProgress>(progressQuery);

    useEffect(() => {
        if (!firestore) return;

        const fetchCourseData = async () => {
            setIsLoading(true);
            const coursesQuery = query(collection(firestore, 'courses'), orderBy('title', 'asc'), limit(1));
            const coursesSnapshot = await getDocs(coursesQuery);

            if (coursesSnapshot.empty) {
                setIsLoading(false);
                return;
            }

            const courseDoc = coursesSnapshot.docs[0];
            const fetchedCourse: Course = { id: courseDoc.id, title: courseDoc.data().title, description: courseDoc.data().description, modules: [] };

            const modulesQuery = query(collection(firestore, `courses/${courseDoc.id}/modules`), orderBy('title', 'asc'));
            const modulesSnapshot = await getDocs(modulesQuery);

            const modulesPromises = modulesSnapshot.docs.map(async (moduleDoc) => {
                const moduleData: Module = { id: moduleDoc.id, title: moduleDoc.data().title, lessons: [] };
                
                const lessonsQuery = query(collection(firestore, `courses/${courseDoc.id}/modules/${moduleDoc.id}/lessons`), orderBy('title', 'asc'));
                const lessonsSnapshot = await getDocs(lessonsQuery);
                
                moduleData.lessons = lessonsSnapshot.docs.map(lessonDoc => ({ id: lessonDoc.id, ...lessonDoc.data() } as Lesson));
                return moduleData;
            });

            fetchedCourse.modules = await Promise.all(modulesPromises);
            setCourse(fetchedCourse);
            setIsLoading(false);
        }

        fetchCourseData();
    }, [firestore]);

    const completedLessons = useMemo(() => {
        return new Set(lessonProgress?.map(p => p.lessonId) || []);
    }, [lessonProgress]);

    const allLessons = useMemo(() => course?.modules.flatMap(m => m.lessons) || [], [course]);
    const allLessonsCount = allLessons.length;
    const overallProgress = allLessonsCount > 0 ? (completedLessons.size / allLessonsCount) * 100 : 0;
    
    if (isLoading || progressLoading) {
        return (
             <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-8">
                        <Skeleton className="h-10 w-1/2" />
                        <Skeleton className="h-6 w-3/4 mt-2" />
                    </header>
                    <div className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </div>
            </div>
        )
    }

    if (!course) {
        return (
             <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
                <div className="max-w-7xl mx-auto">
                     <header className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                            Welcome back, Catalyst!
                        </h1>
                    </header>
                    <Card>
                        <CardHeader><CardTitle>No courses found.</CardTitle></CardHeader>
                        <CardContent><p>There are no courses available at this time. Please check back later.</p></CardContent>
                    </Card>
                </div>
             </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Welcome back, Catalyst!
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Your Cohort (Delta-2024) is making great progress. Keep up the momentum!
                    </p>
                </header>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">{course.title}</CardTitle>
                            <CardDescription>Overall Program Progress</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                               <Progress value={overallProgress} className="w-full" />
                               <span className="font-bold text-lg text-foreground">{Math.round(overallProgress)}%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Accordion type="multiple" className="w-full space-y-4">
                        {course.modules.map(module => {
                            const completedModuleLessons = module.lessons.filter(l => completedLessons.has(l.id)).length;
                            const moduleProgress = module.lessons.length > 0 ? (completedModuleLessons / module.lessons.length) * 100 : 0;
                            
                            return (
                                <AccordionItem value={module.id} key={module.id} className="bg-card border-border/50 rounded-lg shadow-sm">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                        <div className="flex flex-col md:flex-row md:items-center w-full gap-2 md:gap-4">
                                            <h3 className="text-lg font-headline text-left flex-1">{module.title}</h3>
                                            <div className="flex items-center gap-2 w-full md:w-48">
                                                <Progress value={moduleProgress} className="w-full h-2" />
                                                <span className="text-sm font-medium text-muted-foreground w-12 text-right">{Math.round(moduleProgress)}%</span>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-6 border-t">
                                       <div className="space-y-4">
                                            <h4 className="font-bold">Lessons in this module:</h4>
                                            {module.lessons.length > 0 ? (
                                                <ul className="space-y-3">
                                                    {module.lessons.map(lesson => {
                                                        const isCompleted = completedLessons.has(lesson.id);
                                                        return (
                                                            <li key={lesson.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
                                                                <div className="flex items-center gap-3">
                                                                    {isCompleted ? <Check className="w-5 h-5 text-green-500" /> : <BookText className="w-5 h-5 text-accent"/>}
                                                                    <span className={cn("font-medium", isCompleted && "line-through text-muted-foreground")}>{lesson.title}</span>
                                                                </div>
                                                                <Button variant={isCompleted ? "secondary" : "ghost"} size="sm" asChild>
                                                                    <Link href={`/dashboard/courses/${course.id}/modules/${module.id}/lessons/${lesson.id}`}>{isCompleted ? "Review" : "Start Lesson"}</Link>
                                                                </Button>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-muted-foreground">No lessons have been added to this module yet.</p>
                                            )}
                                            <h4 className="font-bold pt-4 border-t">Module Actions:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Button variant="outline"><FileText />Reflect (Journal)</Button>
                                                <Button variant="outline"><HelpCircle />Module Quiz</Button>
                                                 <Button variant="outline" asChild>
                                                    <Link href={`/dashboard/discussion/${module.id}`}>
                                                         <MessageSquare />
                                                        <span>Join Discussion</span>
                                                    </Link>
                                                </Button>
                                            </div>
                                       </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
