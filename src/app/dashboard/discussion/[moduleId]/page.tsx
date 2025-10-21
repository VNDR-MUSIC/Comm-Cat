import { DiscussionBoard } from "@/components/dashboard/DiscussionBoard"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const modules: { [key: string]: { title: string, topic: string } } = {
    m1: { title: "Module 1 Discussion", topic: "Foundations of Self-Worth & Vision" },
    m2: { title: "Module 2 Discussion", topic: "Financial Literacy & Wealth Building" },
    m3: { title: "Module 3 Discussion", topic: "Professional Readiness & Career Pathways" },
    m4: { title: "Module 4 Discussion", topic: "Health, Wellness, & Resilience" },
    m5: { title: "Module 5 Discussion", topic: "Community Advocacy & Civic Engagement" },
    m6: { title: "Module 6 Discussion", topic: "Leadership, Legacy & Capstone Project" },
}


export default function ModuleDiscussionPage({ params }: { params: { moduleId: string }}) {
    const module = modules[params.moduleId] || { title: "Discussion", topic: "Select a topic" };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-4xl mx-auto">
                 <header className="mb-8">
                     <div className="mb-4">
                        <Button asChild variant="outline">
                            <Link href="/dashboard/discussion" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span>All Forums</span>
                            </Link>
                        </Button>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        {module.title}
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Topic: {module.topic}
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
