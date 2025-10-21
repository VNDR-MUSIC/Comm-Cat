'use client';

import Link from 'next/link';
import { Menu, University, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import GlowingButton from '@/components/shared/GlowingButton';
import { cn } from '@/lib/utils';
import React from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/founder', label: 'Founder' },
  { href: '/journey', label: 'The Journey' },
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/community', label: 'Community' },
  { href: '/sponsorship', label: 'Sponsorship' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <University className="h-8 w-8 text-accent" />
          <span className="font-headline text-xl font-bold text-foreground">
            Catalyst Academy
          </span>
        </Link>
        
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="full" className="p-0">
             <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="absolute top-6 right-6">
                        <X className="h-8 w-8" />
                        <span className="sr-only">Close menu</span>
                    </Button>
                </SheetClose>

                <nav className="grid gap-6 text-2xl font-medium">
                    {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                        <Link
                            href={link.href}
                            className="transition-colors hover:text-accent"
                            prefetch={false}
                        >
                            {link.label}
                        </Link>
                    </SheetClose>
                    ))}
                </nav>

                <div className="mt-12 flex flex-col gap-4 w-full max-w-xs">
                    <SheetClose asChild>
                        <Button variant="outline" asChild size="lg">
                            <Link href="/login">Login</Link>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <GlowingButton asChild>
                            <Link href="/enroll">Enroll Now</Link>
                        </GlowingButton>
                    </SheetClose>
                </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
