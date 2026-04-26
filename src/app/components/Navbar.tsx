import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#journey', label: 'Journey' },
  { href: '#skills', label: 'Skills' },
  { href: '#vision', label: 'Vision' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <div className="system-shell mx-auto max-w-7xl rounded-[28px] px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#mission"
            className="flex items-center gap-3 text-white transition-colors hover:text-[var(--theme-primary)]"
          >
            <img
              src="/logo.svg"
              alt="Ashok Kumar logo"
              className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 object-cover"
            />
            <div>
              <div className="font-system-mono text-xs uppercase tracking-[0.28em] text-white/45">Mission Control</div>
              <div className="text-lg font-semibold">Ashok Kumar</div>
            </div>
          </a>

          <div className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-transparent px-4 py-2 font-system-mono text-sm font-medium text-white/72 transition-all hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-2 text-white lg:hidden"
            aria-label="Toggle mission navigation"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 grid gap-2 border-t border-white/10 pt-3 lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm font-medium text-white/78 transition-all hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
