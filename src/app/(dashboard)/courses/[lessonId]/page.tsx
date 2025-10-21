'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Download, PlayCircle } from 'lucide-react';
import Link from 'next/link';

const lessons: { [key: string]: { title: string, module: string, videoUrl?: string, description: string } } = {
    l1: { 
        title: "Reclaiming Your Narrative", 
        module: "Module 1", 
        description: "Understand the power of your personal story and learn how to reframe your past to build a powerful future.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLX_2g75xA94CMY1r3f-A-S2f-G4z_w_fC"
    },
    l2: { 
        title: "Goal Setting with Purpose", 
        module: "Module 1", 
        description: "Define meaningful short-term and long-term goals that align with your vision for a successful and fulfilling life.",
    },
    l3: { 
        title: "Budgeting for a New Beginning", 
        module: "Module 2", 
        videoUrl: "https://www.youtube.com/embed/fK33dABa_CM",
        description: "Master the fundamentals of personal finance. Create a realistic budget, track expenses, and develop a savings plan."
    },
    l4: { 
        title: "Repairing Credit", 
        module: "Module 2", 
        description: "Learn the steps to understand your credit report, dispute inaccuracies, and build a positive credit history over time."
    },
    l5: { 
        title: "Crafting Your Resume", 
        module: "Module 3", 
        description: "Translate your life experiences and skills into a compelling resume that stands out to employers.",
        videoUrl: "https://www.youtube.com/embed/uG2aEh6D_wc"
    },
    l6: { 
        title: "Mastering the Interview", 
        module: "Module 3", 
        description: "Gain confidence and learn strategies to effectively answer common interview questions, including those about your past."
    },
};

const getNextLesson = (currentId: string) => {
    const lessonKeys = Object.keys(lessons);
    const currentIndex = lessonKeys.indexOf(currentId);
    if (currentIndex > -1 && currentIndex < lessonKeys.length - 1) {
        const nextId = lessonKeys[currentIndex + 1];
        return { id: nextId, ...lessons[nextId] };
    }
    return null;
}

export default function LessonPage() {
    const params = useParams();
    const lessonId = params.lessonId as string;
    const lesson = lessons[lessonId] || { title: "Lesson Not Found", module: "Unknown Module", description: "This lesson does not exist." };
    const nextLesson = getNextLesson(lessonId);

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                     <p className="text-accent font-semibold">{lesson.module}</p>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        {lesson.title}
                    </h1>
                    <p className="text-muted-foreground mt-2">{lesson.description}</p>
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
                                <Button className="w-full justify-start"><CheckCircle /> Mark as Complete</Button>
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
                                        <Link href={`/dashboard/courses/${nextLesson.id}`} className="font-bold text-accent hover:underline ml-1">
                                            {nextLesson.title}
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
