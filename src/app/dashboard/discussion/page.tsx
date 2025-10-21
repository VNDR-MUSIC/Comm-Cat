import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const discussionForums = [
    { id: "m1", title: "Module 1: Foundations of Self-Worth & Vision", description: "Discuss reclaiming your narrative and setting a vision.", posts: 12, latest: "2 hours ago" },
    { id: "m2", title: "Module 2: Financial Literacy & Wealth Building", description: "Share tips on budgeting, credit, and wealth creation.", posts: 8, latest: "5 hours ago" },
    { id: "m3", title: "Module 3: Professional Readiness & Career Pathways", description: "Workshop your resume and interview skills with peers.", posts: 21, latest: "Just now" },
    { id: "m4", title: "Module 4: Health, Wellness, & Resilience", description: "Talk about strategies for mental and physical well-being.", posts: 0, latest: "" },
    { id: "m5", title: "Module 5: Community Advocacy & Civic Engagement", description: "Plan and discuss community change initiatives.", posts: 3, latest: "1 day ago" },
    { id: "m6", title: "Module 6: Leadership, Legacy & Capstone Project", description: "Get feedback on your capstone project ideas.", posts: 5, latest: "3 days ago" },
];

export default function DiscussionHubPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Discussion Forums
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Engage with your peers in module-specific conversations.
                    </p>
                </header>

                <div className="space-y-4">
                    {discussionForums.map((forum) => (
                         <Card key={forum.id}>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="space-y-1.5">
                                    <CardTitle className="font-headline text-xl">
                                         <Link href={`/dashboard/discussion/${forum.id}`} className="hover:underline hover:text-accent">
                                            {forum.title}
                                         </Link>
                                    </CardTitle>
                                    <CardDescription>
                                        {forum.description}
                                    </CardDescription>
                                </div>
                                <Button asChild variant="ghost" size="icon">
                                    <Link href={`/dashboard/discussion/${forum.id}`}>
                                        <ArrowRight />
                                        <span className="sr-only">Go to forum</span>
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    <span>{forum.posts} posts</span>
                                    {forum.latest && <span className="mx-2">•</span>}
                                    {forum.latest && <span>Last post {forum.latest}</span>}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
