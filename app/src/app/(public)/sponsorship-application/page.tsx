
"use client";

import { useFormState } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import GlowingButton from '@/components/shared/GlowingButton';
import { Heart } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitSponsorship, type SponsorshipState } from '@/app/actions';
import { SubmitButton } from '@/components/shared/SubmitButton';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SponsorshipApplicationPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'individual';

    const initialState: SponsorshipState = { success: false, message: null, errors: {} };
    const [state, dispatch] = useFormState(submitSponsorship, initialState);
    
    const [name, setName] = useState('');
    const [sponsorshipType, setSponsorshipType] = useState(type);


    if (state.success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6 py-12">
                     <div className="relative max-w-2xl mx-auto rounded-lg p-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-400">
                        <div className="bg-background rounded-lg p-8 md:p-12 text-center space-y-6">
                            <Heart className="w-16 h-16 text-red-500 mx-auto" />
                            <h1 className="text-3xl font-headline font-bold">Thank You for Your Generosity!</h1>
                            <p className="text-muted-foreground text-lg">
                                We've received your sponsorship application, {name || "Partner"}.
                            </p>
                            <p>
                                Your commitment to empowering our students is truly inspiring. A member of our partnerships team will be in touch with you within 3-5 business days to discuss the next steps. Together, we can create lasting change.
                            </p>
                            <GlowingButton asChild>
                                <Link href="/">Return to Home</Link>
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
                        <p className="text-accent font-semibold">PARTNER IN HOPE</p>
                        <CardTitle className="text-3xl md:text-4xl font-headline">Sponsor a Future Leader</CardTitle>
                        <CardDescription>Your support directly fuels a student's transformation. Please provide your information below, and we'll be in touch to finalize your partnership.</CardDescription>
                    </CardHeader>
                    <form action={dispatch}>
                        <CardContent className="space-y-8">

                            {/* Sponsor Information */}
                            <div className="space-y-6 p-6 border rounded-lg">
                                <h3 className="font-headline text-lg font-bold">Sponsor Information</h3>
                                <div className="space-y-2">
                                    <Label>Sponsorship Type</Label>
                                    <RadioGroup name="sponsorshipType" value={sponsorshipType} onValueChange={setSponsorshipType} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="individual" id="individual" />
                                            <Label htmlFor="individual">Individual</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="corporate" id="corporate" />
                                            <Label htmlFor="corporate">Corporate / Organization</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" name="name" placeholder="Jane Smith" required value={name} onChange={(e) => setName(e.target.value)} />
                                        {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                                    </div>
                                    {sponsorshipType === 'corporate' && (
                                         <div className="space-y-2">
                                            <Label htmlFor="organizationName">Organization Name</Label>
                                            <Input id="organizationName" name="organizationName" placeholder="Smith Family Foundation" required />
                                            {state?.errors?.organizationName && <p className="text-sm text-destructive">{state.errors.organizationName[0]}</p>}
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" name="email" type="email" placeholder="jane@smithfoundation.org" required />
                                        {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Sponsorship Details */}
                            <div className="space-y-6 p-6 border rounded-lg">
                                 <h3 className="font-headline text-lg font-bold">Sponsorship Details</h3>
                                 <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="level">Sponsorship Level</Label>
                                        <Select name="sponsorshipLevel" required>
                                            <SelectTrigger id="level">
                                                <SelectValue placeholder="Select a sponsorship level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="100">Community Builder ($100)</SelectItem>
                                                <SelectItem value="500">Pathway Partner ($500)</SelectItem>
                                                <SelectItem value="1200">Visionary Sponsor ($1,200)</SelectItem>
                                                <SelectItem value="5000">Legacy Founder ($5,000)</SelectItem>
                                                <SelectItem value="other">Other / Custom Amount</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {state?.errors?.sponsorshipLevel && <p className="text-sm text-destructive">{state.errors.sponsorshipLevel[0]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="motivation">What motivates you or your organization to sponsor a Catalyst Academy student? (Optional)</Label>
                                        <Textarea id="motivation" name="motivation" rows={4} placeholder="We believe in second chances..." />
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 p-6">
                            <SubmitButton idleText="Submit Sponsorship Application" submittingText="Submitting..." />
                            <p className="text-xs text-muted-foreground text-center px-4">
                                Thank you for your incredible generosity. A team member will reach out to you shortly. Catalyst Academy is on the path to 501(c)(3) status.
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
