
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
import { BookText, FileText, HelpCircle, Download, MessageSquare, CheckCircle2, Check } from "lucide-react"
import Link from "next/link"
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const modules = [
    { id: "m1", title: "Module 1: Foundations of Self-Worth & Vision", lessons: [{ id: "l1", title: "Reclaiming Your Narrative" }, { id: "l2", title: "Goal Setting with Purpose" }], discussionCompleted: true },
    { id: "m2", title: "Module 2: Financial Literacy & Wealth Building", lessons: [{ id: "l3", title: "Budgeting for a New Beginning" }, { id: "l4", title: "Repairing Credit" }], discussionCompleted: true },
    { id: "m3", title: "Module 3: Professional Readiness & Career Pathways", lessons: [{ id: "l5", title: "Crafting Your Resume" }, { id: "l6", title: "Mastering the Interview" }], discussionCompleted: false },
    { id: "m4", title: "Module 4: Health, Wellness, & Resilience", lessons: [], discussionCompleted: false },
    { id: "m5", title: "Module 5: Community Advocacy & Civic Engagement", lessons: [], discussionCompleted: false },
    { id: "m6", title: "Module 6: Leadership, Legacy & Capstone Project", lessons: [], discussionCompleted: false },
];

interface UserLessonProgress {
    lessonId: string;
}

export default function DashboardPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const progressQuery = useMemoFirebase(() => {
        if (!firestore || !user?.uid) return null;
        return query(
            collection(firestore, 'userLessonProgress'),
            where('userId', '==', user.uid)
        );
    }, [firestore, user?.uid]);

    const { data: lessonProgress } = useCollection<UserLessonProgress>(progressQuery);

    const completedLessons = useMemo(() => {
        return new Set(lessonProgress?.map(p => p.lessonId) || []);
    }, [lessonProgress]);

    const allLessonsCount = modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const overallProgress = allLessonsCount > 0 ? (completedLessons.size / allLessonsCount) * 100 : 0;
    
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Welcome back, Catalyst!
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Your Cohort (Delta-2024) is on Week 28. Keep up the great work.
                    </p>
                </header>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Community Catalyst: Empowering Returning Citizens</CardTitle>
                            <CardDescription>Overall Program Progress</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                               <Progress value={overallProgress} className="w-full" />
                               <span className="font-bold text-lg text-foreground">{Math.round(overallProgress)}%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Accordion type="multiple" defaultValue={["m2", "m3"]} className="w-full space-y-4">
                        {modules.map(module => {
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
                                                                <Link href={`/dashboard/courses/${lesson.id}`}>{isCompleted ? "Review" : "Start Lesson"}</Link>
                                                            </Button>
                                                        </li>
                                                    )
                                                })}
                                                 {module.lessons.length === 0 && <p className="text-sm text-muted-foreground">No lessons started yet for this module.</p>}
                                            </ul>
                                            <h4 className="font-bold pt-4 border-t">Required Actions:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Button variant="outline"><FileText />Reflect (Journal)</Button>
                                                <Button variant="outline"><HelpCircle />Module Quiz</Button>
                                                 <Button variant="outline" asChild>
                                                    <Link href={`/dashboard/discussion/${module.id}`}>
                                                         {module.discussionCompleted ? <CheckCircle2 className="text-green-500" /> : <MessageSquare />}
                                                        <span>Join Discussion</span>
                                                    </Link>
                                                </Button>
                                                <Button variant="outline"><Download />Download Resources</Button>
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
