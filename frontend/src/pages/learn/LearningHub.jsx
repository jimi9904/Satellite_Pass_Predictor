import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaRocket, FaSatellite } from 'react-icons/fa';
import { HiAcademicCap, HiArrowRight, HiStar, HiClock, HiBookOpen } from 'react-icons/hi';
import { GiRingedPlanet, GiAstronautHelmet } from 'react-icons/gi';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const modules = [
  {
    path: '/learn/orbits',
    icon: GiRingedPlanet,
    title: 'Orbit Fundamentals',
    summary: 'Understand LEO, MEO, GEO, and SSO orbits. Learn how TLE data and the SGP4 propagation model power real-time satellite tracking in this app.',
    tags: ['LEO', 'GEO', 'TLE', 'SGP4'],
    color: '#06b6d4',
    readTime: '8 min read',
    difficulty: 'Beginner',
  },
  {
    path: '/learn/launchers',
    icon: FaRocket,
    title: 'ISRO Launch Vehicles',
    summary: 'Compare PSLV, GSLV Mk-II, LVM3, and SSLV. Understand payload capacities, propulsion types, and which missions each rocket is designed for.',
    tags: ['PSLV', 'GSLV', 'LVM3', 'Cryogenic'],
    color: '#f59e0b',
    readTime: '10 min read',
    difficulty: 'Intermediate',
  },
  {
    path: '/learn/gaganyaan',
    icon: GiAstronautHelmet,
    title: 'Gaganyaan Programme',
    summary: 'India\'s first human spaceflight mission. Explore the crew module, Vyomnauts training, abort systems, and the road to sending Indians to orbit by 2027.',
    tags: ['Human Spaceflight', 'Crew Module', 'LVM3', 'Vyomnauts'],
    color: '#8b5cf6',
    readTime: '12 min read',
    difficulty: 'Intermediate',
  },
  {
    path: '/learn/history',
    icon: HiBookOpen,
    title: 'ISRO History & Milestones',
    summary: 'From Aryabhata (1975) to SpaDeX (2024) — trace ISRO\'s 56-year journey of frugal innovation, world records, and landmark deep-space achievements.',
    tags: ['Chandrayaan', 'Mangalyaan', 'History', 'Milestones'],
    color: '#10b981',
    readTime: '15 min read',
    difficulty: 'Beginner',
  },
];

const facts = [
  { value: '104', label: 'Satellites in one PSLV launch — world record', color: '#f59e0b' },
  { value: '₹450 Cr', label: 'Cost of Mars Orbiter Mission — cheapest ever', color: '#ef4444' },
  { value: '56+', label: 'Years of continuous space exploration', color: '#06b6d4' },
  { value: '2027', label: 'Target year for first Indian human spaceflight', color: '#8b5cf6' },
];

const LearningHub = () => {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #050510 60%, #0a0a0f 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-20">

        {/* Hero */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border"
            style={{ background: '#8b5cf620', borderColor: '#8b5cf640', color: '#c4b5fd' }}
          >
            <HiAcademicCap size={13} /> ISRO Knowledge Capsule
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Learn About{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }}
            >
              Indian Space Science
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Curated lessons on how ISRO builds rockets, designs satellites, trains astronauts, and pushes
            the boundaries of Indian space science. Each module uses real data sourced from ISRO publications.
          </p>
        </motion.div>

        {/* Fun Facts Strip */}
        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {facts.map(({ value, label, color }) => (
            <div
              key={label}
              className="rounded-2xl p-5 text-center border border-white/8 hover:border-white/20 transition-all"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <p className="text-2xl font-black mb-1" style={{ color }}>{value}</p>
              <p className="text-slate-500 text-xs leading-snug">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {modules.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.path}
                {...fadeUp(index * 0.1)}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 10% 10%, ${mod.color}12, transparent 60%)` }}
                />
                <div className="relative p-7">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${mod.color}22` }}
                    >
                      <Icon size={24} style={{ color: mod.color }} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <HiClock size={11} /> {mod.readTime}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${mod.color}20`, color: mod.color }}
                      >
                        {mod.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{mod.summary}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {mod.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full border"
                        style={{ borderColor: `${mod.color}40`, color: `${mod.color}cc`, background: `${mod.color}10` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to={mod.path}
                    className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3"
                    style={{ color: mod.color }}
                  >
                    Explore Module <HiArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          {...fadeUp(0.2)}
          className="rounded-3xl p-8 md:p-12 border border-white/10 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.08))' }}
        >
          <HiStar size={32} className="text-amber-400 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-white mb-3">
            Why Learn About ISRO?
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed mb-6">
            India's space programme is one of the most cost-effective in the world. The Mars Orbiter Mission
            (Mangalyaan) cost less than the Hollywood film <em>"Gravity"</em>. Understanding ISRO's technologies
            inspires the next generation of scientists, engineers, and entrepreneurs who will take India to the Moon,
            Mars, and beyond.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {modules.map((m) => (
              <Link
                key={m.path}
                to={m.path}
                className="text-xs font-bold px-4 py-2 rounded-full border transition-all hover:scale-105"
                style={{
                  borderColor: `${m.color}40`,
                  color: m.color,
                  background: `${m.color}12`,
                }}
              >
                {m.title}
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LearningHub;
