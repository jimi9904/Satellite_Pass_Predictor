import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Button = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  ariaLabel,
  ...props
}) => {
  const { t } = useTranslation();

  const variantStyles = {
    primary: {
      background: '#ffffff',
      color: '#000000',
      border: '1px solid #ffffff',
    },
    secondary: {
      background: 'transparent',
      color: '#ffffff',
      border: '1px solid rgba(255,255,255,0.25)',
    },
    outline: {
      background: 'transparent',
      color: '#ffffff',
      border: '1px solid rgba(255,255,255,0.2)',
    },
  };

  const hoverStyles = {
    primary: { background: 'transparent', color: '#ffffff' },
    secondary: { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.4)' },
    outline: { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.4)' },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : t('app.common.submit'))}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-condensed font-semibold text-[0.75rem] uppercase tracking-[0.18em] disabled:opacity-40 disabled:cursor-not-allowed transition-all ${className}`}
      style={{ ...variantStyles[variant], borderRadius: 0 }}
      whileHover={!disabled && !loading ? hoverStyles[variant] : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {t('app.common.loading')}
        </span>
      ) : children}
    </motion.button>
  );
};

export default Button;
