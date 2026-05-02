import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaRocket, FaSatellite, FaMapMarkedAlt, FaShieldAlt, FaCloudSun } from 'react-icons/fa';
import { HiLightBulb, HiChartBar, HiStar } from 'react-icons/hi';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const domains = [
  {
    name: 'Launch Vehicles',
    icon: FaRocket,
    indian: 98,
    foreign: 2,
    color: '#f59e0b',
    desc: 'PSLV, GSLV Mk-II, and LVM3 cover the full range of payload requirements. Indigenous cryogenic engine CE-20 powers the heavy-lift LVM3, finally breaking the technology-denial barrier India faced in the 1990s.',
    highlights: ['PSLV: 60+ consecutive successes', 'LVM3: Cryogenic CE-20 engine', 'SSLV: Small-satellite launcher', '104 satellites in single launch (world record)'],
  },
  {
    name: 'Navigation (NavIC)',
    icon: FaMapMarkedAlt,
    indian: 100,
    foreign: 0,
    color: '#06b6d4',
    desc: 'NavIC (Navigation with Indian Constellation) provides completely indigenous satellite navigation for India and a 1,500 km surrounding region. 7 satellites in GEO/GSO orbits deliver sub-10m accuracy — no dependence on GPS, GLONASS, or Galileo.',
    highlights: ['7 operational satellites', 'Sub-10m positional accuracy', 'Used by Indian Navy & Coast Guard', 'NVS-01 next-gen atomic clock'],
  },
  {
    name: 'Earth Observation',
    icon: FaSatellite,
    indian: 92,
    foreign: 8,
    color: '#10b981',
    desc: 'Cartosat, Resourcesat, Oceansat, RISAT, and EOS series provide comprehensive earth observation capabilities. Cartosat-3 offers 0.25m resolution — rivalling commercial providers globally.',
    highlights: ['Cartosat-3: 0.25m resolution', 'RISAT: All-weather SAR radar', 'Oceansat-3: Ocean colour/winds', 'Resourcesat: Agriculture monitoring'],
  },
  {
    name: 'Disaster Management',
    icon: FaShieldAlt,
    indian: 95,
    foreign: 5,
    color: '#ef4444',
    desc: 'INSAT weather satellites, RISAT radar, and Cartosat optical satellites provide a comprehensive disaster monitoring ecosystem — feeding IMD cyclone warnings, NDMA flood maps, and forest fire alerts in near-real-time.',
    highlights: ['INSAT-3D/3DR: 15-min rapid scan', 'RISAT-2BR1: All-weather imaging', 'GSAT-30: Emergency SATCOM', 'Early warning systems for 1.4B people'],
  },
  {
    name: 'Weather Services',
    icon: FaCloudSun,
    indian: 70,
    foreign: 30,
    color: '#8b5cf6',
    desc: 'INSAT-3D and INSAT-3DR provide primary weather monitoring. Some reliance on international data for global numerical weather models — being reduced with the upcoming INSAT-3DS and future geostationary satellites.',
    highlights: ['INSAT-3D: Sounder + Imager', 'INSAT-3DR: Advanced sensors', 'INSAT-3DS: Successor launched 2024', 'Feeds IMD national forecasts'],
  },
  {
    name: 'Communication (GSAT)',
    icon: HiChartBar,
    indian: 85,
    foreign: 15,
    color: '#fbbf24',
    desc: 'India operates a fleet of 16+ geostationary GSAT satellites providing DTH television, broadband internet, VSAT services, maritime communication, and emergency connectivity to remote areas through BSNL and other providers.',
    highlights: ['16+ operational GSAT birds', 'GSAT-20 (2024): Ka-band HTS', 'Village Resource Centres: 500+', 'VSAT services across India'],
  },
];

const milestones = [
  {
    year: '1994',
    title: 'Indigenous Cryogenic Engine Denied',
    detail: 'Russia withdrew technology transfer under US pressure. ISRO resolved to build its own cryogenic engine — and did, 20 years later.',
    type: 'challenge',
  },
  {
    year: '2001',
    title: 'GSAT-1 — India Goes to GEO',
    detail: 'First launch of Indias own communication satellite on GSLV, establishing the foundation for an indigenous communication satellite fleet.',
    type: 'milestone',
  },
  {
    year: '2014',
    title: 'Indigenous Cryogenic CE-7.5 Succeeds',
    detail: 'GSLV-D5 with indigenous CE-7.5 cryogenic engine succeeded, ending reliance on Russian cryogenic stages for GEO missions.',
    type: 'milestone',
  },
  {
    year: '2017',
    title: '104 Satellites in One PSLV Launch',
    detail: 'PSLV-C37 set the world record for most satellites deployed in a single launch, proving ISROs commercial launch reliability globally.',
    type: 'milestone',
  },
  {
    year: '2019',
    title: 'NavIC Fully Operational',
    detail: 'Indias own GPS — NavIC — declared fully operational with all 7 satellites in orbit, covering India and surrounding 1,500 km region.',
    type: 'milestone',
  },
  {
    year: '2024',
    title: 'SpaDeX Docking Technology',
    detail: 'India mastered in-space docking — joining USA, Russia, and China as the only nations with this critical spaceflight capability.',
    type: 'milestone',
  },
];

const BarMeter = ({ indian, color, animated }) => (
  <div className="mt-4">
    <div className="flex justify-between text-xs mb-2">
      <span style={{ color }} className="font-bold">Indian: {indian}%</span>
      <span className="text-slate-500">Foreign: {100 - indian}%</span>
    </div>
    <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: animated ? `${indian}%` : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
      />
    </div>
  </div>
);

const SelfReliance = () => {
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
            style={{ background: '#f59e0b20', borderColor: '#f59e0b40', color: '#fcd34d' }}
          >
            <HiStar size={12} /> Atmanirbhar Space Index
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            India's Space{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #f59e0b, #10b981)' }}
            >
              Self-Reliance
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            How much of India's critical space needs are met by indigenous satellites, launch vehicles,
            and ground infrastructure? This Atmanirbhar Index maps ISRO's journey from dependence to sovereignty.
          </p>
        </motion.div>

        {/* Context Banner */}
        <motion.div
          {...fadeUp(0.1)}
          className="rounded-2xl p-6 mb-12 border border-amber-500/20"
          style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(16,185,129,0.06))' }}
        >
          <div className="flex items-start gap-4">
            <HiLightBulb size={28} className="text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-bold mb-2">The Atmanirbhar Space Vision</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                After the Kargil War in 1999 — when the US temporarily denied India GPS data — ISRO accelerated
                its push for complete space sovereignty. Today, India operates its own navigation constellation
                (NavIC), builds its own rockets, fabricates its own satellites, and has mastered cryogenic propulsion
                and space docking. The private space sector now has 300+ startups building on this foundation under
                the IN-SPACe framework established in 2020.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Domain Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.name}
                {...fadeUp(index * 0.07)}
                whileHover={{ scale: 1.02, y: -4 }}
                className="rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${domain.color}22` }}
                  >
                    <Icon size={20} style={{ color: domain.color }} />
                  </div>
                  <h3 className="text-white font-bold">{domain.name}</h3>
                </div>

                <BarMeter indian={domain.indian} color={domain.color} animated={true} />

                <p className="text-slate-400 text-sm leading-relaxed mt-4 mb-4">{domain.desc}</p>

                <ul className="space-y-1.5">
                  {domain.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: domain.color }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Aggregate Score */}
        <motion.div
          {...fadeUp(0.1)}
          className="rounded-3xl p-8 md:p-12 border border-white/10 mb-16 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))' }}
        >
          <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-4">Overall Atmanirbhar Score</p>
          <div
            className="text-7xl font-black mb-3 bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, #06b6d4, #10b981)' }}
          >
            90%
          </div>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Across all key domains — launch vehicles, navigation, earth observation, communication,
            and disaster management — approximately 90% of India's critical space needs are now met
            by indigenous ISRO assets. The remaining 10% reflects data-sharing partnerships with
            international agencies, not dependency.
          </p>
        </motion.div>

        {/* Journey to Self-Reliance Timeline */}
        <motion.div {...fadeUp(0.1)}>
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">The Road to Sovereignty</p>
            <h2 className="text-3xl font-black text-white mb-4">Key Milestones</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl p-5 border border-white/8 hover:border-white/20 transition-all"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-xs font-black px-3 py-1 rounded-full flex-shrink-0 mt-0.5"
                    style={{
                      background: m.type === 'challenge' ? '#ef444420' : '#10b98120',
                      color: m.type === 'challenge' ? '#f87171' : '#34d399',
                    }}
                  >
                    {m.year}
                  </span>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">{m.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{m.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SelfReliance;
