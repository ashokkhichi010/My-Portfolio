import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import journeyData from '../data/journey.json';
import type { JourneyData } from '../types';
import { Calendar, Award, TrendingUp } from 'lucide-react';

const data = journeyData as JourneyData;

const getIcon = (type: string) => {
  switch (type) {
    case 'milestone':
      return <TrendingUp size={20} />;
    case 'achievement':
      return <Award size={20} />;
    case 'transition':
      return <Calendar size={20} />;
    default:
      return <Calendar size={20} />;
  }
};

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
        description="Explore my professional journey and key milestones in my development career"
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

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5"
              style={{ background: 'var(--theme-primary)' }}
            />

            {data.timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                } pl-20 md:pl-0`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute w-4 h-4 rounded-full ${
                    index % 2 === 0 ? 'md:right-[-8px]' : 'md:left-[-8px]'
                  } left-[28px] top-2`}
                  style={{ background: 'var(--theme-accent)' }}
                />

                <div
                  className={`inline-block p-6 rounded-lg bg-white/5 backdrop-blur-sm ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--theme-primary)' }}>
                    {getIcon(item.type)}
                    <span className="font-bold text-xl">{item.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--theme-text)' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
