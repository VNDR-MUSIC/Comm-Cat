
'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import GlowingButton from '@/components/shared/GlowingButton';
import Link from 'next/link';
import { CheckCircle, Users, Briefcase, TrendingUp, Sparkles, Trophy, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const journeyData = [
    {
        quarter: 'Q1: Weeks 1-13',
        title: 'The Foundation',
        icon: <Users className="w-8 h-8" />,
        description: 'This is where it all begins. You\'ll reclaim your personal narrative, build a strong sense of self-worth, and master the fundamentals of financial literacy. We establish the bedrock for your entire journey.',
        milestones: ['Personal Vision Statement', 'Financial Stability Plan', 'Resilience Toolkit'],
        color: 'hsl(var(--chart-1))',
    },
    {
        quarter: 'Q2: Weeks 14-26',
        title: 'The Preparation',
        icon: <Briefcase className="w-8 h-8" />,
        description: 'With a strong foundation, you\'ll turn your focus to professional readiness. This quarter is about translating your life experience into career assets, mastering interviews, and prioritizing holistic wellness.',
        milestones: ['Professional Resume & Portfolio', 'Interview Mastery Certificate', 'Personal Wellness Plan'],
        color: 'hsl(var(--chart-2))',
    },
    {
        quarter: 'Q3: Weeks 27-39',
        title: 'The Activation',
        icon: <TrendingUp className="w-8 h-8" />,
        description: 'Now, you\'ll learn to use your voice. This quarter is dedicated to community advocacy and civic engagement. You\'ll understand your rights, learn to effect change, and become a confident public speaker.',
        milestones: ['Community Advocacy Blueprint', 'Public Speaking Certification', 'Civic Engagement Plan'],
        color: 'hsl(var(--chart-4))',
    },
    {
        quarter: 'Q4: Weeks 40-52',
        title: 'The Legacy',
        icon: <Trophy className="w-8 h-8" />,
        description: 'The culmination. You will synthesize all your learning into a capstone project—launching a business, a non-profit, or a community initiative. This is where you present your vision and begin your legacy.',
        milestones: ['Capstone Project Launch', 'Pitch Showcase to Investors', 'Lifelong Alumni Network Induction'],
        color: 'hsl(var(--chart-5))',
    },
];

const chartData = [
  { name: 'Self-Worth', before: 35, after: 92, fill: 'hsl(var(--chart-1))' },
  { name: 'Financial Literacy', before: 25, after: 88, fill: 'hsl(var(--chart-2))' },
  { name: 'Employability', before: 40, after: 95, fill: 'hsl(var(--chart-4))' },
  { name: 'Community Engagement', before: 15, after: 85, fill: 'hsl(var(--chart-5))' },
];

export default function JourneyPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="py-20 md:py-32 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <p className="text-accent font-semibold mb-2">YOUR PATH FORWARD</p>
                    <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl">
                        The 52-Week Transformation Journey
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                        This isn't just a course; it's a structured, year-long metamorphosis. Each quarter builds upon the last, guiding you from deep inner work to impactful outer leadership. Follow the path.
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2" aria-hidden="true" />

                        {journeyData.map((item, index) => (
                            <div key={item.title} className="relative mb-16 last:mb-0">
                                <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} md:gap-12`}>
                                    <div className="hidden md:flex flex-col items-center w-1/2">
                                        <div className="relative w-32 h-32 flex items-center justify-center">
                                            <Sparkles className="absolute w-32 h-32 text-accent/20 animate-spin" style={{animationDuration: '20s'}} />
                                            <div className="relative w-24 h-24 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                                                {item.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <div className="relative p-6 bg-card rounded-lg shadow-xl border-l-4 md:border-l-0 md:border-r-4" style={{ borderColor: item.color }}>
                                            <div className="absolute top-1/2 -left-3 md:left-auto md:-right-3 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center bg-background">
                                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                            </div>
                                            <Badge variant="outline" style={{ borderColor: item.color, color: item.color }}>{item.quarter}</Badge>
                                            <h3 className="font-headline text-2xl font-bold mt-2">{item.title}</h3>
                                            <p className="text-muted-foreground mt-2">{item.description}</p>
                                            <div className="mt-4 space-y-2">
                                                <h4 className="font-bold">Key Milestones:</h4>
                                                <ul className="space-y-1">
                                                    {item.milestones.map(milestone => (
                                                        <li key={milestone} className="flex items-center gap-2 text-sm">
                                                            <CheckCircle className="w-4 h-4" style={{ color: item.color }}/>
                                                            <span>{milestone}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Proven Results Chart */}
            <section className="py-20 md:py-24 bg-secondary/30 section-glow-border">
                <div className="container mx-auto px-4 md:px-6">
                     <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Quantifiable Transformation</h2>
                        <p className="mt-4 text-muted-foreground md:text-xl">
                           Our program delivers measurable growth in the areas that matter most. The chart below shows the average skill and confidence uplift reported by our graduates, from program start to finish.
                        </p>
                    </div>
                    <div className="mt-12 max-w-4xl mx-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Average Participant Growth (Before vs. After)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                            <YAxis unit="%" stroke="hsl(var(--muted-foreground))" />
                                            <Tooltip
                                                contentStyle={{ 
                                                    backgroundColor: 'hsl(var(--background))',
                                                    borderColor: 'hsl(var(--border))'
                                                }}
                                                cursor={{fill: 'hsl(var(--accent) / 0.1)'}}
                                            />
                                            <Legend />
                                            <Bar dataKey="before" name="Before Program" fillOpacity={0.4}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                            <Bar dataKey="after" name="After Program">
                                                 {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

             {/* Final CTA */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative py-16 px-8 rounded-lg overflow-hidden text-center bg-primary text-primary-foreground">
                        <div className="absolute inset-0 animated-gradient-bg opacity-10"></div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h3 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
                                Your Journey is Unique. Your Path is Here.
                            </h3>
                            <p className="mt-4 text-primary-foreground/80">
                                This timeline is our commitment to your growth. If you are ready to walk this path and emerge a leader, your first step is a single click away.
                            </p>
                            <div className="mt-8 flex justify-center gap-4">
                                <GlowingButton asChild>
                                    <Link href="/enroll">Enroll Now (Application)</Link>
                                </GlowingButton>
                                <Link href="/sponsorship" className="inline-flex items-center justify-center rounded-md bg-primary-foreground text-primary px-6 py-3 font-bold transition-colors hover:bg-primary-foreground/90">
                                    Sponsor a Journey
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
