
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import GlowingButton from '@/components/shared/GlowingButton';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth, useFirestore, setDocumentNonBlocking, initiateEmailSignUp } from '@/firebase';
import { doc, serverTimestamp } from 'firebase/firestore';


export default function EnrollPage() {
    const auth = useAuth();
    const firestore = useFirestore();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!auth || !firestore) {
            setError("Firebase is not initialized. Please try again later.");
            return;
        }

        try {
            const userCredential = await initiateEmailSignUp(auth, email, password);
            if (userCredential?.user) {
                const [firstName, ...lastNameParts] = name.split(' ');
                const lastName = lastNameParts.join(' ');

                const userDocRef = doc(firestore, `users/${userCredential.user.uid}`);
                const userProfileData = {
                    id: userCredential.user.uid,
                    email: email,
                    firstName: firstName || '',
                    lastName: lastName || '',
                    phone: phone,
                    dateOfBirth: dob,
                    enrollmentDate: serverTimestamp(),
                    bio: 'Welcome to Catalyst Academy! Tell us a bit about yourself.'
                };
                
                setDocumentNonBlocking(userDocRef, userProfileData, { merge: true });
                setIsSubmitted(true);
            }
        } catch (err: any) {
             setError(err.message || "An error occurred during sign-up.");
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6 py-12">
                     <div className="relative max-w-2xl mx-auto rounded-lg p-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-400">
                        <div className="bg-background rounded-lg p-8 md:p-12 text-center space-y-6">
                            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                            <h1 className="text-3xl font-headline font-bold">Application Received!</h1>
                            <p className="text-muted-foreground text-lg">
                                Thank you for taking this courageous step, {name || "Catalyst"}.
                            </p>
                            <p>
                                We've received your application and created your account. Our founder, Dr. Warren O. Crabb, personally reviews every submission. You will receive an email regarding next steps within the next 7-10 business days. For now, let's get you prepared for your journey.
                            </p>
                            <GlowingButton asChild>
                                <Link href="/welcome">See Your Next Steps</Link>
                            </GlowingButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-background">
            <div className="container mx-auto px-4 md:px-6 py-16">
                <Card className="max-w-3xl mx-auto shadow-2xl">
                    <CardHeader className="text-center space-y-2">
                        <p className="text-accent font-semibold">APPLICATION</p>
                        <CardTitle className="text-3xl md:text-4xl font-headline">Become a Community Catalyst</CardTitle>
                        <CardDescription>This application is the first step toward reclaiming your narrative and building your legacy. Please answer thoughtfully. Your story matters here.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-8">
                             <Alert className="bg-blue-500/10 border-blue-500/50 text-foreground">
                                <Info className="h-4 w-4 !text-blue-400" />
                                <AlertTitle className="font-bold !text-blue-300">Our Commitment to Accessibility</AlertTitle>
                                <AlertDescription className="!text-blue-300/80">
                                    Catalyst Academy is <span className="font-bold">offered at no cost</span> for all accepted participants. Our program is fully funded by generous sponsors who believe in your potential. Your application is a commitment of time and effort, not money.
                                    <Link href="/sponsorship" className="underline font-semibold ml-2 hover:text-accent">Learn more about our model.</Link>
                                </AlertDescription>
                            </Alert>
                             {error && (
                                <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {/* Personal Information */}
                            <div className="space-y-6 p-6 border rounded-lg">
                                <h3 className="font-headline text-lg font-bold">Account & Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" placeholder="Johnathan Doe" required value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                        <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="(555) 123-4567" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <Input id="dob" type="date" required value={dob} onChange={(e) => setDob(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Short Answer Questions */}
                            <div className="space-y-6 p-6 border rounded-lg">
                                 <h3 className="font-headline text-lg font-bold">Your Vision & Goals</h3>
                                 <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="goals">What is the single most important goal you hope to achieve by completing the Catalyst Academy program? (150 words max)</Label>
                                        <Textarea id="goals" rows={4} placeholder="My primary goal is to..." required maxLength={600}/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="resilience">Tell us about a time you overcame a significant challenge. What did that experience teach you about your own strength and resilience? (200 words max)</Label>
                                        <Textarea id="resilience" rows={5} placeholder="A challenge I faced was... It taught me that I am capable of..." required maxLength={800}/>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="leadership">How do you define "community leadership," and why is it important to you? (150 words max)</Label>
                                        <Textarea id="leadership" rows={4} placeholder="To me, leadership means..." required maxLength={600}/>
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 p-6">
                            <GlowingButton type="submit" className="w-full">
                                Submit My Application
                            </GlowingButton>
                            <p className="text-xs text-muted-foreground text-center px-4">
                                By submitting this application, you affirm that all information is accurate and you agree to our{' '}
                                <Link href="/community" className="underline hover:text-accent">Community Covenant</Link> and{' '}
                                <Link href="#" className="underline hover:text-accent">Terms of Service</Link>.
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
