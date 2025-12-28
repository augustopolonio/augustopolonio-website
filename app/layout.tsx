import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Augusto Polonio | Game Developer",
  description: "Senior Software Developer transitioning into game development. 13+ years of experience in web/mobile development, now creating interactive experiences with Unity and Godot.",
  openGraph: {
    title: "Augusto Polonio | Game Developer",
    description: "Senior Software Developer transitioning into game development. 13+ years of experience in web/mobile development, now creating interactive experiences with Unity and Godot.",
    images: ['/augusto-polonio-avatar.png'],
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
        className={`${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
