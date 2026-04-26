import { useEffect, useRef } from 'react';
import { trackSectionView } from '../utils/analytics';
import { useTheme } from '../context/ThemeContext';

export const useSectionAnalytics = (sectionName: string, themeName?: string) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let hasTracked = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || hasTracked || !entry.isIntersecting) return;

        hasTracked = true;
        trackSectionView(sectionName);
        observer.disconnect();
      },
      {
        threshold: 0.45,
        rootMargin: '-10% 0px -10% 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [sectionName]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !themeName) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        document.documentElement.dataset.activeSection = themeName;
        setTheme(themeName);
      },
      {
        threshold: 0.35,
        rootMargin: '-18% 0px -32% 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [setTheme, themeName]);

  return sectionRef;
};
