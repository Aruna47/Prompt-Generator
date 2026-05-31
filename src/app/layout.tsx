import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PromptForge AI - Elite Prompt Engineering Platform",
  description: "Transform weak prompts into elite, AI-optimized prompts. Professional prompt engineering for ChatGPT, Claude, Gemini, Midjourney, and more.",
  keywords: ["prompt engineering", "AI prompts", "ChatGPT", "Claude", "Gemini", "Midjourney", "prompt generator", "AI tools"],
  authors: [{ name: "PromptForge AI" }],
  openGraph: {
    title: "PromptForge AI - Elite Prompt Engineering Platform",
    description: "Transform weak prompts into elite, AI-optimized prompts.",
    type: "website",
    url: "https://promptforge.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptForge AI - Elite Prompt Engineering Platform",
    description: "Transform weak prompts into elite, AI-optimized prompts.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans min-h-screen bg-dark-950`}>
        <Providers>
          <div className="relative min-h-screen">
            <div className="fixed inset-0 bg-hero-gradient pointer-events-none" />
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
