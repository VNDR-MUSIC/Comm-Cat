
'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import GlowingButton from "@/components/shared/GlowingButton";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    bio?: string;
}

export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const userDocRef = useMemoFirebase(() => {
        if (!firestore || !user?.uid) return null;
        return doc(firestore, `users/${user.uid}`);
    }, [firestore, user?.uid]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (userProfile) {
            setName(`${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim());
            setEmail(userProfile.email || '');
            setBio(userProfile.bio || '');
        }
    }, [userProfile]);

    const handleSaveChanges = () => {
        if (!userDocRef || !userProfile) return;
        setIsSaving(true);
        const [firstName, ...lastNameParts] = name.split(' ');
        const lastName = lastNameParts.join(' ');

        const updatedData = {
            firstName,
            lastName,
            email,
            bio
        };
        
        updateDocumentNonBlocking(userDocRef, updatedData);

        // Simulate network latency for better UX and wait for optimistic update
        setTimeout(() => {
            toast({
                title: "Profile Updated",
                description: "Your changes have been saved successfully.",
            });
            setIsSaving(false);
        }, 1000); 
    };
    
    if (isUserLoading || isProfileLoading) {
        return <ProfilePageSkeleton />;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        My Profile
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Manage your personal information and account settings.
                    </p>
                </header>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Personal Information</CardTitle>
                            <CardDescription>Update your profile details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={user?.photoURL || `https://picsum.photos/seed/${user?.uid}/80/80`} alt={name} />
                                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Label htmlFor="profile-picture">Profile Picture</Label>
                                    <div className="flex gap-2">
                                        <Input id="profile-picture" type="file" className="hidden" />
                                        <Button asChild variant="outline">
                                            <label htmlFor="profile-picture" className="cursor-pointer flex items-center gap-2">
                                                <Upload />
                                                <span>Upload</span>
                                            </label>
                                        </Button>
                                        <Button variant="ghost">Remove</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="bio">Short Bio</Label>
                                <Textarea id="bio" placeholder="Tell us a little about yourself..." value={bio} onChange={(e) => setBio(e.target.value)}/>
                            </div>
                             <div>
                                <GlowingButton onClick={handleSaveChanges} disabled={isSaving}>
                                    {isSaving ? <Loader2 className="animate-spin" /> : null}
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </GlowingButton>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Security</CardTitle>
                            <CardDescription>Manage your password and account security.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                            </div>
                             <div>
                                <GlowingButton>Update Password</GlowingButton>
                            </div>
                             <Separator />
                             <div className="space-y-4">
                                <h3 className="font-medium">Account Deactivation</h3>
                                <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/10">
                                    <p className="text-sm text-destructive-foreground/80 max-w-md">Deactivating your account will permanently remove all your data. This action cannot be undone.</p>
                                    <Button variant="destructive">Deactivate Account</Button>
                                </div>
                             </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

const ProfilePageSkeleton = () => (
     <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
        <div className="max-w-4xl mx-auto">
            <header className="mb-8">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-6 w-1/2 mt-2" />
            </header>
             <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/4" />
                        <Skeleton className="h-5 w-2/5 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                           <Skeleton className="h-20 w-20 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-20" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-20" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                        <div>
                             <Skeleton className="h-12 w-36" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
)
