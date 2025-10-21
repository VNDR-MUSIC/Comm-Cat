
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PlayCircle, Loader2 } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import GlowingButton from '@/components/shared/GlowingButton';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useMemo, useState, useEffect } from 'react';

interface Course {
    id: string;
    title: string;
    description: string;
}

interface Module {
    id: string;
    title: string;
}

interface Lesson {
    id: string;
    title: string;
}

interface UserLessonProgress {
    lessonId: string;
}

interface CourseProgressCardProps {
    course: Course;
}

export function CourseProgressCard({ course }: CourseProgressCardProps) {
    const { user } = useUser();
    const firestore = useFirestore();

    const [modules, setModules] = useState<Module[]>([]);
    const [allLessons, setAllLessons] = useState<{ moduleId: string, lesson: Lesson }[]>([]);
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
        if (!firestore || !course.id) return;

        const fetchCourseData = async () => {
            setIsLoading(true);
            
            // 1. Fetch modules
            const modulesQuery = query(collection(firestore, `courses/${course.id}/modules`), orderBy('title', 'asc'));
            const modulesSnapshot = await getDocs(modulesQuery);
            const fetchedModules = modulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Module));
            setModules(fetchedModules);

            // 2. Fetch all lessons for all modules
            const allLessonsPromises = fetchedModules.map(async (module) => {
                const lessonsQuery = query(collection(firestore, `courses/${course.id}/modules/${module.id}/lessons`), orderBy('title', 'asc'));
                const lessonsSnapshot = await getDocs(lessonsQuery);
                return lessonsSnapshot.docs.map(doc => ({
                    moduleId: module.id,
                    lesson: { id: doc.id, ...doc.data() } as Lesson
                }));
            });
            
            const lessonsByModule = await Promise.all(allLessonsPromises);
            const flattenedLessons = lessonsByModule.flat();
            setAllLessons(flattenedLessons);

            setIsLoading(false);
        };

        fetchCourseData();
    }, [firestore, course.id]);

    const completedLessons = useMemo(() => {
        return new Set(lessonProgress?.map(p => p.lessonId) || []);
    }, [lessonProgress]);

    const totalLessons = allLessons.length;
    const completedLessonsCount = useMemo(() => {
        return allLessons.filter(l => completedLessons.has(l.lesson.id)).length;
    }, [allLessons, completedLessons]);
    
    const overallProgress = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

    const findNextLesson = () => {
        for (const module of modules) {
            const lessonsInModule = allLessons.filter(l => l.moduleId === module.id);
            for (const { lesson } of lessonsInModule) {
                if (!completedLessons.has(lesson.id)) {
                    return { ...lesson, moduleId: module.id };
                }
            }
        }
        // If all lessons are complete, return the first lesson to allow review
        if (modules.length > 0 && allLessons.length > 0) {
             const firstLessonInfo = allLessons[0];
             return { ...firstLessonInfo.lesson, moduleId: firstLessonInfo.moduleId };
        }
        return null;
    };

    const nextLessonInfo = findNextLesson();

    if (isLoading || progressLoading) {
        return (
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center h-24">
                        <Loader2 className="animate-spin h-8 w-8 text-accent" />
                    </div>
                </CardContent>
            </Card>
        );
    }
    

    return (
        <Card key={course.id} className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <p className="text-sm font-medium">Overall Progress</p>
                    <div className="flex items-center gap-4">
                        <Progress value={overallProgress} className="w-full" />
                        <span className="font-bold text-lg text-foreground">{Math.round(overallProgress)}%</span>
                    </div>
                    {nextLessonInfo && (
                        <p className="text-sm text-muted-foreground pt-4">
                            {overallProgress < 100 ? "Next up:" : "Review:"} <span className="font-bold text-foreground">{nextLessonInfo.title}</span>
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                {nextLessonInfo ? (
                    <GlowingButton asChild>
                        <Link href={`/dashboard/courses/${course.id}/modules/${nextLessonInfo.moduleId}/lessons/${nextLessonInfo.id}`}>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            {overallProgress < 100 ? "Continue Course" : "Review Course"}
                        </Link>
                    </GlowingButton>
                ) : (
                    <p className="text-sm text-muted-foreground">No lessons available in this course yet.</p>
                )}
            </CardFooter>
        </Card>
    );
}
