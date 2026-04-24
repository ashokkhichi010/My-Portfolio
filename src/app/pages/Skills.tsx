import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import skillsData from '../data/skills.json';
import type { SkillsData } from '../types';

const data: SkillsData = skillsData;

export const Skills = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('skills');
    trackPageView('Skills');
  }, [setTheme]);

  return (
    <>
      <SEO
        title="Skills"
        description="Explore my technical skills and expertise across various technologies"
      />
      <div className="min-h-screen py-24 px-4" style={{ background: 'var(--theme-background)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-16 text-center"
            style={{ color: 'var(--theme-text)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data.title}
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(data.categories).map(([category, skills], catIndex) => (
              <motion.div
                key={category}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  {category}
                </h2>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium" style={{ color: 'var(--theme-text)' }}>
                          {skill.name}
                        </span>
                        <span style={{ color: 'var(--theme-primary)' }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'var(--theme-gradient)' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: catIndex * 0.1 + index * 0.05, duration: 1 }}
                        />
                      </div>
                    </div>
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
