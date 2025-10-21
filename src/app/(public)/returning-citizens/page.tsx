
'use client';

import { Shield, Sparkles, TrendingUp, UserCheck } from 'lucide-react';
import GlowingButton from '@/components/shared/GlowingButton';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

const pillars = [
    {
        icon: <UserCheck className="h-10 w-10 text-accent" />,
        title: 'Dignity and Self-Worth',
        description: 'Our first principle is to see and respect the whole person, not the label. We guide you to reclaim your narrative, separating your identity from past mistakes to build a future on a foundation of inherent self-worth.'
    },
    {
        icon: <Shield className="h-10 w-10 text-accent" />,
        title: 'Discipline and Pride',
        description: "Through a structured, year-long curriculum, you will cultivate the discipline needed for sustained success. We foster pride not in past actions, but in the person you are becoming and the positive impact you will have."
    },
    {
        icon: <TrendingUp className="h-10 w-10 text-accent" />,
        title: 'Productive and Purpose-Driven',
        description: "We equip you with tangible, in-demand skills for today's economy. The goal is not just employment, but to become a productive member of society who contributes, leads, and inspires. To act like a productive member of society is to be one."
    }
];

const programStats = [
    { name: 'Employment Rate Post-Program', value: 85, fill: 'hsl(var(--chart-2))' },
    { name: 'Reduction in Recidivism', value: 92, fill: 'hsl(var(--chart-1))' },
    { name: 'New Businesses Started', value: 120, fill: 'hsl(var(--chart-4))', absolute: true },
    { name: 'Graduates Empowered', value: 500, fill: 'hsl(var(--chart-5))', absolute: true },
];

export default function ReturningCitizensPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-secondary/30">
                 <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3"
                        alt="A group of diverse people learning together"
                        fill
                        className="object-cover"
                        data-ai-hint="diverse group learning"
                    />
                     <div className="absolute inset-0 bg-black/70" />
                </div>
                <div className="container relative z-10 mx-auto px-4 md:px-6 text-center text-white">
                    <p className="text-accent font-semibold mb-2">A NEW BEGINNING</p>
                    <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl">
                        From Ex-Offender to Community Asset
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl">
                        This program was built for you, by people who understand your journey. Our mission is to dignify your experience, help you build unshakable self-worth, and empower you to become a productive, respected leader in society—without the shadow of your past defining your future.
                    </p>
                     <div className="mt-8 flex justify-center gap-4">
                        <GlowingButton asChild>
                            <Link href="/enroll">Your Journey Starts Here</Link>
                        </GlowingButton>
                    </div>
                </div>
            </section>

            {/* Core Mission Pillars */}
             <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Our Guiding Principles
                        </h2>
                         <p className="mt-4 text-muted-foreground md:text-xl">
                           We don't just teach skills; we rebuild foundations. Our entire program is centered on three core pillars designed to empower your transformation.
                        </p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {pillars.map(value => (
                             <Card key={value.title} className="text-center bg-card border-border/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="items-center space-y-4">
                                    {value.icon}
                                    <CardTitle className="font-headline text-2xl">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{value.description}</p>

                                </CardContent>
                             </Card>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Proven Results Chart Section */}
            <section className="py-20 md:py-24 bg-secondary/30 section-glow-border">
                <div className="container mx-auto px-4 md:px-6">
                     <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Proven Results</h2>
                        <p className="mt-4 text-muted-foreground md:text-xl">
                            Our approach is not theoretical; it's proven. We track our success by the success of our graduates. The numbers demonstrate a powerful story of transformation and community impact.
                        </p>
                    </div>
                    <div className="mt-12 max-w-5xl mx-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Post-Program Success Metrics</CardTitle>
                                <CardDescription>Data reflects outcomes for graduates within 12 months of program completion.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={programStats} layout="vertical" margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                            <XAxis type="number" stroke="hsl(var(--muted-foreground))" domain={[0, 100]} tickFormatter={(tick) => tick > 100 ? `${tick}` : `${tick}%`} />
                                            <YAxis type="category" width={150} dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                            <Tooltip
                                                contentStyle={{ 
                                                    backgroundColor: 'hsl(var(--background))',
                                                    borderColor: 'hsl(var(--border))'
                                                }}
                                                cursor={{fill: 'hsl(var(--accent) / 0.1)'}}
                                                formatter={(value, name, props) => {
                                                    return props.payload.absolute ? value : `${value}%`
                                                }}
                                            />
                                            <Bar dataKey="value" name="Success Metric">
                                                {programStats.map((entry, index) => (
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

            {/* The Mindset Shift Section */}
            <section className="py-20 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
                               The Mindset: Productive Member of Society
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                We believe a simple but profound truth: <span className="font-bold text-foreground">to be a productive member of society, you must act like a productive member of society.</span> This isn't about "faking it until you make it." It's about making a conscious, daily choice to operate from a place of integrity, responsibility, and contribution.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                Our program provides the structure and support to make that choice easier every day. We help you replace old habits with new ones, shifting your mindset from one defined by limitations to one defined by possibilities. You are not an "ex-con"; you are a leader-in-training, an entrepreneur-in-the-making, a catalyst for change.
                            </p>
                             <div className="pt-6">
                                <GlowingButton asChild>
                                    <Link href="/curriculum">See the Full Curriculum</Link>
                                </GlowingButton>
                            </div>
                        </div>
                        <div className="relative h-96">
                             <Image
                                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
                                alt="Two people having a positive meeting"
                                fill
                                className="object-cover rounded-lg shadow-xl"
                                data-ai-hint="positive meeting"
                            />
                        </div>
                    </div>
                </div>
            </section>

             {/* Join Us CTA */}
            <section className="py-20 md:py-32 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative py-16 px-8 rounded-lg overflow-hidden text-center bg-primary text-primary-foreground">
                        <div className="absolute inset-0 animated-gradient-bg opacity-10"></div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h3 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
                                Your Past is a Story, Not a Sentence
                            </h3>
                            <p className="mt-4 text-primary-foreground/80">
                                You have a unique story of resilience that the world needs to hear. Let us help you refine it, own it, and use it as the fuel for your future. You are not defined by your worst day. You are defined by what you do next.
                            </p>
                            <div className="mt-8 flex justify-center">
                                <GlowingButton asChild>
                                    <Link href="/enroll">Take the First Step</Link>
                                </GlowingButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
