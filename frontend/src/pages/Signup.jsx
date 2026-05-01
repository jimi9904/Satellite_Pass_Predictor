import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const OrbitBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 50 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          width: Math.random() * 1.5 + 0.5,
          height: Math.random() * 1.5 + 0.5,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{ opacity: [0.05, 0.4, 0.05] }}
        transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 5 }}
      />
    ))}
    <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.04]">
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
        <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="55" stroke="white" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="5" fill="white" opacity="0.5" />
        <circle cx="100" cy="20" r="3" fill="white">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="22s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  </div>
);

const Signup = () => {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || t('app.signup.failed'));
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', type: 'text', label: t('app.signup.name'), placeholder: 'Full Name' },
    { name: 'email', type: 'email', label: t('app.signup.email'), placeholder: 'your@email.com' },
    { name: 'password', type: 'password', label: t('app.signup.password'), placeholder: '••••••••', minLength: 6 },
  ];

  return (
    <div className="relative min-h-screen bg-black flex flex-col" style={{ fontFamily: 'Barlow, sans-serif' }}>
      <OrbitBg />

      {/* Mini Nav */}
      <div className="relative z-10 flex items-center justify-between px-8 h-[60px]"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Link to="/" className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="1.5" opacity="0.2" />
            <circle cx="20" cy="20" r="4" fill="white" />
            <circle cx="20" cy="4" r="2.5" fill="white" opacity="0.8">
              <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="20s" repeatCount="indefinite" />
            </circle>
          </svg>
          <span className="font-condensed font-bold uppercase tracking-[0.14em] text-[0.7rem] text-white/60">
            Swadeshi Space
          </span>
        </Link>
        <Link to="/login" className="font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-white/40 hover:text-white transition-colors">
          Have an account? Login →
        </Link>
      </div>

      {/* Form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <p className="font-condensed text-[0.65rem] uppercase tracking-[0.25em] text-white/55 mb-4">
            Mission Control Access
          </p>

          <h1 className="font-condensed font-black uppercase text-white mb-10"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '0.03em', lineHeight: 1 }}>
            {t('app.signup.title')}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-0">
            {fields.map(({ name, type, label, placeholder, minLength }, i) => (
              <div
                key={name}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
                className={i > 0 ? 'pt-5 mb-0' : 'mb-0'}
              >
                <label className="font-condensed text-[0.6rem] uppercase tracking-[0.2em] text-white/55 block mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  minLength={minLength}
                  className="w-full bg-transparent text-white text-base pb-4 border-none outline-none focus:outline-none"
                  style={{ caretColor: 'white' }}
                />
              </div>
            ))}

            {error && (
              <motion.p
                className="font-condensed text-[0.7rem] uppercase tracking-[0.1em] text-red-400 pt-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                ⚠ {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full mt-8 font-condensed font-bold text-[0.75rem] uppercase tracking-[0.2em] flex items-center justify-center gap-3 py-4 transition-all disabled:opacity-40"
              style={{ background: '#fff', color: '#000', border: '1px solid #fff' }}
              whileHover={!loading ? { background: 'transparent', color: '#fff' } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                <>
                  {t('app.signup.button')} <FaArrowRight size={10} />
                </>
              )}
            </motion.button>
          </form>

          <p className="font-condensed text-[0.65rem] uppercase tracking-[0.15em] text-white/45 mt-8">
            {t('app.signup.hasAccount')}{' '}
            <Link to="/login" className="text-white/70 hover:text-white transition-colors underline underline-offset-4">
              {t('app.signup.login')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
