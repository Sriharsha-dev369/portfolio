import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { Github, Linkedin, Mail, ArrowUpRight, ChevronRight, Download } from "lucide-react";

export const portfolioData = {
  identity: {
    name: "Sriharsha Anaparthi",
    role: "Fullstack + AI Engineering",
    dpUrl: "https://i.pravatar.cc/150?u=sriharsha",
    tagline: "I build fast, clean, purposeful software.",
    location: "Global",
    email: "sriharshaanaparthi@gmail.com",
    github: "https://github.com/sriharsha",
    linkedin: "https://linkedin.com/in/sriharsha",
    resume: "#", // Placeholder PDF link
    blog: "#",
  },
  about: {
    bio: "I craft digital experiences with a focus on minimalism, performance, and robust architecture. Rejecting bloat in favor of intentional design and efficient code.",
    philosophy: "Less is more. Code should be read like a book. Design should make sense.",
  },
  skills: [
    "TypeScript", "React", "Node.js", "Go", "PostgreSQL",
    "Docker", "AWS", "Tailwind CSS", "Framer Motion", "GraphQL",
  ],
  projects: [
    {
      name: "Nexus",
      description: "Distributed task runner with highly consistent state.",
      tags: ["Go", "React", "gRPC"],
      github: "#",
      live: "#",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Aura",
      description: "Minimalist habit tracker focusing on consecutive streaks.",
      tags: ["React Native", "SQLite"],
      github: "#",
      imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Cortex",
      description: "Local-first markdown knowledge base with offline support.",
      tags: ["Electron", "React", "CRDTs"],
      github: "#",
      live: "#",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Onyx",
      description: "High-performance headless CMS and asset manager.",
      tags: ["Node.js", "PostgreSQL", "Redis"],
      github: "#",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    },
  ],
  experience: [
    {
      company: "Independent Developer",
      role: "Fullstack + AI Engineer",
      duration: "2024 — Present",
      achievements: [
        "Architected and deployed production-ready web applications focusing on performance and scalability.",
        "Engineered robust backend systems and integrated AI models to solve complex real-world problems.",
      ],
    },
    {
      company: "Open Source & Personal Projects",
      role: "Software Developer",
      duration: "2024 — Present",
      achievements: [
        "Deepened expertise in modern web technologies, system design, and cloud infrastructure.",
        "Continuously abstracted and refactored codebases to adhere to clean architecture principles.",
      ],
    },
  ],
};

const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-screen">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        ["A", "BUTTON"].includes(target.tagName) ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: isHovering ? 2.5 : 1,
        opacity: isHovering ? 0.5 : 1,
      }}
    />
  );
};

const navItems = ["About", "Skills", "Projects", "Experience", "Contact"];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 border-t border-text/10 py-24">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.h2 variants={fadeInUp} className="mb-12 font-syne text-3xl font-bold tracking-tight text-text">
        {title}
      </motion.h2>
      {children}
    </motion.div>
  </section>
);

export default function App() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -50% 0px" }
    );

    const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-base font-sans selection:bg-accent selection:text-base cursor-default">
      <NoiseOverlay />
      <CustomCursor />

      {/* Sticky Navigation */}
      <nav className="fixed left-0 top-0 z-40 w-full border-b border-text/5 bg-base/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <a
            href="#hero"
            className="font-syne text-lg font-bold tracking-tighter text-text transition-colors hover:text-accent"
          >
            {portfolioData.identity.name.split(' ').map(n => n[0]).join('')}.
          </a>
          <div className="hidden gap-6 md:flex">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  className={`group relative py-1 font-mono text-sm tracking-wide transition-colors ${
                    activeSection === id ? "text-text" : "text-text/60 hover:text-accent"
                  }`}
                >
                  {item}
                  {activeSection === id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-[1px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-accent"
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 pt-24 fade-in">
        <motion.section
          id="hero"
          className="flex min-h-[80vh] flex-col justify-center pb-24"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8 flex items-center">
            {portfolioData.identity.dpUrl ? (
              <img 
                src={portfolioData.identity.dpUrl} 
                alt={portfolioData.identity.name} 
                className="h-24 w-24 rounded-full border border-text/10 object-cover grayscale transition-all duration-500 hover:border-accent hover:grayscale-0"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-text/10 bg-text/5 font-syne text-3xl font-bold">
                {portfolioData.identity.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-4 font-syne text-5xl font-bold tracking-tighter text-text md:text-7xl"
          >
            {portfolioData.identity.name}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="ml-3 inline-block h-[0.8em] w-3 -translate-y-[0.05em] bg-accent"
            />
          </motion.h1>

          <motion.p variants={fadeInUp} className="mb-6 font-mono text-lg text-accent">
            {portfolioData.identity.role} <span className="mx-2 text-text/30">/</span> {portfolioData.identity.location}
          </motion.p>

          <motion.div variants={fadeInUp} className="mb-8 flex flex-wrap gap-6">
            <a
              href={portfolioData.identity.linkedin}
              className="group flex items-center gap-2 font-mono text-sm tracking-wide text-text/60 transition-colors hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} strokeWidth={1.5} />
              <span className="border-b border-transparent transition-colors group-hover:border-accent">LinkedIn</span>
            </a>
            <a
              href={portfolioData.identity.github}
              className="group flex items-center gap-2 font-mono text-sm tracking-wide text-text/60 transition-colors hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} strokeWidth={1.5} />
              <span className="border-b border-transparent transition-colors group-hover:border-accent">GitHub</span>
            </a>
            <a
              href={portfolioData.identity.resume}
              className="group flex items-center gap-2 font-mono text-sm tracking-wide text-text/60 transition-colors hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={18} strokeWidth={1.5} />
              <span className="border-b border-transparent transition-colors group-hover:border-accent">Resume</span>
            </a>
            <a
              href={portfolioData.identity.blog}
              className="group flex items-center gap-2 font-mono text-sm tracking-wide text-text/60 transition-colors hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight size={18} strokeWidth={1.5} />
              <span className="border-b border-transparent transition-colors group-hover:border-accent">Blog</span>
            </a>
          </motion.div>

          <motion.p variants={fadeInUp} className="max-w-2xl text-xl font-light leading-relaxed text-text/70 md:text-2xl">
            {portfolioData.identity.tagline}
          </motion.p>
        </motion.section>

        <Section id="about" title="About">
          <motion.div variants={fadeInUp} className="max-w-2xl font-mono text-text/80">
            <p className="mb-6 leading-relaxed">{portfolioData.about.bio}</p>
            <p className="leading-relaxed text-text/60 italic">"{portfolioData.about.philosophy}"</p>
          </motion.div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="flex flex-wrap gap-3">
            {portfolioData.skills.map((skill) => (
              <motion.span
                variants={fadeInUp}
                key={skill}
                className="rounded-none border border-text/20 px-4 py-2 font-mono text-sm tracking-wide text-text/80 transition-all duration-300 cursor-default hover:border-accent hover:bg-accent/5 hover:text-accent"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid grid-cols-1 gap-8">
            {portfolioData.projects.map((project) => (
              <motion.div
                variants={fadeInUp}
                key={project.name}
                className="group relative flex flex-col md:flex-row gap-8 border border-text/10 bg-text/[0.01] p-6 transition-colors duration-200 hover:border-accent"
              >
                {project.imageUrl && (
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden border border-text/10 bg-base md:w-2/5 md:aspect-auto">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-grow items-start justify-between">
                  <div className="mb-4 flex w-full items-start justify-between">
                    <h3 className="font-syne text-2xl font-bold transition-colors group-hover:text-accent">
                      {project.name}
                    </h3>
                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          className="text-text/40 transition-colors hover:text-accent"
                          aria-label="GitHub Repository"
                        >
                          <Github size={20} strokeWidth={1.5} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          className="text-text/40 transition-colors hover:text-accent"
                          aria-label="Live Demo"
                        >
                          <ArrowUpRight size={22} strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mb-8 max-w-2xl font-mono text-sm leading-relaxed text-text/60">
                    {project.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-xs text-text/40 uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="flex flex-col gap-12">
            {portfolioData.experience.map((exp, i) => (
              <motion.div
                variants={fadeInUp}
                key={i}
                className="relative flex flex-col border-l border-text/10 pl-6 md:flex-row md:gap-8 gap-4 group transition-colors hover:border-text/30"
              >
                <span className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-text/20 transition-all duration-300 group-hover:bg-accent group-hover:shadow-[0_0_8px_rgba(200,241,53,0.6)]" />
                <div className="shrink-0 md:w-1/4">
                  <p className="mb-1 font-mono text-sm text-text/40">{exp.duration}</p>
                  <h3 className="font-syne text-lg font-bold text-text">{exp.company}</h3>
                  <p className="mt-1 font-mono text-sm text-accent">{exp.role}</p>
                </div>
                <div className="md:w-3/4">
                  <ul className="space-y-3 font-mono text-sm leading-relaxed text-text/70">
                    {exp.achievements.map((ach, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-0.5 text-accent">
                          <ChevronRight size={16} strokeWidth={1.5}/>
                        </span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Get in touch.">
          <motion.div variants={fadeInUp} className="max-w-2xl">
            <p className="mb-12 font-mono text-lg text-text/60 leading-relaxed max-w-xl">
              Currently open for new opportunities. Whether you have a question or
              just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href={`mailto:${portfolioData.identity.email}`}
                className="inline-flex items-center gap-2 border border-text/20 bg-text/[0.02] px-8 py-4 font-syne text-lg font-bold tracking-wide transition-all duration-300 hover:border-accent hover:bg-accent hover:text-base"
              >
                <Mail size={20} strokeWidth={1.5} />
                Say Hello
              </a>
              <a
                href={portfolioData.identity.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-accent bg-accent/5 px-8 py-4 font-syne text-lg font-bold tracking-wide text-accent transition-all duration-300 hover:bg-accent hover:text-base hover:shadow-[0_0_15px_rgba(200,241,53,0.2)]"
              >
                <Download size={20} strokeWidth={1.5} />
                Resume (PDF)
              </a>
            </div>

            <div className="mt-24 flex items-center justify-between border-t border-text/10 pt-8 pb-12">
              <span className="font-mono text-xs text-text/40 tracking-wider">
                © {new Date().getFullYear()} {portfolioData.identity.name}.
              </span>
              <div className="flex gap-6">
                <a
                  href={portfolioData.identity.github}
                  className="font-mono text-xs text-text/50 tracking-widest transition-colors hover:text-accent uppercase"
                >
                  GitHub
                </a>
                <a
                  href={portfolioData.identity.linkedin}
                  className="font-mono text-xs text-text/50 tracking-widest transition-colors hover:text-accent uppercase"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}
