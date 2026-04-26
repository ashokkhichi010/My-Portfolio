import { useEffect } from 'react';
import { trackPageView } from '../utils/analytics';
import { HeroSection } from './Home';
import { About } from './About';
import { Experience } from './Experience';
import { Projects } from './Projects';
import { Education } from './Education';
import { Journey } from './Journey';
import { Skills } from './Skills';
import { Vision } from './Vision';
import { Contact } from './Contact';
import { SolarBackground } from '../components/SolarBackground';

export const MissionControl = () => {
  useEffect(() => {
    trackPageView('Mission Control');
  }, []);

  return (
    <div className="system-page relative text-[var(--theme-text)]">
      <SolarBackground />
      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-10 px-2 pb-24 pt-18 md:px-4">
        <HeroSection />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Journey />
        <Skills />
        <Vision />
        <Contact />
      </div>
    </div>
  );
};
