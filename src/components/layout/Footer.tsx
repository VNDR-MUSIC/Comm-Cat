import Link from "next/link";
import { University, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.163 519.284ZM569.165 687.828L521.697 619.934L112.633 43.186H312.313L603.813 503.324L651.281 571.218L1093.01 1182.02H893.328L569.165 687.828Z" fill="currentColor"/>
    </svg>
);

const Footer = () => {
    const partnerLogos = PlaceHolderImages.filter(img => img.id.startsWith("logo-"));

  return (
    <footer className="bg-primary text-primary-foreground">
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
                <p className="text-sm text-primary-foreground/70 max-w-md">
                    Empowering Returning Citizens to Rise and Lead. A 52-week, no-cost program funded by community sponsors who believe in second chances.
                </p>
                 <div className="flex items-center gap-4 text-sm pt-2">
                    <div className="flex items-center gap-2">
                        <div className="relative p-1 rounded-full bg-gradient-to-r from-yellow-400 to-blue-500">
                            <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                        </div>
                        <span className="font-semibold">Firebase Verified</span>
                    </div>
                     <p className="text-primary-foreground/70">Path to 501(c)(3) Status</p>
                </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-primary-foreground/70 hover:text-accent">About Us</Link></li>
                <li><Link href="/curriculum" className="text-sm text-primary-foreground/70 hover:text-accent">Curriculum</Link></li>
                <li><Link href="/sponsorship" className="text-sm text-primary-foreground/70 hover:text-accent">Sponsorship</Link></li>
                <li><Link href="/community" className="text-sm text-primary-foreground/70 hover:text-accent">Community</Link></li>
                <li><Link href="#" className="text-sm text-primary-foreground/70 hover:text-accent">Press</Link></li>
                <li><Link href="/support" className="text-sm text-primary-foreground/70 hover:text-accent">Contact</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
                <h4 className="font-bold text-lg">Connect</h4>
                <div className="flex space-x-4">
                    <Link href="#" className="text-primary-foreground/70 hover:text-accent"><Linkedin className="w-6 h-6" /></Link>
                    <Link href="#" className="text-primary-foreground/70 hover:text-accent"><XIcon className="w-6 h-6" /></Link>
                    <Link href="#" className="text-primary-foreground/70 hover:text-accent"><Youtube className="w-6 h-6" /></Link>
                </div>
                <div className="pt-4">
                     <h4 className="font-bold text-lg mb-2">Accreditation & Partners</h4>
                     <div className="grid grid-cols-3 gap-4">
                        {partnerLogos.slice(0, 6).map(logo => (
                            <div key={logo.id} className="flex justify-center items-center bg-white/10 rounded-md p-2">
                                 <Image
                                    src={logo.imageUrl}
                                    alt={logo.description}
                                    width={150}
                                    height={60}
                                    data-ai-hint={logo.imageHint}
                                    className="object-contain w-full h-8 invert brightness-0 "
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

          </div>

          <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
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
