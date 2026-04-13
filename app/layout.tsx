import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { CartProvider } from "@/lib/context/cart-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phase One Labz | Research-Grade Peptides",
  description:
    "USA-manufactured research-grade peptides. Third-party tested with published Certificates of Analysis. For laboratory, academic, and institutional research use only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
