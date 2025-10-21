
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BookOpenCheck, PlayCircle } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import GlowingButton from '@/components/shared/GlowingButton';

const enrolledCourses = [
    {
        id: "community-catalyst",
        title: "Community Catalyst: Empowering Returning Citizens",
        description: "A comprehensive 52-week program to transform your future and become a leader for change in your community.",
        progress: 45,
        nextLesson: {
            id: 'l5',
            title: "Crafting Your Resume"
        }
    }
];

export default function CoursesPage() {
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
                        {enrolledCourses.map(course => (
                            <Card key={course.id} className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl">{course.title}</CardTitle>
                                    <CardDescription>{course.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <p className="text-sm font-medium">Overall Progress</p>
                                        <div className="flex items-center gap-4">
                                            <Progress value={course.progress} className="w-full" />
                                            <span className="font-bold text-lg text-foreground">{course.progress}%</span>
                                        </div>
                                         <p className="text-sm text-muted-foreground pt-4">
                                            Next up: <span className="font-bold text-foreground">{course.nextLesson.title}</span>
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <GlowingButton asChild>
                                        <Link href={`/dashboard/courses/${course.nextLesson.id}`}>
                                            <PlayCircle className="mr-2 h-4 w-4" />
                                            Continue Course
                                        </Link>
                                    </GlowingButton>
                                </CardFooter>
                            </Card>
                        ))}
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
