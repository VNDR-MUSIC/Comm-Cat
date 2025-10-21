'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Download } from 'lucide-react';
import Link from 'next/link';

const lessons: { [key: string]: { title: string, module: string, videoUrl?: string } } = {
    l1: { title: "Reclaiming Your Narrative", module: "Module 1" },
    l2: { title: "Goal Setting with Purpose", module: "Module 1" },
    l3: { title: "Budgeting for a New Beginning", module: "Module 2", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    l4: { title: "Repairing Credit", module: "Module 2" },
    l5: { title: "Crafting Your Resume", module: "Module 3" },
    l6: { title: "Mastering the Interview", module: "Module 3" },
};

export default function LessonPage() {
    const params = useParams();
    const lessonId = params.lessonId as string;
    const lesson = lessons[lessonId] || { title: "Lesson Not Found", module: "Unknown Module" };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                     <p className="text-accent font-semibold">{lesson.module}</p>
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
                                <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
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
                                    <div className="flex items-center justify-center h-full text-muted-foreground">
                                        Video content coming soon.
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
                                <p className="text-muted-foreground">
                                    Up next:
                                    <Link href="#" className="font-bold text-accent hover:underline ml-1">
                                        Repairing Credit
                                    </Link>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
