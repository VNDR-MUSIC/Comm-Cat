import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Catalyst Academy',
  description: 'Empowering Returning Citizens to Rise and Lead.',
};

const fontHeadline = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
  weight: ['700', '900'],
});

const fontBody = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head />
      <body className={cn("font-body antialiased", fontHeadline.variable, fontBody.variable)}>
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <Script src="https://app.aminos.ai/js/chat_plugin.js" data-bot-id="55174" strategy="afterInteractive" />
      </body>
    </html>
  );
}
