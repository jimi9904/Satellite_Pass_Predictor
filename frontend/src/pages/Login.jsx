import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const OrbitBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Stars */}
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
    {/* Orbit rings */}
    <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04]">
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
        <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="55" stroke="white" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="30" stroke="white" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="5" fill="white" opacity="0.5" />
        <circle cx="100" cy="20" r="3" fill="white">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="18s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  </div>
);

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || t('app.login.invalidCredentials'));
    } finally {
      setLoading(false);
    }
  };

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
        <Link to="/signup" className="font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-white/40 hover:text-white transition-colors">
          No account? Sign up →
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
          {/* Label */}
          <p className="font-condensed text-[0.65rem] uppercase tracking-[0.25em] text-white/55 mb-4">
            Access Portal
          </p>

          <h1 className="font-condensed font-black uppercase text-white mb-10"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '0.03em', lineHeight: 1 }}>
            {t('app.login.title')}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-0">
            {/* Email */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }} className="mb-0">
              <label className="font-condensed text-[0.6rem] uppercase tracking-[0.2em] text-white/55 block mb-2">
                {t('app.login.email')}
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full bg-transparent text-white text-base pb-4 border-none outline-none focus:outline-none"
                style={{ caretColor: 'white' }}
              />
            </div>

            {/* Password */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }} className="pt-6 mb-8">
              <label className="font-condensed text-[0.6rem] uppercase tracking-[0.2em] text-white/55 block mb-2">
                {t('app.login.password')}
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-transparent text-white text-base pb-4 border-none outline-none focus:outline-none"
                style={{ caretColor: 'white' }}
              />
            </div>

            {/* Error */}
            {error && (
              <motion.p
                className="font-condensed text-[0.7rem] uppercase tracking-[0.1em] text-red-400 mb-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                ⚠ {error}
              </motion.p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full font-condensed font-bold text-[0.75rem] uppercase tracking-[0.2em] flex items-center justify-center gap-3 py-4 transition-all disabled:opacity-40"
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
                  Authenticating...
                </span>
              ) : (
                <>
                  {t('app.login.button')} <FaArrowRight size={10} />
                </>
              )}
            </motion.button>
          </form>

          <p className="font-condensed text-[0.65rem] uppercase tracking-[0.15em] text-white/45 mt-8">
            {t('app.login.noAccount')}{' '}
            <Link to="/signup" className="text-white/70 hover:text-white transition-colors underline underline-offset-4">
              {t('app.login.signUp')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
