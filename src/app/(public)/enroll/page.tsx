// This component simulates an enrollment form. In a real application,
// this would be a multi-step form with state management and API calls to Firebase Auth.

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import GlowingButton from '@/components/shared/GlowingButton';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EnrollPage() {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call and enrollment
        setIsEnrolled(true);
    };

    if (isEnrolled) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6 py-12">
                     <div className="relative max-w-2xl mx-auto rounded-lg p-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-400">
                        <div className="bg-background rounded-lg p-8 md:p-12 text-center space-y-6">
                            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                            <h1 className="text-3xl font-headline font-bold">Enrollment Confirmed!</h1>
                            <p className="text-muted-foreground text-lg">
                                Welcome to the Catalyst Academy, {name || "Catalyst"}.
                            </p>
                            <p>
                                Your journey to becoming a community leader starts now. An email with next steps has been sent to your inbox.
                            </p>
                            <GlowingButton asChild>
                                <Link href="/login">Access Your Dashboard</Link>
                            </GlowingButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-background">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <Card className="max-w-lg mx-auto shadow-2xl">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-headline">Begin Your Journey</CardTitle>
                        <CardDescription>Create your account to enroll in Catalyst Academy.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="you@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="scholarship">Scholarship Code (Optional)</Label>
                                <Input id="scholarship" placeholder="Enter code" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <GlowingButton type="submit" className="w-full">
                                Complete Enrollment
                            </GlowingButton>
                            <p className="text-xs text-muted-foreground text-center">
                                By enrolling, you agree to our{' '}
                                <Link href="#" className="underline hover:text-accent">Terms of Service</Link> and{' '}
                                <Link href="#" className="underline hover:text-accent">Privacy Policy</Link>.
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
