import { Handshake, Rocket, Megaphone, Eye, Users, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GlowingButton from '@/components/shared/GlowingButton';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

const coreValues = [
    {
        icon: <Rocket className="h-10 w-10 text-accent" />,
        title: 'Empowerment',
        description: 'We provide the tools, resources, and unwavering support for individuals to reclaim their narratives and build futures of their own design.'
    },
    {
        icon: <Handshake className="h-10 w-10 text-accent" />,
        title: 'Growth',
        description: 'Our curriculum fosters continuous personal and professional development, cultivating resilience, and leadership from within.'
    },
    {
        icon: <Megaphone className="h-10 w-10 text-accent" />,
        title: 'Advocacy',
        description: 'We champion systemic change, challenging stigmas and creating pathways for our participants to become celebrated community leaders.'
    }
];

const timeline = [
    { year: '2020', event: 'The Idea', description: 'Our founder, drawing from lived experience, envisioned a program that went beyond basic job training to address the whole person.' },
    { year: '2021', event: 'Pilot Program', description: 'Launched our first cohort with 15 participants in a borrowed community center room, proving the model works.' },
    { year: '2022', event: 'National Recognition', description: 'Received the "Innovations in Reentry" award from the Department of Justice.' },
    { year: '2023', event: 'First 500 Graduates', description: 'Celebrated empowering over 500 individuals who are now leaders in their communities.' },
    { year: 'Today', event: 'Expanding Our Reach', description: 'Launching our digital platform to bring the Catalyst Academy experience to thousands more across the nation.' },
]

const team = PlaceHolderImages.filter(img => img.id.startsWith("facilitator-"));
const teamDetails = [
    { name: 'Dr. Warren O. Crabb', title: 'Founder & CEO', imageId: 'facilitator-1', bio: 'A dynamic and visionary media leader with a strong background in television, radio, and community-based programming who founded Catalyst Academy to build the support system he wished he had.' },
    { name: 'Marcus Reid', title: 'Director of Programs', imageId: 'facilitator-2', bio: 'Marcus is a community organizer with 15 years of experience building bridges between marginalized communities and local government. He oversees all curriculum and mentorship.' },
    { name: 'Elena Santos', title: 'Director of Career Services', imageId: 'facilitator-3', bio: 'Elena brings a decade of experience from the corporate recruiting world, now dedicated to forging partnerships with inclusive employers and preparing catalysts for success.' },
];

export default function AboutPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="py-20 md:py-32 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <p className="text-accent font-semibold mb-2">OUR WHY</p>
                    <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl">
                        Building Leaders, Transforming Communities
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                        We are dedicated to reframing the narrative for anyone seeking a profound transformation. While expertly tailored for returning citizens, our universal principles of leadership, resilience, and entrepreneurship empower all individuals to unlock their potential and become pillars of their communities.
                    </p>
                     <div className="mt-8 flex justify-center gap-4">
                        <GlowingButton asChild>
                            <Link href="/enroll">Enroll Now</Link>
                        </GlowingButton>
                        <Link href="/curriculum" className="inline-flex items-center justify-center rounded-md bg-primary-foreground text-primary px-6 py-3 font-bold transition-colors hover:bg-primary-foreground/90">
                            Explore the Curriculum
                        </Link>
                    </div>
                </div>
            </section>

             {/* Our Story Timeline */}
             <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                         <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Our Story
                        </h2>
                        <p className="mt-4 text-muted-foreground md:text-xl">
                            From a simple idea to a national movement, our journey has been fueled by passion and purpose.
                        </p>
                    </div>
                    <div className="relative mt-16">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
                        {timeline.map((item, index) => (
                            <div key={item.year} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
                                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                    <div className="p-6 bg-card rounded-lg shadow-md border-l-4 border-accent">
                                        <p className="text-sm font-bold text-accent">{item.year}</p>
                                        <h3 className="font-headline text-xl font-bold mt-1">{item.event}</h3>
                                        <p className="text-muted-foreground mt-2">{item.description}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 md:py-24 bg-secondary/30 section-glow-border">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                         <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Our Proven Impact
                        </h2>
                        <p className="mt-4 text-muted-foreground md:text-xl">
                            Our evidence-based approach delivers life-changing results for our participants, their families, and their communities. The numbers speak for themselves.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {stats.map(stat => (
                            <div key={stat.label} className="p-6 bg-card rounded-lg shadow-md">
                                <p className="text-5xl animated-gradient-text">
                                    <AnimatedCounter to={stat.value} />{stat.unit}
                                </p>
                                <p className="mt-2 text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Core Values Section */}
             <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Our Core Values
                        </h2>
                         <p className="mt-4 text-muted-foreground md:text-xl">
                           These principles are the bedrock of our organization and the guiding light for everything we do.
                        </p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {coreValues.map(value => (
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

             {/* Meet the Team Section */}
            <section id="team" className="py-16 md:py-24 bg-secondary/30 section-glow-border">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet the Leadership</h2>
                        <p className="text-muted-foreground md:text-xl">Our team is composed of passionate experts, many with lived experience, dedicated to your success.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {teamDetails.map((member) => {
                        const image = team.find(img => img.id === member.imageId);
                        return (
                            <Card key={member.name} className="flex flex-col items-center text-center group border-0 shadow-none bg-transparent">
                                <div className="relative">
                                    <Image src={image?.imageUrl || ''} alt={image?.description || ''} width={160} height={160} className="rounded-full w-40 h-40 object-cover border-4 border-transparent group-hover:border-accent transition-all duration-300" data-ai-hint={image?.imageHint}/>
                                </div>
                                <CardHeader>
                                    <CardTitle className="font-headline">{member.name}</CardTitle>
                                    <p className="text-accent font-medium">{member.title}</p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                    </div>
                </div>
            </section>

            {/* Join the Movement CTA */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative py-16 px-8 rounded-lg overflow-hidden text-center bg-primary text-primary-foreground">
                        <div className="absolute inset-0 animated-gradient-bg opacity-10"></div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h3 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
                                Join the Movement
                            </h3>
                            <p className="mt-4 text-primary-foreground/80">
                                Whether you're a potential student, a community partner, or a passionate supporter, there's a place for you at Catalyst Academy. Help us redefine what's possible.
                            </p>
                            <div className="mt-8 flex justify-center gap-4">
                                <GlowingButton asChild>
                                    <Link href="/enroll">Enroll Now</Link>
                                </GlowingButton>
                                <Link href="/sponsorship" className="inline-flex items-center justify-center rounded-md bg-primary-foreground text-primary px-6 py-3 font-bold transition-colors hover:bg-primary-foreground/90">
                                    Partner With Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
