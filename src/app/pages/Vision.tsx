import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import visionData from '../data/vision.json';
import type { VisionData } from '../types';
import { Target, Zap, Heart } from 'lucide-react';

const data: VisionData = visionData;

export const Vision = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('vision');
    trackPageView('Vision');
  }, [setTheme]);

  return (
    <>
      <SEO
        title="Vision & Goals"
        description="My vision for the future and long-term goals"
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

          {/* Vision Statement */}
          <motion.div
            className="mb-16 p-8 rounded-xl bg-white/5 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p
              className="text-xl leading-relaxed text-center"
              style={{ color: 'var(--theme-text)' }}
            >
              {data.vision}
            </p>
          </motion.div>

          {/* Goals */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Short-term Goals */}
            <motion.div
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg" style={{ background: 'var(--theme-primary)' }}>
                  <Zap size={24} color="white" />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
                  Short-Term Goals
                </h2>
              </div>
              <ul className="space-y-3">
                {data.goals.shortTerm.map((goal, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2 text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span style={{ color: 'var(--theme-accent)' }}>•</span>
                    <span>{goal}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Long-term Goals */}
            <motion.div
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg" style={{ background: 'var(--theme-primary)' }}>
                  <Target size={24} color="white" />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
                  Long-Term Goals
                </h2>
              </div>
              <ul className="space-y-3">
                {data.goals.longTerm.map((goal, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2 text-gray-300"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span style={{ color: 'var(--theme-accent)' }}>•</span>
                    <span>{goal}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg" style={{ background: 'var(--theme-primary)' }}>
                <Heart size={24} color="white" />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
                Core Values
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {data.values.map((value, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-2 text-gray-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                >
                  <span style={{ color: 'var(--theme-accent)' }}>•</span>
                  <span>{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
