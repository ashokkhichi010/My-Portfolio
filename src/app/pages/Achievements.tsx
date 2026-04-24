import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import achievementsData from '../data/achievements.json';
import type { AchievementsData } from '../types';
import { CalendarRange, Trophy } from 'lucide-react';

const data = achievementsData as AchievementsData;

export const Achievements = () => {
  const { setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    setTheme('achievements');
    trackPageView('Achievements');
  }, [setTheme]);

  const categories = ['All', ...new Set(data.achievements.map((a) => a.category))];

  const filteredAchievements =
    selectedCategory === 'All'
      ? data.achievements
      : data.achievements.filter((a) => a.category === selectedCategory);

  return (
    <>
      <SEO
        title="Achievements & Highlights"
        description="Selected outcomes, milestones, and technical highlights from my professional and project work"
      />
      <div className="min-h-screen py-24 px-4" style={{ background: 'var(--theme-background)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-8 text-center"
            style={{ color: 'var(--theme-text)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data.title}
          </motion.h1>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                style={
                  selectedCategory === category
                    ? { background: 'var(--theme-gradient)' }
                    : {}
                }
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ background: 'var(--theme-primary)' }}>
                    <Trophy size={24} color="white" />
                  </div>
                  <div className="flex-1">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full"
                      style={{
                        background: 'var(--theme-accent)',
                        color: 'var(--theme-background)',
                      }}
                    >
                      {achievement.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--theme-text)' }}>
                  {achievement.title}
                </h3>
                {achievement.context && (
                  <p className="text-sm mb-2" style={{ color: 'var(--theme-accent)' }}>
                    {achievement.context}
                  </p>
                )}
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{achievement.description}</p>
                <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--theme-primary)' }}>
                  <CalendarRange size={16} />
                  <span>{achievement.timeframe}</span>
                </div>
                {achievement.highlights && achievement.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {achievement.highlights.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-300">
                        <span style={{ color: 'var(--theme-primary)' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
