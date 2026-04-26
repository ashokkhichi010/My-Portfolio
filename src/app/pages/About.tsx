import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import aboutData from '../data/about.json';
import type { AboutData } from '../types';
import { useSectionAnalytics } from '../hooks/useSectionAnalytics';
import { SectionHeader } from '../components/SectionHeader';

const data: AboutData = aboutData;

export const About = () => {
  const sectionRef = useSectionAnalytics('About', 'about');
  const [step, setStep] = useState(0);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= data.story.length) clearInterval(interval);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="control-section section-about about-scanlines relative min-h-screen overflow-hidden px-6 py-24 text-white"
    >
      <SectionHeader
        code="02_MERCURY_VENUS_ABOUT"
        title={data.title}
        description="A closer look at how I think, what I build, and why I focus on practical software, scalable systems, and hardware-connected products."
      />

      <div className="section-grid relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="section-shell system-frame rounded-[28px] p-6 font-system-mono text-sm"
        >
          <div className="mb-6 flex items-center gap-3 text-xs text-[var(--section-accent)]">
            <span className="tracking-[0.3em]">THERMAL</span>
            <span
              className="h-px flex-1"
              style={{ background: 'color-mix(in srgb, var(--section-accent) 25%, transparent)' }}
            />
            <span className="text-white/40">system://about/init</span>
          </div>

          <div
            className="space-y-4"
            style={{ color: 'color-mix(in srgb, var(--section-accent) 85%, white 15%)' }}
          >
            <div>Booting profile...</div>
            <div>Loading intelligence...</div>

            {data.story.slice(0, step).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/80"
              >
                {`> ${line}`}
              </motion.div>
            ))}

            {step < data.story.length ? (
              <span className="animate-pulse text-white">|</span>
            ) : null}
          </div>
        </motion.div>

        <div className="grid content-start gap-4">
          {data.highlights.map((item, i) => {
            if (i >= step) return null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="system-shell relative overflow-hidden rounded-[24px] p-5"
              >
                <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--section-accent)] to-transparent" />
                <div className="mb-2 font-system-mono text-xs text-[var(--section-accent)]">
                  HEAT_SIGNAL_{String(i + 1).padStart(2, '0')}
                </div>
                <div className="text-lg text-white/90">{item}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
