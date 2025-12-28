import Navigation from './components/Navigation';
import SocialLinks from './components/SocialLinks';
import Link from 'next/link';
import Image from 'next/image';
import { getWebMobileYears, getGameDevYears } from './utils/calculateExperience';

export default function Home() {
  const webMobileYears = getWebMobileYears();
  const gameDevYears = getGameDevYears();

  const featuredProjects = [
    {
      title: 'Master Cat Games',
      description: 'Collection of game projects built with Unity and Godot. Interactive experiences showcasing game mechanics and design.',
      link: 'https://mastercatgames.vercel.app/',
      tags: ['Unity', 'Godot', 'Game Design'],
    },
    {
      title: 'Unreleased Projects',
      description: 'Work-in-progress game projects exploring new mechanics and creative concepts.',
      link: '#',
      tags: ['Unity', 'Godot', 'Prototyping'],
      comingSoon: true,
    },
  ];

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center animate-fadeIn">
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent shadow-2xl">
                <Image
                  src="/augusto-polonio-avatar.png"
                  alt="Augusto Polonio"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Hi, I'm <span className="gradient-text">Augusto Polonio</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto text-balance">
              Senior Software Developer & Game Developer
            </p>
            <p className="text-lg text-muted/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              {webMobileYears}+ years building web and mobile applications with JavaScript and .NET. 
              Now crafting interactive experiences with Unity and Godot, bringing technical expertise 
              and creativity to game development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="#projects"
                className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors"
              >
                View Projects
              </Link>
              <Link
                href="#contact"
                className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-lg font-medium transition-colors"
              >
                Get in Touch
              </Link>
            </div>
            <SocialLinks />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-accent/50">
                <Image
                  src="/augusto-polonio-avatar.png"
                  alt="Augusto Polonio"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
            <div className="space-y-6 text-lg text-muted/90 leading-relaxed">
              <p>
                I'm a senior web and mobile developer, creating applications using JavaScript and .NET (C#) since 2013, and I'm now looking to transition into game development.
              </p>
              <p>
                Since 2015, I have been building projects in Unity and, more recently, Godot, creating interactive 
                experiences and expanding my portfolio. 
                I am passionate about game design and mechanics, constantly learning and experimenting with new ideas.
              </p>
              <p>
                My strengths include optimizing application performance, 
                managing complex migrations, and delivering scalable solutions — skills I now apply to game mechanics and design.
              </p>
              <p>
                With a degree in Systems Analysis and Development and a passion for games cultivated over many years, 
                I am eager to bring both technical expertise and creativity to a professional game development role.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="p-6 bg-background rounded-lg border border-zinc-200 dark:border-zinc-800">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-semibold mb-2">{webMobileYears}+ Years</h3>
                <p className="text-muted">Web & Mobile Development</p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-zinc-200 dark:border-zinc-800">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-semibold mb-2">{gameDevYears}+ Years</h3>
                <p className="text-muted">Game Development Journey</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Featured Projects</h2>
            <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
              A showcase of my game development work, featuring interactive experiences built with Unity and Godot.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className="group relative p-8 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-accent transition-all hover:shadow-xl"
                >
                  {project.comingSoon && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                      Coming Soon
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {!project.comingSoon && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-accent hover:text-accent-dark font-medium"
                    >
                      View Project
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted mb-6">
                Want to see my professional software development experience?
              </p>
              <Link
                href="/work-experience"
                className="inline-block px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-lg font-medium transition-colors"
              >
                View Work Experience
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
            <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
              I'm actively seeking opportunities in game development. 
              Let's discuss how my technical expertise can contribute to your team.
            </p>
            <SocialLinks />
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
