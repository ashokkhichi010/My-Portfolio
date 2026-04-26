import { motion } from 'motion/react';
import { Target, Zap, Heart } from 'lucide-react';
import visionData from '../data/vision.json';
import type { VisionData } from '../types';
import { useSectionAnalytics } from '../hooks/useSectionAnalytics';
import { SectionHeader } from '../components/SectionHeader';

const data: VisionData = visionData;

export const Vision = () => {
  const sectionRef = useSectionAnalytics('Vision', 'vision');

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="control-section section-vision min-h-screen px-4 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          code="08_PLUTO_EDGE_VISION"
          title={data.title}
          description="The long-term direction behind my work: building simple, reliable, affordable systems by combining software with connected hardware."
        />

        <motion.div
          className="section-shell mb-16 rounded-[28px] p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-center text-xl leading-relaxed text-[var(--theme-text)]">
            {data.vision}
          </p>
        </motion.div>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <motion.div
            className="section-shell rounded-[24px] p-6"
            initial={{ opacity: 0, x: -20, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg p-3" style={{ background: 'var(--theme-primary)' }}>
                <Zap size={24} color="black" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--theme-text)]">
                Short-Term Goals
              </h2>
            </div>
            <ul className="space-y-3">
              {data.goals.shortTerm.map((goal, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span style={{ color: 'var(--theme-accent)' }}>•</span>
                  <span>{goal}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="section-shell rounded-[24px] p-6"
            initial={{ opacity: 0, x: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg p-3" style={{ background: 'var(--theme-primary)' }}>
                <Target size={24} color="black" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--theme-text)]">
                Long-Term Goals
              </h2>
            </div>
            <ul className="space-y-3">
              {data.goals.longTerm.map((goal, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 text-gray-300"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span style={{ color: 'var(--theme-accent)' }}>•</span>
                  <span>{goal}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="section-shell rounded-[24px] p-6"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.8 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg p-3" style={{ background: 'var(--theme-primary)' }}>
              <Heart size={24} color="black" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--theme-text)]">
              Core Values
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {data.values.map((value, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-2 text-gray-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.05 }}
              >
                <span style={{ color: 'var(--theme-accent)' }}>•</span>
                <span>{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
