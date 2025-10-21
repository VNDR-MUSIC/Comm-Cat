import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Building, Mail, MapPin, Mic, Phone, Link as LinkIcon, Award, Users, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FounderPage() {
  const founder = {
    name: 'Dr. Warren O. Crabb',
    titles: 'Founder | Executive Producer | Media Personality',
    location: 'Pinellas Park, FL',
    phone: '954-288-8982',
    email: 'doctorcrabb@tcsup.c',
    website: 'thedrproject.com',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtYWxlJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzYxMTEzMzMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
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

  return (
    <div className="bg-secondary/30 min-h-dvh">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <Card className="max-w-4xl mx-auto shadow-2xl overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-400">
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <CardHeader className="relative -mt-20 flex flex-col md:flex-row items-center gap-8 p-8">
            <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
              <AvatarImage src={founder.imageUrl} alt={founder.name} data-ai-hint="male portrait" />
              <AvatarFallback>{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-headline font-bold text-foreground">{founder.name}</h1>
              <p className="text-lg font-medium text-accent">{founder.titles}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {founder.location}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Contact & Competencies */}
              <div className="md:col-span-1 space-y-8">
                <Card className="bg-secondary/30">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-accent" />
                      <a href={`tel:${founder.phone}`} className="hover:underline">{founder.phone}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-accent" />
                      <a href={`mailto:${founder.email}`} className="hover:underline truncate">{founder.email}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <LinkIcon className="w-4 h-4 text-accent" />
                      <a href={`https://${founder.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{founder.website}</a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/30">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">Core Competencies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {founder.competencies.map(comp => (
                        <li key={comp} className="flex items-start gap-2">
                          <Award className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Summary & Experience */}
              <div className="md:col-span-2 space-y-8">
                <Card className="bg-secondary/30">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">Professional Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{founder.summary}</p>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/30">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">Professional Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {founder.experience.map(exp => (
                        <div key={exp.company} className="relative pl-6">
                           <div className="absolute left-0 top-1.5 w-3 h-3 bg-accent rounded-full border-2 border-background" />
                           <div className="absolute left-[5px] top-4 h-full w-px bg-border" />
                          <p className="text-sm font-bold text-accent">{exp.period}</p>
                          <h3 className="font-headline text-lg font-bold">{exp.title}</h3>
                          <p className="font-semibold text-muted-foreground">{exp.company}</p>
                          <p className="mt-1 text-sm text-foreground/80">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}