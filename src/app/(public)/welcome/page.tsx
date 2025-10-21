
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GlowingButton from "@/components/shared/GlowingButton";
import { CheckCircle, BookOpen, Users, CalendarDays, ExternalLink } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const fellowStudents = [
  { name: 'Sarah Johnson', avatarSeed: 'student1' },
  { name: 'David Chen', avatarSeed: 'student2' },
  { name: 'Maria Garcia', avatarSeed: 'student3' },
  { name: 'Kevin Smith', avatarSeed: 'student4' },
  { name: 'Aisha Williams', avatarSeed: 'student5' },
  { name: 'Roberto Rodriguez', avatarSeed: 'student6' },
  { name: 'Emily White', avatarSeed: 'student7' },
  { name: 'Michael Brown', avatarSeed: 'student8' },
];

export default function WelcomePage() {
    const cohortStartDate = new Date();
    cohortStartDate.setDate(cohortStartDate.getDate() + (1 - cohortStartDate.getDay() + 7) % 7 + 14); // Next next monday

    const nextSteps = [
        {
            icon: <CalendarDays className="h-6 w-6 text-accent" />,
            title: "Mark Your Calendar",
            description: `Your journey with Cohort Delta-2024 begins on ${format(cohortStartDate, 'MMMM do, yyyy')}.`,
            action: null
        },
        {
            icon: <BookOpen className="h-6 w-6 text-accent" />,
            title: "Review the Curriculum",
            description: "Familiarize yourself with the 52-week transformation journey you're about to embark on.",
            action: { href: "/curriculum", text: "View Curriculum" }
        },
        {
            icon: <Users className="h-6 w-6 text-accent" />,
            title: "Understand the Community Covenant",
            description: "Our community is built on trust and respect. Read the principles that guide our interactions.",
            action: { href: "/community", text: "Read the Covenant" }
        },
    ];

    const formatName = (name: string) => {
        const parts = name.split(' ');
        if (parts.length > 1) {
            return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
        }
        return name;
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-secondary/30 py-12">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="max-w-3xl mx-auto shadow-2xl">
                    <CardHeader className="text-center space-y-4 p-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                        <p className="text-accent font-semibold">WELCOME TO THE ACADEMY</p>
                        <CardTitle className="text-3xl md:text-4xl font-headline">Your Journey Begins Now</CardTitle>
                        <CardDescription className="text-lg">
                            Congratulations on your acceptance into Catalyst Academy! We are honored to be a part of your story. Here are your next steps to prepare for an incredible year of growth.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <ul className="space-y-4">
                            {nextSteps.map(step => (
                                <li key={step.title} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                                    <div className="mt-1">{step.icon}</div>
                                    <div className="flex-1">
                                        <h3 className="font-bold">{step.title}</h3>
                                        <p className="text-muted-foreground text-sm">{step.description}</p>
                                    </div>
                                    {step.action && (
                                        <Button asChild variant="ghost" size="sm">
                                            <Link href={step.action.href}>
                                                {step.action.text} <ExternalLink className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6 border-t">
                            <h3 className="text-center font-headline font-bold text-xl mb-4">Meet Your Fellow Catalysts</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {fellowStudents.map(student => (
                                    <div key={student.name} className="flex flex-col items-center text-center">
                                        <Avatar className="w-16 h-16 mb-2">
                                            <AvatarImage src={`https://picsum.photos/seed/${student.avatarSeed}/64/64`} />
                                            <AvatarFallback>{student.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-sm font-medium">{formatName(student.name)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center pt-6">
                             <p className="text-muted-foreground mb-4">Ready to get started? Head to your student dashboard.</p>
                             <GlowingButton asChild>
                                <Link href="/dashboard">Go to My Dashboard</Link>
                            </GlowingButton>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
