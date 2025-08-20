import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Database, Server } from 'lucide-react';

// Dark mode hook
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
            (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDark.toString());
  }, [isDark]);

  return [isDark, setIsDark] as const;
};

// Navigation Component
const Navigation = ({ isDark, setIsDark }: { isDark: boolean; setIsDark: (value: boolean) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Projects', 'Blog', 'Contact'];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId.toLowerCase())?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="font-mono font-bold text-xl text-gray-900 dark:text-white">
            Cfuna.dev
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
            <div className="py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'Backend Developer | Scalable APIs | Supabase & NestJS';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10">
      {/* <section className="flex flex-col items-center text-center py-10"> */}
      {/* Profile Picture */}
      <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg mb-4">
        <img
          src="/profile.png"
          alt="Profile Picture"
          width={160}
          height={160}
          className="object-cover"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Abel Sifuna
          </h1>
          <div className="h-8 mb-8">
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-mono">
              {displayedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Passionate about building robust, scalable backend systems that power modern applications. 
            Specializing in TypeScript, NestJS, and cloud-native architectures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              View My Work
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg font-medium transition-all duration-200"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const skills = [
    { name: 'NestJS', icon: Server },
    { name: 'TypeScript', icon: Code },
    { name: 'Supabase', icon: Database },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Drizzle ORM', icon: Database },
    { name: 'REST APIs', icon: Server }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I'm a backend developer with a passion for creating scalable, efficient server-side solutions. 
              My expertise lies in building robust APIs and database architectures that can handle complex business logic 
              and high-traffic applications.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Currently, I'm focused on modern TypeScript frameworks like NestJS, combined with powerful tools 
              like Supabase and Drizzle ORM to deliver full-stack solutions that are both performant and maintainable.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              When I'm not coding, I contribute to educational platforms and enjoy sharing knowledge with the developer community.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technologies I Work With</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <skill.icon className="text-indigo-600" size={20} />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const projects = [
    {
      title: "BFFLend",
      description:
        "A peer-to-peer rental marketplace connecting users to rent or lend items securely.",
      technologies: [
        "Next.js 14",
        "NestJS",
        "Tailwind CSS",
        "Supabase",
        "Drizzle ORM",
        "PostgreSQL",
      ],
      status: "In Development",
      highlights: [
        "Monorepo setup",
        "Authentication with Supabase",
        "Modern UI with Tailwind",
        "Secure backend APIs",
      ],
    },
    {
      title: "Birnes Haven",
      description:
        "A backend system powering property listings, bookings, payments, and admin features.",
      technologies: [
        "NestJS",
        "TypeScript",
        "Drizzle ORM",
        "Supabase",
        "PostgreSQL",
      ],
      status: "Completed",
      highlights: [
        "Full CRUD for properties",
        "Admin dashboard APIs",
        "Secure role-based auth",
        "Payment & booking modules",
      ],
    },
    {
      title: "Job Platform Backend",
      description:
        "Comprehensive backend for a job marketplace connecting handymen with clients.",
      technologies: [
        "NestJS",
        "TypeScript",
        "Supabase",
        "Drizzle ORM",
        "PostgreSQL",
      ],
      status: "In Development",
      highlights: [
        "RESTful API",
        "Real-time notifications",
        "Secure auth",
        "Optimized DB queries",
      ],
    },
    {
      title: "PLP-Style Learning Platform",
      description:
        "Contributing to an educational platform backend that supports course management.",
      technologies: ["NestJS", "PostgreSQL", "TypeScript", "REST APIs"],
      status: "Contributing",
      highlights: [
        "Course content system",
        "Student progress analytics",
        "Quiz engine",
        "Multi-role management",
      ],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Feature Projects</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Here are some of the backend systems I've been working on
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                  <span className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full">
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            More projects coming soon! Check out my GitHub for additional work.
          </p>
          <a 
            href="https://github.com/Cfuna22" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
          >
            <Github size={20} />
            <span>View GitHub Profile</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

// Blog Section Component
const BlogSection = () => {
  const blogPosts = [
    {
      title: "Building Scalable APIs with NestJS and Supabase",
      excerpt: "Learn how to architect robust backend systems using NestJS framework combined with Supabase for authentication and database management.",
      date: "Coming Soon",
      readTime: "8 min read",
      tags: ["NestJS", "Supabase", "Backend"]
    },
    {
      title: "Database Design Patterns for Modern Applications",
      excerpt: "Explore effective database design strategies and how to implement them using Drizzle ORM with PostgreSQL.",
      date: "Coming Soon", 
      readTime: "12 min read",
      tags: ["Database", "PostgreSQL", "Drizzle ORM"]
    },
    {
      title: "TypeScript Best Practices for Backend Development",
      excerpt: "Discover advanced TypeScript techniques and patterns that make your backend code more maintainable and type-safe.",
      date: "Coming Soon",
      readTime: "10 min read", 
      tags: ["TypeScript", "Best Practices", "Backend"]
    }
  ];

  return (
    <section id="blog" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog & Insights</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Sharing knowledge about backend development, architecture, and best practices
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200 cursor-not-allowed opacity-50">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            Blog posts coming soon! Follow me on social media for updates.
          </p>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abelsifuna515@gmail.com",
      href: "mailto:abelsifuna515@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Cfuna22",
      href: "https://github.com/Cfuna22",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "https://linkedin.com/in/abel-sifuna-b0a928353",
      href: "https://linkedin.com/in/abel-sifuna-b0a928353",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Let's discuss your next backend project or collaboration opportunity
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <contact.icon className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{contact.label}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center font-mono text-sm">
                {contact.value}
              </p>
              <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400">
                <span className="text-sm font-medium">Connect</span>
                <ExternalLink size={16} className="ml-1" />
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to build something amazing?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm always interested in discussing new opportunities, whether it's a full-time position, 
              freelance project, or collaboration. Let's create scalable solutions together.
            </p>
            <a
              href="mailto:abelsifuna515@gmail.com"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <Mail size={20} />
              <span>Send Message</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="py-8 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="font-mono font-bold text-xl text-gray-900 dark:text-white mb-4 md:mb-0">
            Abel.dev
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-center md:text-right">
            <p>&copy; 2025 Abel Sifuna. Built with React & TypeScript.</p>
            <p className="text-sm mt-1">Designed for performance and scalability.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [isDark, setIsDark] = useDarkMode();

  // Add smooth scrolling to the entire page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation isDark={isDark} setIsDark={setIsDark} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
