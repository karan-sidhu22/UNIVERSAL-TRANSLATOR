// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Universal Translator",
  description:
    "Translate instantly with context, tone, and style using Universal Translator.",
  keywords:
    "translator, ai translation, multilingual, universal translator, realtime translate",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Universal Translator",
    description: "Translate smarter — fast, contextual, and accurate.",
    url: "https://yourdomain.com",
    siteName: "Universal Translator",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} relative min-h-screen antialiased text-white selection:bg-accent2/30 selection:text-accent`}
      >
        {/* 🌐 Background layer handled by globals.css */}
        {children}

        {/* 💡 Optional footer */}
        <footer className="text-center text-sm text-slate-500 py-6 border-t border-white/10 mt-10 backdrop-blur-md bg-bg/30">
          © {new Date().getFullYear()} Universal Translator — All rights reserved.
        </footer>
      </body>
    </html>
  );
}
