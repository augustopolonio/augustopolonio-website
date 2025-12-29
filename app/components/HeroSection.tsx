'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlipAvatar from './FlipAvatar';
import TypewriterText from './TypewriterText';
import SocialLinks from './SocialLinks';
import Link from 'next/link';
import { Code2, Gamepad2, Sparkles } from 'lucide-react';

interface Summary {
  icon: React.ReactNode;
  text: string;
  highlights: string[];
}

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const summaries: Summary[] = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "Welcome to my portfolio",
      highlights: ["Game Developer", "Software Engineer", "Problem Solver"]
    },
    {
      icon: <Gamepad2 className="w-5 h-5" />,
      text: "Crafting immersive experiences",
      highlights: ["Unity", "Godot", "C#", "Game Design", "Mobile Games"]
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      text: "Building robust applications for web and mobile",
      highlights: ["JavaScript", "TypeScript", "React", "Node.js", ".NET", "C#", "SQL Server", "Full Stack", "APIs", "CI/CD", "SOLID Principles", "Sencha ExtJS", "Cordova" ]
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "Let's create something amazing together",
      highlights: ["10+ Years Experience", "Full Stack", "Game Development"]
    }
  ];

  const currentSummary = summaries[currentTextIndex];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center animate-fadeIn">
        <FlipAvatar />
        <div className="min-h-[180px] md:min-h-[220px] flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-balance text-center">
            Hi, I'm <span className="inline-block min-w-[280px] md:min-w-[700px] text-center">
              <TypewriterText 
                texts={[
                  'Augusto Polonio',
                  'a Game Developer',
                  'a Software Developer',
                  'Augusto Polonio'
                ]}
                className="gradient-text"
                typingSpeed={80}
                deletingSpeed={40}
                pauseTime={3500}
                onTextChange={setCurrentTextIndex}
              />
            </span>
          </h1>
        </div>

        {/* Dynamic Summary Section */}
        <div className="mb-12 min-h-[120px] flex flex-col items-center justify-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="w-full"
            >
              <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-muted mb-6">
                <span className="text-accent">{currentSummary.icon}</span>
                <p className="text-balance">{currentSummary.text}</p>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
                {currentSummary.highlights.map((highlight, index) => (
                  <motion.span
                    key={`${currentTextIndex}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.3 + index * 0.1,
                      ease: [0.25, 0.4, 0.25, 1]
                    }}
                    className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm md:text-base font-medium border border-accent/20 hover:bg-accent/20 transition-colors"
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="#projects"
            className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="#about"
            className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-lg font-medium transition-colors"
          >
            About Me
          </Link>
        </div>
        <SocialLinks />
      </div>
    </section>
  );
}
