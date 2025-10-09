// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Universal Translator",
  description: "Translate instantly with context, tone, and style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-bg text-white min-h-screen antialiased relative`}
      >
        {/* Offset for navbar height */}
        <div className="pt-20">{children}</div>

        <footer className="text-center text-sm text-slate-500 py-6 border-t border-white/10 mt-10 backdrop-blur-md bg-bg/30">
          © {new Date().getFullYear()} Universal Translator — All rights reserved.
        </footer>
      </body>
    </html>
  );
}
