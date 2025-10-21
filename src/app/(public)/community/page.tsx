import { Handshake, Rocket, Megaphone, Eye, Users, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GlowingButton from '@/components/shared/GlowingButton';
import Link from 'next/link';

const rules = [
    {
        title: 'Be Respectful and Constructive',
        description: 'Engage in discussions with the intent to build up, not tear down. Disagreements are normal, but personal attacks, insults, and belittling comments are not acceptable. Challenge ideas, not people.'
    },
    {
        title: 'Maintain Confidentiality',
        description: 'This is a safe space. What is shared in the community, stays in the community. Do not share personal stories, struggles, or identifying details of other members outside of this platform.'
    },
    {
        title: 'No Hate Speech, Harassment, or Violence',
        description: 'We have a zero-tolerance policy for any form of hate speech, discrimination (based on race, religion, gender, sexual orientation, etc.), harassment, or threats of violence. This is a place of healing and growth.'
    },
    {
        title: 'Stay On Topic',
        description: 'Keep discussions relevant to the module, lesson, or forum topic. This ensures conversations are productive and valuable for everyone involved.'
    },
    {
        title: 'No Solicitation or Spam',
        description: 'This community is for learning and support, not for commercial promotion. Do not post spam, advertisements, or solicitations for external businesses or services.'
    },
    {
        title: 'Uphold Academic Integrity',
        description: 'Your work must be your own. Plagiarism and cheating undermine the value of your certificate and the trust of the community. All submitted work must be original.'
    }
]

export default function CommunityPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="py-20 md:py-32 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <p className="text-accent font-semibold mb-2">OUR PURPOSE</p>
                    <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl">
                        Why We Exist: The Purpose of Purpose
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                        Catalyst Academy was born from a simple, powerful belief: a person's past does not dictate their future. We exist to provide a structured pathway for individuals to transform their lives, not just by finding a job, but by rediscovering their purpose, reclaiming their narrative, and becoming leaders in their own communities.
                    </p>
                     <div className="mt-8 flex justify-center gap-4">
                        <GlowingButton asChild>
                            <Link href="/enroll">Apply Now (Free)</Link>
                        </GlowingButton>
                        <Link href="/sponsorship" className="inline-flex items-center justify-center rounded-md bg-primary-foreground text-primary px-6 py-3 font-bold transition-colors hover:bg-primary-foreground/90">
                            Sponsor a Student
                        </Link>
                    </div>
                </div>
            </section>

            {/* Who It's For Section */}
             <section className="py-20 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
                                A Program for Universal Transformation
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                While our curriculum is expertly tailored to address the unique challenges faced by returning citizens, the principles of renewal, leadership, and community-building are universal. This journey is for anyone, from any background, if:
                            </p>
                            <ul className="space-y-3 text-lg text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <Shield className="w-6 h-6 text-accent mt-1 shrink-0" />
                                    <span>You are ready to build a new future, regardless of your past.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Rocket className="w-6 h-6 text-accent mt-1 shrink-0" />
                                    <span>You are deeply committed to personal and professional growth.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Users className="w-6 h-6 text-accent mt-1 shrink-0" />
                                    <span>You believe in the power of community and mutual support.</span>
                                </li>
                                 <li className="flex items-start gap-3">
                                    <Megaphone className="w-6 h-6 text-accent mt-1 shrink-0" />
                                    <span>You aspire to be a positive force for change, not just for yourself, but for others.</span>
                                </li>
                            </ul>
                             <div className="pt-6">
                                <GlowingButton asChild>
                                    <Link href="/enroll">If This Is You, Apply Today</Link>
                                </GlowingButton>
                            </div>
                        </div>
                        <div className="bg-card p-8 rounded-lg shadow-lg">
                            <h3 className="font-headline text-2xl font-bold">Our Commitment to You</h3>
                            <p className="text-muted-foreground mt-4">We commit to providing you with a world-class curriculum, dedicated mentorship, and a supportive, lifelong network. In return, we ask for your full commitment to the process, to yourself, and to the community we build together. This is a partnership in your success. Our founder, Dr. Warren O. Crabb, personally reviews every application to ensure each cohort is filled with individuals truly ready for this transformative journey.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Community Rules Section */}
            <section className="py-20 md:py-32 bg-secondary/30 section-glow-border">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Our Community Covenant
                        </h2>
                        <p className="mt-4 text-muted-foreground md:text-xl">
                            Our community is built on a foundation of mutual respect, dignity, and a shared desire for growth. To protect this sacred space, all members must adhere to the following principles.
                        </p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rules.map(rule => (
                             <Card key={rule.title} className="bg-card border-border/50 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">{rule.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{rule.description}</p>
                                </CardContent>
                             </Card>
                        ))}
                    </div>
                </div>
            </section>

             {/* Consequences Section */}
             <section className="py-20 md:py-24">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                   <Card className="bg-destructive/10 border-destructive/50 text-destructive-foreground">
                        <CardHeader className="flex-row gap-4 items-center">
                            <AlertTriangle className="w-12 h-12 text-destructive" />
                            <div>
                                <CardTitle className="font-headline text-2xl text-destructive">Our Commitment to a Safe Community</CardTitle>
                                <p className="text-destructive/80">Violations of our Community Covenant are taken seriously to protect the integrity and safety of our learning environment.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>Our moderation process is designed to be fair and transparent, always starting with the assumption of positive intent, but escalating as needed to protect the community. Dignity and respect are paramount.</p>
                            <ol className="list-decimal pl-6 space-y-2 font-medium">
                                <li><span className="font-bold">First Violation:</span> A formal warning from a facilitator and a temporary suspension of posting privileges for 24 hours. The offending content will be removed. This serves as a learning opportunity.</li>
                                <li><span className="font-bold">Second Violation:</span> A mandatory 1-on-1 meeting with a program director to discuss the community covenant and a 7-day suspension of all platform access. Reinstatement is contingent on a commitment to uphold our values.</li>
                                <li><span className="font-bold">Third Violation:</span> Immediate and permanent removal from the Catalyst Academy program and all associated communities, without appeal.</li>
                            </ol>
                            <p className="text-sm pt-4">We hold this firm line because trust and safety are non-negotiable. Creating a space where everyone feels secure enough to be vulnerable and to grow is a responsibility we all share.</p>
                        </CardContent>
                   </Card>
                </div>
            </section>

             {/* Join Us CTA */}
            <section className="pb-20 md:pb-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative py-16 px-8 rounded-lg overflow-hidden text-center bg-primary text-primary-foreground">
                        <div className="absolute inset-0 animated-gradient-bg opacity-10"></div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h3 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
                                Ready to Redefine Your Future?
                            </h3>
                            <p className="mt-4 text-primary-foreground/80">
                                If you are ready to commit to yourself, to your future, and to a community that will lift you up, your journey starts here.
                            </p>
                            <div className="mt-8 flex justify-center">
                                <GlowingButton asChild>
                                    <Link href="/enroll">Apply for the Catalyst Program</Link>
                                </GlowingButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
