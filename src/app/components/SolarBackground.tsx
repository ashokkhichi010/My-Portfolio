import { motion, useScroll, useTransform } from 'motion/react';

export const SolarBackground = () => {
  const { scrollYProgress } = useScroll();

  const hue = useTransform(scrollYProgress, [0, 1], [0, 210]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <motion.div
      className="solar-background"
      style={{
        filter: useTransform(hue, (v) => `hue-rotate(${v}deg)`),
        scale,
      }}
    >
      {/* Base */}
      <div className="solar-backdrop-grid" />
      <div className="solar-starfield" />

      {/* 🌌 ORBITS */}
      <div className="solar-orbit orbit-1" />
      <div className="solar-orbit orbit-2" />
      <div className="solar-orbit orbit-3" />

      {/* 🪐 PLANETS */}
      <motion.div className="planet planet-1" />
      <motion.div className="planet planet-2" />
      <motion.div className="planet planet-3" />

      {/* ☄️ METEORS */}
      <div className="meteor meteor-1" />
      <div className="meteor meteor-2" />
      <div className="meteor meteor-3" />

      {/* 🌫 NEBULA */}
      <div className="solar-nebula solar-nebula-a" />
      <div className="solar-nebula solar-nebula-b" />

      {/* 📐 MATH RINGS */}
      <div className="solar-math-ring solar-math-ring-a" />
      <div className="solar-math-ring solar-math-ring-b" />
    </motion.div>
  );
};