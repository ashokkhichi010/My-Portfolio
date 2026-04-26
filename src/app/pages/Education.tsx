import { useState } from 'react';
import { motion } from 'motion/react';
import educationData from '../data/education.json';
import type { EducationData } from '../types';
import { useSectionAnalytics } from '../hooks/useSectionAnalytics';
import { SectionHeader } from '../components/SectionHeader';

const data: EducationData = educationData;

export const Education = () => {
  const sectionRef = useSectionAnalytics('Education', 'education');
  const [activeIndex, setActiveIndex] = useState(0);
  const active = data.education[activeIndex];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="control-section section-education education-rails min-h-screen px-4 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          code="05_JUPITER_EDUCATION"
          title={data.title}
          description="The academic foundation that shaped my programming basics, system thinking, and transition into practical product development."
        />

        <div className="mb-8 flex gap-3 overflow-x-auto pb-4 md:hidden">
          {data.education.map((edu, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`min-w-[240px] rounded-2xl border px-4 py-3 text-left backdrop-blur-md transition-all duration-300 ${
                activeIndex === i ? 'border-white/40 bg-white/10 text-white' : 'border-white/10 text-gray-400'
              }`}
            >
              <div className="font-semibold">{edu.degree}</div>
              <div className="font-system-mono text-xs opacity-70">{edu.duration}</div>
            </button>
          ))}
        </div>

        <div className="grid items-start gap-12 md:grid-cols-[180px_1fr]">
          <div className="hidden md:flex flex-col gap-4">
            {data.education.map((edu, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                whileHover={{ scale: 1.03 }}
                className={`relative rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                  activeIndex === i ? 'border border-white/20 bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                {activeIndex === i && (
                  <motion.div
                    layoutId="edu-indicator"
                    className="absolute left-0 top-0 h-full w-1 rounded-full bg-[var(--section-accent)]"
                  />
                )}

                <div className="font-system-mono text-sm font-bold">{edu.duration}</div>
                <div className="text-xs opacity-70 line-clamp-2">{edu.degree}</div>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="section-shell system-shell-strong relative rounded-3xl p-8 md:p-10"
          >
            <div className="relative z-10 space-y-5">
              <div className="font-system-mono text-xs uppercase tracking-[0.26em] text-[var(--section-accent)]">
                knowledge log
              </div>

              <h2 className="text-2xl font-semibold text-[var(--theme-text)] md:text-3xl">
                {active.degree}
              </h2>

              <p className="text-lg text-[var(--section-accent)]">{active.field}</p>
              <p className="text-gray-300">{active.institution}</p>
              <p className="font-system-mono text-sm text-gray-400">{active.duration}</p>

              {active.gpa && (
                <p className="text-sm font-medium text-theme-primary">
                  GPA: {active.gpa}
                </p>
              )}

              {active.achievements?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {active.achievements.map((item, i) => (
                    <li key={i} className="flex gap-2 text-gray-300">
                      <span className="text-theme-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
