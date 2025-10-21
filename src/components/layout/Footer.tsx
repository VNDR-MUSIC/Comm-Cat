
import Link from "next/link";
import { University, Linkedin, Youtube, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.163 519.284ZM569.165 687.828L521.697 619.934L112.633 43.186H312.313L603.813 503.324L651.281 571.218L1093.01 1182.02H893.328L569.165 687.828Z" fill="currentColor"/>
    </svg>
);

const Footer = () => {
    const blaqueTechLogo = PlaceHolderImages.find(img => img.id === 'logo-blaque-tech');
    const imgLogo = PlaceHolderImages.find(img => img.id === 'logo-img');

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="relative py-12">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-400 bg-400% animate-gradient-flow" style={{backgroundSize: "400%"}} />
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-2">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <University className="h-8 w-8 text-accent" />
                    <span className="font-headline text-xl font-bold">
                        Catalyst Academy
                    </span>
                </Link>
                <p className="text-sm text-secondary-foreground/70 max-w-md">
                    Empowering individuals to rise and lead. Our program is offered at no-cost to returning citizens, funded by community sponsors who believe in second chances.
                </p>
                 <div className="flex items-center gap-4 text-sm pt-2">
                    <p className="text-secondary-foreground/70">Path to 501(c)(3) Status</p>
                </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-secondary-foreground/70 hover:text-accent">About Us</Link></li>
                <li><Link href="/curriculum" className="text-sm text-secondary-foreground/70 hover:text-accent">Curriculum</Link></li>
                <li><Link href="/sponsorship" className="text-sm text-secondary-foreground/70 hover:text-accent">Sponsorship</Link></li>
                <li><Link href="/community" className="text-sm text-secondary-foreground/70 hover:text-accent">Community</Link></li>
                 <li><Link href="/returning-citizens" className="text-sm text-secondary-foreground/70 hover:text-accent">For Returning Citizens</Link></li>
                 <li><Link href="/dashboard/support" className="text-sm text-secondary-foreground/70 hover:text-accent">Contact</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
                <h4 className="font-bold text-lg">Connect</h4>
                 <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-accent" />
                        <a href="tel:+15615627222" className="text-sm text-secondary-foreground/70 hover:text-accent">+1 (561) 562-7222</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-accent" />
                        <a href="mailto:support@catalyst.edu" className="text-sm text-secondary-foreground/70 hover:text-accent">support@catalyst.edu</a>
                    </div>
                </div>
                <div className="flex space-x-4 pt-2">
                    <Link href="#" className="text-secondary-foreground/70 hover:text-accent"><Linkedin className="w-6 h-6" /></Link>
                    <Link href="#" className="text-secondary-foreground/70 hover:text-accent"><XIcon className="w-6 h-6" /></Link>
                    <Link href="#" className="text-secondary-foreground/70 hover:text-accent"><Youtube className="w-6 h-6" /></Link>
                </div>
            </div>

          </div>

          <div className="mt-8 pt-8 border-t border-secondary-foreground/10 text-center text-sm text-secondary-foreground/50">
            <div className="flex justify-center items-center gap-6 mb-6">
                <div className="text-right">
                    <p className="font-bold">Powered by:</p>
                </div>
                <div className="flex items-center gap-4">
                    {blaqueTechLogo && (
                        <Link href="https://blaque.tech" target="_blank" rel="noopener noreferrer">
                            <Image src={blaqueTechLogo.imageUrl} alt={blaqueTechLogo.description} width={100} height={40} className="object-contain invert" data-ai-hint={blaqueTechLogo.imageHint} />
                        </Link>
                    )}
                     {imgLogo && (
                         <Link href="https://indieMedia.llc" target="_blank" rel="noopener noreferrer">
                            <Image src={imgLogo.imageUrl} alt={imgLogo.description} width={100} height={40} className="object-contain invert" data-ai-hint={imgLogo.imageHint} />
                        </Link>
                     )}
                </div>
            </div>
            <p className="text-xs text-secondary-foreground/40 mb-4">Blaque Tech is a subsidiary of IMG Independent Media Group</p>
            <p>&copy; {new Date().getFullYear()} Catalyst Academy by The Doctor Project Corporation. All Rights Reserved.</p>
            <div className="space-x-4 mt-2">
                <Link href="#" className="hover:text-accent">Privacy Policy</Link>
                <span>|</span>
                <Link href="#" className="hover:text-accent">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
