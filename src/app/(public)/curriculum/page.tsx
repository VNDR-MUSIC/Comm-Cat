import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import GlowingButton from "@/components/shared/GlowingButton";
import Link from "next/link";
import { CheckCircle2, Video, Users, Pencil, Building, Landmark, Mic, Trophy } from "lucide-react";

const modules = [
  {
    id: "module-1",
    title: "Module 1: Foundations of Self-Worth & Vision",
    description: "This foundational module is about reclaiming your story. You will engage in deep personal reflection, identify your core values, and cast a powerful vision for your future, free from the weight of your past.",
    lessons: [
      { title: "Reclaiming Your Narrative", duration: "45 min", type: "Video & Reflection", icon: <Video />, objective: "Learn to separate your identity from past mistakes and articulate a new, empowering personal story." },
      { title: "Goal Setting with Purpose", duration: "60 min", type: "Interactive Workshop", icon: <Users />, objective: "Develop a framework for setting meaningful short-term and long-term goals aligned with your core values." },
      { title: "Understanding & Overcoming Trauma", duration: "75 min", type: "Expert Session", icon: <Pencil />, objective: "Gain tools to process past trauma in a healthy way, building resilience and emotional intelligence." },
    ]
  },
  {
    id: "module-2",
    title: "Module 2: Financial Literacy & Wealth Building",
    description: "Gain complete control over your financial future. This module demystifies money management, from daily budgeting to long-term wealth creation strategies, including credit repair and an introduction to entrepreneurship.",
    lessons: [
      { title: "Budgeting for a New Beginning", duration: "60 min", type: "Practical Workshop", icon: <Landmark />, objective: "Create a personalized, realistic budget and learn to track income/expenses effectively." },
      { title: "Repairing Credit and Managing Debt", duration: "45 min", type: "Video & Guide", icon: <Video />, objective: "Understand your credit report, learn how to dispute inaccuracies, and create a plan to build positive credit." },
      { title: "Intro to Investing & Entrepreneurship", duration: "90 min", type: "Guest Speaker", icon: <Building />, objective: "Explore pathways to wealth building, from basic investing principles to the fundamentals of starting a small business." },
    ]
  },
  {
    id: "module-3",
    title: "Module 3: Professional Readiness & Career Pathways",
    description: "Translate your life experience into professional assets. This module prepares you for the modern workforce, equipping you with the skills to craft a compelling resume, ace interviews, and network with confidence.",
    lessons: [
        { title: "Crafting Your Resume & Cover Letter", duration: "60 min", type: "Hands-on Workshop", icon: <Pencil />, objective: "Develop a powerful resume that highlights your strengths and tells a compelling story to employers." },
        { title: "Mastering the Interview", duration: "75 min", type: "Role-play simulation", icon: <Users />, objective: "Practice answering tough questions, including those about your past, with confidence and poise." },
        { title: "Networking in the Digital Age", duration: "45 min", type: "Video & Activity", icon: <Video />, objective: "Learn how to use platforms like LinkedIn to build professional connections and uncover opportunities." },
    ]
  },
  {
    id: "module-4",
    title: "Module 4: Health, Wellness, & Resilience",
    description: "True success requires a healthy mind and body. This module focuses on holistic well-being, providing tools for mental health, strategies for building strong relationships, and knowledge about physical wellness.",
    lessons: [
        { title: "Mental Health First Aid", duration: "60 min", type: "Certification", icon: <CheckCircle2 />, objective: "Become certified in Mental Health First Aid to support yourself and your community." },
        { title: "Building Healthy Relationships", duration: "45 min", type: "Group Discussion", icon: <Users />, objective: "Learn principles of healthy communication and boundary-setting to strengthen personal and professional relationships." },
        { title: "Physical Wellness & Nutrition on a Budget", duration: "45 min", type: "Video & Guide", icon: <Video />, objective: "Discover strategies for maintaining physical health and good nutrition without breaking the bank." },
    ]
  },
  {
    id: "module-5",
    title: "Module 5: Community Advocacy & Civic Engagement",
    description: "Become a force for positive change. This module empowers you to understand your civic rights and responsibilities, and gives you the tools to advocate effectively for the issues that matter to you and your community.",
    lessons: [
        { title: "Understanding Your Rights & Responsibilities", duration: "60 min", type: "Legal Clinic", icon: <Landmark />, objective: "Learn from legal experts about your rights and how to navigate civic systems." },
        { title: "How to Effect Change in Your Community", duration: "75 min", type: "Strategy Workshop", icon: <Users />, objective: "Develop a strategic plan for a community advocacy campaign, from grassroots organizing to policy change." },
        { title: "Public Speaking for Leaders", duration: "60 min", type: "Practice Session", icon: <Mic />, objective: "Build confidence in public speaking and learn to craft a compelling message that inspires action." },
    ]
  },
  {
    id: "module-6",
    title: "Module 6: Leadership, Legacy & Capstone Project",
    description: "The culmination of your journey. In this final module, you will synthesize your learning to develop your unique leadership style and launch a capstone project—a business or non-profit initiative—that will serve as the first step in your legacy.",
    lessons: [
        { title: "Developing Your Leadership Style", duration: "60 min", type: "Assessment & Video", icon: <Video />, objective: "Identify and refine your personal leadership style for maximum impact." },
        { title: "Capstone Project Workshop & Pitch Development", duration: "120 min", type: "Intensive Workshop", icon: <Users />, objective: "Flesh out your business or non-profit idea, develop a business plan, and craft a compelling pitch for seed funding." },
        { title: "Presenting Your Vision: The Catalyst Showcase", duration: "90 min", type: "Final Presentation", icon: <Trophy />, objective: "Present your capstone project to a panel of community leaders, investors, and potential partners." },
    ]
  },
];


export default function CurriculumPage() {
  return (
    <div className="bg-background text-foreground">
        <section className="py-20 md:py-32 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl">
                    A Curriculum for Complete Transformation
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Our 52-week program is a comprehensive, holistic journey divided into six core modules. Each is designed to build upon the last, guiding you from deep personal foundations to impactful community leadership.
                </p>
            </div>
        </section>

        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Learning Methodology</h2>
                </div>
                <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-card rounded-lg shadow-sm">
                        <Video className="w-12 h-12 mx-auto text-accent mb-4"/>
                        <h3 className="text-xl font-headline font-bold">Blended Learning</h3>
                        <p className="text-muted-foreground mt-2">Engaging video lectures, live virtual workshops, and self-paced projects.</p>
                    </div>
                     <div className="p-6 bg-card rounded-lg shadow-sm">
                        <Users className="w-12 h-12 mx-auto text-accent mb-4"/>
                        <h3 className="text-xl font-headline font-bold">Peer & Expert Mentorship</h3>
                        <p className="text-muted-foreground mt-2">Weekly guidance from industry leaders and supportive peer accountability groups.</p>
                    </div>
                     <div className="p-6 bg-card rounded-lg shadow-sm">
                        <Trophy className="w-12 h-12 mx-auto text-accent mb-4"/>
                        <h3 className="text-xl font-headline font-bold">Project-Based Application</h3>
                        <p className="text-muted-foreground mt-2">Apply what you learn immediately through real-world assignments culminating in a capstone project.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="pb-20 md:pb-32 bg-secondary/30 section-glow-border">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Course Modules</h2>
                </div>
                
                <Accordion type="single" collapsible defaultValue="module-1" className="w-full space-y-4">
                    {modules.map(module => (
                        <AccordionItem value={module.id} key={module.id} className="bg-card border-border/50 rounded-lg shadow-sm">
                            <AccordionTrigger className="px-6 py-4 text-lg font-headline text-left hover:no-underline">
                                {module.title}
                            </AccordionTrigger>
                            <AccordionContent className="p-6 border-t">
                                <p className="text-base text-muted-foreground mb-6">{module.description}</p>
                                <ul className="space-y-4">
                                    {module.lessons.map(lesson => (
                                        <li key={lesson.title} className="flex items-start gap-4 pb-3 border-b border-border/30 last:border-b-0">
                                            <div className="text-accent mt-1">{lesson.icon}</div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-bold">{lesson.title}</h4>
                                                    <div className="text-right text-xs text-muted-foreground">
                                                        <p>{lesson.duration}</p>
                                                        <p className="font-semibold">{lesson.type}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">{lesson.objective}</p>
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
                        <Link href="/enroll">Begin Your Journey Today</Link>
                    </GlowingButton>
                </div>
            </div>
        </section>
    </div>
  )
}
