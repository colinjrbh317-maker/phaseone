import Link from "next/link";
import { FlaskConical } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="px-6 py-5 border-b border-border">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 text-primary">
            <FlaskConical size={16} />
          </span>
          <span className="font-heading font-black text-xl tracking-tighter uppercase">
            Phase One <span className="text-primary font-sans font-light tracking-widest text-lg">Labz</span>
          </span>
        </Link>
      </header>
      <main className="flex-1 flex items-start justify-center px-6 py-12 sm:py-16">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
