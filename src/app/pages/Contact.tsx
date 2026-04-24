import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { trackPageView, trackContactClick } from '../utils/analytics';
import contactData from '../data/contact.json';
import type { ContactData } from '../types';
import { Mail, Github, Linkedin, Twitter, Code, Phone } from 'lucide-react';

const data: ContactData = contactData;

const getIcon = (iconName: string) => {
  const icons: Record<string, ReactNode> = {
    Github: <Github size={24} />,
    Linkedin: <Linkedin size={24} />,
    Twitter: <Twitter size={24} />,
    Whatsapp: <Phone size={24} />,
    Code: <Code size={24} />,
  };
  return icons[iconName] || <Code size={24} />;
};

export const Contact = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('contact');
    trackPageView('Contact');
  }, [setTheme]);

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with me for collaboration, opportunities, or just to say hello"
      />
      <div className="min-h-screen flex items-center justify-center py-24 px-4" style={{ background: 'var(--theme-background)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-8"
            style={{ color: 'var(--theme-text)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data.title}
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {data.description}
          </motion.p>

          {/* Email */}
          <motion.a
            href={`mailto:${data.email}`}
            onClick={() => trackContactClick('email')}
            className="inline-flex items-center gap-3 px-8 py-4 mb-12 rounded-full text-white font-semibold text-lg hover:scale-105 transition-all"
            style={{ background: 'var(--theme-gradient)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Mail size={24} />
            {data.email}
          </motion.a>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {data.social.map((social, index) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick(social.platform)}
                className="p-4 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all"
                style={{ color: 'var(--theme-text)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                title={social.platform}
              >
                {getIcon(social.icon)}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};
