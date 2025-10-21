import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import GlowingButton from "@/components/shared/GlowingButton";
import Link from "next/link";

const modules = [
  {
    id: "module-1",
    title: "Module 1: Foundations of Self-Worth & Vision",
    lessons: [
      { title: "Lesson 1: Reclaiming Your Narrative", duration: "45 min", type: "Video & Reflection" },
      { title: "Lesson 2: Goal Setting with Purpose", duration: "60 min", type: "Interactive Workshop" },
      { title: "Lesson 3: Understanding & Overcoming Trauma", duration: "75 min", type: "Expert Session" },
    ]
  },
  {
    id: "module-2",
    title: "Module 2: Financial Literacy & Wealth Building",
    lessons: [
      { title: "Lesson 1: Budgeting for a New Beginning", duration: "60 min", type: "Workshop" },
      { title: "Lesson 2: Repairing Credit and Managing Debt", duration: "45 min", type: "Video" },
      { title: "Lesson 3: Intro to Investing & Entrepreneurship", duration: "90 min", type: "Guest Speaker" },
    ]
  },
  {
    id: "module-3",
    title: "Module 3: Professional Readiness & Career Pathways",
    lessons: [
        { title: "Lesson 1: Crafting Your Resume & Cover Letter", duration: "60 min", type: "Workshop" },
        { title: "Lesson 2: Mastering the Interview", duration: "75 min", type: "Role-play simulation" },
        { title: "Lesson 3: Networking in the Digital Age", duration: "45 min", type: "Video & Activity" },
    ]
  },
  {
    id: "module-4",
    title: "Module 4: Health, Wellness, & Resilience",
    lessons: [
        { title: "Lesson 1: Mental Health First Aid", duration: "60 min", type: "Certification" },
        { title: "Lesson 2: Building Healthy Relationships", duration: "45 min", type: "Group Discussion" },
        { title: "Lesson 3: Physical Wellness & Nutrition", duration: "45 min", type: "Video" },
    ]
  },
  {
    id: "module-5",
    title: "Module 5: Community Advocacy & Civic Engagement",
    lessons: [
        { title: "Lesson 1: Understanding Your Rights & Responsibilities", duration: "60 min", type: "Legal Clinic" },
        { title: "Lesson 2: How to Effect Change in Your Community", duration: "75 min", type: "Workshop" },
        { title: "Lesson 3: Public Speaking for Leaders", duration: "60 min", type: "Practice Session" },
    ]
  },
  {
    id: "module-6",
    title: "Module 6: Leadership, Legacy & Capstone Project",
    lessons: [
        { title: "Lesson 1: Developing Your Leadership Style", duration: "60 min", type: "Assessment & Video" },
        { title: "Lesson 2: Capstone Project Workshop", duration: "120 min", type: "Workshop" },
        { title: "Lesson 3: Presenting Your Vision", duration: "90 min", type: "Final Presentation" },
    ]
  },
];


export default function CurriculumPage() {
  return (
    <div className="bg-background text-foreground">
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl">
                    A Curriculum for Transformation
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Our 52-week program is divided into six core modules, each designed to build upon the last, guiding you from personal foundations to community leadership.
                </p>
            </div>
        </section>

        <section className="pb-20 md:pb-32">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="relative mb-12">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-border rounded-full"></div>
                    <div className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-yellow-400 to-accent rounded-full animate-pulse w-full"></div>
                    <div className="relative flex justify-between">
                       <div className="text-center">
                           <div className="w-6 h-6 rounded-full bg-yellow-400 border-4 border-background mx-auto"></div>
                           <p className="mt-2 text-sm font-bold">Foundations</p>
                       </div>
                       <div className="text-center">
                           <div className="w-6 h-6 rounded-full bg-accent border-4 border-background mx-auto"></div>
                           <p className="mt-2 text-sm font-bold">Leadership</p>
                       </div>
                    </div>
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {modules.map(module => (
                        <AccordionItem value={module.id} key={module.id} className="bg-card border-border/50 rounded-lg shadow-sm">
                            <AccordionTrigger className="px-6 py-4 text-lg font-headline hover:no-underline">
                                {module.title}
                            </AccordionTrigger>
                            <AccordionContent className="px-6">
                                <ul className="space-y-4 pt-2">
                                    {module.lessons.map(lesson => (
                                        <li key={lesson.title} className="flex justify-between items-center pb-2 border-b border-border/30">
                                            <span>{lesson.title}</span>
                                            <div className="text-right text-sm text-muted-foreground">
                                                <p>{lesson.duration}</p>
                                                <p>{lesson.type}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="text-center mt-12">
                    <GlowingButton asChild>
                        <Link href="/login">View in Dashboard</Link>
                    </GlowingButton>
                </div>
            </div>
        </section>
    </div>
  )
}
