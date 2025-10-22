
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, LifeBuoy, Search, Shield, Users } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

const categories = [
    {
        icon: <BookOpen className="h-8 w-8 text-accent" />,
        title: "Getting Started",
        description: "Find information on the enrollment process, program requirements, and what to expect in your first week.",
        href: "#getting-started"
    },
    {
        icon: <Users className="h-8 w-8 text-accent" />,
        title: "Community & Mentorship",
        description: "Learn about our community covenant, how to engage in discussions, and connect with your mentors.",
        href: "#community"
    },
    {
        icon: <Shield className="h-8 w-8 text-accent" />,
        title: "Technical Support",
        description: "Get help with account issues, video playback problems, and other technical difficulties.",
        href: "#technical-support"
    },
    {
        icon: <LifeBuoy className="h-8 w-8 text-accent" />,
        title: "Program & Curriculum",
        description: "Explore details about each module, lesson objectives, and the capstone project.",
        href: "#program"
    }
]

export default function KnowledgeBasePage() {
  return (
    <div className="bg-background text-foreground">
        <section className="py-20 md:py-32 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <p className="text-accent font-semibold mb-2">HELP CENTER</p>
                <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl">
                    Knowledge Base
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Have questions? We have answers. Search our articles or chat with our support bot for immediate assistance.
                </p>
                <div className="mt-8 max-w-lg mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search for answers..." className="w-full h-12 pl-12 pr-4 rounded-full shadow-lg" />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map(category => (
                        <Link href={category.href} key={category.title}>
                            <Card className="h-full text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <CardHeader className="items-center">
                                    {category.icon}
                                    <CardTitle className="font-headline mt-4">{category.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{category.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                 </div>
            </div>
        </section>

        <section id="chat-support" className="py-20 md:py-24 bg-secondary/30 section-glow-border">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Can't Find an Answer?
                    </h2>
                    <p className="mt-4 text-muted-foreground md:text-xl">
                        Our AI-powered support assistant is here to help. Ask your question below for an instant response.
                    </p>
                </div>
                <div className="mt-12 max-w-2xl mx-auto">
                    <Card className="shadow-2xl">
                        <CardContent className="p-6">
                            <div id="chat_form"></div>
                            <Script src="https://app.aminos.ai/js/chat_form_plugin.js" data-bot-id="55174" strategy="lazyOnload" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    </div>
  );
}
