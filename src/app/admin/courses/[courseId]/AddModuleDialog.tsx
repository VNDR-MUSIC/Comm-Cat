
'use client';

import { useFormState } from 'react-dom';
import { addModuleToCourse, type ModuleState } from '@/app/actions';
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


interface AddModuleDialogProps {
    courseId: string;
}

export function AddModuleDialog({ courseId }: AddModuleDialogProps) {
    const initialState: ModuleState = { message: null, errors: {}, success: false };
    const [state, dispatch] = useFormState(addModuleToCourse, initialState);
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
                <Button>Add New Module</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Module</DialogTitle>
                    <DialogDescription>
                        Create a new module for this course.
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
                        <div className="space-y-2">
                            <Label htmlFor="title">Module Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="e.g., Foundations of Self-Worth"
                            />
                            {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <SubmitButton idleText="Create Module" submittingText="Creating..." />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
