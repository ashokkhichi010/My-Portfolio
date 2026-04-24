import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import experienceData from '../data/experience.json';
import type { ExperienceData } from '../types';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const data: ExperienceData = experienceData;

export const Experience = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('experience');
    trackPageView('Experience');
  }, [setTheme]);

  return (
    <>
      <SEO
        title="Work Experience"
        description="Explore my professional work experience and career journey"
      />
      <div className="min-h-screen py-24 px-4" style={{ background: 'var(--theme-background)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-16 text-center"
            style={{ color: 'var(--theme-text)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data.title}
          </motion.h1>

          <div className="space-y-12">
            {data.experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--theme-text)' }}>
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={18} style={{ color: 'var(--theme-primary)' }} />
                      <span className="text-xl" style={{ color: 'var(--theme-accent)' }}>
                        {exp.company}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {exp.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {exp.location}
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span style={{ color: 'var(--theme-primary)' }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        background: 'var(--theme-primary)',
                        color: 'white',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
