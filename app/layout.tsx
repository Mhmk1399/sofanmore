import type { Metadata } from "next";

import { Manrope, Playfair_Display } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import SmoothScrollProvider from "@/components/global/SmoothScrollProvider";
import FloatingContactMenu from "@/components/ui/FloatingContactMenu";
import MobileFloatingLogo from "@/components/static/MobileFloatingLogo";

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
    "Bespoke sofa, commercial interiors and sofa restoration handcrafted in London.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <SmoothScrollProvider />
        <Navbar />
        <MobileFloatingLogo />
        <Breadcrumbs />
        <FloatingContactMenu
          phone="+44 7400 577844"
          whatsapp="+44 7400 577844"
          email="YOUR_EMAIL_HERE"
          whatsappMessage="Hello Sofa N More, I'd like to discuss a bespoke sofa project."
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
