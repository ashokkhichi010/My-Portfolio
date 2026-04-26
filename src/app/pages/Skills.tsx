import { motion } from 'motion/react';
import skillsData from '../data/skills.json';
import type { SkillsData } from '../types';
import { useSectionAnalytics } from '../hooks/useSectionAnalytics';
import { SectionHeader } from '../components/SectionHeader';

const data: SkillsData = skillsData;

const getChipStyle = (level: number) => {
  if (level >= 80) return 'chip-strong text-white';
  if (level >= 60) return 'border-white/12 bg-white/[0.06] text-gray-200';
  if (level >= 40) return 'border-white/8 bg-white/5 text-gray-400';
  return 'border-white/6 bg-white/5 text-gray-500 opacity-70';
};

export const Skills = () => {
  const sectionRef = useSectionAnalytics('Skills', 'skills');

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="control-section section-skills min-h-screen px-4 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          code="07_URANUS_NEPTUNE_SKILLS"
          title={data.title}
          description="A structured view of the tools, technologies, and engineering strengths I rely on across frontend, backend, IoT, and system design."
        />

        <div className="skills-matrix section-shell system-frame space-y-14 rounded-[32px] p-8 md:p-10">
          {Object.entries(data.categories).map(([category, skills], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h2 className="mb-6 text-xl font-semibold text-[var(--section-accent)] md:text-2xl">
                {category}
              </h2>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className={`rounded-full border px-4 py-1.5 font-system-mono text-sm transition-all duration-200 hover:scale-105 ${getChipStyle(skill.level)}`}
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
  );
};
