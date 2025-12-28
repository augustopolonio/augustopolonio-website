import { Linkedin, Twitter, Instagram, Youtube, Link as LinkIcon } from 'lucide-react';

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
    },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-accent/10 text-muted hover:text-accent transition-colors"
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
