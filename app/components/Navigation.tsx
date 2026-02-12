'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, FileDown } from 'lucide-react';
import { trackNavigation, trackResumeDownload } from '../utils/analytics';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideOnMobile, setHideOnMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if device is mobile (including tablets in landscape)
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024; // Include tablets
      setIsMobile(isTouchDevice && isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Observe game section visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check mobile status at the time of intersection
          const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
          const isSmallScreen = window.innerWidth < 1024;
          const shouldHide = isTouchDevice && isSmallScreen;
          
          if (entry.isIntersecting && shouldHide) {
            setHideOnMobile(true);
          } else {
            setHideOnMobile(false);
          }
        });
      },
      { threshold: 0.3 } // Hide when 30% of game section is visible
    );

    // Find the game section (iframe's parent section)
    const gameSection = document.querySelector('iframe')?.closest('section');
    if (gameSection) {
      observer.observe(gameSection);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (gameSection) {
        observer.unobserve(gameSection);
      }
    };
  }, []);

  const handleNavClick = (destination: string) => {
    trackNavigation(destination);
    setIsMenuOpen(false);
  };

  const handleResumeClick = () => {
    trackResumeDownload();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-transform duration-300 ${hideOnMobile ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="hover:opacity-80 transition-opacity"
            onClick={() => trackNavigation('Home')}
          >
            <div className="flex flex-col">
              <span className="text-xl font-bold">Augusto Polonio</span>
              <span className="text-xs text-muted">Senior Software & Game Developer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/#projects" 
              className="text-sm hover:text-accent transition-colors"
              onClick={() => trackNavigation('Projects')}
            >
              Projects
            </Link>
            <Link 
              href="/work-experience" 
              className="text-sm hover:text-accent transition-colors"
              onClick={() => trackNavigation('Experience')}
            >
              Experience
            </Link>
            <Link 
              href="/#about" 
              className="text-sm hover:text-accent transition-colors"
              onClick={() => trackNavigation('About')}
            >
              About
            </Link>
            <Link 
              href="/#contact" 
              className="text-sm hover:text-accent transition-colors"
              onClick={() => trackNavigation('Contact')}
            >
              Contact
            </Link>
            <a
              href="/Augusto_Polonio_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark transition-colors"
              onClick={handleResumeClick}
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
              onClick={() => handleNavClick('Projects')}
            >
              Projects
            </Link>
            <Link
              href="/work-experience"
              className="text-sm hover:text-accent transition-colors"
              onClick={() => handleNavClick('Experience')}
            >
              Experience
            </Link>
            <Link
              href="/#about"
              className="text-sm hover:text-accent transition-colors"
              onClick={() => handleNavClick('About')}
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-sm hover:text-accent transition-colors"
              onClick={() => handleNavClick('Contact')}
            >
              Contact
            </Link>
            <a
              href="/Augusto_Polonio_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark transition-colors"
              onClick={handleResumeClick}
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
