import { Handshake, Rocket, Megaphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        description: 'We provide the tools, resources, and support system for individuals to reclaim their narratives and build futures of their own design.'
    },
    {
        icon: <Handshake className="h-10 w-10 text-accent" />,
        title: 'Growth',
        description: 'Our curriculum fosters continuous personal and professional development, cultivating resilience, and leadership from within.'
    },
    {
        icon: <Megaphone className="h-10 w-10 text-accent" />,
        title: 'Advocacy',
        description: 'We champion systemic change, challenging stigmas and creating pathways for returning citizens to become community leaders.'
    }
]

export default function AboutPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl">
                        Our Mission: From Ex-Offender to Community Catalyst
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                        We are dedicated to reframing the narrative. We believe that a past mistake does not define a person's future. Our mission is to unlock the immense potential within returning citizens, transforming them into leaders, entrepreneurs, and pillars of their communities.
                    </p>
                </div>
            </section>

            <section className="py-20 md:py-32 bg-secondary/30 section-glow-border">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                         <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Statistics & Impact
                        </h2>
                        <p className="mt-4 text-muted-foreground md:text-xl">
                            Our evidence-based approach delivers life-changing results for our participants and their communities.
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

            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Our Core Values
                        </h2>
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

            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative py-16 px-8 rounded-lg overflow-hidden text-center bg-primary text-primary-foreground">
                        <div className="absolute inset-0 animated-gradient-bg opacity-10"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
                                &ldquo;We matter. We belong. We rise.&rdquo;
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
