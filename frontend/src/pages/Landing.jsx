import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaSatellite, FaArrowRight } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';

/* ── Animated satellite dot in orbit ── */
const OrbitAnimation = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
    <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
    <circle cx="100" cy="100" r="55" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    <circle cx="100" cy="100" r="30" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <circle cx="100" cy="100" r="6" fill="rgba(255,255,255,0.15)" />
    {/* Orbiting dot 1 */}
    <circle cx="100" cy="20" r="4" fill="white" opacity="0.9">
      <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="14s" repeatCount="indefinite" />
    </circle>
    {/* Orbiting dot 2 */}
    <circle cx="100" cy="45" r="2.5" fill="white" opacity="0.5">
      <animateTransform attributeName="transform" type="rotate" from="180 100 100" to="540 100 100" dur="22s" repeatCount="indefinite" />
    </circle>
    {/* Orbiting dot 3 */}
    <circle cx="100" cy="70" r="2" fill="white" opacity="0.35">
      <animateTransform attributeName="transform" type="rotate" from="90 100 100" to="450 100 100" dur="9s" repeatCount="indefinite" />
    </circle>
  </svg>
);

/* ── Star particles ── */
const Stars = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 5,
    dur: Math.random() * 4 + 2,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.05, 0.5, 0.05] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

const features = [
  { num: '01', title: 'Real-Time Tracking', desc: 'Live orbital data from Space-Track.org using Two-Line Element sets, updated every 6 hours for all active ISRO satellites.' },
  { num: '02', title: 'Pass Prediction', desc: 'Compute exact satellite overpass windows for your GPS coordinates — azimuth, elevation, and duration.' },
  { num: '03', title: 'Interactive Map', desc: 'Full globe view with satellite ground tracks, live position markers, and coverage footprints on Leaflet.' },
  { num: '04', title: 'Disaster Support', desc: 'Access ISRO satellite data for disaster monitoring, crop surveillance, and emergency response operations.' },
  { num: '05', title: 'Learning Hub', desc: 'Deep-dive into orbital mechanics, ISRO missions, Gaganyaan, launch vehicles, and India\'s space history.' },
  { num: '06', title: 'Atma Nirbhar', desc: 'Celebrating India\'s indigenous space achievements and the Atma Nirbhar Bharat mission in space technology.' },
];

const stats = [
  { value: '50+', label: 'ISRO Satellites' },
  { value: '6 hr', label: 'TLE Refresh Cycle' },
  { value: '±30s', label: 'Pass Accuracy' },
  { value: '2', label: 'Languages' },
];

export default function Landing() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-[60px]"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="1.5" opacity="0.25" />
            <circle cx="20" cy="20" r="4" fill="white" />
            <circle cx="20" cy="4" r="2.5" fill="white" opacity="0.9">
              <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="20s" repeatCount="indefinite" />
            </circle>
          </svg>
          <span className="font-condensed font-bold uppercase tracking-[0.14em] text-sm text-white hidden sm:block">
            Swadeshi Space Innovation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login"
            className="font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-white/50 hover:text-white px-4 py-2 transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
            Login
          </Link>
          <Link to="/signup"
            className="font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-black bg-white hover:bg-white/85 px-4 py-2 transition-colors">
            Sign Up
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">

        {/* Background — dark space gradient */}
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 80% 60% at 60% 30%, rgba(30,20,60,0.8) 0%, #000 70%)'
          }} />
          {/* Orbital graphic — right side */}
          <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[55vw] max-w-[700px] opacity-[0.18]">
            <OrbitAnimation />
          </div>
          <Stars />
        </motion.div>

        {/* Content — bottom-left like SpaceX */}
        <motion.div className="relative z-10 w-full" style={{ y: textY, opacity }}>
          <div className="container-spacex pb-20 pt-40">
            <motion.p
              className="label-text mb-6"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              🇮🇳 &nbsp; Swadeshi Space Innovation
            </motion.p>

            <motion.h1
              className="font-condensed font-black uppercase text-white mb-6"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', lineHeight: 1, letterSpacing: '0.02em' }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            >
              Track India's<br />
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>Satellites</span>
            </motion.h1>

            <motion.p
              className="text-white/62 max-w-lg mb-10 text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            >
              Predict overpass times, explore live orbital maps, and learn about ISRO's
              landmark missions — in real time.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            >
              <Link to="/signup" className="btn-spacex-filled flex items-center gap-2">
                Get Started <FaArrowRight size={11} />
              </Link>
              <Link to="/login" className="btn-spacex">
                Sign In
              </Link>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              className="flex flex-col items-center gap-1 mt-20 w-fit"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            >
              <span className="label-text text-[0.55rem]">Scroll</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                <HiChevronDown className="text-white/30" size={18} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-spacex">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="py-10 px-6 first:pl-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-condensed font-black text-white uppercase mb-1"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.02em' }}>
                  {value}
                </p>
                <p className="label-text text-[0.6rem]">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-28">
        <div className="container-spacex">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Left: heading */}
            <div className="lg:sticky lg:top-28">
              <motion.p className="label-text mb-5"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Platform Capabilities
              </motion.p>
              <motion.h2 className="font-condensed font-black uppercase text-white mb-6"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.03em' }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                Built for Precision.<br />
                <span className="text-white/40">Designed for India.</span>
              </motion.h2>
              <motion.p className="text-white/62 max-w-sm text-sm leading-relaxed"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                A comprehensive satellite intelligence platform powered by real orbital data,
                precise propagation algorithms, and ISRO mission archives.
              </motion.p>
            </div>

            {/* Right: feature list */}
            <div>
              {features.map(({ num, title, desc }, i) => (
                <motion.div
                  key={num}
                  className="py-6 cursor-pointer group"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setActiveFeature(activeFeature === num ? null : num)}
                >
                  <div className="flex items-start gap-5">
                    <span className="font-condensed text-[0.6rem] tracking-[0.2em] text-white/25 pt-1 shrink-0 group-hover:text-white/60 transition-colors">
                      {num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-condensed font-bold uppercase text-white/80 group-hover:text-white transition-colors"
                          style={{ fontSize: '1rem', letterSpacing: '0.08em' }}>
                          {title}
                        </h3>
                        <HiChevronDown size={14} className={`text-white/25 shrink-0 transition-transform duration-200 ${activeFeature === num ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {activeFeature === num && (
                          <motion.p
                            className="text-white/45 text-sm leading-relaxed mt-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28" style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container-spacex">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="label-text mb-4">How It Works</p>
            <h2 className="font-condensed font-black uppercase text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.03em' }}>
              From Sign-Up to<br />
              <span className="text-white/40">Orbit Prediction</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { n: '01', t: 'Create Account', d: 'Sign up in seconds. No credit card required.' },
              { n: '02', t: 'Allow Location', d: 'Share your GPS coordinates for precise local predictions.' },
              { n: '03', t: 'Select Satellite', d: 'Choose from 50+ ISRO satellites including CARTOSAT & RISAT.' },
              { n: '04', t: 'Predict & Watch', d: 'Get exact pass times, directions, and elevation angles.' },
            ].map(({ n, t: title, d }, i) => (
              <motion.div
                key={n}
                className="p-8 group"
                style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-condensed font-black text-white/10 mb-6 group-hover:text-white/20 transition-colors"
                  style={{ fontSize: '4rem', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {n}
                </p>
                <h3 className="font-condensed font-bold uppercase text-white mb-3"
                  style={{ fontSize: '0.95rem', letterSpacing: '0.1em' }}>
                  {title}
                </h3>
                <p className="text-white/62 text-sm leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 relative overflow-hidden">
        {/* Subtle background satellite visual */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45vw] max-w-[500px] opacity-[0.06] pointer-events-none">
          <OrbitAnimation />
        </div>

        <div className="container-spacex relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="label-text mb-6">
              <FaSatellite className="inline mr-2 opacity-60" size={10} />
              Free Access — No Payment Required
            </p>
            <h2
              className="font-condensed font-black uppercase text-white mb-8"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 1, letterSpacing: '0.02em' }}
            >
              Watch ISRO<br />
              <span className="text-white/40">Satellites Pass</span>
            </h2>
            <p className="text-white/62 max-w-md text-sm leading-relaxed mb-10">
              Join thousands of observers tracking India's space assets.
              Predict passes for your location in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/signup" className="btn-spacex-filled flex items-center gap-2">
                Create Account <FaArrowRight size={11} />
              </Link>
              <Link to="/login" className="btn-spacex">
                Already Registered
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container-spacex py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {[
              { h: 'Platform', links: [{ l: 'Sign Up', to: '/signup' }, { l: 'Login', to: '/login' }] },
              { h: 'Services', links: [{ l: 'Live Map', to: '/map' }, { l: 'Disaster Support', to: '/disaster-support' }, { l: 'Self Reliance', to: '/self-reliance' }] },
              { h: 'Learn', links: [{ l: 'Orbits', to: '/learn/orbits' }, { l: 'Launchers', to: '/learn/launchers' }, { l: 'Gaganyaan', to: '/learn/gaganyaan' }, { l: 'ISRO History', to: '/learn/history' }] },
              { h: 'Data Sources', links: [{ l: 'Space-Track.org', href: 'https://www.space-track.org' }, { l: 'OpenWeather API', href: 'https://openweathermap.org' }, { l: 'ISRO Official', href: 'https://www.isro.gov.in' }] },
            ].map(({ h, links }) => (
              <div key={h}>
                <p className="label-text mb-5">{h}</p>
                <ul className="space-y-3">
                  {links.map(({ l, to, href }) => (
                    <li key={l}>
                      {to ? (
                        <Link to={to} className="font-condensed text-[0.7rem] uppercase tracking-[0.12em] text-white/35 hover:text-white transition-colors">{l}</Link>
                      ) : (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="font-condensed text-[0.7rem] uppercase tracking-[0.12em] text-white/35 hover:text-white transition-colors">{l}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="divider-x mb-6" />
          <p className="font-condensed text-[0.6rem] uppercase tracking-[0.18em] text-white/20">
            © {new Date().getFullYear()} Swadeshi Space Innovation. All rights reserved. &nbsp;🇮🇳 Made in India.
          </p>
        </div>
      </footer>
    </div>
  );
}
