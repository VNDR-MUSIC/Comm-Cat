import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Mail, Phone, Calendar } from "lucide-react";
import GlowingButton from "@/components/shared/GlowingButton";

export default function SupportPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Support Center
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        We're here to help. Reach out with any questions or concerns.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Send a Message</CardTitle>
                                <CardDescription>Our team will get back to you within 24 hours.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="topic">Topic</Label>
                                        <Select name="topic">
                                            <SelectTrigger id="topic">
                                                <SelectValue placeholder="Select a topic" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="technical">Technical Issue</SelectItem>
                                                <SelectItem value="curriculum">Curriculum Question</SelectItem>
                                                <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="e.g., Trouble accessing Module 2 video" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" rows={6} placeholder="Please describe your issue in detail..." />
                                    </div>
                                    <GlowingButton type="submit">Submit Request</GlowingButton>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Mail className="w-5 h-5 text-accent" />
                                    <a href="mailto:support@catalyst.edu" className="hover:underline">support@catalyst.edu</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="w-5 h-5 text-accent" />
                                    <span>(800) 555-1234</span>
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Schedule a Meeting</CardTitle>
                                <CardDescription>Book a 1-on-1 session with a mentor.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    <Calendar />
                                    <span>Book a Session</span>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
