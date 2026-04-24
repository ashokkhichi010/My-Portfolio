import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import aboutData from '../data/about.json';
import type { AboutData } from '../types';
import { CheckCircle } from 'lucide-react';

const data: AboutData = aboutData;

export const About = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('about');
    trackPageView('About');
  }, [setTheme]);

  return (
    <>
      <SEO
        title="About Me"
        description="Learn more about my background, experience, and what drives me as a developer"
      />
      <div className="min-h-screen py-24 px-4" style={{ background: 'var(--theme-background)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-12 text-center"
            style={{ color: 'var(--theme-text)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data.title}
          </motion.h1>

          <div className="grid gap-10 items-start md:grid-cols-[minmax(0,1fr)_520px] mb-16">
            {data.image && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <img
                  src={data.image}
                  alt="Ashok Kumar profile"
                  className="w-full rounded-4xl object-cover shadow-2xl"
                />
              </motion.div>
            )}
            <div className="space-y-8">
              {data.story.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--theme-text)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--theme-accent)' }}
            >
              Highlights
            </h2>
            {data.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <CheckCircle size={24} style={{ color: 'var(--theme-primary)' }} className="flex-shrink-0 mt-1" />
                <span className="text-lg" style={{ color: 'var(--theme-text)' }}>
                  {highlight}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};
