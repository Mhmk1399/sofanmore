import type { Metadata } from "next";

import { Manrope, Playfair_Display } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import FloatingContactMenu from "@/components/ui/FloatingContactMenu";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Sofa N More",
    template: "%s | Sofa N More",
  },

  description:
    "Bespoke furniture, commercial interiors and furniture restoration handcrafted in London.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <FloatingContactMenu
          phone="+44 7400 577844"
          whatsapp="+44 7400 577844"
          email="YOUR_EMAIL_HERE"
          whatsappMessage="Hello Sofa N More, I'd like to discuss a bespoke furniture project."
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
