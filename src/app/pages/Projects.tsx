import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView, trackProjectClick } from '../utils/analytics';
import projectsData from '../data/projects.json';
import type { ProjectsData } from '../types';
import { CalendarRange, ExternalLink, Github } from 'lucide-react';

const data = projectsData as ProjectsData;

export const Projects = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('projects');
    trackPageView('Projects');
  }, [setTheme]);

  return (
    <>
      <SEO
        title="Projects"
        description="Explore my portfolio of web development projects and applications"
      />
      <div className="min-h-screen py-24 px-4" style={{ background: 'var(--theme-background)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-16 text-center"
            style={{ color: 'var(--theme-text)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data.title}
          </motion.h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Project Preview */}
                {project.preview === 'image' && project.previewUrl && (
                  <div className="h-48 overflow-hidden bg-gray-800">
                    <img
                      src={project.previewUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                {project.preview === 'website' && project.previewUrl && (
                  <div className="h-48 overflow-hidden bg-gray-800">
                    <iframe
                      src={project.previewUrl}
                      title={project.title}
                      className="w-full h-full pointer-events-none scale-50 origin-top-left"
                      style={{ width: '200%', height: '200%' }}
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <CalendarRange size={16} />
                      <span>{project.timeframe}</span>
                    </div>
                    {project.status && (
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide"
                        style={{
                          background: 'var(--theme-accent)',
                          color: 'var(--theme-background)',
                        }}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  {project.summary && (
                    <p className="text-sm text-gray-400 mb-4">{project.summary}</p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          background: 'var(--theme-primary)',
                          color: 'white',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProjectClick(project.title)}
                        className="flex items-center gap-2 text-sm hover:underline"
                        style={{ color: 'var(--theme-accent)' }}
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
                        className="flex items-center gap-2 text-sm hover:underline"
                        style={{ color: 'var(--theme-accent)' }}
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
