import type { Metadata } from "next";

import "./globals.css";
import { Header, DotAnimation } from "./components";

export const metadata: Metadata = {
  title: "The Fool's Guild",
  description: "A improv troupe based in Vancouver, BC",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark-theme">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Updated favicon link */}
        <link rel="icon" href="/Fool_Logo.png" />
      </head>
      <body>
        <DotAnimation />
        <div className="dots" />
        <Header />
        {children}
        <div className="bottom-gradient" />
      </body>
    </html>
  );
}
