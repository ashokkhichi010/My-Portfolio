import { Outlet, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { ScrollToTop } from './ScrollToTop';

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    const routeKey = location.pathname === '/' ? 'mission-control' : location.pathname.replace(/\//g, '-');
    document.documentElement.dataset.routeTheme = routeKey;
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-[var(--theme-text)] transition-colors duration-700">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>
      <ScrollToTop />
    </div>
  );
};
