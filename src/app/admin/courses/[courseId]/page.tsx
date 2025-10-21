
'use client';

import { useParams } from 'next/navigation';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, orderBy, writeBatch } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Loader2, BookOpen, ChevronRight, Edit, GripVertical, Check } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AddModuleDialog } from './AddModuleDialog';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Reorder } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface CourseData {
  title: string;
  description: string;
  duration: string;
}

interface ModuleData {
    id: string;
    title: string;
    order: number;
}

export default function CourseDetailPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const firestore = useFirestore();
    const { toast } = useToast();

    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const courseDocRef = useMemoFirebase(() => {
        if (!firestore || !courseId) return null;
        return doc(firestore, `courses/${courseId}`);
    }, [firestore, courseId]);
    
    const modulesQuery = useMemoFirebase(() => {
        if (!firestore || !courseId) return null;
        return query(collection(firestore, `courses/${courseId}/modules`), orderBy('order', 'asc'));
    }, [firestore, courseId]);

    const { data: course, isLoading: isCourseLoading } = useDoc<CourseData>(courseDocRef);
    const { data: modules, isLoading: areModulesLoading, setData: setModules } = useCollection<ModuleData>(modulesQuery);

    const isLoading = isCourseLoading || areModulesLoading;

    const handleReorder = (newOrder: ModuleData[]) => {
        if (modules) {
             setModules(newOrder.map((module, index) => ({ ...module, order: index })));
        }
    }

    const handleTitleChange = (moduleId: string, newTitle: string) => {
        if (modules) {
            setModules(modules.map(m => m.id === moduleId ? { ...m, title: newTitle } : m));
        }
    }

    const handleSaveChanges = async () => {
        if (!firestore || !modules) return;
        setIsSaving(true);
        try {
            const batch = writeBatch(firestore);
            modules.forEach(module => {
                const moduleRef = doc(firestore, `courses/${courseId}/modules`, module.id);
                batch.update(moduleRef, { title: module.title, order: module.order });
            });
            await batch.commit();
            toast({ title: "Success", description: "Module order and titles have been updated." });
        } catch (error) {
            console.error("Error saving module changes:", error);
            toast({ variant: "destructive", title: "Error", description: "Could not save changes." });
        }
        setIsSaving(false);
        setIsEditMode(false);
    };


    if (isLoading) {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-6 w-1/2 mt-2" />
                </header>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/4" />
                        <Skeleton className="h-5 w-2/5 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-destructive">
                        Course Not Found
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        The course you are looking for does not exist.
                    </p>
                    <Button asChild variant="outline" className="mt-4">
                        <Link href="/admin/courses" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Courses</span>
                        </Link>
                    </Button>
                </header>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <div className="mb-4">
                    <Button asChild variant="outline">
                        <Link href="/admin/courses" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span>All Courses</span>
                        </Link>
                    </Button>
                </div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    {course.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    {course.description}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Modules</CardTitle>
                                <CardDescription>The modules that make up this course.</CardDescription>
                            </div>
                           <div className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <Switch id="edit-mode" checked={isEditMode} onCheckedChange={setIsEditMode} disabled={isSaving} />
                                    <Label htmlFor="edit-mode" className="flex items-center gap-2">
                                        <Edit className="w-4 h-4" /> Edit Mode
                                    </Label>
                                </div>
                                <AddModuleDialog courseId={courseId} />
                            </div>
                        </CardHeader>
                        <CardContent>
                           {modules && modules.length > 0 ? (
                               isEditMode ? (
                                    <Reorder.Group axis="y" values={modules} onReorder={handleReorder} className="space-y-2">
                                        {modules.map((module) => (
                                            <Reorder.Item key={module.id} value={module} className="flex items-center gap-2 p-2 bg-secondary rounded-md">
                                                <GripVertical className="cursor-grab text-muted-foreground" />
                                                <Input 
                                                    value={module.title}
                                                    onChange={(e) => handleTitleChange(module.id, e.target.value)}
                                                    className="bg-background"
                                                />
                                            </Reorder.Item>
                                        ))}
                                    </Reorder.Group>
                               ) : (
                                   <div className="border rounded-md">
                                       {modules.map((module, index) => (
                                            <Link key={module.id} href={`/admin/courses/${courseId}/modules/${module.id}`}>
                                                <div className={`flex items-center justify-between p-4 hover:bg-accent/10 ${index < modules.length - 1 ? 'border-b' : ''}`}>
                                                    <p className="font-medium">{module.title}</p>
                                                    <Button variant="ghost" size="icon">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </Link>
                                       ))}
                                   </div>
                               )
                           ) : (
                             <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg">
                                <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
                                <h3 className="text-xl font-bold">No Modules Yet</h3>
                                <p className="text-muted-foreground mt-2">
                                    Click "Add New Module" to start building your course.
                                </p>
                            </div>
                           )}
                           {isEditMode && (
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button variant="outline" onClick={() => setIsEditMode(false)} disabled={isSaving}>Cancel</Button>
                                    <Button onClick={handleSaveChanges} disabled={isSaving}>
                                        {isSaving ? <Loader2 className="animate-spin" /> : <Check />}
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                     <Card>
                        <CardHeader>
                            <CardTitle>Course Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold">Duration</h4>
                                <p className="text-muted-foreground">{course.duration}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold">Course ID</h4>
                                <p className="text-muted-foreground text-sm break-all">{courseId}</p>
                            </div>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href={`/admin/courses/${courseId}/edit`}>Edit Course Details</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

    