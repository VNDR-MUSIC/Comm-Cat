
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Script from "next/script";

export default function SchedulePage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Schedule a 1-on-1 Session
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        We are here to support you on every step of your journey. Whether you need guidance on a specific lesson, want to discuss your career path, or just need someone to talk to, our dedicated team of mentors and counselors is available for you.
                    </p>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Your Booking Calendar</CardTitle>
                        <CardDescription>
                           Use the calendar below to book a confidential 1-on-1 session at a time that works for you. All appointment times are automatically adjusted to your local timezone. Your success is our priority, and we're ready to help in any way we can.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="min-h-[600px]">
                            <div className="tidycal-embed" data-path="vndr-meeting/community-catalyst"></div>
                            <Script src="https://asset-tidycal.b-cdn.net/js/embed.js" strategy="lazyOnload" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
