import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView } from '../utils/analytics';
import educationData from '../data/education.json';
import type { EducationData } from '../types';
import { GraduationCap, Award } from 'lucide-react';

const data: EducationData = educationData;

export const Education = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('education');
    trackPageView('Education');
  }, [setTheme]);

  return (
    <>
      <SEO
        title="Education"
        description="My academic background and educational achievements"
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

          <div className="space-y-8">
            {data.education.map((edu, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-xl bg-white/5 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg" style={{ background: 'var(--theme-primary)' }}>
                    <GraduationCap size={32} color="white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--theme-text)' }}>
                      {edu.degree}
                    </h3>
                    <p className="text-xl mb-1" style={{ color: 'var(--theme-accent)' }}>
                      {edu.field}
                    </p>
                    <p className="text-lg text-gray-300 mb-1">{edu.institution}</p>
                    <p className="text-sm text-gray-400">{edu.duration}</p>
                    {edu.gpa && (
                      <p className="mt-2 font-semibold" style={{ color: 'var(--theme-primary)' }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                </div>

                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="mt-6">
                    <h4
                      className="flex items-center gap-2 text-lg font-semibold mb-3"
                      style={{ color: 'var(--theme-accent)' }}
                    >
                      <Award size={20} />
                      Achievements
                    </h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <span style={{ color: 'var(--theme-primary)' }}>•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
