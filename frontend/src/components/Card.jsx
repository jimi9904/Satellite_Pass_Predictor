import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'medium',
  className = '',
  hover = true,
  ...props
}) => {
  const paddings = { large: 'p-8', medium: 'p-6', small: 'p-4' };

  const base = `bg-[#0a0a0a] border border-white/8 ${paddings[variant]} ${className}`.trim();

  if (hover) {
    return (
      <motion.div
        className={base}
        style={{ borderRadius: 0 }}
        whileHover={{ borderColor: 'rgba(255,255,255,0.2)', backgroundColor: '#0f0f0f' }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={base} style={{ borderRadius: 0 }} {...props}>
      {children}
    </div>
  );
};

export default Card;
