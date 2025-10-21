
import { Handshake, Heart, TrendingUp, Sparkles, ShieldCheck, Phone, Users, Siren } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GlowingButton from '@/components/shared/GlowingButton';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const sponsorshipTiers = [
    {
        level: 'Community Builder',
        amount: 100,
        description: 'Provides one month of comprehensive course materials and digital access for a student.',
        perks: ['Social media shout-out', 'Name on our annual report'],
    },
    {
        level: 'Pathway Partner',
        amount: 500,
        description: 'Funds a student\'s access to one-on-one mentorship and career coaching for a full quarter.',
        perks: ['All previous perks', 'Exclusive quarterly impact updates'],
    },
    {
        level: 'Visionary Sponsor',
        amount: 1200,
        description: 'Sponsors a student for an entire year of the Catalyst Academy program, from start to finish.',
        perks: ['All previous perks', 'Invitation to our virtual graduation ceremony'],
    },
    {
        level: 'Legacy Founder',
        amount: 5000,
        description: 'Fully funds a student\'s capstone project and provides seed money for their new business or non-profit.',
        perks: ['All previous perks', 'A personal thank-you video from the student you sponsored'],
    },
];

const impactStats = [
  { icon: <TrendingUp className="h-10 w-10 text-accent" />, title: 'Economic Mobility', description: '85% of graduates secure gainful employment or start a business within 6 months of graduation.' },
  { icon: <Sparkles className="h-10 w-10 text-accent" />, title: 'Generational Change', description: 'Your sponsorship breaks cycles, creating a ripple effect of stability and hope for families and communities.' },
  { icon: <ShieldCheck className="h-10 w-10 text-accent" />, title: 'Reduced Recidivism', description: 'A 92% reduction in recidivism among program graduates, creating safer communities for everyone.' },
];

const commitmentSteps = [
    { icon: <Siren className="h-10 w-10 text-accent" />, title: 'Real-Time Risk Detection', description: 'Our admin dashboard immediately flags students who are not engaging with course material. We don’t wait for them to fall behind; we see it the moment it happens.' },
    { icon: <Users className="h-10 w-10 text-accent" />, title: 'Peer Mentor Outreach', description: 'The first line of support is a peer mentor—someone with shared experience who can offer encouragement and guidance in a relatable, non-judgmental way.' },
    { icon: <Phone className="h-10 w-10 text-accent" />, title: 'Direct Staff Intervention', description: 'If a student remains disengaged, a program facilitator will personally reach out to offer one-on-one support, schedule a counseling session, and create a personalized plan to get them back on track.' },
];


export default function SponsorshipPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'testimonial-2');

    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-secondary/30">
                 <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
                        alt="People collaborating"
                        fill
                        className="object-cover"
                        data-ai-hint="collaboration meeting"
                    />
                     <div className="absolute inset-0 bg-black/60" />
                </div>
                <div className="container relative z-10 mx-auto px-4 md:px-6 text-center text-white">
                    <p className="text-accent font-semibold mb-2">BECOME A PARTNER IN HOPE</p>
                    <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl">
                        Sponsor a Student, Ignite a Future
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl">
                        Catalyst Academy is offered at <span className="font-bold">zero cost</span> to our students. This is only possible through the generosity of sponsors like you who believe in the power of second chances. Your contribution directly funds a student's journey to becoming a community leader.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <GlowingButton asChild>
                            <Link href="/sponsorship-application">Become a Sponsor</Link>
                        </GlowingButton>
                    </div>
                </div>
            </section>
            
            {/* Why Sponsor Section */}
            <section className="py-20 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                         <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            The Impact of Your Sponsorship
                        </h2>
                        <p className="mt-4 text-muted-foreground md:text-xl">
                           Your gift isn't a handout; it's an investment in human potential. It's a belief in the simple idea that a past mistake should not be a life sentence of limited opportunity.
                        </p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {impactStats.map(value => (
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

             {/* Our Commitment Section */}
            <section className="py-20 md:py-24 bg-secondary/30 section-glow-border">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                         <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Our Commitment to Your Investment
                        </h2>
                        <p className="mt-4 text-muted-foreground md:text-xl">
                           We believe a sponsorship is a partnership. We honor your investment by ensuring every student has a robust support system. We don't let anyone fall through the cracks. Here's how:
                        </p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {commitmentSteps.map(value => (
                             <Card key={value.title} className="text-center bg-card border-border/50 shadow-sm">
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


            {/* Sponsorship Tiers Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Choose Your Impact Level
                        </h2>
                        <p className="mt-4 text-muted-foreground md:text-xl">
                            Every dollar makes a difference. Select the sponsorship level that aligns with your passion for change, or contact us about corporate partnerships.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sponsorshipTiers.map(tier => (
                            <Card key={tier.level} className="flex flex-col bg-card shadow-lg">
                                <CardHeader className="text-center p-6 bg-secondary/50">
                                    <p className="font-bold text-accent">{tier.level}</p>
                                    <p className="text-4xl font-headline font-bold animated-gradient-text">${tier.amount}</p>
                                </CardHeader>
                                <CardContent className="flex-1 p-6 space-y-4">
                                    <p className="text-muted-foreground text-center h-16">{tier.description}</p>
                                    <ul className="space-y-2 text-sm">
                                        {tier.perks.map(perk => (
                                            <li key={perk} className="flex items-center gap-2">
                                                <Heart className="w-4 h-4 text-accent" />
                                                <span>{perk}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <div className="p-6 pt-0">
                                    <GlowingButton asChild className="w-full">
                                      <Link href="/sponsorship-application">Sponsor at this Level</Link>
                                    </GlowingButton>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* 501c3 Status Section */}
             <section className="py-20 md:py-24 bg-secondary/30 section-glow-border">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                   <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="flex-row gap-4 items-center">
                            <Handshake className="w-12 h-12 text-accent" />
                            <div>
                                <CardTitle className="font-headline text-2xl text-foreground">Our Path to 501(c)(3)</CardTitle>
                                <p className="text-muted-foreground">Building a sustainable future for our mission.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>Catalyst Academy is operated under the umbrella of The Doctor Project Corporation, a registered non-profit organization. We are actively pursuing official 501(c)(3) tax-exempt status from the IRS.</p>
                             <p>While this process is underway, your sponsorship is a powerful social investment in the future of our communities. Once our 501(c)(3) status is approved, all prior donations within the eligibility window may become tax-deductible retroactively. We are committed to transparency and will keep all of our valued partners updated on our progress.</p>
                            <GlowingButton asChild>
                                <Link href="/sponsorship-application?type=corporate">Contact Us for Corporate Sponsorship</Link>
                            </GlowingButton>
                        </CardContent>
                   </Card>
                </div>
            </section>

        </div>
    );
}
