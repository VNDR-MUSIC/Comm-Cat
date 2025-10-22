
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, Calendar } from "lucide-react";
import GlowingButton from "@/components/shared/GlowingButton";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";

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
                                <CardTitle className="font-headline">Chat With Our AI Assistant</CardTitle>
                                <CardDescription>For immediate answers, ask our AI-powered support bot. It has access to our full knowledge base.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div id="chat_form"></div>
                                <Script src="https://app.aminos.ai/js/chat_form_plugin.js" data-bot-id="55174" strategy="lazyOnload" />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Direct Contact</CardTitle>
                                <CardDescription>For issues the bot can't resolve.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Mail className="w-5 h-5 text-accent" />
                                    <a href="mailto:support@catalyst.edu" className="hover:underline">support@catalyst.edu</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="w-5 h-5 text-accent" />
                                    <a href="tel:+15615627222" className="hover:underline">+1 (561) 562-7222</a>
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Schedule a 1-on-1</CardTitle>
                                <CardDescription>Book a session with a mentor for personalized guidance.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild className="w-full">
                                    <Link href="/dashboard/schedule">
                                        <Calendar />
                                        <span>Book a Session</span>
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
