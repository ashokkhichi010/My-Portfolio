import { motion } from 'motion/react';
import journeyData from '../data/journey.json';
import type { JourneyData } from '../types';
import { useSectionAnalytics } from '../hooks/useSectionAnalytics';
import { SectionHeader } from '../components/SectionHeader';

const data = journeyData as JourneyData;

export const Journey = () => {
  const sectionRef = useSectionAnalytics('Journey', 'journey');

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="control-section section-journey saturn-rings min-h-screen px-4 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          code="06_SATURN_JOURNEY"
          title={data.title}
          description="A timeline of the decisions, transitions, and turning points that moved me from learning software to building real systems."
          align="left"
        />

        <div className="journey-axis relative">
          {data.timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative mb-12 pl-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-[var(--theme-accent)] shadow-[0_0_14px_var(--theme-accent)]" />

              <div className="section-shell rounded-[24px] p-5">
                <span className="font-system-mono text-sm font-semibold text-theme-primary">
                  {item.year}
                </span>

                <h3 className="mt-1 text-xl font-bold text-[var(--theme-text)] md:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-2 leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
