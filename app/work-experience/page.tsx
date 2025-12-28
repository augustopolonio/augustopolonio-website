import Navigation from '../components/Navigation';
import SocialLinks from '../components/SocialLinks';
import Link from 'next/link';

export default function WorkExperience() {
  // Placeholder for work experience - you can add your detailed work history here later
  const experiences = [
    {
      title: 'Senior Web & Mobile Developer',
      period: '13+ Years Experience',
      description: 'Specialized in JavaScript and .NET (C#) development, delivering scalable web and mobile solutions.',
      highlights: [
        'Optimized application performance across multiple platforms',
        'Managed complex migrations and system integrations',
        'Delivered scalable solutions for enterprise clients',
        'Led development teams and mentored junior developers',
      ],
      technologies: ['JavaScript', 'TypeScript', 'React', 'React Native', '.NET', 'C#', 'Node.js', 'SQL'],
    },
    // Add more experiences here as you provide them
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
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            
            <h1 className="text-5xl font-bold mb-6">Work Experience</h1>
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
                    <p className="text-accent font-medium">{exp.period}</p>
                  </div>
                  
                  <p className="text-muted mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Key Highlights:</h3>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-accent mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-muted/90">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
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
