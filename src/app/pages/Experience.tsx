import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import experienceData from '../data/experience.json';
import type { ExperienceData } from '../types';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const data: ExperienceData = experienceData;

export const Experience = () => {
  const { setTheme } = useTheme();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setTheme('experience');
    trackPageView('Experience');
  }, []);

  const next = () => {
    if (index < data.experiences.length - 1) {
      setDirection(1);
      setIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex((prev) => prev - 1);
    }
  };

  const exp = data.experiences[index];

  return (
    <>
      <SEO title="Work Experience" description="My experience journey" />

      <section
        className="min-h-screen py-24 flex items-center px-4"
        style={{ background: 'var(--theme-background)' }}
      >
        <div className="max-w-6xl mx-auto w-full">

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-16 text-center"
            style={{ color: 'var(--theme-text)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data.title}
          </motion.h1>

          {/* Main Layout */}
          <div className="grid md:grid-cols-[80px_1fr_80px] items-center gap-4">

            {/* LEFT BUTTON */}
            <div className="flex justify-center">
              <button
                onClick={prev}
                disabled={index === 0}
                className="w-10 h-10 rounded-full border border-white/10 text-gray-300 disabled:opacity-30 hover:scale-110 transition"
              >
                ←
              </button>
            </div>

            {/* FLIP CARD */}
            <div style={{ perspective: '1200px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -100) next();
                    if (info.offset.x > 100) prev();
                  }}
                  initial={{
                    rotateY: direction === 1 ? 90 : -90,
                    opacity: 0,
                  }}
                  animate={{
                    rotateY: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotateY: direction === 1 ? -90 : 90,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="max-w-5xl mx-auto">

                    <div className="mb-3 flex items-center gap-2">
                      <Calendar size={16} style={{ color: 'var(--theme-primary)' }} />
                      <span className="text-sm text-gray-400">{exp.duration}</span>
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-semibold"
                      style={{ color: 'var(--theme-text)' }}
                    >
                      {exp.role}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">
                      <Briefcase size={16} style={{ color: 'var(--theme-accent)' }} />
                      <span className="text-lg" style={{ color: 'var(--theme-accent)' }}>
                        {exp.company}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                      <MapPin size={14} />
                      {exp.location}
                    </div>

                    <ul className="mt-5 space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-2 text-gray-300">
                          <span style={{ color: 'var(--theme-primary)' }}>•</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-full border border-white/10 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT BUTTON */}
            <div className="flex justify-center">
              <button
                onClick={next}
                disabled={index === data.experiences.length - 1}
                className="w-10 h-10 rounded-full border border-white/10 text-gray-300 disabled:opacity-30 hover:scale-110 transition"
              >
                →
              </button>
            </div>

          </div>

          {/* PROGRESS DOTS */}
          <div className="flex justify-center gap-2 mt-10">
            {data.experiences.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${i === index
                  ? 'w-6 bg-white'
                  : 'w-2 bg-white/30'
                  }`}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
};