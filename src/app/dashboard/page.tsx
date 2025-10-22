
'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, MessageSquare, Loader2, Trophy, Notebook } from "lucide-react"
import Link from "next/link"
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { useMemo, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import GlowingButton from "@/components/shared/GlowingButton";

interface Lesson {
    id: string;
}

interface Module {
    id: string;
    lessons: Lesson[];
}

interface Course {
    id: string;
    modules: Module[];
}

interface UserLessonProgress {
    lessonId: string;
}

export default function DashboardPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    const [allLessonsCount, setAllLessonsCount] = useState(0);
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

        const fetchAllLessonsCount = async () => {
            setIsLoading(true);
            const coursesSnapshot = await getDocs(query(collection(firestore, 'courses')));
            let totalLessons = 0;

            for (const courseDoc of coursesSnapshot.docs) {
                const modulesSnapshot = await getDocs(query(collection(firestore, `courses/${courseDoc.id}/modules`)));
                for (const moduleDoc of modulesSnapshot.docs) {
                    const lessonsSnapshot = await getDocs(query(collection(firestore, `courses/${courseDoc.id}/modules/${moduleDoc.id}/lessons`)));
                    totalLessons += lessonsSnapshot.size;
                }
            }
            setAllLessonsCount(totalLessons);
            setIsLoading(false);
        };

        fetchAllLessonsCount();
    }, [firestore]);


    const completedLessonsCount = lessonProgress?.length || 0;
    const overallProgress = allLessonsCount > 0 ? (completedLessonsCount / allLessonsCount) * 100 : 0;
    
    if (isLoading || progressLoading) {
        return (
             <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-8">
                        <Skeleton className="h-10 w-1/2" />
                        <Skeleton className="h-6 w-3/4 mt-2" />
                    </header>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full md:col-span-2" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Welcome back, {user?.displayName?.split(' ')[0] || 'Catalyst'}!
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Your Cohort (Delta-2024) is making great progress. Keep up the momentum!
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Overall Program Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 mb-4">
                               <Progress value={overallProgress} className="w-full" />
                               <span className="font-bold text-lg text-foreground">{Math.round(overallProgress)}%</span>
                            </div>
                             <p className="text-sm text-muted-foreground">{completedLessonsCount} of {allLessonsCount} lessons completed.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Next Steps</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <GlowingButton asChild>
                                <Link href="/dashboard/courses">
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Continue My Program
                                </Link>
                            </GlowingButton>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="font-headline">Quick Access</CardTitle>
                        </CardHeader>
                         <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                             <Button variant="outline" asChild className="h-20 flex-col gap-2">
                                <Link href="/dashboard/notes">
                                    <Notebook />
                                    <span>My Notes</span>
                                </Link>
                            </Button>
                             <Button variant="outline" asChild className="h-20 flex-col gap-2">
                                <Link href="/dashboard/discussion">
                                    <MessageSquare />
                                     <span>Discussions</span>
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="h-20 flex-col gap-2">
                                <Link href="/dashboard/progress">
                                    <Trophy />
                                    <span>My Progress</span>
                                </Link>
                            </Button>
                             <Button variant="outline" asChild className="h-20 flex-col gap-2">
                                <Link href="/dashboard/schedule">
                                    <Trophy />
                                    <span>Schedule a Session</span>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
