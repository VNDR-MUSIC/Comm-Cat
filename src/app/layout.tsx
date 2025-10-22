
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';

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
      <head>
        <Script src="https://app.aminos.ai/js/chat_plugin.js" data-bot-id="55174" data-position="right" strategy="beforeInteractive" />
      </head>
      <body className={cn("font-body antialiased overflow-x-hidden", fontHeadline.variable, fontBody.variable)}>
        <FirebaseClientProvider>
            {children}
            <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
