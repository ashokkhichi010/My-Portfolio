import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import homeData from '../data/home.json';
import type { HomeData } from '../types';
import { useSectionAnalytics } from '../hooks/useSectionAnalytics';
import { SectionHeader } from '../components/SectionHeader';

const data: HomeData = homeData;
const roles = data.roles;

export const HeroSection = () => {
  const sectionRef = useSectionAnalytics('Hero', 'home');
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= roles.length) return;

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(roles[index].substring(0, subIndex + 1));
        setSubIndex(subIndex + 1);

        if (subIndex === roles[index].length) {
          setDeleting(true);
        }
      } else {
        setText(roles[index].substring(0, subIndex - 1));
        setSubIndex(subIndex - 1);

        if (subIndex === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, deleting ? 40 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="control-section section-mission home-particles relative flex min-h-screen items-center overflow-hidden px-6"
    >
      <div className="section-orb" />
      <div className="section-grid z-10 mx-auto grid max-w-7xl items-center gap-12 py-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 32 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="system-kicker">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            {data.subtitle}
          </div>

          <SectionHeader
            code="01_SUN_HERO"
            title={data.title}
            description="Full stack developer building practical software, backend systems, and emerging IoT products with a focus on clarity, reliability, and real use."
            align="left"
          />

          <div className="font-system-mono h-6 text-sm text-[var(--section-accent)] md:text-base">
            {text}
            <span className="animate-pulse">|</span>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="section-primary-btn group inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-black transition-all hover:scale-[1.05]"
            >
              View Projects
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="/Ashok-Kumar-Resume.pdf"
              download
              className="section-secondary-btn group inline-flex items-center gap-2 rounded-full px-6 py-3 text-white transition-all hover:scale-[1.04]"
            >
              Resume
              <ArrowDown
                size={18}
                className="transition-transform group-hover:translate-y-1"
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="relative flex min-h-[520px] items-center justify-center"
        >
          <div
            className="absolute h-[300px] w-[300px] rounded-full blur-[100px]"
            style={{ background: 'color-mix(in srgb, var(--section-accent) 22%, transparent)' }}
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute h-[500px] w-[500px] rounded-full border border-dashed border-white/10"
          />

          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="system-shell system-shell-strong relative z-10 flex h-56 w-56 items-center justify-center rounded-full md:h-72 md:w-72"
          >
            <img src="/logo.svg" alt="Ashok Kumar logo" className="h-28 w-28 md:h-36 md:w-36" />
          </motion.div>

          {[
            { label: 'Backend', x: 0, y: 0, size: 2 },
            { label: 'Frontend', x: 0, y: 90, size: 1.2 },
            { label: 'Realtime', x: 10, y: 30, size: 1.3 },
            { label: 'IoT', x: 0, y: 60, size: 0.8 },
            { label: 'SAAS Systems', x: 75, y: 22, size: 1.2 },
            { label: 'Product', x: 85, y: 75, size: 1.2 },
            { label: 'APIs', x: 80, y: 45, size: 2 },
            { label: 'Scalable', x: 85, y: 0, size: 1.5 },
            { label: 'WebSockets', x: 48, y: 90, size: 1.5 },
            { label: 'Flutter', x: 10, y: 70, size: 1 },
            { label: 'MongoDB', x: 40, y: 0, size: 1.5 },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              animate={{
                y: [0, -10, 0, 10, 0],
                x: [0, 6, 0, -6, 0],
                scale: [item.size, item.size * 1.05, item.size],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
              className="absolute cursor-default rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-white/80 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-[15px] transition-all hover:scale-110 hover:bg-white/10"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
