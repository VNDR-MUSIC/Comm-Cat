
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BookOpenCheck, PlayCircle, Loader2 } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import GlowingButton from '@/components/shared/GlowingButton';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useMemo } from 'react';

const courseStructure: { [key: string]: { id: string, modules: { moduleId: string, lessons: { id: string, title: string }[] }[] } } = {
    "Community Catalyst: Empowering Returning Citizens": {
        id: "AZgwb4n8k5g4z8E4o4y1",
        modules: [
            { moduleId: "JmDTSkaxJo3S6C6kTC8S", lessons: [{ id: "l1", title: "Reclaiming Your Narrative" }, { id: "l2", title: "Goal Setting with Purpose" }] },
            { moduleId: "e065bf1f", lessons: [{ id: "l3", title: "Budgeting for a New Beginning" }, { id: "l4", title: "Repairing Credit" }] },
            { moduleId: "a39b4b02", lessons: [{ id: "l5", title: "Crafting Your Resume" }, { id: "l6", title: "Mastering the Interview" }] },
        ]
    }
};


interface UserLessonProgress {
    lessonId: string;
}

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

    const progressQuery = useMemoFirebase(() => {
        if (!firestore || !user?.uid) return null;
        return query(
            collection(firestore, 'userLessonProgress'),
            where('userId', '==', user.uid)
        );
    }, [firestore, user?.uid]);

    const { data: courses, isLoading: coursesLoading } = useCollection<Course>(coursesQuery);
    const { data: lessonProgress, isLoading: progressLoading } = useCollection<UserLessonProgress>(progressQuery);

    const isLoading = coursesLoading || progressLoading;

    const completedLessons = useMemo(() => {
        return new Set(lessonProgress?.map(p => p.lessonId) || []);
    }, [lessonProgress]);

    if (isLoading) {
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
                        {courses.map(course => {
                            const structure = courseStructure[course.title as keyof typeof courseStructure];
                            if (!structure) return null;

                            const allLessons = structure.modules.flatMap(m => m.lessons);
                            const totalLessons = allLessons.length;
                            const completedLessonsCount = allLessons.filter(l => completedLessons.has(l.id)).length;
                            const overallProgress = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

                            const findNextLesson = () => {
                                for (const module of structure.modules) {
                                    for (const lesson of module.lessons) {
                                        if (!completedLessons.has(lesson.id)) {
                                            return { ...lesson, moduleId: module.moduleId };
                                        }
                                    }
                                }
                                // If all lessons are complete, return the first lesson
                                if (structure.modules.length > 0 && structure.modules[0].lessons.length > 0) {
                                    return { ...structure.modules[0].lessons[0], moduleId: structure.modules[0].moduleId };
                                }
                                return null;
                            };

                            const nextLessonInfo = findNextLesson();

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
                                                    Next up: <span className="font-bold text-foreground">{nextLessonInfo.title}</span>
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        {nextLessonInfo && (
                                            <GlowingButton asChild>
                                                <Link href={`/dashboard/courses/${course.id}/modules/${nextLessonInfo.moduleId}/lessons/${nextLessonInfo.id}`}>
                                                    <PlayCircle className="mr-2 h-4 w-4" />
                                                    Continue Course
                                                </Link>
                                            </GlowingButton>
                                        )}
                                    </CardFooter>
                                </Card>
                            );
                        })}
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
