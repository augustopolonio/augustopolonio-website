'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import gamesData from '@/public/data/games.json';

interface Game {
  id: number;
  title: string;
  description: string;
  status: string;
  tags: string[];
  image: string;
  link: string;
  engine: 'unity' | 'godot';
}

export default function FeaturedProjects() {
  const games: Game[] = gamesData as Game[];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal variant="blur">
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
        </ScrollReveal>
        
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {games.map((game) => {
            const CardWrapper = game.status === 'in-development' ? Link : 'a';
            const cardProps = game.status === 'in-development' 
              ? { href: game.link }
              : { href: game.link, target: "_blank", rel: "noopener noreferrer" };
            
            return (
              <motion.div
                key={game.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <CardWrapper
                  {...cardProps}
                  className="block group relative bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-accent transition-all hover:shadow-xl overflow-hidden h-full"
                >
                {game.status === 'in-development' && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-accent text-white text-xs font-semibold rounded-full shadow-lg">
                    IN DEVELOPMENT
                  </div>
                )}
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 z-10 px-2 py-1.5 bg-black/60 backdrop-blur-sm rounded-md flex items-center gap-1.5">
                    <Image
                      src={game.engine === 'unity' ? '/unity_logo.png' : '/godot_logo.png'}
                      alt={game.engine === 'unity' ? 'Unity' : 'Godot'}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    <span className="text-white text-xs font-medium">{game.engine === 'unity' ? 'Unity' : 'Godot'}</span>
                  </div>
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
                    <span 
                      className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-full cursor-help"
                      title={game.tags.slice(3).join(', ')}
                    >
                      +{game.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </CardWrapper>
            </motion.div>
            );
          })}
        </motion.div>

        <ScrollReveal variant="fadeUp" delay={0.3}>
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
      </ScrollReveal>
      </div>
    </section>
  );
}
