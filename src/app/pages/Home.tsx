import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import homeData from '../data/home.json';
import type { HomeData } from '../types';

const data: HomeData = homeData;

export const Home = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('home');
    trackPageView('Home');
  }, [setTheme]);

  return (
    <>
      <SEO
        title="Home"
        description={data.description}
        keywords="developer, portfolio, full-stack developer"
      />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--theme-background)' }}>
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -top-48 -left-48"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl -bottom-48 -right-48"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ color: 'var(--theme-text)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {data.title}
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl mb-8"
              style={{ color: 'var(--theme-accent)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {data.subtitle}
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl mb-12 text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {data.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to={data.cta.link}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all hover:scale-105"
                style={{ background: 'var(--theme-gradient)' }}
              >
                {data.cta.text}
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
