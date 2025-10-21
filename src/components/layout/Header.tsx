
'use client';

import Link from 'next/link';
import { ChevronDown, Menu, University, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import GlowingButton from '@/components/shared/GlowingButton';
import { cn } from '@/lib/utils';
import React from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  {
    label: 'The Program',
    items: [
      { href: '/about', label: 'About Us' },
      { href: '/founder', label: 'Founder' },
      { href: '/journey', label: 'The Journey' },
      { href: '/curriculum', label: 'Curriculum' },
      { href: '/community', label: 'Community' },
    ],
  },
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
        
        <nav className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
                item.href ? (
                     <Link key={item.label} href={item.href} className="text-sm font-medium hover:text-accent transition-colors px-3 py-2">
                        {item.label}
                    </Link>
                ) : (
                    <DropdownMenu key={item.label}>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors px-3 py-2 focus:outline-none">
                            {item.label}
                            <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {item.items?.map(subItem => (
                                <DropdownMenuItem key={subItem.href} asChild>
                                    <Link href={subItem.href}>{subItem.label}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            ))}
        </nav>

        <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/login">Login</Link>
            </Button>
            <GlowingButton asChild>
                <Link href="/enroll">Enroll Now</Link>
            </GlowingButton>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="full" className="p-0">
                 <SheetHeader className='p-6 border-b'>
                    <SheetTitle className="flex items-center gap-2">
                         <University className="h-8 w-8 text-accent" />
                        <span className="font-headline text-xl font-bold text-foreground">
                            Catalyst Academy
                        </span>
                    </SheetTitle>
                 </SheetHeader>
                 <div className="flex flex-col h-full p-6">
                    <nav className="flex flex-col gap-4 text-xl font-medium">
                        {navItems.map((item) => (
                           item.href ? (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="transition-colors hover:text-accent"
                                    prefetch={false}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                           ) : (
                               <Accordion type="single" collapsible key={item.label}>
                                 <AccordionItem value={item.label} className="border-b-0">
                                   <AccordionTrigger className="hover:no-underline text-xl font-medium py-2">
                                     {item.label}
                                   </AccordionTrigger>
                                   <AccordionContent className="pl-4">
                                     <div className="flex flex-col gap-4 mt-2">
                                       {item.items?.map((subItem) => (
                                           <Link
                                             key={subItem.href}
                                             href={subItem.href}
                                             className="text-muted-foreground transition-colors hover:text-accent"
                                             prefetch={false}
                                             onClick={() => setIsMenuOpen(false)}
                                           >
                                             {subItem.label}
                                           </Link>
                                       ))}
                                     </div>
                                   </AccordionContent>
                                 </AccordionItem>
                               </Accordion>
                           )
                        ))}
                    </nav>

                    <div className="mt-auto flex flex-col gap-4 w-full">
                        <Link href="/login" className='w-full' onClick={() => setIsMenuOpen(false)}>
                            <Button variant="outline" size="lg" className="w-full">
                                Login
                            </Button>
                        </Link>
                        <Link href="/enroll" className='w-full' onClick={() => setIsMenuOpen(false)}>
                            <GlowingButton asChild size="lg" className="w-full">
                                <span className='w-full'>Enroll Now</span>
                            </GlowingButton>
                        </Link>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
