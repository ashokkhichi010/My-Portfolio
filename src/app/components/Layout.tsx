import { Outlet } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { ScrollToTop } from './ScrollToTop';
import { useScrollToTop } from '../hooks/useScrollToTop';

export const Layout = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};
