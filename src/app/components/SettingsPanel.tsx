import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X } from 'lucide-react';

interface SettingsPanelProps {
  autoNavEnabled: boolean;
  onToggleAutoNav: (enabled: boolean) => void;
}

export const SettingsPanel = ({ autoNavEnabled, onToggleAutoNav }: SettingsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Settings Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-8 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Settings"
      >
        <Settings size={24} />
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-slate-900 border-l border-white/10 z-50 p-6 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Settings Options */}
              <div className="space-y-6">
                {/* Auto Navigation Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="auto-nav" className="text-white font-medium">
                      Auto Page Navigation
                    </label>
                    <button
                      id="auto-nav"
                      onClick={() => onToggleAutoNav(!autoNavEnabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        autoNavEnabled ? 'bg-indigo-600' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 bg-white rounded-full"
                        animate={{ left: autoNavEnabled ? '28px' : '4px' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Automatically navigate to the next page when you scroll to the bottom
                  </p>
                </div>

                {/* Info */}
                <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-2">About Auto Navigation</h3>
                  <p className="text-xs text-gray-400">
                    When enabled, scrolling to the bottom of a page will show a hint and automatically
                    navigate to the next page after 1.5 seconds. You can still navigate manually using
                    the navbar.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
