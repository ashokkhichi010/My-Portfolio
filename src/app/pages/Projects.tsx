import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ArrowLeft, ArrowRight, Radar } from 'lucide-react';
import { trackProjectClick } from '../utils/analytics';
import projectsData from '../data/projects.json';
import type { ProjectsData } from '../types';
import { useSectionAnalytics } from '../hooks/useSectionAnalytics';
import { SectionHeader } from '../components/SectionHeader';

const data = projectsData as ProjectsData;

export const Projects = () => {
  const sectionRef = useSectionAnalytics('Projects', 'projects');
  const [index, setIndex] = useState(0);
  const project = data.projects[index];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="control-section section-projects min-h-screen px-6 py-18"
    >
      <div className="projects-signal relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center">
          <SectionHeader
            code="04_MARS_PROJECTS"
            title="Research Base"
            description="A mission archive of software, IoT, embedded, and product experiments built to solve real operational problems."
          />
          <div className="module-tag mx-auto mb-4">
            <Radar size={14} />
            mission archive
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
            disabled={index === 0}
            className="absolute left-[-58px] top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3 text-white/70 backdrop-blur-md transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-20 md:left-[-72px]"
            aria-label="Previous project"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => setIndex((value) => Math.min(data.projects.length - 1, value + 1))}
            disabled={index === data.projects.length - 1}
            className="absolute right-[-58px] top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3 text-white/70 backdrop-blur-md transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-20 md:right-[-72px]"
            aria-label="Next project"
          >
            <ArrowRight size={18} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="section-shell system-shell-strong relative overflow-hidden rounded-[28px] p-6 md:p-8"
            >
              <motion.div
                className="absolute left-0 top-0 h-[2px] w-full"
                style={{ background: 'color-mix(in srgb, var(--section-accent) 70%, transparent)' }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="font-system-mono text-[11px] uppercase tracking-[0.28em] text-white/40">
                  build_{String(index + 1).padStart(2, '0')}
                </div>

                <span className="module-tag">
                  live system record
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-semibold text-white md:text-4xl">
                {project.title}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/45">
                <span>{project.timeframe}</span>
                {project.status && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-system-mono text-[11px] uppercase tracking-[0.22em] text-[var(--section-accent)]">
                    {project.status}
                  </span>
                )}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/15 p-5">
                <div className="mb-2 font-system-mono text-[11px] uppercase tracking-[0.28em] text-white/35">
                  mission
                </div>
                <p className="text-sm leading-7 text-white/72 md:text-base">
                  {project.description}
                </p>
              </div>

              <div className="mt-5 text-sm leading-7 text-white/60">
                {project.summary}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-system-mono text-xs text-white/65"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProjectClick(project.title)}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition"
                    style={{
                      border: '1px solid color-mix(in srgb, var(--section-accent) 25%, transparent)',
                      background: 'color-mix(in srgb, var(--section-accent) 10%, transparent)',
                      color: 'var(--section-accent)',
                    }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProjectClick(`${project.title} - GitHub`)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75 transition hover:bg-white/[0.08]"
                  >
                    <Github size={16} />
                    Code
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
