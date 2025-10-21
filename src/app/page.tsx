import Link from 'next/link';
import Image from 'next/image';
import { Award, BarChart, CalendarDays, Target } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import GlowingButton from '@/components/shared/GlowingButton';
import LogoCloud from '@/components/shared/LogoCloud';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const courseFeatures = [
  {
    icon: <Target className="h-8 w-8 text-accent" />,
    title: 'Purpose-Driven',
    description: 'Reframe your narrative and build a future defined by your potential, not your past.',
  },
  {
    icon: <Award className="h-8 w-8 text-accent" />,
    title: 'Certification',
    description: 'Earn a nationally recognized certificate to validate your skills and leadership readiness.',
  },
  {
    icon: <BarChart className="h-8 w-8 text-accent" />,
    title: 'Tangible Outcomes',
    description: 'Develop critical skills in finance, entrepreneurship, and community advocacy.',
  },
  {
    icon: <CalendarDays className="h-8 w-8 text-accent" />,
    title: '52-Week Journey',
    description: 'A comprehensive year-long program providing sustained support and growth.',
  },
];

const facilitators = PlaceHolderImages.filter(img => img.id.startsWith("facilitator-"));
const facilitatorDetails = [
    { name: 'Dr. Aliyah Khan', title: 'Lead Curriculum Designer', imageId: 'facilitator-1' },
    { name: 'Marcus Reid', title: 'Community Outreach Lead', imageId: 'facilitator-2' },
    { name: 'Elena Santos', title: 'Career Services Director', imageId: 'facilitator-3' },
];

const testimonials = PlaceHolderImages.filter(img => img.id.startsWith("testimonial-"));
const testimonialDetails = [
    { name: 'James P.', cohort: 'Cohort 2023', text: "This program didn't just give me skills; it gave me back my voice. I'm now a small business owner and a mentor in my community.", imageId: 'testimonial-1' },
    { name: 'Sarah L.', cohort: 'Cohort 2023', text: "Catalyst Academy believed in me when I didn't believe in myself. The support system is unmatched, and I've built relationships that will last a lifetime.", imageId: 'testimonial-2' },
    { name: 'Michael B.', cohort: 'Cohort 2022', text: "From a returning citizen to a community catalyst. That's my story, thanks to this program. I'm now leading a non-profit to help others on their journey.", imageId: 'testimonial-1' },
];

const journey = [
    { quarter: 'Q1', title: 'Module 1: Foundations of Self', description: 'Weeks 1-13: Identity, Worth, and Vision' },
    { quarter: 'Q2', title: 'Module 2: Essential Life Skills', description: 'Weeks 14-26: Financial Literacy & Professionalism' },
    { quarter: 'Q3', title: 'Module 3: Community & Advocacy', description: 'Weeks 27-39: Building Bridges & Leading Change' },
    { quarter: 'Q4', title: 'Module 4: Leadership in Action', description: 'Weeks 40-52: Entrepreneurship & Legacy Projects' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 animated-gradient-bg" />
          <div className="relative z-10 container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl font-headline font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white shadow-xl">
                Empowering Returning Citizens to Rise and Lead
              </h1>
              <p className="text-lg md:text-xl text-white/80">
                Join our 52-week accredited program to transform your future and become a catalyst for change in your community.
              </p>
              <div className="flex justify-center">
                <GlowingButton asChild>
                  <Link href="/enroll">Enroll Now</Link>
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

        <section id="journey" className="py-16 md:py-24 bg-secondary/30 section-glow-border">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">The 52-Week Journey</h2>
                    <p className="text-muted-foreground md:text-xl">A year of transformation, from foundational self-worth to community leadership.</p>
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
            </div>
        </section>

        <section id="facilitators" className="py-16 md:py-24 bg-background section-glow-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet the Facilitators</h2>
                <p className="text-muted-foreground md:text-xl">Guided by experts with a passion for empowerment and restorative justice.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {facilitatorDetails.map((facilitator) => {
                  const image = facilitators.find(img => img.id === facilitator.imageId);
                  return (
                    <div key={facilitator.name} className="flex flex-col items-center text-center group">
                        <div className="relative">
                            <Avatar className="w-40 h-40 border-4 border-transparent group-hover:border-accent transition-all duration-300">
                                {image && <AvatarImage src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} />}
                                <AvatarFallback>{facilitator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <h3 className="mt-4 text-xl font-bold font-headline">{facilitator.name}</h3>
                        <p className="text-accent font-medium">{facilitator.title}</p>
                    </div>
                  )
              })}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 md:py-24 bg-primary text-primary-foreground section-glow-border">
          <div className="container mx-auto px-4 md:px-6">
            <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {testimonialDetails.map((testimonial) => {
                    const image = testimonials.find(img => img.id === testimonial.imageId);
                    return (
                        <CarouselItem key={testimonial.name}>
                        <div className="p-1">
                            <Card className="bg-transparent border-0 shadow-none">
                            <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                                <Avatar className="w-24 h-24 border-4 border-accent">
                                    {image && <AvatarImage src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} />}
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <blockquote className="text-xl italic">
                                &ldquo;{testimonial.text}&rdquo;
                                </blockquote>
                                <div>
                                    <p className="font-bold font-headline text-lg">{testimonial.name}</p>
                                    <p className="text-sm text-primary-foreground/70">{testimonial.cohort}</p>
                                </div>
                            </CardContent>
                            </Card>
                        </div>
                        </CarouselItem>
                    )
                })}
              </CarouselContent>
              <CarouselPrevious className="text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20" />
              <CarouselNext className="text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20" />
            </Carousel>
          </div>
        </section>
        
        <LogoCloud title="Our Partners & Accreditation" />
      </main>
    </div>
  );
}
