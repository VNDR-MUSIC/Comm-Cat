
'use client';

import { useFormState } from 'react-dom';
import { updateLesson, type LessonState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SubmitButton } from '@/components/shared/SubmitButton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, orderBy } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Checklist, type ChecklistOption } from '@/components/shared/Checklist';

interface LessonData {
  title: string;
  duration: string;
  activityType: string;
  description?: string;
  videoUrl?: string;
  htmlCourseUrl?: string;
  resourceIds?: string[];
}

interface ResourceData {
    id: string;
    title: string;
}

export default function EditLessonPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();

    const courseId = params.courseId as string;
    const moduleId = params.moduleId as string;
    const lessonId = params.lessonId as string;

    const firestore = useFirestore();

    const lessonDocRef = useMemoFirebase(() => {
        if (!firestore || !courseId || !moduleId || !lessonId) return null;
        return doc(firestore, `courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`);
    }, [firestore, courseId, moduleId, lessonId]);

    const resourcesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'resources'), orderBy('title', 'asc'));
    }, [firestore]);

    const { data: lesson, isLoading: isLessonLoading } = useDoc<LessonData>(lessonDocRef);
    const { data: resources, isLoading: areResourcesLoading } = useCollection<ResourceData>(resourcesQuery);

    const initialState: LessonState = { message: null, errors: {}, success: false };
    const [state, dispatch] = useFormState(updateLesson, initialState);

    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [activityType, setActivityType] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [htmlCourseUrl, setHtmlCourseUrl] = useState('');
    const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>([]);
    
    const resourceOptions: ChecklistOption[] = resources?.map(r => ({ id: r.id, label: r.title })) || [];

    useEffect(() => {
        if (lesson) {
            setTitle(lesson.title);
            setDuration(lesson.duration);
            setActivityType(lesson.activityType);
            setDescription(lesson.description || '');
            setVideoUrl(lesson.videoUrl || '');
            setHtmlCourseUrl(lesson.htmlCourseUrl || '');
            setSelectedResourceIds(lesson.resourceIds || []);
        }
    }, [lesson]);

     useEffect(() => {
        if (state.success) {
            toast({
                title: "Success",
                description: state.message,
            });
            router.push(`/admin/courses/${courseId}/modules/${moduleId}`);
        }
    }, [state, toast, router, courseId, moduleId]);


    if (isLessonLoading || areResourcesLoading) {
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
    
    if (!lesson) {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl font-bold text-destructive">Lesson not found</h1>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
             <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    Edit Lesson
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Modify the details for this lesson.
                </p>
            </header>

            <Card className="max-w-2xl">
                <form action={dispatch}>
                    <CardHeader>
                        <CardTitle>Lesson Details</CardTitle>
                        <CardDescription>
                           Make changes to the lesson and save them.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <input type="hidden" name="courseId" value={courseId} />
                        <input type="hidden" name="moduleId" value={moduleId} />
                        <input type="hidden" name="lessonId" value={lessonId} />
                        <input type="hidden" name="resourceIds" value={JSON.stringify(selectedResourceIds)} />
                        {state.message && !state.success &&(
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="title">Lesson Title</Label>
                            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Lesson Description</Label>
                            <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="A detailed overview of what students will learn in this lesson." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="videoUrl">Video URL</Label>
                            <Input id="videoUrl" name="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="e.g., https://www.youtube.com/embed/... (Use this for video lessons)" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="htmlCourseUrl">HTML Course URL</Label>
                            <Input id="htmlCourseUrl" name="htmlCourseUrl" value={htmlCourseUrl} onChange={(e) => setHtmlCourseUrl(e.target.value)} placeholder="e.g., https://my-course.com/index.html (Use this for HTML courses)" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="duration">Duration</Label>
                             <Input id="duration" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                            {state.errors?.duration && <p className="text-sm text-destructive">{state.errors.duration[0]}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="activityType">Activity Type</Label>
                             <Select name="activityType" value={activityType} onValueChange={setActivityType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select activity type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="HTML Course">HTML Course</SelectItem>
                                    <SelectItem value="Video & Reflection">Video & Reflection</SelectItem>
                                    <SelectItem value="Interactive Workshop">Interactive Workshop</SelectItem>
                                    <SelectItem value="Expert Session">Expert Session</SelectItem>
                                    <SelectItem value="Practical Workshop">Practical Workshop</SelectItem>
                                    <SelectItem value="Guest Speaker">Guest Speaker</SelectItem>
                                    <SelectItem value="Role-play simulation">Role-play simulation</SelectItem>
                                    <SelectItem value="Certification">Certification</SelectItem>
                                    <SelectItem value="Group Discussion">Group Discussion</SelectItem>
                                    <SelectItem value="Legal Clinic">Legal Clinic</SelectItem>
                                    <SelectItem value="Strategy Workshop">Strategy Workshop</SelectItem>
                                    <SelectItem value="Final Presentation">Final Presentation</SelectItem>
                                </SelectContent>
                            </Select>
                            {state.errors?.activityType && <p className="text-sm text-destructive">{state.errors.activityType[0]}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label>Associated Resources</Label>
                            {areResourcesLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <Checklist
                                    options={resourceOptions}
                                    selectedIds={selectedResourceIds}
                                    onChange={setSelectedResourceIds}
                                />
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                           <Link href={`/admin/courses/${courseId}/modules/${moduleId}`}>Cancel</Link>
                        </Button>
                        <SubmitButton idleText="Save Changes" submittingText="Saving..." />
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

    