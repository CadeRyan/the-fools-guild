"use client";

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Instagram, Ticket, Mail } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 550);
    };

    handleResize(); // Check initial size

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 p-4 backdrop-blur-sm bg-dark-blue/70 border-b border-dark-blue-2/30 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="font-mono text-2xl no-underline text-light-teal hover:text-orange transition-colors duration-200"
        >
          The Fool&apos;s Guild
        </Link>
        <nav className={`flex ${isMobile ? "gap-2" : "gap-4"}`}>
          {!isMobile && (
            <Link
              href="/about"
              className={`no-underline text-base px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-light-teal/5 border border-transparent hover:border-light-teal/10 hover:shadow-lg ${
                pathname === "/about"
                  ? "bg-light-teal/5 border-light-teal/10 shadow-lg"
                  : ""
              }`}
            >
              About
            </Link>
          )}
          <Link
            href="https://www.instagram.com/fools.guild/"
            target="_blank"
            aria-label="Instagram"
            className="flex items-center px-2 py-2 rounded-lg transition-colors duration-200 hover:bg-light-teal/5 border border-transparent hover:border-light-teal/10 hover:shadow-lg"
          >
            <Instagram size={24} />
          </Link>
          <Link
            href="https://www.showpass.com/o/the-fools-guild/"
            target="_blank"
            aria-label="Showpass"
            className="flex items-center px-2 py-2 rounded-lg transition-colors duration-200 hover:bg-light-teal/5 border border-transparent hover:border-light-teal/10 hover:shadow-lg"
          >
            <Ticket size={24} />
          </Link>
          <Link
            href="/contact"
            aria-label="Contact"
            className="flex items-center px-2 py-2 rounded-lg transition-colors duration-200 hover:bg-light-teal/5 border border-transparent hover:border-light-teal/10 hover:shadow-lg"
          >
            <Mail size={24} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
