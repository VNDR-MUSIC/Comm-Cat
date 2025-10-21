
// This component now handles real authentication with Firebase.

"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import GlowingButton from '@/components/shared/GlowingButton';
import { Button } from '@/components/ui/button';
import { useAuth, useUser, initiateEmailSignIn } from '@/firebase';
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const auth = useAuth();
    const { user, isUserLoading } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            // Await the sign-in and redirect on success. The auth listener will also catch it.
            await initiateEmailSignIn(auth, email, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        }
    };
    
    useEffect(() => {
        // Redirect if user is already logged in
        if (!isUserLoading && user) {
            router.push('/dashboard');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || (!isUserLoading && user)) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-background">
                <p>Loading...</p>
            </div>
        );
    }

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
                            {error && (
                                <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="you@example.com" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
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
