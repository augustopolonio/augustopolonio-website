import Navigation from '../components/Navigation';
import SocialLinks from '../components/SocialLinks';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

type ProjectMedia =
  | { kind: 'image'; src: string }
  | { kind: 'youtube'; videoId: string };

interface LabProject {
  id: number;
  title: string;
  description: string;
  status: string;
  tags: string[];
  media: ProjectMedia;
  engine: 'unity' | 'godot';
}

export default function LabPage() {
  const getYouTubeEmbedUrl = (videoId: string) =>
    `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;

  const projects: LabProject[] = [
    {
      id: 1,
      title: 'Football Soccer Game',
      description: 'Unity prototype exploring basic ball physics, player control, and match-style interactions.',
      status: 'Prototype',
      tags: ['Unity', 'Sports', 'Physics', 'Test'],
      media: { kind: 'youtube', videoId: '0bgYC3ry3Zs' },
      engine: 'unity',
    },
    {
      id: 2,
      title: 'Car Controller (Multiple Cameras)',
      description: 'Vehicle controller prototype with multiple camera modes and camera switching behavior.',
      status: 'Prototype',
      tags: ['Godot', 'Vehicle', 'Cameras', 'Test'],
      media: { kind: 'youtube', videoId: '2tSbSua5xsc' },
      engine: 'godot',
    },
    {
      id: 3,
      title: 'FPS Game',
      description: 'First-person prototype exploring player movement, aiming, and core FPS interaction.',
      status: 'Prototype',
      tags: ['Godot', 'FPS', 'Gameplay', 'Test'],
      media: { kind: 'youtube', videoId: 'wa8b-pEOwQ0' },
      engine: 'godot',
    },
    {
      id: 4,
      title: 'Tiny Knight',
      description: 'Tutorial-based prototype built while following the Brackeys Godot series (movement and combat fundamentals).',
      status: 'Prototype',
      tags: ['Godot', 'Tutorial', 'Platformer', 'Prototype'],
      media: { kind: 'youtube', videoId: 'X1mwOwS9FIY' },
      engine: 'godot',
    },
    {
      id: 5,
      title: 'Global Illumination',
      description: 'Godot rendering experiment focused on real-time global illumination and lighting behavior.',
      status: 'Prototype',
      tags: ['Godot', 'Rendering', 'Lighting', 'Test'],
      media: { kind: 'youtube', videoId: 'zVScwBOSLZg' },
      engine: 'godot',
    },
    {
      id: 6,
      title: 'Third-Person Shooter Game',
      description: 'Unity third-person shooter prototype focused on movement, camera follow, and shooting feel.',
      status: 'Prototype',
      tags: ['Unity', 'TPS', 'Combat', 'Test'],
      media: { kind: 'youtube', videoId: '5SrqXDmgO4k' },
      engine: 'unity',
    },
    {
      id: 7,
      title: 'Action Platform Game',
      description: 'Unity action-platformer prototype exploring jumping, attacks, and responsive character control.',
      status: 'Prototype',
      tags: ['Unity', 'Platformer', 'Action', 'Test'],
      media: { kind: 'youtube', videoId: 'H-3wmRPnLu8' },
      engine: 'unity',
    },
    {
      id: 8,
      title: 'Open World Game',
      description: 'Unity open-world exploration prototype testing traversal, scale, and environment setup.',
      status: 'Prototype',
      tags: ['Unity', 'Open World', 'Exploration', 'Test'],
      media: { kind: 'youtube', videoId: '9FmgfJ92fWA' },
      engine: 'unity',
    },
  ];

  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-20">
        <section className="py-16 px-6 bg-zinc-50 dark:bg-zinc-900/30">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </Link>

            <h1 className="text-5xl font-bold mb-6">Lab</h1>
            <p className="text-xl text-muted max-w-3xl leading-relaxed">
              A collection of some experimental prototypes and technical tests from my game-dev lab.
              These videos capture mechanics, systems, and engine experiments from my learning journey.
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {projects.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-accent/90 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.status}
                    </div>

                    <div className="relative w-full aspect-video overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      {project.media.kind === 'image' ? (
                        <Image
                          src={project.media.src}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <iframe
                          className="absolute inset-0 h-full w-full"
                          src={getYouTubeEmbedUrl(project.media.videoId)}
                          title={`${project.title} - YouTube video`}
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      )}

                      <div className="absolute top-3 left-3 z-10 px-2 py-1.5 bg-black/60 backdrop-blur-sm rounded-md flex items-center gap-1.5 pointer-events-none">
                        <Image
                          src={project.engine === 'unity' ? '/unity_logo.png' : '/godot_logo.png'}
                          alt={project.engine === 'unity' ? 'Unity' : 'Godot'}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                        <span className="text-white text-xs font-medium">{project.engine === 'unity' ? 'Unity' : 'Godot'}</span>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                      <p className="text-muted mb-6 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Clock className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">More Projects Coming Soon</h3>
                <p className="text-muted max-w-md mx-auto">
                  I'm currently working on exciting new game projects. Check back later to see what I'm building!
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 px-6 bg-zinc-50 dark:bg-zinc-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Interested in My Work?</h2>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              I'm actively seeking opportunities in game development. Let's connect and discuss how I can contribute to your team.
            </p>
            <SocialLinks />
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <a
                href="https://www.linkedin.com/in/augustopolonio/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors"
              >
                Connect on LinkedIn
              </a>
              <Link
                href="/#contact"
                className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-lg font-medium transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-8 px-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-6xl mx-auto text-center text-muted text-sm">
            <p>© {new Date().getFullYear()} Augusto Polonio. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
