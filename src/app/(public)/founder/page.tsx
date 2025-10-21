
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Building, Mail, MapPin, Mic, Phone, Link as LinkIcon, Award, Users, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import GlowingButton from '@/components/shared/GlowingButton';

export default function FounderPage() {
  const founderImage = PlaceHolderImages.find(p => p.id === 'facilitator-1');
  
  const founder = {
    name: 'Dr. Warren O. Crabb',
    titles: 'Founder | Executive Producer | Media Personality',
    location: 'Pinellas Park, FL',
    phone: '+1 (561) 562-7222',
    phoneDisplay: '561-56-CRABB',
    email: 'doctorcrabb@tcsup.c',
    website: 'thedrproject.com',
    imageUrl: founderImage?.imageUrl || '',
    imageHint: founderImage?.imageHint || 'male portrait',
    summary:
      'Dynamic and visionary media leader with a strong background in television, radio, and community-based programming. Founder of Transcontinental Society Unlimited Productions, LLC and The Doctor Project Corporation, (a non-profit organization). Executive Producer/Host of The Doctor Project! TV Show. Committed to creating platforms that amplify underserved voices, including returning citizens, through powerful storytelling and advocacy. Experienced Radio Personality with Black Power 96.3 FM, delivering impactful radio content centered on justice, health, and empowerment. Recognition by local organizations for reentry advocacy and creative leadership.',
    competencies: [
      'Media & Broadcast Production',
      'Published Author, “Finding Norma Jeane”',
      'Community Outreach & Advocacy',
      'Program Development',
      'Leadership & Strategic Planning',
      'Public Speaking & Hosting',
      'Social Impact Storytelling',
      'Returning Citizens Advocacy',
      'Social Media Content Creation (TV & Radio)',
      'Edutainment',
    ],
    experience: [
      {
        title: 'Founder & Executive Director',
        company: 'Transcontinental Society Unlimited Productions, LLC',
        period: '2020 – Present',
        description: 'Established a multimedia company focused on social justice, education, and the arts.',
      },
      {
        title: 'Founder & Executive Director',
        company: 'The Doctor Project Corporation',
        period: '2025 – Present',
        description: 'Leading a non-profit organization dedicated to supporting returning citizens through media and mentorship.',
      },
    ],
  };

  const backgroundImageUrl = "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3";

  return (
    <div className="bg-secondary/30 min-h-dvh">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center text-white text-center">
            <div className="absolute inset-0">
                <Image 
                    src={backgroundImageUrl}
                    alt="A charismatic leader speaking"
                    fill
                    className="object-cover"
                    data-ai-hint="charismatic speaker"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                 <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 p-4 space-y-4">
                 <Avatar className="w-40 h-40 border-4 border-background shadow-lg mx-auto">
                    <AvatarImage src={founder.imageUrl} alt={founder.name} data-ai-hint={founder.imageHint} />
                    <AvatarFallback>{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h1 className="text-4xl md:text-6xl font-headline font-black tracking-tight">{founder.name}</h1>
                <p className="text-xl md:text-2xl font-light text-accent animated-gradient-text bg-gradient-to-r from-yellow-400 to-cyan-400">{founder.titles}</p>
            </div>
        </section>
        
        <div className="container mx-auto px-4 md:px-6 py-16 -mt-24 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column: Contact & Competencies */}
                <div className="lg:col-span-4 space-y-8">
                     <Card className="bg-card shadow-xl border-t-4 border-accent">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Contact</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-accent" />
                                <a href={`tel:${founder.phone.replace(/\s/g, '')}`} className="hover:underline">{founder.phoneDisplay}</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-accent" />
                                <a href={`mailto:${founder.email}`} className="hover:underline truncate">{founder.email}</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <LinkIcon className="w-5 h-5 text-accent" />
                                <a href={`https://${founder.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{founder.website}</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="w-5 h-5 text-accent" />
                                <span>{founder.location}</span>
                            </div>
                        </CardContent>
                    </Card>

                     <Card className="bg-card shadow-xl">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Core Competencies</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                            {founder.competencies.map(comp => (
                                <li key={comp} className="flex items-start gap-3">
                                <Award className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                <span>{comp}</span>
                                </li>
                            ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Summary & Experience */}
                <div className="lg:col-span-8 space-y-8">
                     <Card className="bg-card shadow-xl">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl">Professional Summary</CardTitle>                  
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground whitespace-pre-wrap text-base leading-relaxed">{founder.summary}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card shadow-xl">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl">Professional Experience</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                            {founder.experience.map(exp => (
                                <div key={exp.company} className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-4 h-4 bg-accent rounded-full border-4 border-background" />
                                <div className="absolute left-[7px] top-1.5 h-full w-px bg-border" />
                                <p className="text-sm font-bold text-accent">{exp.period}</p>
                                <h3 className="font-headline text-xl font-bold mt-1">{exp.title}</h3>
                                <p className="font-semibold text-muted-foreground">{exp.company}</p>
                                <p className="mt-2 text-foreground/80">{exp.description}</p>
                                </div>
                            ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="text-center mt-16">
                <GlowingButton asChild>
                    <Link href="/about">More About The Academy</Link>
                </GlowingButton>
            </div>
        </div>
    </div>
  );
}
