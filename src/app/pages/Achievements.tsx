import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import achievementsData from '../data/achievements.json';
import type { AchievementsData } from '../types';
import { CalendarRange } from 'lucide-react';

const data = achievementsData as AchievementsData;

export const Achievements = () => {
  const { setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setTheme('achievements');
    trackPageView('Achievements');
  }, [setTheme]);

  const categories = useMemo(
    () => ['All', ...new Set(data.achievements.map((a) => a.category))],
    []
  );

  const filtered = useMemo(
    () =>
      selectedCategory === 'All'
        ? data.achievements
        : data.achievements.filter((a) => a.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <>
      <SEO
        title="Achievements"
        description="Selected outcomes and milestones"
      />

      <section
        className="min-h-screen px-4 py-24"
        style={{ background: 'var(--theme-background)' }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.h1
            className="mb-14 text-center text-4xl font-bold md:text-6xl"
            style={{ color: 'var(--theme-text)' }}
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data.title}
          </motion.h1>

          <div className="grid gap-12 md:grid-cols-[220px_1fr]">
            <aside className="md:sticky md:top-24 md:self-start">
              <div className="mb-5 text-xs uppercase tracking-[0.22em] text-gray-500">
                Filter by category
              </div>

              <div className="flex flex-wrap gap-3 md:flex-col md:gap-2">
                {categories.map((category) => {
                  const count =
                    category === 'All'
                      ? data.achievements.length
                      : data.achievements.filter((a) => a.category === category)
                        .length;

                  const active = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center justify-between rounded-full border px-4 py-2 text-sm transition md:rounded-xl md:px-3 md:py-2 ${active
                          ? 'border-white/30 bg-white/10 text-white'
                          : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                        }`}
                    >
                      <span>{category}</span>
                      <span className="ml-3 text-xs text-gray-500">{count}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="space-y-0">
              {filtered.map((item, index) => (
                <motion.article
                  key={`${item.title}-${index}`}
                  className="border-t border-white/10 py-6 first:border-t-0 first:pt-0"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gray-500">
                        <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] tracking-[0.2em] text-gray-400">
                          {item.category}
                        </span>
                      </div>

                      <h3
                        className="text-xl font-semibold md:text-2xl"
                        style={{ color: 'var(--theme-text)' }}
                      >
                        {item.title}
                      </h3>

                      {item.context && (
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">
                          {item.context}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-500">
                      <CalendarRange size={14} />
                      <span>{item.timeframe}</span>
                    </div>
                  </div>

                  <p className="mt-4 max-w-4xl text-sm leading-relaxed text-gray-300 md:text-base">
                    {item.description}
                  </p>

                  {item.highlights?.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm leading-relaxed text-gray-300 md:text-[15px]"
                        >
                          <span style={{ color: 'var(--theme-primary)' }}>•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};