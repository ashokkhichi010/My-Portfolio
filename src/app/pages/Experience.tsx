import { useState } from 'react';
import { motion } from 'motion/react';
import experienceData from '../data/experience.json';
import type { ExperienceData } from '../types';
import { useSectionAnalytics } from '../hooks/useSectionAnalytics';
import { SectionHeader } from '../components/SectionHeader';

const data: ExperienceData = experienceData;

export const Experience = () => {
  const sectionRef = useSectionAnalytics('Experience', 'experience');
  const [active, setActive] = useState(0);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="control-section section-experience experience-hologram min-h-screen px-6 py-20 text-white"
    >
      <SectionHeader
        code="03_EARTH_EXPERIENCE"
        title={data.title}
        description="Roles, responsibilities, and hands-on work across backend engineering, independent product building, and embedded systems training."
      />

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_1fr]">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-8">
            {data.experiences.map((exp, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className="group relative block w-full cursor-pointer text-left"
              >
                <div
                  className={`absolute left-[10px] top-1 h-3 w-3 rounded-full transition ${
                    i === active ? 'scale-125 bg-[var(--section-accent)] shadow-[0_0_18px_var(--section-accent)]' : 'bg-white/30'
                  }`}
                />

                <div className="ml-10">
                  <div className={`font-system-mono text-sm transition ${i === active ? 'text-[var(--section-accent)]' : 'text-white/40'}`}>
                    {exp.duration}
                  </div>
                  <div className={`text-xs transition ${i === active ? 'text-white' : 'text-white/30'}`}>
                    {exp.company}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-shell system-shell-strong relative max-w-3xl rounded-[28px] px-8 py-8"
        >
          <div className="mb-4 font-system-mono text-xs text-[var(--section-accent)]">
            MEMORY_{active + 1}
          </div>

          <h2 className="mb-4 text-3xl font-semibold leading-tight md:text-5xl">
            {data.experiences[active].role}
          </h2>

          <div className="mb-6 text-white/50">
            {data.experiences[active].company} • {data.experiences[active].location}
          </div>

          <div className="space-y-4 leading-relaxed text-white/80">
            {data.experiences[active].description.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {data.experiences[active].technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-system-mono text-xs text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
