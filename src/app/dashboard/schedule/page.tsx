import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function SchedulePage() {
    // Replace with your actual TidyCal link
    const tidycalLink = "https://tidycal.com/docthor/the-doctor-project";

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Schedule a Session
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Book a one-on-one meeting with an instructor or counselor.
                    </p>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Your Booking Calendar</CardTitle>
                        <CardDescription>
                            Select a time that works best for you from the calendar below. All times are automatically adjusted to your local timezone.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AspectRatio ratio={3 / 4} className="bg-muted rounded-md overflow-hidden">
                             <iframe
                                src={tidycalLink}
                                className="w-full h-full border-0"
                                title="TidyCal Scheduling"
                            ></iframe>
                        </AspectRatio>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
