import Navigation from './components/Navigation';
import SocialLinks from './components/SocialLinks';
import TypewriterText from './components/TypewriterText';
import FeaturedProjects from './components/FeaturedProjects';
import FlipAvatar from './components/FlipAvatar';
import ScrollReveal from './components/ScrollReveal';
import StaggerChildren, { StaggerItem } from './components/StaggerChildren';
import Link from 'next/link';
import Image from 'next/image';
import { getWebMobileYears, getGameDevYears } from './utils/calculateExperience';
import { Laptop, Gamepad2, FileDown } from 'lucide-react';

export default function Home() {
  const webMobileYears = getWebMobileYears();
  const gameDevYears = getGameDevYears();

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center animate-fadeIn">
            <FlipAvatar />
            <div className="min-h-[180px] md:min-h-[220px] flex items-center justify-center">
              <h1 className="text-5xl md:text-7xl font-bold text-balance text-center">
                Hi, I'm <span className="inline-block min-w-[280px] md:min-w-[700px] text-center"><TypewriterText 
                  texts={[
                    'Augusto Polonio',
                    'a Game Developer',
                    'a Software Developer',
                    'Augusto Polonio'
                  ]}
                  className="gradient-text"
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseTime={2500}
                /></span>
              </h1>
            </div>
            {/* <p className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto text-balance">
              Senior Software Developer & Game Developer
            </p> */}
            {/* <p className="text-lg text-muted/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              I'm a Senior Software Developer with {webMobileYears}+ years of experience building web and mobile applications using JavaScript and .NET. 
              I'm also a Game Developer with {gameDevYears}+ years creating interactive experiences with Unity and Godot, 
              bringing technical expertise and creativity to every project.
            </p> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 mt-8">
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

        {/* Featured Projects Section */}
        <FeaturedProjects />

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="blur">
              <h2 className="text-4xl font-bold mb-16 text-center">About Me</h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
              {/* Image Column */}
              <ScrollReveal variant="slideLeft" delay={0.2}>
                <div className="flex justify-center md:justify-end">
                  <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-lg overflow-hidden border-4 border-accent/50 shadow-2xl">
                    <Image
                      src="/AugustoPolonio.jpg"
                      alt="Augusto Polonio"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </ScrollReveal>
              
              {/* Text Column */}
              <StaggerChildren staggerDelay={0.15}>
                <div className="space-y-6 text-lg text-muted/90 leading-relaxed">
                  <StaggerItem>
                    <p>
                      I'm a Senior Web and Mobile Developer with over {webMobileYears} years of experience building scalable applications using JavaScript and .NET (C#). 
                      Today, I'm transitioning my career into Game Development — a field where I can merge my technical expertise with my lifelong passion for creating interactive experiences.
                    </p>
                  </StaggerItem>
                  <StaggerItem>
                    <p>
                      I've been developing games as a hobby since 2015, using Unity and more recently Godot, while continuously expanding my portfolio and skills. 
                      Through these projects, I've explored gameplay mechanics, performance optimization, and system design, experimenting with new ideas and sharing DevLogs to document my journey.
                    </p>
                  </StaggerItem>
                  <StaggerItem>
                    <p>
                      My background in software engineering has equipped me with strong skills in performance tuning, complex migrations, and delivering robust solutions — strengths I now apply to crafting engaging game mechanics and immersive worlds.
                    </p>
                  </StaggerItem>
                  <StaggerItem>
                    <p>
                  With a degree in Systems Analysis and Development and years of independent game creation, I'm eager to contribute my blend of technical depth and creative vision to a professional role in Game Development.
                    </p>
                  </StaggerItem>
                </div>
              </StaggerChildren>
            </div>
            
            <ScrollReveal variant="fadeUp" delay={0.4}>
              <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto">
                <div className="p-6 bg-background rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <div className="flex justify-center mb-4">
                    <Laptop className="w-12 h-12 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{webMobileYears}+ Years</h3>
                  <p className="text-muted">Web & Mobile Development</p>
                </div>
                <div className="p-6 bg-background rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <div className="flex justify-center mb-4">
                    <Gamepad2 className="w-12 h-12 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{gameDevYears}+ Years</h3>
                  <p className="text-muted">Exploring Game Development</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal variant="scale" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <a
                href="/Augusto Polonio - Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors"
              >
                <FileDown className="w-5 h-5" />
                Download Resume
              </a>
              <Link
                href="#contact"
                className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-lg font-medium transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fadeUp">
              <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
              <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
                I'm actively seeking opportunities in game development. 
                Let's discuss how my technical expertise can contribute to your team.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="scale" delay={0.2}>
              <SocialLinks />
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.4}>
              <div className="mt-8">
                <a
                  href="https://www.linkedin.com/in/augustopolonio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-6xl mx-auto text-center text-muted text-sm">
            <p>© {new Date().getFullYear()} Augusto Polonio. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
