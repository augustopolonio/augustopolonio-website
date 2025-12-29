'use client';

import { Linkedin, Twitter, Instagram, Youtube, Link as LinkIcon, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SocialLinks() {
  const socials = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/augustopolonio/',
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/augustopolonio',
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/augustopolonio',
      icon: <Github className="w-5 h-5" />,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/gutopolonio',
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@gutopolonio',
      icon: <Youtube className="w-5 h-5" />,
    },
    {
      name: 'Linktree',
      url: 'https://linktree.com/augustopolonio',
      icon: <LinkIcon className="w-5 h-5" />,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-center gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socials.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-accent/10 text-muted hover:text-accent transition-colors"
          aria-label={social.name}
          variants={itemVariants}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
}
