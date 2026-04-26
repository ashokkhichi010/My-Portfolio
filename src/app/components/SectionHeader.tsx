import { motion } from 'motion/react';

interface SectionHeaderProps {
  code: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionHeader = ({
  title,
  description,
  align = 'center',
}: SectionHeaderProps) => {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`mx-auto mb-14 flex max-w-3xl flex-col gap-4 ${alignment}`}
    >
      <div className="section-header-code">
      </div>
      <h1 className="section-heading">{title}</h1>
      {description ? (
        <p className="system-copy max-w-2xl text-sm leading-7 md:text-base">{description}</p>
      ) : null}
    </motion.div>
  );
};
