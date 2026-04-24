import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import skillsData from '../data/skills.json';
import type { SkillsData } from '../types';

const data: SkillsData = skillsData;

// Level → subtle style
const getChipStyle = (level: number) => {
  if (level >= 80)
    return 'bg-white/10 text-white border border-white/20';
  if (level >= 60)
    return 'bg-white/5 text-gray-200 border border-white/10';
  if (level >= 40)
    return 'bg-white/5 text-gray-400 border border-white/5';
  return 'bg-white/5 text-gray-500 border border-white/5 opacity-70';
};

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
        description="Technologies I work with and currently learning"
      />

      <section
        className="min-h-screen py-24 px-4"
        style={{ background: 'var(--theme-background)' }}
      >
        <div className="max-w-5xl mx-auto">

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-20 text-center"
            style={{ color: 'var(--theme-text)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data.title}
          </motion.h1>

          {/* Categories */}
          <div className="space-y-14">
            {Object.entries(data.categories).map(([category, skills], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Category Title */}
                <h2
                  className="text-xl md:text-2xl font-semibold mb-6"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  {category}
                </h2>

                {/* Chips */}
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105 ${getChipStyle(
                        skill.level
                      )}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      viewport={{ once: true }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};