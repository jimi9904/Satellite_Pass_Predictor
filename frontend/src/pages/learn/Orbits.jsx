import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiArrowLeft, HiCode } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { GiRingedPlanet } from 'react-icons/gi';
import { FaSatellite, FaGlobeAmericas, FaMapMarkerAlt, FaCloudSun } from 'react-icons/fa';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const orbitTopics = [
  {
    title: 'Low Earth Orbit',
    abbr: 'LEO',
    color: '#06b6d4',
    altitude: '160 – 2,000 km',
    period: '~90 minutes',
    speed: '28,000 km/h',
    icon: FaGlobeAmericas,
    description: 'The closest operational orbit to Earth. Because satellites in LEO are so close to the surface, they travel incredibly fast to avoid being pulled back down by gravity. This proximity makes LEO perfect for high-resolution Earth observation, spy satellites, and the International Space Space (ISS). However, because they are so low, a single LEO satellite can only see a small patch of the Earth at a time.',
    satellites: ['Cartosat Series (Mapping)', 'RISAT Series (Radar)', 'SpaceX Starlink'],
  },
  {
    title: 'Medium Earth Orbit',
    abbr: 'MEO',
    color: '#3b82f6',
    altitude: '2,000 – 35,000 km',
    period: '2 to 24 hours',
    speed: '14,000 km/h',
    icon: FaMapMarkerAlt,
    description: 'Situated in the vast space between LEO and GEO. MEO is the sweet spot for global navigation satellite systems (GNSS). Satellites here are high enough to cover large areas of the globe at once, but low enough that the signal delay isn\'t too extreme for GPS receivers in our phones.',
    satellites: ['Global Positioning System (GPS)', 'Galileo (Europe)', 'GLONASS (Russia)'],
  },
  {
    title: 'Geosynchronous / Geostationary Orbit',
    abbr: 'GEO',
    color: '#8b5cf6',
    altitude: '35,786 km',
    period: '23h 56m 4s',
    speed: '11,000 km/h',
    icon: FaSatellite,
    description: 'A magical altitude where the satellite\'s orbital speed perfectly matches the Earth\'s rotation. If placed directly above the equator (Geostationary), the satellite appears to hover motionless in the sky. This is why your home satellite TV dish points to one fixed spot in the sky and never has to move.',
    satellites: ['INSAT Series (Weather/Comms)', 'GSAT Series (Broadband)', 'NavIC (IRNSS)'],
  },
  {
    title: 'Sun Synchronous Orbit',
    abbr: 'SSO',
    color: '#f59e0b',
    altitude: '600 – 800 km',
    period: '~100 minutes',
    speed: '27,000 km/h',
    icon: FaCloudSun,
    description: 'A specialized near-polar Low Earth Orbit. A satellite in SSO passes over any given point of the Earth\'s surface at exactly the same local solar time every day. This means shadows cast by mountains or buildings look exactly the same in every photo, making it the ultimate orbit for comparing changes on the ground over time.',
    satellites: ['Oceansat (Ocean color)', 'Resourcesat (Agriculture)', 'Landsat'],
  }
];

const backendInsights = [
  {
    title: 'Two-Line Elements (TLE)',
    desc: 'TLEs are a standard data format encoding a satellite\'s orbital elements at a given time (epoch). They contain information like inclination, eccentricity, and mean motion. Space-Track.org updates these daily for all known objects in space.'
  },
  {
    title: 'SGP4 Propagation',
    desc: 'Because orbits aren\'t perfectly circular and Earth\'s gravity isn\'t uniform, satellites drift. The SGP4 (Simplified General Perturbations-4) mathematical model is used to accurately predict where a satellite will be in the future based on its TLE.'
  },
  {
    title: 'How This App Works',
    desc: 'Our backend regularly downloads the latest TLEs for the ISRO fleet. When you view the map, the frontend uses the satellite.js library (running SGP4) to calculate real-time latitude, longitude, and footprint radius right in your browser.'
  }
];

const Orbits = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #050510 60%, #0a0a0f 100%)' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-20">

        {/* Back */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <Link to="/learn" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <HiArrowLeft size={16} /> Back to Learning Hub
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp(0.05)} className="mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border"
            style={{ background: '#06b6d420', borderColor: '#06b6d440', color: '#67e8f9' }}>
            <GiRingedPlanet size={14} /> Orbital Mechanics
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
            How ISRO Positions<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #06b6d4, #3b82f6)' }}>
              Its Spacecraft
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            Space isn't just about going up; it's about going fast enough sideways to keep falling around the Earth.
            Different missions require completely different orbits.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div {...fadeUp(0.1)} className="rounded-2xl border border-white/10 overflow-hidden mb-14">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">Orbit Type</th>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">Altitude</th>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">Orbital Period</th>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">Orbital Speed</th>
                </tr>
              </thead>
              <tbody>
                {orbitTopics.map((o) => (
                  <tr
                    key={o.title}
                    className="border-t border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className="font-black text-white">{o.abbr}</span>
                      <span className="ml-2 text-xs text-slate-500">{o.title}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-300">{o.altitude}</td>
                    <td className="px-5 py-4 text-slate-300">{o.period}</td>
                    <td className="px-5 py-4">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background: `${o.color}20`, color: o.color }}
                      >
                        {o.speed}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Orbit Detail Cards (Stacked Layout) */}
        <div className="space-y-8 mb-16">
          {orbitTopics.map((o, index) => {
            const Icon = o.icon;
            return (
              <motion.div
                key={o.abbr}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                {/* Top color bar */}
                <div className="h-1" style={{ background: `linear-gradient(90deg, ${o.color}, ${o.color}44)` }} />

                <div className="p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: `${o.color}22` }}>
                        <Icon size={22} style={{ color: o.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white">{o.abbr}</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">{o.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Specs row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {[
                      { label: 'Altitude Range', value: o.altitude },
                      { label: 'Orbital Period', value: o.period },
                      { label: 'Avg Speed', value: o.speed },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <p className="text-xs text-slate-500 mb-1">{label}</p>
                        <p className="text-sm text-white font-bold">{value}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{o.description}</p>

                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: o.color }}>Famous Satellites</p>
                    <div className="flex flex-wrap gap-2">
                      {o.satellites.map((sat) => (
                        <span key={sat} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: o.color }} />
                          {sat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Behind the Scenes (TLE/SGP4) */}
        <motion.div {...fadeUp(0.2)}>
          <div className="rounded-3xl border border-amber-500/20 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.05), rgba(0,0,0,0))' }}>
            <div className="p-8 md:p-10 border-b border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <HiCode size={20} className="text-amber-400" />
                </div>
                <h3 className="text-2xl font-black text-white">How The Tracker Works</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
                Ever wonder how we plot a satellite's real-time position on the map? It's not communicating its GPS 
                coordinates to us directly. Instead, we use orbital math.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {backendInsights.map((insight) => (
                <div key={insight.title} className="p-8">
                  <h4 className="text-lg font-bold text-white mb-3">{insight.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{insight.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Orbits;
