
'use client';

import { useFormState } from 'react-dom';
import { createResource, type ResourceState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SubmitButton } from '@/components/shared/SubmitButton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewResourcePage() {
    const initialState: ResourceState = { message: null, errors: {}, success: false };
    const [state, dispatch] = useFormState(createResource, initialState);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
             <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    Add New Resource
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Fill out the details below to add a new resource to the library.
                </p>
            </header>

            <Card className="max-w-2xl">
                <form action={dispatch}>
                    <CardHeader>
                        <CardTitle>Resource Details</CardTitle>
                        <CardDescription>
                            This resource will be available for association with lessons.
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
                            <Label htmlFor="title">Resource Title</Label>
                            <Input id="title" name="title" placeholder="e.g., Module 1 Workbook" />
                            {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="type">Resource Type</Label>
                            <Select name="type">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a resource type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PDF Guide">PDF Guide</SelectItem>
                                    <SelectItem value="Document">Document</SelectItem>
                                    <SelectItem value="Spreadsheet">Spreadsheet</SelectItem>
                                    <SelectItem value="External Link">External Link</SelectItem>
                                </SelectContent>
                            </Select>
                            {state.errors?.type && <p className="text-sm text-destructive">{state.errors.type[0]}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="url">URL</Label>
                            <Input id="url" name="url" placeholder="https://example.com/resource.pdf" />
                            {state.errors?.url && <p className="text-sm text-destructive">{state.errors.url[0]}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                           <Link href="/admin/resources">Cancel</Link>
                        </Button>
                        <SubmitButton idleText="Create Resource" submittingText="Creating..." />
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
