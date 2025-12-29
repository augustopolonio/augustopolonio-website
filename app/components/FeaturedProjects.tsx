import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface Game {
  id: number;
  title: string;
  description: string;
  status: string;
  tags: string[];
  image: string;
  link: string;
}

export default function FeaturedProjects() {
  const games: Game[] = [
    {
      id: 1,
      title: "Oliver the Octopus",
      description: "A platform game based on crates with different mechanics.",
      status: "released",
      tags: ["Adventure", "Platformer", "2.5D", "Single Player", "Casual"],
      image: '/game_covers/Oliver_the_octopus.jpg',
      link: 'https://mastercatgames.itch.io/oliver-the-octopus',
    },
    {
      id: 2,
      title: "Tinturaria",
      description: "A game about delivering as many colored boxes with the right color within a time limit.",
      status: "released",
      tags: ["Puzzle", "Casual", "Time Management", "Single Player", "Color Matching", "Mobile"],
      image: '/game_covers/Tinturaria.png',
      link: 'https://play.google.com/store/apps/details?id=com.mastercat.tinturaria',
    },
    {
      id: 3,
      title: "Flappy Black Cat",
      description: "Based on the classic Flappy Bird game, featuring a black cat navigating through obstacles in a dark environment.",
      status: "released",
      tags: ["Arcade", "Casual", "Endless Runner", "Single Player", "Mobile"],
      image: '/game_covers/Flappy_Black_Cat.png',
      link: 'https://play.google.com/store/apps/details?id=com.mastercat.flappyblackcat',
    },
    {
      id: 4,
      title: "Crazy Stack Blocks",
      description: "A puzzle game where you have to stack as many blocks as you can.",
      status: "released",
      tags: ["Puzzle", "Casual", "Stacking", "Single Player", "Mobile", "Addictive", "Family Friendly", "Tetris-like"],
      image: '/game_covers/Crazy_Stack_Blocks.png',
      link: 'https://mastercatgames.itch.io/crazy-stack-blocks',
    },
    {
      id: 5,
      title: "Running Food",
      description: "An endless runner game where you Help Lucy defeat the Blubbers, an organization that threatens planet Earth forcing the habitants to only eat the world's fattest foods.",
      status: "released",
      tags: ["Endless Runner", "Casual", "Single Player", "Mobile", "Collecting", "Obstacles"],
      image: '/game_covers/Running_Food.png',
      link: 'https://play.google.com/store/apps/details?id=com.mastercat.runningfood',
    },
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Featured Projects</h2>
        <p className="text-muted text-center mb-8 max-w-2xl mx-auto">
          A showcase of my released game projects from{' '}
          <a 
            href="https://mastercatgames.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dark font-medium inline-flex items-center gap-1"
          >
            Master Cat Games
            <ExternalLink className="w-4 h-4" />
          </a>
          , my indie game studio.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {games.map((game) => (
            <a
              key={game.id}
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-accent transition-all hover:shadow-xl overflow-hidden"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {game.title}
                </h3>
                <p className="text-muted text-sm mb-4 leading-relaxed line-clamp-2">
                  {game.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {game.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {game.tags.length > 3 && (
                    <span className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-full">
                      +{game.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://mastercatgames.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors"
            >
              Visit Master Cat Games
              <ExternalLink className="w-5 h-5" />
            </a>
            <Link
              href="/unreleased-projects"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-lg font-medium transition-colors"
            >
              View Unreleased Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <p className="text-muted">
            Want to see my professional software development experience?{' '}
            <Link
              href="/work-experience"
              className="text-accent hover:text-accent-dark font-medium"
            >
              View Work Experience →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
