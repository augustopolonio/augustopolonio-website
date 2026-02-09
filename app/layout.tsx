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
const description = `Game Developer with more than a decade of experience creating indie games with Unity and Godot. Also a Senior Software Developer with ${webMobileYears}+ years in web/mobile development.`;

export const metadata: Metadata = {
  title: "Augusto Polonio | Game Developer & Sr. Software Engineer",
  description,
  openGraph: {
    title: "Augusto Polonio | Game Developer & Sr. Software Engineer",
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
