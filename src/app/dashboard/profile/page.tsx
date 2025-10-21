
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import GlowingButton from "@/components/shared/GlowingButton";
import { Upload } from "lucide-react";

export default function ProfilePage() {
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
                                    <AvatarImage src="https://picsum.photos/seed/you/80/80" alt="Your Name" />
                                    <AvatarFallback>AS</AvatarFallback>
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
                                    <Input id="name" defaultValue="A. Student" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" defaultValue="student@catalyst.edu" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="bio">Short Bio</Label>
                                <Textarea id="bio" placeholder="Tell us a little about yourself..." defaultValue="Eager to learn and grow as a community catalyst."/>
                            </div>
                             <div>
                                <GlowingButton>Save Changes</GlowingButton>
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
