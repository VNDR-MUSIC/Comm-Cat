'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Shield, BrainCircuit, Loader2 } from "lucide-react";
import GlowingButton from "@/components/shared/GlowingButton";
import { cn } from "@/lib/utils";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

// Define the course structure centrally for this component
const modules = [
    { id: "m1", title: "Module 1", lessons: ["l1", "l2"] },
    { id: "m2", title: "Module 2", lessons: ["l3", "l4"] },
    { id: "m3", title: "Module 3", lessons: ["l5", "l6"] },
    { id: "m4", title: "Module 4", lessons: [] },
    { id: "m5", title: "Module 5", lessons: [] },
    { id: "m6", title: "Module 6", lessons: [] },
];

const badges = [
    { icon: <Star className="w-8 h-8 text-yellow-400"/>, title: "Self-Worth Champion", description: "Completed Module 1", requiredModuleId: "m1" },
    { icon: <BrainCircuit className="w-8 h-8 text-green-400"/>, title: "Financial Pro", description: "Completed Module 2", requiredModuleId: "m2" },
    { icon: <Award className="w-8 h-8 text-blue-400"/>, title: "Career Ready", description: "Completed Module 3", requiredModuleId: "m3" },
    { icon: <Shield className="w-8 h-8 text-indigo-400"/>, title: "Leadership Advocate", description: "Completed Module 6", requiredModuleId: "m6" },
];

interface UserLessonProgress {
    lessonId: string;
}

export default function ProgressPage() {
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

    const earnedBadges = useMemo(() => {
        const earned = new Set<string>();
        if (isLoading) return earned;

        badges.forEach(badge => {
            const module = modules.find(m => m.id === badge.requiredModuleId);
            if (module && module.lessons.length > 0) {
                const allLessonsCompleted = module.lessons.every(lessonId => completedLessons.has(lessonId));
                if (allLessonsCompleted) {
                    earned.add(badge.title);
                }
            }
        });
        return earned;
    }, [completedLessons, isLoading]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        My Progress
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Track your achievements and view your earned credentials.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Certificate of Completion</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative p-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-400 rounded-lg">
                                    <div className="bg-background rounded-lg p-8 text-center aspect-[4/3] flex flex-col justify-center items-center">
                                        <h2 className="text-2xl font-headline font-bold animated-gradient-text">Certificate of Completion</h2>
                                        <p className="mt-4 text-muted-foreground">This certifies that</p>
                                        <p className="text-3xl font-bold font-headline my-4">{user?.displayName || "A. Student"}</p>
                                        <p className="text-muted-foreground">has successfully completed the</p>
                                        <p className="text-xl font-bold font-headline mt-2">Community Catalyst Program</p>
                                        <p className="text-sm text-muted-foreground mt-8">Issued: Not yet earned</p>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <GlowingButton disabled>Download Certificate (Not Yet Earned)</GlowingButton>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-1">
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
                    </div>
                </div>
            </div>
        </div>
    )
}
