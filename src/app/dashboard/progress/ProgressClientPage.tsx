
'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Shield, BrainCircuit, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

interface Lesson {
    id: string;
}

interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

interface Course {
    id: string;
    modules: Module[];
}

interface UserLessonProgress {
    lessonId: string;
}

const getModuleIdByTitle = (title: string, structure: Course[]): string | undefined => {
    for (const course of structure) {
        const module = course.modules.find(m => m.title === title);
        if (module) return module.id;
    }
    return undefined;
}


export function ProgressClientPage({ courseStructure }: { courseStructure: Course[] }) {
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

    const badges = useMemo(() => [
        { icon: <Star className="w-8 h-8 text-yellow-400"/>, title: "Self-Worth Champion", description: "Completed Module 1", requiredModuleId: getModuleIdByTitle("Module 1: Foundations of Self-Worth & Vision", courseStructure) },
        { icon: <BrainCircuit className="w-8 h-8 text-green-400"/>, title: "Financial Pro", description: "Completed Module 2", requiredModuleId: getModuleIdByTitle("Module 2: Financial Literacy & Wealth Building", courseStructure) },
        { icon: <Award className="w-8 h-8 text-blue-400"/>, title: "Career Ready", description: "Completed Module 3", requiredModuleId: getModuleIdByTitle("Module 3: Professional Readiness & Career Pathways", courseStructure) },
        { icon: <Shield className="w-8 h-8 text-indigo-400"/>, title: "Leadership Advocate", description: "Completed Module 6", requiredModuleId: getModuleIdByTitle("Module 6: Leadership, Legacy & Capstone Project", courseStructure) },
    ], [courseStructure]);

    const completedLessons = useMemo(() => {
        return new Set(lessonProgress?.map(p => p.lessonId) || []);
    }, [lessonProgress]);

    const allModules = useMemo(() => courseStructure.flatMap(c => c.modules), [courseStructure]);

    const earnedBadges = useMemo(() => {
        const earned = new Set<string>();
        if (isLoading) return earned;

        badges.forEach(badge => {
            if (!badge.requiredModuleId) return;
            const module = allModules.find(m => m.id === badge.requiredModuleId);
            if (module && module.lessons.length > 0) {
                const allLessonsCompleted = module.lessons.every(lesson => completedLessons.has(lesson.id));
                if (allLessonsCompleted) {
                    earned.add(badge.title);
                }
            }
        });
        return earned;
    }, [completedLessons, isLoading, badges, allModules]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">My Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="w-8 h-8 animate-spin text-accent" />
                    </div>
                ) : (
                    badges.map(badge => {
                        const isEarned = earnedBadges.has(badge.title);
                        return (
                            <div key={badge.title} className={cn(
                                "flex items-center gap-4 p-4 rounded-lg transition-all duration-300",
                                isEarned ? 'bg-secondary/50' : 'bg-secondary/20 opacity-50'
                            )}>
                                <div>{badge.icon}</div>
                                <div>
                                    <h3 className="font-bold">{badge.title}</h3>
                                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                                </div>
                            </div>
                        )
                    })
                )}
            </CardContent>
        </Card>
    );
}

