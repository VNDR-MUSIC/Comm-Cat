
'use client';

import { useFormState } from 'react-dom';
import { addLessonToModule, type LessonState } from '@/app/actions';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/shared/SubmitButton';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface AddLessonDialogProps {
    courseId: string;
    moduleId: string;
}

export function AddLessonDialog({ courseId, moduleId }: AddLessonDialogProps) {
    const initialState: LessonState = { message: null, errors: {}, success: false };
    const [state, dispatch] = useFormState(addLessonToModule, initialState);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (state.success) {
            toast({
                title: "Success",
                description: state.message,
            });
            setIsOpen(false);
        }
    }, [state, toast]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Add New Lesson</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Lesson</DialogTitle>
                    <DialogDescription>
                        Create a new lesson for this module.
                    </DialogDescription>
                </DialogHeader>
                <form action={dispatch}>
                    <div className="grid gap-4 py-4">
                        {state.message && !state.success && (
                             <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}
                        <input type="hidden" name="courseId" value={courseId} />
                        <input type="hidden" name="moduleId" value={moduleId} />
                        
                        <div className="space-y-2">
                            <Label htmlFor="title">Lesson Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="e.g., Reclaiming Your Narrative"
                            />
                            {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                name="duration"
                                placeholder="e.g., 45 min"
                            />
                            {state.errors?.duration && <p className="text-sm text-destructive">{state.errors.duration[0]}</p>}
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="activityType">Activity Type</Label>
                             <Select name="activityType">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select activity type" />
                                </SelectTrigger>
                                <SelectContent>
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
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <SubmitButton idleText="Create Lesson" submittingText="Creating..." />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
