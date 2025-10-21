
'use client';

import { useFormState } from 'react-dom';
import { updateCourse, type CourseState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SubmitButton } from '@/components/shared/SubmitButton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

interface CourseData {
  title: string;
  description: string;
  duration: string;
}

export default function EditCoursePage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const firestore = useFirestore();

    const courseDocRef = useMemoFirebase(() => {
        if (!firestore || !courseId) return null;
        return doc(firestore, `courses/${courseId}`);
    }, [firestore, courseId]);

    const { data: course, isLoading } = useDoc<CourseData>(courseDocRef);
    
    const initialState: CourseState = { message: null, errors: {}, success: false };
    const [state, dispatch] = useFormState(updateCourse, initialState);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        if (course) {
            setTitle(course.title);
            setDescription(course.description);
            setDuration(course.duration);
        }
    }, [course]);

    if (isLoading) {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-6 w-1/2 mt-2" />
                </header>
                <Card className="max-w-2xl">
                    <CardHeader>
                        <Skeleton className="h-8 w-1/4" />
                        <Skeleton className="h-5 w-2/5 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-24 w-full" />
                         <Skeleton className="h-10 w-full" />
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                         <Skeleton className="h-10 w-24" />
                         <Skeleton className="h-10 w-24" />
                    </CardFooter>
                </Card>
            </div>
        )
    }

    if (!course) {
        return (
             <div className="p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl font-bold text-destructive">Course not found</h1>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
             <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    Edit Course
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Modify the details for "{course.title}".
                </p>
            </header>

            <Card className="max-w-2xl">
                <form action={dispatch}>
                    <CardHeader>
                        <CardTitle>Course Details</CardTitle>
                        <CardDescription>
                           Make changes to the course and save them.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <input type="hidden" name="courseId" value={courseId} />
                        {state.message && !state.success && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="description">Course Description</Label>
                            <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description[0]}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="duration">Course Duration</Label>
                            <Input id="duration" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                            {state.errors?.duration && <p className="text-sm text-destructive">{state.errors.duration[0]}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                           <Link href="/admin/courses">Cancel</Link>
                        </Button>
                        <SubmitButton idleText="Save Changes" submittingText="Saving..." />
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

    