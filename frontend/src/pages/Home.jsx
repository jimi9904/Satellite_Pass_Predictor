import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiLocationMarker, HiGlobeAlt, HiSparkles, HiMap,
  HiAcademicCap, HiShieldCheck, HiLightningBolt, HiArrowRight,
  HiClock, HiArrowUp, HiSun, HiCloud, HiChevronRight,
} from 'react-icons/hi';
import { FaSatellite, FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import PassTable from '../components/PassTable';
import Select from '../components/ui/Select';

/* ─── Live Clock ─── */
const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = (v) => String(v).padStart(2, '0');
  return (
    <div className="flex items-center gap-4">
      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      <span className="font-condensed text-white/65 text-[0.65rem] uppercase tracking-[0.2em]">
        IST {fmt(time.getHours())}:{fmt(time.getMinutes())}:{fmt(time.getSeconds())}
      </span>
      <span className="font-condensed text-white/40 text-[0.6rem] uppercase tracking-[0.15em]">
        {time.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
      </span>
    </div>
  );
};

/* ─── Animated Orbital SVG ─── */
const OrbitalViz = () => (
  <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
    {/* Rings */}
    {[160, 120, 85, 55].map((r, i) => (
      <ellipse key={r} cx="200" cy="200" rx={r} ry={r * 0.38}
        stroke="white" strokeWidth={i === 0 ? 0.6 : 0.4} opacity={0.08 - i * 0.01} />
    ))}
    {/* Earth */}
    <circle cx="200" cy="200" r="22" fill="white" opacity="0.06" />
    <circle cx="200" cy="200" r="22" stroke="white" strokeWidth="0.8" opacity="0.15" />
    <circle cx="200" cy="200" r="14" fill="white" opacity="0.04" />

    {/* Satellite 1 – outer ring */}
    <g>
      <ellipse cx="200" cy="200" rx="160" ry="61" stroke="none" fill="none" />
      <circle cx="360" cy="200" r="5" fill="white" opacity="0.9">
        <animateMotion dur="18s" repeatCount="indefinite">
          <mpath href="#orbit1" />
        </animateMotion>
      </circle>
      <path id="orbit1" d="M 360 200 A 160 61 0 1 0 359.9 200.1" stroke="none" fill="none" />
    </g>

    {/* Satellite 2 – middle ring */}
    <circle cx="320" cy="200" r="3.5" fill="white" opacity="0.7">
      <animateMotion dur="11s" repeatCount="indefinite">
        <mpath href="#orbit2" />
      </animateMotion>
    </circle>
    <path id="orbit2" d="M 320 200 A 120 46 0 1 1 319.9 199.9" fill="none" />

    {/* Satellite 3 – inner ring */}
    <circle cx="285" cy="200" r="2.5" fill="white" opacity="0.55">
      <animateMotion dur="7s" repeatCount="indefinite">
        <mpath href="#orbit3" />
      </animateMotion>
    </circle>
    <path id="orbit3" d="M 285 200 A 85 32 0 1 0 284.9 200.1" fill="none" />

    {/* Grid lines */}
    <line x1="40" y1="200" x2="360" y2="200" stroke="white" strokeWidth="0.3" opacity="0.05" />
    <line x1="200" y1="80" x2="200" y2="320" stroke="white" strokeWidth="0.3" opacity="0.05" />
  </svg>
);

/* ─── Feature Quick-Access Cards ─── */
const quickLinks = [
  { icon: HiMap, label: 'Live Map', sub: 'Satellite ground tracks', to: '/map', accent: 'rgba(255,255,255,0.04)' },
  { icon: HiGlobeAlt, label: 'Satellite Fleet', sub: '50+ ISRO missions', to: '/satellites', accent: 'rgba(255,255,255,0.04)' },
  { icon: HiShieldCheck, label: 'Disaster Support', sub: 'Emergency data', to: '/disaster-support', accent: 'rgba(255,255,255,0.04)' },
  { icon: HiAcademicCap, label: 'Learning Hub', sub: 'Space knowledge base', to: '/learn', accent: 'rgba(255,255,255,0.04)' },
  { icon: HiLightningBolt, label: 'Self Reliance', sub: 'Atma Nirbhar Bharat', to: '/self-reliance', accent: 'rgba(255,255,255,0.04)' },
  { icon: FaSatellite, label: 'About ISRO', sub: 'History & achievements', to: '/about', accent: 'rgba(255,255,255,0.04)' },
];

/* ─── Mission Specs Table ─── */
const specs = [
  { label: 'TLE Refresh Interval', value: 'Every 6 Hours' },
  { label: 'Propagation Model', value: 'SGP4 / SDP4' },
  { label: 'Data Source', value: 'Space-Track.org' },
  { label: 'Weather Integration', value: 'OpenWeather API' },
  { label: 'Pass Accuracy', value: '±30 Seconds' },
  { label: 'Coordinate System', value: 'WGS-84' },
];

/* ═══════════════════════════════════════════ */
const Home = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);

  const [coords, setCoords] = useState(null);
  const [satellites, setSatellites] = useState([]);
  const [selected, setSelected] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [satCount, setSatCount] = useState(0);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  useEffect(() => {
    api.get('/satellites').then(({ data }) => {
      const arr = Array.isArray(data) ? data : (data?.satellites || []);
      setSatellites(arr);
      setSatCount(arr.length);
      if (arr.length) setSelected(arr[0].id || arr[0]._id || arr[0].norad_id);
    }).catch(() => setError(t('app.home.errors.unableToLoadCatalog')));
  }, [t]);

  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (p) => setCoords({ lat: +p.coords.latitude.toFixed(4), lon: +p.coords.longitude.toFixed(4) }),
      () => setError(t('app.home.errors.locationPermissionNeeded'))
    );
  }, [t]);

  const handlePredict = async () => {
    if (!coords || !selected) return;
    setLoading(true); setError(''); setPrediction(null);
    try {
      const { data } = await api.post('/predict', { lat: coords.lat, lon: coords.lon, satelliteId: selected });
      setPrediction(data);
    } catch (err) {
      setError(err.response?.data?.message ?? t('app.home.errors.predictionFailed'));
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-black">

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

        {/* Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 70 }).map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-white"
              style={{ width: Math.random() * 1.5 + 0.4, height: Math.random() * 1.5 + 0.4,
                left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0.05, 0.4, 0.05] }}
              transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 5 }} />
          ))}
        </div>

        {/* Orbital graphic — right */}
        <motion.div className="absolute right-[-4%] top-1/2 -translate-y-1/2 w-[52vw] max-w-[640px] pointer-events-none"
          style={{ opacity: heroOpacity }}>
          <OrbitalViz />
        </motion.div>

        {/* Content */}
        <motion.div className="container-spacex relative z-10 py-24" style={{ y: heroY }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <LiveClock />
          </motion.div>

          <motion.p className="label-text mt-6 mb-4"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {t('app.home.hero.tagline')}
          </motion.p>

          <motion.h1 className="font-condensed font-black uppercase text-white mb-5"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 1, letterSpacing: '0.02em' }}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            {t('app.home.hero.title')}
          </motion.h1>

          <motion.p className="text-white/65 max-w-lg text-sm leading-relaxed mb-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            {t('app.home.hero.description')}
          </motion.p>

          {/* Hero stats inline */}
          <motion.div className="flex flex-wrap gap-8 mb-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            {[
              { v: satCount || '50+', l: 'Satellites' },
              { v: coords ? `${coords.lat}°N` : '—', l: 'Your Latitude' },
              { v: 'SGP4', l: 'Propagator' },
            ].map(({ v, l }) => (
              <div key={l}>
                <p className="font-condensed font-black text-white text-2xl">{v}</p>
                <p className="label-text text-[0.55rem]">{l}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
            <a href="#predict" className="btn-spacex-filled inline-flex items-center gap-2">
              Predict a Pass <FaArrowRight size={10} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ QUICK ACCESS GRID ══ */}
      <section className="py-20" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container-spacex">
          <motion.div className="flex items-end justify-between mb-10"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div>
              <p className="label-text mb-3">Mission Control</p>
              <h2 className="font-condensed font-black uppercase text-white"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.03em' }}>
                Platform Modules
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {quickLinks.map(({ icon: Icon, label, sub, to }, i) => (
              <motion.div key={to}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Link to={to}
                  className="group flex items-start gap-5 p-7 bg-black hover:bg-[#0d0d0d] transition-colors block">
                  <div className="shrink-0 mt-0.5 p-2 border border-white/10 group-hover:border-white/25 transition-colors">
                    <Icon size={18} className="text-white/50 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-condensed font-bold uppercase text-white/80 group-hover:text-white transition-colors mb-1"
                      style={{ fontSize: '0.9rem', letterSpacing: '0.08em' }}>
                      {label}
                    </p>
                    <p className="font-condensed text-[0.7rem] uppercase tracking-[0.12em] text-white/50">{sub}</p>
                  </div>
                  <HiChevronRight size={14} className="shrink-0 text-white/15 group-hover:text-white/50 transition-all group-hover:translate-x-1 mt-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PREDICTION ENGINE ══ */}
      <section id="predict" className="py-20" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container-spacex">
          <motion.div className="mb-10"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="label-text mb-3">Pass Prediction Engine</p>
            <h2 className="font-condensed font-black uppercase text-white"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.03em' }}>
              When Will It Pass<br />
              <span className="text-white/55">Over You?</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            {/* Panel */}
            <div className="grid md:grid-cols-3 border border-white/10">
              {/* Location */}
              <div className="p-7 border-b md:border-b-0 md:border-r border-white/10">
                <p className="label-text text-[0.55rem] mb-4 flex items-center gap-2">
                  <HiLocationMarker size={10} /> {t('app.home.hero.yourLocation')}
                </p>
                {coords ? (
                  <>
                    <p className="font-condensed font-black text-white text-xl mb-1">{coords.lat}°</p>
                    <p className="font-condensed font-black text-white/50 text-lg">{coords.lon}°</p>
                    <p className="label-text text-[0.5rem] mt-2 text-white/40">WGS-84 · Auto-detected</p>
                  </>
                ) : (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                    <p className="font-condensed text-[0.7rem] uppercase tracking-[0.15em] text-white/50">{t('app.common.detecting')}</p>
                  </div>
                )}
              </div>

              {/* Satellite */}
              <div className="p-7 border-b md:border-b-0 md:border-r border-white/10">
                <p className="label-text text-[0.55rem] mb-4 flex items-center gap-2">
                  <HiGlobeAlt size={10} /> {t('app.home.hero.satellite')}
                </p>
                <Select
                  value={selected} onChange={setSelected}
                  options={satellites
                    .filter(s => s && (s.id || s._id || s.norad_id) && (s.name || s.title))
                    .map(s => ({ value: s.id || s._id || s.norad_id, label: s.name || s.title }))}
                  placeholder={t('app.common.selectSatellite')}
                  className="w-full" />
              </div>

              {/* Action */}
              <div className="p-7 flex flex-col justify-between gap-4">
                <p className="label-text text-[0.55rem]">
                  <HiSparkles className="inline mr-1" size={9} />Compute
                </p>
                <motion.button
                  onClick={handlePredict}
                  disabled={loading || !coords || !selected}
                  className="w-full font-condensed font-bold text-[0.75rem] uppercase tracking-[0.18em] flex items-center justify-center gap-2 py-4 disabled:opacity-30 transition-all"
                  style={{ background: '#fff', color: '#000', border: '1px solid #fff', borderRadius: 0 }}
                  whileHover={!loading ? { background: 'transparent', color: '#fff' } : {}}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Computing…
                    </span>
                  ) : (
                    <><HiSparkles size={13} /> {t('app.home.hero.predictPass')} <FaArrowRight size={10} /></>
                  )}
                </motion.button>
              </div>
            </div>

            {error && (
              <motion.p className="font-condensed text-[0.7rem] uppercase tracking-[0.1em] text-red-400/80 mt-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                ⚠ {error}
              </motion.p>
            )}
          </motion.div>

          {/* Results */}
          {prediction && (
            <motion.div className="mt-14"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="label-text mb-6">Prediction Results</p>
              <PassTable data={prediction} />
            </motion.div>
          )}
        </div>
      </section>

      {/* ══ TECHNICAL SPECS ══ */}
      <section className="py-20" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container-spacex">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="label-text mb-4">System Architecture</p>
              <h2 className="font-condensed font-black uppercase text-white mb-5"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.03em' }}>
                Engineered for<br />
                <span className="text-white/35">Precision Tracking</span>
              </h2>
              <p className="text-white/62 text-sm leading-relaxed mb-8 max-w-md">
                Built on SGP4/SDP4 orbital propagation, our platform ingests live Two-Line
                Element sets and computes pass windows accurate to ±30 seconds for any
                observer location on Earth.
              </p>
              <Link to="/satellites" className="btn-spacex inline-flex items-center gap-2">
                View Satellite Fleet <HiArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Right: specs table */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                {specs.map(({ label, value }, i) => (
                  <div key={label} className="flex items-center justify-between px-6 py-4"
                    style={{ borderBottom: i < specs.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <span className="font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-white/55">{label}</span>
                    <span className="font-condensed font-semibold text-[0.8rem] uppercase tracking-[0.1em] text-white">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ ISRO MISSION HIGHLIGHTS ══ */}
      <section className="py-20">
        <div className="container-spacex">
          <motion.div className="flex items-end justify-between mb-10"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div>
              <p className="label-text mb-3">ISRO Heritage</p>
              <h2 className="font-condensed font-black uppercase text-white"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.03em' }}>
                Mission Highlights
              </h2>
            </div>
            <Link to="/about" className="btn-spacex hidden md:inline-flex items-center gap-2 text-[0.6rem]">
              Full History <HiArrowRight size={11} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/7">
            {[
              { title: 'Chandrayaan-3', year: '2023', desc: 'India\'s landmark lunar south pole landing. Vikram lander & Pragyan rover confirmed water-ice deposits.', tag: 'Lunar' },
              { title: 'Aditya-L1', year: '2023', desc: 'India\'s first solar observatory, stationed at the Sun-Earth Lagrange Point 1, studying solar corona.', tag: 'Solar' },
              { title: 'Gaganyaan', year: '2025+', desc: 'India\'s crewed orbital mission program. Human spaceflight capability — Atma Nirbhar Bharat.', tag: 'Human Spaceflight' },
            ].map(({ title, year, desc, tag }, i) => (
              <motion.div key={title}
                className="bg-black p-8 group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-start justify-between mb-5">
                  <span className="font-condensed text-[0.6rem] uppercase tracking-[0.18em] text-white/55 border border-white/20 px-2 py-1">
                    {tag}
                  </span>
                  <span className="font-condensed font-black text-white/30 text-3xl">{year}</span>
                </div>
                <h3 className="font-condensed font-black uppercase text-white mb-3"
                  style={{ fontSize: '1.3rem', letterSpacing: '0.06em' }}>
                  {title}
                </h3>
                <p className="text-white/62 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
