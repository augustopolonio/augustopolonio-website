import Navigation from '../components/Navigation';
import SocialLinks from '../components/SocialLinks';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

interface UnreleasedProject {
  id: number;
  title: string;
  description: string;
  status: string;
  tags: string[];
  image: string;
  engine: 'unity' | 'godot';
}

export default function UnreleasedProjects() {
  const projects: UnreleasedProject[] = [
    {
      id: 1,
      title: "Alone at the Fast Food",
      description: "A work-in-progress horror survival game set in an abandoned fast food restaurant. Navigate through dark corridors, solve puzzles, and uncover the mystery behind the restaurant's closure.",
      status: "In Development",
      tags: ["Horror", "Survival", "Puzzle", "Single Player"],
      image: '/game_covers/Alone_at_the_fast_food.png',
      engine: 'godot',
    },
    // Add more unreleased projects here as they become available
  ];

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-20">
        {/* Header */}
        <section className="py-16 px-6 bg-zinc-50 dark:bg-zinc-900/30">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </Link>
            
            <h1 className="text-5xl font-bold mb-6">Unreleased Projects</h1>
            <p className="text-xl text-muted max-w-3xl leading-relaxed">
              Work-in-progress game projects exploring new mechanics and creative concepts. 
              These projects showcase my ongoing learning and experimentation in game development.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
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
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 z-10 px-2 py-1.5 bg-black/60 backdrop-blur-sm rounded-md flex items-center gap-1.5">
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
                      <h3 className="text-2xl font-bold mb-3">
                        {project.title}
                      </h3>
                      <p className="text-muted mb-6 leading-relaxed">
                        {project.description}
                      </p>
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

        {/* Call to Action */}
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
