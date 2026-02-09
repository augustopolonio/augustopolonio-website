import type { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { getGameDevYears, getWebMobileYears } from "./utils/calculateExperience";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: "400",
});

const webMobileYears = getWebMobileYears();
const gameDevYears = getGameDevYears();
const description = `Senior Software Developer transitioning into game development. ${webMobileYears}+ years of experience in web/mobile development, now creating interactive experiences with Unity and Godot. (${gameDevYears}+ years in game dev)`;

export const metadata: Metadata = {
  title: "Augusto Polonio | Game Developer",
  description,
  openGraph: {
    title: "Augusto Polonio | Game Developer",
    description,
    images: ['/augusto-polonio-avatar.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${pressStart2P.variable} antialiased`}
      >
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
