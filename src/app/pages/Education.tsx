import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import educationData from '../data/education.json';
import type { EducationData } from '../types';

const data: EducationData = educationData;

export const Education = () => {
  const { setTheme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setTheme('education');
    trackPageView('Education');
  }, [setTheme]);

  const active = data.education[activeIndex];

  return (
    <>
      <SEO title="Education" description="My academic journey" />

      <section
        className="min-h-screen py-24 px-4"
        style={{ background: 'var(--theme-background)' }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-14 text-center"
            style={{ color: 'var(--theme-text)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data.title}
          </motion.h1>

          {/* MOBILE SELECTOR */}
          <div className="md:hidden flex gap-3 overflow-x-auto pb-4 mb-8">
            {data.education.map((edu, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`min-w-[240px] px-4 py-3 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                  activeIndex === i
                    ? 'border-white/40 bg-white/10 text-white'
                    : 'border-white/10 text-gray-400'
                }`}
              >
                <div className="font-semibold">{edu.degree}</div>
                <div className="text-xs opacity-70">{edu.duration}</div>
              </button>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="grid md:grid-cols-[160px_1fr] gap-12 items-start">

            {/* LEFT SIDEBAR */}
            <div className="hidden md:flex flex-col gap-4">

              {data.education.map((edu, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ scale: 1.05 }}
                  className={`relative px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeIndex === i
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  {/* Active Indicator */}
                  {activeIndex === i && (
                    <motion.div
                      layoutId="edu-indicator"
                      className="absolute left-0 top-0 h-full w-1 bg-white rounded-full"
                    />
                  )}

                  <div className="text-sm font-bold">
                    {edu.duration}
                  </div>

                  <div className="text-xs opacity-70 line-clamp-2">
                    {edu.degree}
                  </div>
                </motion.button>
              ))}

            </div>

            {/* RIGHT PANEL */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative p-8 md:p-10 rounded-3xl backdrop-blur-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none" />

              <div className="relative z-10 space-y-5">

                <h2
                  className="text-2xl md:text-3xl font-semibold"
                  style={{ color: 'var(--theme-text)' }}
                >
                  {active.degree}
                </h2>

                <p
                  className="text-lg"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  {active.field}
                </p>

                <p className="text-gray-300">
                  {active.institution}
                </p>

                <p className="text-sm text-gray-400">
                  {active.duration}
                </p>

                {active.gpa && (
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    GPA: {active.gpa}
                  </p>
                )}

                {active.achievements?.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {active.achievements.map((item, i) => (
                      <li key={i} className="flex gap-2 text-gray-300">
                        <span style={{ color: 'var(--theme-primary)' }}>•</span>
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
    </>
  );
};