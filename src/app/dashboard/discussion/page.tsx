import { DiscussionBoard } from "@/components/dashboard/DiscussionBoard"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function DiscussionPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Module 3 Discussion
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Topic: Community Advocacy & Civic Engagement
                    </p>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Community Building</CardTitle>
                        <CardDescription>
                            Let's discuss what it means to be a catalyst for change. Share your thoughts on this week's readings and how you can apply them.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DiscussionBoard />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
