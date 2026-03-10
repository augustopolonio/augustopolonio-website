'use client';

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import InteractiveTerminal from './components/InteractiveTerminal';
import GameIframeWithStartPanel from './components/GameIframeWithStartPanel';
import FeaturedProjects from './components/FeaturedProjects';
import ScrollReveal from './components/ScrollReveal';
import StaggerChildren, { StaggerItem } from './components/StaggerChildren';
import SocialLinks from './components/SocialLinks';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getWebMobileYears, getGameDevYears } from './utils/calculateExperience';
import { Laptop, Gamepad2, FileDown } from 'lucide-react';
import { trackResumeDownload, trackContact, trackSocialClick } from './utils/analytics';

const labVideos = [
  { title: 'Global Illumination', engine: 'godot' as const, videoId: 'zVScwBOSLZg' },
  { title: 'Car Controller (Multiple Cameras)', engine: 'godot' as const, videoId: '2tSbSua5xsc' },
  { title: 'FPS Game', engine: 'godot' as const, videoId: 'wa8b-pEOwQ0' },
  { title: 'Tiny Knight (Brackeys Tutorial)', engine: 'godot' as const, videoId: 'X1mwOwS9FIY' },
  { title: 'Football Soccer Game', engine: 'unity' as const, videoId: '0bgYC3ry3Zs' },
  { title: 'Third-Person Shooter Game', engine: 'unity' as const, videoId: '5SrqXDmgO4k' },
  { title: 'Action Platform Game', engine: 'unity' as const, videoId: 'H-3wmRPnLu8' },
  { title: 'Open World Game', engine: 'unity' as const, videoId: '9FmgfJ92fWA' },
];

const labCarouselItems = [...labVideos, ...labVideos];

export default function Home() {
  const webMobileYears = getWebMobileYears();
  const gameDevYears = getGameDevYears();

  const [activeLabVideoId, setActiveLabVideoId] = useState<string | null>(null);
  const activeLabVideo = activeLabVideoId
    ? labVideos.find((v) => v.videoId === activeLabVideoId) || null
    : null;

  const getYouTubeEmbedUrl = (videoId: string, autoplay: boolean) =>
    `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`;

  useEffect(() => {
    if (!activeLabVideoId) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLabVideoId(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeLabVideoId]);

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Portfolio Game Section */}
        <GameIframeWithStartPanel />

        {/* Interactive Terminal Section */}
        <InteractiveTerminal />        

        {/* Featured Projects Section */}
        <FeaturedProjects />

        {/* Laboratory Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fadeUp">
              <div className="flex items-end justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-3xl font-bold">Laboratory</h2>
                  <p className="text-muted mt-2">
                    A quick strip of experimental prototypes and engine tests.
                  </p>
                </div>
                <Link
                  href="/unreleased-projects"
                  className="text-accent hover:text-accent-dark font-medium transition-colors whitespace-nowrap"
                >
                  View all →
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.15}>
              <div className="relative -mx-6">
                <div className={`px-6 overflow-x-auto no-scrollbar lab-marquee ${activeLabVideoId ? 'pointer-events-none' : ''}`}>
                  <div className="flex gap-4 lab-marquee-track">
                    {labCarouselItems.map((video, index) => (
                      <button
                        key={`${video.videoId}-${index}`}
                        type="button"
                        className="shrink-0 w-96 sm:w-120 group text-left"
                        onClick={() => setActiveLabVideoId(video.videoId)}
                      >
                        <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800">
                          <Image
                            src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(min-width: 640px) 480px, 384px"
                          />

                          <div className="absolute top-3 left-3 z-10 px-2 py-1.5 bg-black/60 backdrop-blur-sm rounded-md flex items-center gap-1.5 pointer-events-none">
                            <Image
                              src={video.engine === 'unity' ? '/unity_logo.png' : '/godot_logo.png'}
                              alt={video.engine === 'unity' ? 'Unity' : 'Godot'}
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                            <span className="text-white text-xs font-medium">
                              {video.engine === 'unity' ? 'Unity' : 'Godot'}
                            </span>
                          </div>

                          <div className="absolute inset-x-0 bottom-0 p-4 bg-black/55 backdrop-blur-sm">
                            <p className="text-white text-sm font-semibold leading-snug line-clamp-2">
                              {video.title}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Edge fade (boundary shadow) */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-background to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Laboratory Modal */}
        {activeLabVideo && (
          <div
            className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center px-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeLabVideo.title} video`}
            onClick={() => setActiveLabVideoId(null)}
          >
            <div
              className="w-full max-w-6xl bg-background rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 min-w-0">
                  <Image
                    src={activeLabVideo.engine === 'unity' ? '/unity_logo.png' : '/godot_logo.png'}
                    alt={activeLabVideo.engine === 'unity' ? 'Unity' : 'Godot'}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <p className="font-semibold truncate">{activeLabVideo.title}</p>
                </div>
                <button
                  type="button"
                  className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors"
                  onClick={() => setActiveLabVideoId(null)}
                >
                  Close
                </button>
              </div>

              <div className="relative w-full aspect-video bg-zinc-200 dark:bg-zinc-800">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={getYouTubeEmbedUrl(activeLabVideo.videoId, true)}
                  title={`${activeLabVideo.title} - YouTube video`}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

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
                      Working remotely since 2016, I have honed collaboration skills across distributed teams and thrive in creative, agile environments.
                    </p>
                  </StaggerItem>
                  <StaggerItem>
                    <p>
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
                href="/Augusto_Polonio_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors"
                onClick={() => trackResumeDownload()}
              >
                <FileDown className="w-5 h-5" />
                Download Resume
              </a>
              <Link
                href="#contact"
                className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-lg font-medium transition-colors"
                onClick={() => trackContact('Get in Touch Button')}
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
                  onClick={() => trackSocialClick('LinkedIn', 'https://www.linkedin.com/in/augustopolonio/')}
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
