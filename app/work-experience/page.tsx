import Navigation from '../components/Navigation';
import SocialLinks from '../components/SocialLinks';
import Link from 'next/link';
import Image from 'next/image';
import { getWebMobileYears } from '../utils/calculateExperience';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function WorkExperience() {
  const webMobileYears = getWebMobileYears();
  
  const experiences = [
    {
      company: 'Quattrus',
      location: 'Porto Alegre, BR (Remote)',
      title: 'Tech Lead & Senior Full Stack Software Engineer',
      period: 'FEB 2022 - PRESENT',
      description: 'Collaborated with architects and engineers to implement new features in SaaS ERP products.',
      highlights: [
        'Mentored junior and core developers, guiding them in writing clean code to ensure easy maintenance',
        'Conducted thorough code reviews to ensure code quality and adherence to best practices with a focus on SOLID principles',
        'Increased application performance by optimizing code and improving system architecture',
        'Helped Product Owner and Scrum Master to find the best solutions for the development process and applications',
        'Built and maintained CI/CD pipelines for staging and production environments, ensuring reliable and efficient deployments',
        'Migrated legacy applications to the new tech stack',
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'Sencha ExtJS', 'JavaScript', '.NET', 'SQL Server'],
    },
    {
      company: 'Master Cat Games',
      location: 'Ivoti, BR',
      title: 'Game Developer (Self-Employed)',
      period: 'MAR 2020 - PRESENT',
      description: 'Developed indie games for mobile and PC from planning to post-production using Unity and Godot.',
      highlights: [
        'Won 2nd place with the game Oliver the Octopus at LudiJam #01',
        'Utilized GitHub and Bitbucket to maintain organized project repositories',
        'Worked using tools like Trello and Notion to optimize the flow of developments',
      ],
      technologies: ['Unity', 'C#', 'Godot', 'GDScript'],
    },
    {
      company: 'Qualitin',
      location: 'Porto Alegre, BR (Remote)',
      title: 'Mid/Senior Full Stack Developer',
      period: 'JAN 2016 - FEB 2022',
      description: 'Analyzed, planned, coded, tested, and documented web applications (SaaS ERP systems) for the quality management field.',
      highlights: [
        'Introduced best coding practices to promote easy maintenance and improve performance',
        'Redesigned UI and UX of some projects',
        'Created an API for the company\'s main software',
        'Developed, maintained, and published new features for Android and iOS mobile applications',
        'Collaborated with the marketing team to integrate RD Station, enhancing digital marketing automation and management',
        'Integrated the e-commerce system Vindi with web applications',
        'Enhanced push notifications of mobile apps, integrating with OneSignal',
        'Upgraded Sencha Touch applications, as well as Cordova versions to increase compatibility',
        'Managed the workflow and documented all the processes using JetBrains YouTrack and after DevOps',
      ],
      technologies: ['.NET', 'C#', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'JSON', 'SQL Server', 'Web Services', 'APIs', 'Sencha ExtJS', 'Cordova', 'Swagger', 'LINQ', 'NHibernate'],
    },
    {
      company: 'While Tech',
      location: 'Porto Alegre, BR (Remote)',
      title: 'Game Developer',
      period: 'MAR 2017 - JUN 2017',
      description: 'Developed an educational mobile game for Android called Color Melody Piano.',
      highlights: [],
      technologies: ['Unity', 'C#', 'Photoshop', 'Illustrator'],
    },
    {
      company: 'Sollus',
      location: 'Porto Alegre, BR',
      title: 'Full Stack Developer',
      period: 'OCT 2015 - JAN 2016',
      description: 'Planned and built a refund software for the financial area.',
      highlights: [
        'Developed new features for the company\'s main software',
        'Worked in maintenance of web pages and CRM software',
        'Analyzed and worked in data integration of legacy systems, adapting to the business model',
      ],
      technologies: ['ASP.NET MVC', 'C#', 'PHP', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'SQL Server', 'Web Services', 'LINQ', 'NHibernate'],
    },
    {
      company: 'Qualitin',
      location: 'Porto Alegre, BR',
      title: 'Full Stack Developer',
      period: 'JUL 2013 - SEP 2015',
      description: 'Improved the front-end of the company\'s main software, migrating the Microsoft Silverlight and the old ASP.NET pages to Sencha ExtJS. This change allowed the company to close a deal with a new client in a short-time development.',
      highlights: [
        'Developed new login for all applications, improving the security and UI',
        'Organized and executed tasks, working with Scrum and Pair Programming as an agile method',
        'Solved technical problems of sprint backlog',
      ],
      technologies: ['ASP.NET', 'C#', 'HTML', 'CSS', 'JavaScript', 'Sencha ExtJS', 'SQL Server', 'LINQ', 'NHibernate'],
    },
  ];

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-24 px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <Link 
              href="/"
              className="inline-flex items-center text-accent hover:text-accent-dark mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-accent/50 flex-shrink-0">
                <Image
                  src="/augusto-polonio-avatar.png"
                  alt="Augusto Polonio"
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="text-5xl font-bold">Work Experience</h1>
            </div>
            <p className="text-xl text-muted">
              Over a decade of professional software development experience, building robust applications 
              and leading technical initiatives.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="relative pl-8 border-l-2 border-accent/30 hover:border-accent transition-colors"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent"></div>
                
                <div className="pb-12">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">{exp.title}</h2>
                    <p className="text-lg font-medium mb-1">{exp.company} • {exp.location}</p>
                    <p className="text-accent font-medium">{exp.period}</p>
                  </div>
                  
                  <p className="text-muted mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  {exp.highlights.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Key Highlights:</h3>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 mr-2 shrink-0" />
                            <span className="text-muted/90">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technologies:</h3>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, tIndex) => (
                        <span 
                          key={tIndex}
                          className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder for more experiences */}
          <div className="mt-16 p-8 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-semibold mb-3">📝 Content In Progress</h3>
            <p className="text-muted mb-4">
              Detailed work experience entries with project descriptions, screenshots, and accomplishments 
              will be added here. This section will showcase:
            </p>
            <ul className="space-y-2 text-muted/90">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Specific projects and applications developed
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Technical challenges solved and innovations implemented
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Screenshots and demos of completed work
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                Team leadership and mentoring experiences
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Interested in my background?</h3>
            <p className="text-muted mb-8">
              Let's discuss how my experience can benefit your game development team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.linkedin.com/in/augustopolonio/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors"
              >
                View LinkedIn Profile
              </a>
              <Link
                href="/#contact"
                className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-lg font-medium transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted text-sm">
              © {new Date().getFullYear()} Augusto Polonio. All rights reserved.
            </p>
            <SocialLinks />
          </div>
        </div>
      </footer>
    </>
  );
}
