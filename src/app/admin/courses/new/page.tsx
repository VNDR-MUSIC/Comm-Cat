
'use client';

import { useFormState } from 'react-dom';
import { createCourse, type CourseState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SubmitButton } from '@/components/shared/SubmitButton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';


export default function NewCoursePage() {
    const initialState: CourseState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createCourse, initialState);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
             <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    Create New Course
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Fill out the details below to add a new course to the curriculum.
                </p>
            </header>

            <Card className="max-w-2xl">
                <form action={dispatch}>
                    <CardHeader>
                        <CardTitle>Course Details</CardTitle>
                        <CardDescription>
                            This information will be visible to students in the course catalog.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {state.message && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input id="title" name="title" placeholder="e.g., Leadership & Legacy" />
                            {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="description">Course Description</Label>
                            <Textarea id="description" name="description" placeholder="A brief summary of what this course is about..." />
                            {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description[0]}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="duration">Course Duration</Label>
                            <Input id="duration" name="duration" placeholder="e.g., 52 Weeks" />
                            {state.errors?.duration && <p className="text-sm text-destructive">{state.errors.duration[0]}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                           <Link href="/admin/courses">Cancel</Link>
                        </Button>
                        <SubmitButton idleText="Create Course" submittingText="Creating..." />
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
