'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, FileDown } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
            Augusto Polonio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#projects" className="text-sm hover:text-accent transition-colors">
              Projects
            </Link>
            <Link href="/work-experience" className="text-sm hover:text-accent transition-colors">
              Experience
            </Link>
            <Link href="/#about" className="text-sm hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/#contact" className="text-sm hover:text-accent transition-colors">
              Contact
            </Link>
            <a
              href="/Augusto Polonio - Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 flex flex-col gap-4">
            <Link
              href="/#projects"
              className="text-sm hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/work-experience"
              className="text-sm hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="/#about"
              className="text-sm hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-sm hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href="/Augusto Polonio - Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileDown className="w-4 h-4" />
              Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
