"use client";

import Link from "next/link";
import Image from "next/image"; // Import Image component
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Instagram, Menu, X, Mail, Ticket } from "lucide-react";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
        isActive
          ? "bg-teal/70 text-white" // Active: Teal background, white text
          : "text-light-teal hover:bg-light-teal/20" // Default: Light teal text, light teal bg on hover
      }`}
    >
      {children}
    </Link>
  );
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Header - Updated positioning and width */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${
          isScrolled ? 'shadow-md shadow-light-teal/20' : ''
        }`}
      >
        {/* Container to match page content width */}
        <div className="max-w-7xl mx-auto px-4">
          {/* Inner header content with styling */}
          <div className={`flex items-center justify-between flex-nowrap gap-4 bg-dark-blue/70 backdrop-blur-md border border-light-teal/30 rounded-b-lg px-6 py-2 transition-all duration-300 ${isScrolled ? 'mt-0' : 'mt-4'}`}>
            {/* Link includes logo and text */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/Fool_Logo.png"
                alt="The Fool's Guild Logo"
                width={32} // Adjust size as needed
                height={32}
                className="transition-transform duration-200 group-hover:scale-110"
              />
              <span className="font-klein uppercase text-xl font-bold text-light-teal group-hover:text-orange transition-colors duration-200 no-underline">
                The Fool's Guild
              </span>
            </Link>
            <nav className="flex items-center gap-2">
              <NavLink href="/shows">Shows</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <Link
                href="https://www.instagram.com/fools.guild/" // Updated Instagram URL
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                // Using light-teal text, light-teal hover bg
                className="flex items-center justify-center p-2 rounded-full text-light-teal hover:bg-light-teal/20 transition-colors duration-200"
            >
              <Instagram size={20} />
            </Link>
             {/* Removed Showpass Ticket Link */}
          </nav>
        </div> {/* Closes inner header content div */}
        </div> {/* Closes max-w-7xl container div */}
      </header>

      {/* Mobile Header */}
      {/* Using dark-blue background, light-teal border */}
      <header className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between p-4 bg-dark-blue/90 backdrop-blur-md border-b border-light-teal/30">
        <Link
          href="/"
          // Using Klein Bold, uppercase, light-teal text, orange hover
          className="font-klein uppercase text-lg font-bold text-light-teal hover:text-orange transition-colors duration-200 no-underline"
        >
          The Fool's Guild
        </Link>
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          className="p-2 text-light-teal" // Icon color light-teal
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Panel */}
      <div
        // Using dark-blue background
        className={`fixed top-0 left-0 h-full w-full bg-dark-blue z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile menu panel bg dark-blue, light-teal text, orange hover */}
        <nav className="flex flex-col items-center justify-center h-full gap-6 pt-16"> {/* Added pt-16 to avoid overlap with header */}
          <Link href="/shows" className="text-2xl font-medium text-light-teal hover:text-orange" onClick={toggleMobileMenu}>Shows</Link>
          <Link href="/about" className="text-2xl font-medium text-light-teal hover:text-orange" onClick={toggleMobileMenu}>About</Link>
          <Link href="/contact" className="text-2xl font-medium text-light-teal hover:text-orange" onClick={toggleMobileMenu}>Contact</Link>
          <Link
            href="https://www.instagram.com/fools.guild/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-2 text-light-teal hover:text-orange mt-4"
            onClick={toggleMobileMenu}
          >
            <Instagram size={24} />
            <span>Instagram</span>
          </Link>
           {/* Removed Showpass Ticket Link */}
        </nav>
      </div>

      {/* Spacer removed */}
    </>
  );
}
