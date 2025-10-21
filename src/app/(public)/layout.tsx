
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
    </div>
  );
}
