
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Award, BarChart, CalendarDays, Target, Users, BookOpen, Landmark, Briefcase, Shield, Trophy, Video } from 'lucide-react';
import React from 'react';
import Autoplay from "embla-carousel-autoplay";


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GlowingButton from '@/components/shared/GlowingButton';
import LogoCloud from '@/components/shared/LogoCloud';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const courseFeatures = [
  {
    icon: <Target className="h-8 w-8 text-accent" />,
    title: 'Purpose-Driven Curriculum',
    description: 'Go beyond job training. Reframe your narrative and build a future defined by your potential, not your past.',
  },
  {
    icon: <Award className="h-8 w-8 text-accent" />,
    title: 'Nationally Recognized Certificate',
    description: 'Earn a credential that validates your skills in leadership, advocacy, and entrepreneurship to employers.',
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: 'Lifelong Peer Network',
    description: 'Join a powerful, supportive brotherhood and sisterhood of fellow catalysts committed to growth and change.',
  },
  {
    icon: <CalendarDays className="h-8 w-8 text-accent" />,
    title: '52-Week Structured Journey',
    description: 'A comprehensive year-long program providing sustained support, mentorship, and accountability.',
  },
];

const journey = [
    { quarter: 'Q1', title: 'Module 1 & 2: Foundations of Self & Finance', description: 'Weeks 1-13: Reclaim your narrative, master your finances, and build a rock-solid foundation for personal growth.' },
    { quarter: 'Q2', title: 'Module 3 & 4: Professional & Personal Wellness', description: 'Weeks 14-26: Develop career-ready skills, master interviews, and prioritize your mental and physical well-being.' },
    { quarter: 'Q3', title: 'Module 5: Community & Civic Engagement', description: 'Weeks 27-39: Understand your rights, learn to advocate for change, and find your voice as a community leader.' },
    { quarter: 'Q4', title: 'Module 6: Leadership & Capstone', description: 'Weeks 40-52: Solidify your leadership style and launch a real-world community project or business plan with seed funding available.' },
]

const faqs = [
    {
        question: "What is the cost of the program?",
        answer: "Catalyst Academy is offered at no cost to all selected participants. Our program is fully sponsored by generous partners and donors who are investing in your future. Your primary commitment is your time and dedication."
    },
    {
        question: "What are the requirements to apply?",
        answer: "We welcome applications from any individual who is returning to the community after a period of incarceration. The key requirement is a deep commitment to personal transformation and community leadership. The application process includes an essay and an interview to ensure each selected participant is ready for this intensive journey."
    },
    {
        question: "Is this an online or in-person program?",
        answer: "Catalyst Academy is a fully-online program, allowing us to serve individuals across the country. All workshops, mentorship sessions, and coursework are accessible through our digital student dashboard."
    },
    {
        question: "What kind of support is available after I graduate?",
        answer: "Graduation is just the beginning. You become part of a lifelong alumni network, with access to ongoing career services, investment opportunities for alumni-led businesses, and exclusive leadership retreats."
    }
]

const AnimatedCounter = ({ to }: { to: number }) => {
    // This is a placeholder for a counter animation.
    // A full implementation would use a client component with hooks.
    return <span className="font-headline font-bold">{to.toLocaleString()}</span>
}

const stats = [
    { value: 500, label: 'Graduates Empowered' },
    { value: 85, label: 'Employment Rate Post-Program', unit: '%' },
    { value: 120, label: 'New Businesses Started', unit: '+' },
    { value: 92, label: 'Reduction in Recidivism', unit: '%' },
];

const featuredModules = [
  {
    id: "module-1",
    icon: <Shield className="h-10 w-10" />,
    title: "Foundations of Self-Worth",
    description: "Reclaim your story, identify core values, and cast a powerful vision for your future, free from the weight of the past.",
  },
  {
    id: "module-2",
    icon: <Landmark className="h-10 w-10" />,
    title: "Financial Literacy & Wealth",
    description: "Gain control over your financial future, from daily budgeting to long-term wealth creation and credit repair.",
  },
  {
    id: "module-3",
    icon: <Briefcase className="h-10 w-10" />,
    title: "Professional Readiness",
    description: "Translate your life experience into professional assets, master interviews, and network with confidence.",
  },
  {
    id: "module-4",
    icon: <Users className="h-10 w-10" />,
    title: "Community Advocacy",
    description: "Become a force for positive change by learning to advocate for the issues that matter to you and your community.",
  },
  {
    id: "module-5",
    icon: <Trophy className="h-10 w-10" />,
    title: "Leadership & Legacy",
    description: "Synthesize your learning into a capstone project—a business or non-profit—that serves as your first step in building a legacy.",
  },
];


export default function HomePage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image-1');
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 animated-gradient-bg" />
           <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white shadow-xl">
                Empowering Returning Citizens to Rise and Lead
              </h1>
              <p className="text-lg md:text-xl text-white/80">
                Join our 52-week accredited program to transform your future and become a catalyst for change in your community. Go from a returning citizen to a pillar of society.
              </p>
              <div className="flex justify-center">
                <GlowingButton asChild>
                  <Link href="/enroll">Apply for Sponsorship</Link>
                </GlowingButton>
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {courseFeatures.map((feature) => (
                <Card key={feature.title} className="bg-card border-border/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="featured-modules" className="py-16 md:py-24 bg-secondary/30 section-glow-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">A Glimpse Into Your Journey</h2>
              <p className="text-muted-foreground md:text-xl">Our curriculum is designed to rebuild from the ground up. Here are some of the core modules you'll experience.</p>
            </div>
            <div className="mt-12">
              <Carousel
                className="w-full"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {featuredModules.map((module) => (
                    <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1 h-full">
                         <Card className="flex flex-col h-full bg-card shadow-lg text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-accent/10 rounded-full mb-4 text-accent">
                                    {module.icon}
                                </div>
                                <CardTitle className="font-headline text-xl">{module.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-muted-foreground">{module.description}</p>
                            </CardContent>
                         </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
             <div className="text-center mt-12">
                <GlowingButton asChild>
                    <Link href="/curriculum">Explore the Full Curriculum</Link>
                </GlowingButton>
            </div>
          </div>
        </section>

         <section id="methodology" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Learning Methodology</h2>
              <p className="text-muted-foreground md:text-xl">A holistic, three-pronged approach to sustainable success.</p>
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-accent text-primary-foreground mb-4">
                  <Video className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-headline font-bold">Blended Learning</h3>
                <p className="text-muted-foreground mt-2">Engaging video lectures, live virtual workshops, and self-paced projects to fit your learning style.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-accent text-primary-foreground mb-4">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-headline font-bold">Peer & Expert Mentorship</h3>
                <p className="text-muted-foreground mt-2">Get paired with an industry leader and a peer mentor for weekly check-ins, guidance, and unwavering support.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-accent text-primary-foreground mb-4">
                  <Trophy className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-headline font-bold">Project-Based Application</h3>
                <p className="text-muted-foreground mt-2">Apply your new skills by designing and launching a real-world community project or business plan with seed funding available.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="py-16 md:py-24 bg-secondary/30 section-glow-border">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                     <div className="relative h-96">
                         <Image
                            src={heroImage?.imageUrl || ''}
                            alt={heroImage?.description || ''}
                            fill
                            className="object-cover rounded-lg shadow-xl"
                            data-ai-hint={heroImage?.imageHint}
                        />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
                           Our Proven Impact
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Our evidence-based approach delivers life-changing results for our participants, their families, and their communities. The numbers speak for themselves.
                        </p>
                        <div className="mt-8 grid grid-cols-2 gap-8 text-center">
                            {stats.map(stat => (
                                <div key={stat.label} className="p-4 bg-card rounded-lg shadow-md">
                                    <p className="text-4xl animated-gradient-text">
                                        <AnimatedCounter to={stat.value} />{stat.unit}
                                    </p>
                                    <p className="mt-2 text-xs text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="journey" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">The 52-Week Journey</h2>
                    <p className="text-muted-foreground md:text-xl">A year of transformation, from foundational self-worth to community leadership and legacy.</p>
                </div>
                <div className="relative mt-12">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                    {journey.map((item, index) => (
                        <div key={item.quarter} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
                            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                <div className="p-6 bg-card rounded-lg shadow-md border-l-4 border-accent">
                                    <p className="text-sm font-bold text-accent">{item.quarter}</p>
                                    <h3 className="font-headline text-xl font-bold mt-1">{item.title}</h3>
                                    <p className="text-muted-foreground mt-2">{item.description}</p>

                                </div>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background"></div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <GlowingButton asChild>
                        <Link href="/journey">View the Full Journey</Link>
                    </GlowingButton>
                </div>
            </div>
        </section>

         <section id="faq" className="py-16 md:py-24 bg-secondary/30 section-glow-border">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground md:text-xl">Have questions? We have answers. Here are some of the most common inquiries we receive.</p>
                </div>
                <div className="max-w-3xl mx-auto mt-12">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                             <AccordionItem value={`item-${i}`} key={i} className="bg-card border-border/50 rounded-lg shadow-sm">
                                <AccordionTrigger className="px-6 py-4 text-lg font-headline text-left hover:no-underline">
                                   {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </AccordionContent>
                             </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
        
      </main>
    </div>
  );
}
