
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BookOpenCheck, PlayCircle, Loader2 } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import GlowingButton from '@/components/shared/GlowingButton';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { useMemo } from 'react';

const enrolledCourses = [
    {
        id: "community-catalyst",
        title: "Community Catalyst: Empowering Returning Citizens",
        description: "A comprehensive 52-week program to transform your future and become a leader for change in your community.",
        lessons: [
            { id: "l1", title: "Reclaiming Your Narrative" },
            { id: "l2", title: "Goal Setting with Purpose" },
            { id: "l3", title: "Budgeting for a New Beginning" },
            { id: "l4", title: "Repairing Credit" },
            { id: "l5", title: "Crafting Your Resume" },
            { id: "l6", title: "Mastering the Interview" },
        ]
    }
];

interface UserLessonProgress {
    lessonId: string;
}

export default function CoursesPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const progressQuery = useMemoFirebase(() => {
        if (!firestore || !user?.uid) return null;
        return query(
            collection(firestore, 'userLessonProgress'),
            where('userId', '==', user.uid)
        );
    }, [firestore, user?.uid]);

    const { data: lessonProgress, isLoading } = useCollection<UserLessonProgress>(progressQuery);

    const completedLessons = useMemo(() => {
        return new Set(lessonProgress?.map(p => p.lessonId) || []);
    }, [lessonProgress]);
    
    const course = enrolledCourses[0];
    const totalLessons = course.lessons.length;
    const completedLessonsCount = course.lessons.filter(l => completedLessons.has(l.id)).length;
    
    const overallProgress = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

    const lastCompletedLessonIndex = course.lessons.findLastIndex(l => completedLessons.has(l.id));
    const nextLesson = lastCompletedLessonIndex < course.lessons.length - 1 
        ? course.lessons[lastCompletedLessonIndex + 1] 
        : course.lessons[0];


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

                {enrolledCourses.length > 0 ? (
                    <div className="grid gap-6">
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
                                        <p className="text-sm text-muted-foreground pt-4">
                                        Next up: <span className="font-bold text-foreground">{nextLesson.title}</span>
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <GlowingButton asChild>
                                    <Link href={`/dashboard/courses/${nextLesson.id}`}>
                                        <PlayCircle className="mr-2 h-4 w-4" />
                                        Continue Course
                                    </Link>
                                </GlowingButton>
                            </CardFooter>
                        </Card>
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
