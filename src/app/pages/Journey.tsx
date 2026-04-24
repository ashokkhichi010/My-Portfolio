import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import journeyData from '../data/journey.json';
import type { JourneyData } from '../types';

const data = journeyData as JourneyData;

export const Journey = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('journey');
    trackPageView('Journey');
  }, [setTheme]);

  return (
    <>
      <SEO
        title="My Journey"
        description="Explore my journey as a developer"
      />

      <section
        className="min-h-screen py-24 px-4"
        style={{ background: 'var(--theme-background)' }}
      >
        <div className="max-w-3xl mx-auto">

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-20"
            style={{ color: 'var(--theme-text)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data.title}
          </motion.h1>

          {/* Timeline */}
          <div className="relative">

            {/* Vertical Line */}
            <div
              className="absolute left-1 top-0 bottom-0 w-[2px]"
              style={{ background: 'var(--theme-primary)' }}
            />

            {data.timeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-8 mb-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >

                {/* Dot */}
                <div
                  className="absolute left-0 top-2 w-3 h-3 rounded-full"
                  style={{ background: 'var(--theme-accent)' }}
                />

                {/* Content */}
                <div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    {item.year}
                  </span>

                  <h3
                    className="text-xl md:text-2xl font-bold mt-1"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};