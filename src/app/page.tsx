
import Link from 'next/link';
import Image from 'next/image';
import { Award, BarChart, CalendarDays, Target, Users, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

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

const facilitators = PlaceHolderImages.filter(img => img.id.startsWith("facilitator-"));
const facilitatorDetails = [
    { name: 'Dr. Aliyah Khan', title: 'Founder & Lead Curriculum Designer', imageId: 'facilitator-1', bio: 'Dr. Khan combines her Ph.D. in Social Work with lived experience to create a curriculum that is both evidence-based and deeply empathetic.' },
    { name: 'Marcus Reid', title: 'Community Outreach & Partnerships Lead', imageId: 'facilitator-2', bio: 'A master networker, Marcus builds bridges to employers, community leaders, and resources to ensure our Catalysts have every opportunity to succeed.' },
    { name: 'Elena Santos', title: 'Career & Entrepreneurship Coach', imageId: 'facilitator-3', bio: 'Elena is a certified career coach who specializes in helping individuals translate their life experiences into powerful assets for the job market or their own business ventures.' },
];

const testimonials = PlaceHolderImages.filter(img => img.id.startsWith("testimonial-"));
const testimonialDetails = [
    { name: 'James P.', cohort: 'Cohort 2023', text: "This program didn't just give me skills; it gave me back my voice and my worth. I'm now a small business owner and a mentor to young men in my community.", imageId: 'testimonial-1' },
    { name: 'Sarah L.', cohort: 'Cohort 2023', text: "Catalyst Academy believed in me when I didn't believe in myself. The support system is unmatched, and I've built relationships that will last a lifetime. I start my new career next month!", imageId: 'testimonial-2' },
    { name: 'Michael B.', cohort: 'Cohort 2022', text: "From a returning citizen to a community catalyst. That's my story, thanks to this program. I'm now leading a non-profit to help others on their journey of restoration.", imageId: 'testimonial-1' },
    { name: 'David G.', cohort: 'Cohort 2022', text: "I learned more about finance and business in this program than I ever did in school. It gave me the confidence to launch my own landscaping company, which now employs three other returning citizens.", imageId: 'testimonial-1' },
];

const journey = [
    { quarter: 'Q1', title: 'Module 1 & 2: Foundations of Self & Finance', description: 'Weeks 1-13: Reclaim your narrative, master your finances, and build a rock-solid foundation for personal growth.' },
    { quarter: 'Q2', title: 'Module 3 & 4: Professional & Personal Wellness', description: 'Weeks 14-26: Develop career-ready skills, master interviews, and prioritize your mental and physical well-being.' },
    { quarter: 'Q3', title: 'Module 5: Community & Civic Engagement', description: 'Weeks 27-39: Understand your rights, learn to advocate for change, and find your voice as a community leader.' },
    { quarter: 'Q4', title: 'Module 6: Leadership & Capstone', description: 'Weeks 40-52: Solidify your leadership style and launch a real-world capstone project that leaves a lasting legacy.' },
]

const faqs = [
    {
        question: "Is this program really free?",
        answer: "Yes. Thanks to our generous partners and donors, Catalyst Academy is offered at no cost to all accepted participants. Our goal is to remove financial barriers to success."
    },
    {
        question: "What are the requirements to apply?",
        answer: "We welcome applications from any individual who is returning to the community after a period of incarceration. The key requirement is a deep commitment to personal transformation and community leadership. The application process includes an essay and an interview."
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

export default function HomePage() {
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
                  <Link href="/enroll">Enroll Now - It's Free</Link>
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

         <section id="how-it-works" className="py-16 md:py-24 bg-secondary/30 section-glow-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="text-muted-foreground md:text-xl">A holistic, three-pronged approach to sustainable success.</p>
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-accent text-primary-foreground mb-4">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-headline font-bold">1. Transformative Curriculum</h3>
                <p className="text-muted-foreground mt-2">Engage in weekly online modules covering everything from financial literacy and mental wellness to public speaking and entrepreneurship.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-accent text-primary-foreground mb-4">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-headline font-bold">2. Dedicated Mentorship</h3>
                <p className="text-muted-foreground mt-2">Get paired with an industry leader and a peer mentor for weekly check-ins, guidance, and unwavering support.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-accent text-primary-foreground mb-4">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-headline font-bold">3. Capstone Project</h3>
                <p className="text-muted-foreground mt-2">Apply your new skills by designing and launching a real-world community project or business plan with seed funding available.</p>
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
            </div>
        </section>

        <section id="facilitators" className="py-16 md:py-24 bg-secondary/30 section-glow-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet the Facilitators</h2>
                <p className="text-muted-foreground md:text-xl">Guided by experts with a passion for empowerment and restorative justice. Our team has lived experience and professional expertise.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {facilitatorDetails.map((facilitator) => {
                  const image = facilitators.find(img => img.id === facilitator.imageId);
                  return (
                    <Card key={facilitator.name} className="flex flex-col items-center text-center group border-0 bg-transparent shadow-none">
                        <div className="relative">
                            <Avatar className="w-40 h-40 border-4 border-transparent group-hover:border-accent transition-all duration-300">
                                {image && <AvatarImage src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} />}
                                <AvatarFallback>{facilitator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <CardHeader>
                          <CardTitle className="font-headline">{facilitator.name}</CardTitle>
                          <p className="text-accent font-medium">{facilitator.title}</p>
                        </CardHeader>
                         <CardContent>
                            <p className="text-sm text-muted-foreground">{facilitator.bio}</p>
                        </CardContent>
                    </Card>
                  )
              })}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 md:py-24 bg-primary text-primary-foreground section-glow-border">
          <div className="container mx-auto px-4 md:px-6">
             <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground">Stories of Transformation</h2>
                <p className="text-primary-foreground/80 md:text-xl">Don't just take our word for it. Hear from the catalysts who have graduated from our program.</p>
            </div>
            <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {testimonialDetails.map((testimonial) => {
                    const image = testimonials.find(img => img.id === testimonial.imageId);
                    return (
                        <CarouselItem key={testimonial.name} className="md:basis-1/2">
                        <div className="p-4">
                            <Card className="bg-primary-foreground/10 border-primary-foreground/20 shadow-lg h-full">
                            <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                                <Avatar className="w-24 h-24 border-4 border-accent">
                                    {image && <AvatarImage src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} />}
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <blockquote className="text-lg italic">
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

         <section id="faq" className="py-16 md:py-24 bg-background section-glow-border">
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
        
        <LogoCloud title="Our Partners, Supporters, & Accreditation" />
      </main>
    </div>
  );
}

    