import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookText, FileText, HelpCircle, Download, MessageSquare, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const modules = [
    { id: "m1", title: "Module 1: Foundations of Self-Worth & Vision", progress: 100, lessons: [{ id: "l1", title: "Reclaiming Your Narrative" }, { id: "l2", title: "Goal Setting with Purpose" }], discussionCompleted: true },
    { id: "m2", title: "Module 2: Financial Literacy & Wealth Building", progress: 75, lessons: [{ id: "l3", title: "Budgeting for a New Beginning" }, { id: "l4", title: "Repairing Credit" }], discussionCompleted: true },
    { id: "m3", title: "Module 3: Professional Readiness & Career Pathways", progress: 20, lessons: [{ id: "l5", title: "Crafting Your Resume" }, { id: "l6", title: "Mastering the Interview" }], discussionCompleted: false },
    { id: "m4", title: "Module 4: Health, Wellness, & Resilience", progress: 0, lessons: [], discussionCompleted: false },
]

export default function DashboardPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Welcome back, Catalyst!
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Your Cohort (Delta-2024) is on Week 28. Keep up the great work.
                    </p>
                </header>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Community Catalyst: Empowering Returning Citizens</CardTitle>
                            <CardDescription>Overall Program Progress</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                               <Progress value={45} className="w-full" />
                               <span className="font-bold text-lg text-foreground">45%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Accordion type="multiple" defaultValue={["m2", "m3"]} className="w-full space-y-4">
                        {modules.map(module => (
                            <AccordionItem value={module.id} key={module.id} className="bg-card border-border/50 rounded-lg shadow-sm">
                                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                    <div className="flex flex-col md:flex-row md:items-center w-full gap-2 md:gap-4">
                                        <h3 className="text-lg font-headline text-left flex-1">{module.title}</h3>
                                        <div className="flex items-center gap-2 w-full md:w-48">
                                            <Progress value={module.progress} className="w-full h-2" />
                                            <span className="text-sm font-medium text-muted-foreground w-12 text-right">{module.progress}%</span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-6 border-t">
                                   <div className="space-y-4">
                                        <h4 className="font-bold">Lessons in this module:</h4>
                                        <ul className="space-y-3">
                                            {module.lessons.map(lesson => (
                                                <li key={lesson.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
                                                    <div className="flex items-center gap-3">
                                                        <BookText className="w-5 h-5 text-accent"/>
                                                        <span className="font-medium">{lesson.title}</span>
                                                    </div>
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={`/dashboard/courses/${lesson.id}`}>Start Lesson</Link>
                                                    </Button>
                                                </li>
                                            ))}
                                             {module.lessons.length === 0 && <p className="text-sm text-muted-foreground">No lessons started yet for this module.</p>}
                                        </ul>
                                        <h4 className="font-bold pt-4 border-t">Required Actions:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Button variant="outline"><FileText />Reflect (Journal)</Button>
                                            <Button variant="outline"><HelpCircle />Module Quiz</Button>
                                             <Button variant="outline" asChild>
                                                <Link href={`/dashboard/discussion/${module.id}`}>
                                                     {module.discussionCompleted ? <CheckCircle2 className="text-green-500" /> : <MessageSquare />}
                                                    <span>Join Discussion</span>
                                                </Link>
                                            </Button>
                                            <Button variant="outline"><Download />Download Resources</Button>
                                        </div>
                                   </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
