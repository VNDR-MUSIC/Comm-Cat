
'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Download, PlayCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, useDoc } from '@/firebase';
import { collection, query, where, serverTimestamp, doc } from 'firebase/firestore';

interface LessonData {
    id: string;
    title: string;
    videoUrl?: string;
    description: string;
    moduleId: string;
}

interface ModuleData {
    title: string;
    lessons: string[]; // array of lesson IDs
}

interface UserLessonProgress {
    userId: string;
    lessonId: string;
    completedAt: any;
}

export default function LessonPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const moduleId = params.moduleId as string;
    const lessonId = params.lessonId as string;
    
    const { user } = useUser();
    const firestore = useFirestore();

    const lessonDocRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, `courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`);
    }, [firestore, courseId, moduleId, lessonId]);

    const moduleDocRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, `courses/${courseId}/modules/${moduleId}`);
    }, [firestore, courseId, moduleId]);

    const { data: lesson, isLoading: isLessonLoading } = useDoc<LessonData>(lessonDocRef);
    const { data: moduleData, isLoading: isModuleLoading } = useDoc<ModuleData>(moduleDocRef);

    const progressQuery = useMemoFirebase(() => {
        if (!firestore || !user?.uid) return null;
        return query(
            collection(firestore, 'userLessonProgress'),
            where('userId', '==', user.uid),
            where('lessonId', '==', lessonId)
        );
    }, [firestore, user?.uid, lessonId]);

    const { data: progress, isLoading: isProgressLoading } = useCollection<UserLessonProgress>(progressQuery);

    const isLoading = isLessonLoading || isProgressLoading || isModuleLoading;
    const isCompleted = progress && progress.length > 0;

    const getNextLesson = () => {
        if (!moduleData || !moduleData.lessons) return null;
        const currentIndex = moduleData.lessons.indexOf(lessonId);
        if (currentIndex > -1 && currentIndex < moduleData.lessons.length - 1) {
            const nextId = moduleData.lessons[currentIndex + 1];
            return { id: nextId };
        }
        return null;
    }

    const nextLesson = getNextLesson();

    const handleMarkComplete = () => {
        if (!firestore || !user?.uid || isCompleted) return;

        const progressData = {
            userId: user.uid,
            lessonId: lessonId,
            completedAt: serverTimestamp(),
        };

        const collectionRef = collection(firestore, 'userLessonProgress');
        addDocumentNonBlocking(collectionRef, progressData);
    };
    
    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-accent" /></div>
    }

    if (!lesson) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-destructive">Lesson Not Found</h1>
                    <p className="mt-4">The lesson you are looking for does not exist or you do not have permission to view it.</p>
                    <Button asChild className="mt-6">
                        <Link href="/dashboard/courses">Go to My Courses</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                     <p className="text-accent font-semibold">{moduleData?.title || 'Module'}</p>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        {lesson.title}
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Lesson Video</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden flex items-center justify-center">
                                {lesson.videoUrl ? (
                                    <iframe
                                        src={lesson.videoUrl}
                                        title="Lesson Video Player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                    ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                                        <PlayCircle className="w-12 h-12 mb-4" />
                                        <h3 className="font-bold">Video Coming Soon</h3>
                                        <p className="text-sm">This lesson's video content is currently in production. Please check back later.</p>
                                    </div>
                                )}
                                </AspectRatio>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button className="w-full justify-start" onClick={handleMarkComplete} disabled={isLoading || isCompleted}>
                                    {isLoading ? <Loader2 className="animate-spin" /> : <CheckCircle />}
                                    <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
                                </Button>
                                <Button variant="outline" className="w-full justify-start"><FileText /> Reflect (Journal)</Button>
                                <Button variant="outline" className="w-full justify-start"><Download /> Download Resources</Button>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardHeader>
                                <CardTitle>Next Lesson</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {nextLesson ? (
                                    <p className="text-muted-foreground">
                                        Up next:
                                        <Link href={`/dashboard/courses/${courseId}/modules/${moduleId}/lessons/${nextLesson.id}`} className="font-bold text-accent hover:underline ml-1">
                                            Continue
                                        </Link>
                                    </p>
                                ) : (
                                    <p className="text-muted-foreground">
                                        You've reached the end of this module's lessons!
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

