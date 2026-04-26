import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Twitter, Code, Phone } from 'lucide-react';
import { trackContactClick } from '../utils/analytics';
import contactData from '../data/contact.json';
import type { ContactData } from '../types';
import { useSectionAnalytics } from '../hooks/useSectionAnalytics';
import { SectionHeader } from '../components/SectionHeader';

const data: ContactData = contactData;

const getIcon = (iconName: string): ReactNode => {
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
  const sectionRef = useSectionAnalytics('Contact', 'contact');

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="control-section section-contact contact-waves flex min-h-screen items-center justify-center px-4 py-24"
    >
      <div className="section-shell system-shell-strong relative mx-auto w-full max-w-3xl rounded-[32px] px-8 py-12 text-center">
        <SectionHeader
          code="09_DEEP_SPACE_CONTACT"
          title={data.title}
          description="Reach out for collaboration, backend and full stack opportunities, IoT conversations, or product ideas with real-world value."
        />

        <motion.p
          className="system-copy mx-auto mb-12 max-w-2xl text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {data.description}
        </motion.p>

        <div
          className="mx-auto mb-8 max-w-xl overflow-hidden rounded-full bg-white/[0.04] p-1"
          style={{ border: '1px solid color-mix(in srgb, var(--section-accent) 20%, transparent)' }}
        >
          <div className="h-2 w-full rounded-full bg-[linear-gradient(90deg,rgba(126,255,195,0.2),rgba(94,220,255,0.92),rgba(126,255,195,0.2))] animate-pulse" />
        </div>
        <div className="mb-10 font-system-mono text-xs uppercase tracking-[0.28em] text-[var(--section-accent)]">
          Message Transmitting...
        </div>

        <motion.a
          href={`mailto:${data.email}`}
          onClick={() => trackContactClick('email')}
          className="bg-theme-gradient inline-flex items-center gap-3 rounded-full px-8 py-4 font-system-mono text-lg font-semibold text-slate-950 shadow-[0_0_40px_rgba(115,240,255,0.22)] transition-all hover:scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <Mail size={24} />
          {data.email}
        </motion.a>

        <motion.div
          className="mt-12 flex justify-center gap-6"
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
              className="system-shell flex h-14 w-14 items-center justify-center rounded-full text-[var(--theme-text)] transition-all"
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
    </section>
  );
};
