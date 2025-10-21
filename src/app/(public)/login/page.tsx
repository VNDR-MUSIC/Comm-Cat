
// This component simulates a login form. In a real application,
// it would handle authentication with Firebase.

"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import GlowingButton from '@/components/shared/GlowingButton';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate successful login and redirect
        router.push('/dashboard');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-background">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <Card className="max-w-md mx-auto shadow-2xl">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
                        <CardDescription>Sign in to access your student dashboard.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="you@example.com" required defaultValue="student@catalyst.edu"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required defaultValue="password" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <GlowingButton type="submit" className="w-full">
                                Access Dashboard
                            </GlowingButton>
                            <Button variant="link" asChild>
                                <Link href="/enroll">Don't have an account? Enroll Now</Link>
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
