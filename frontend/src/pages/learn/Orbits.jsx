import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiArrowLeft, HiCode } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { GiRingedPlanet } from 'react-icons/gi';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const orbitTopics = [
  {
    title: 'Low Earth Orbit (LEO)',
    color: '#06b6d4',
    altitude: '160 – 2,000 km',
    description: 'The closest orbit to Earth, taking about 90 minutes to complete one revolution. This is where most remote sensing, weather, and military observation satellites fly because of the high resolution possible. The International Space Station also orbits here.',
    satellites: ['Cartosat Series', 'RISAT Series', 'EOS Satellites'],
  },
  {
    title: 'Medium Earth Orbit (MEO)',
    color: '#3b82f6',
    altitude: '2,000 – 35,000 km',
    description: 'Situated between LEO and GEO. Satellites here take 2 to 24 hours to orbit Earth. This region is primarily used for navigation satellite systems because it offers a good compromise between coverage area and signal strength.',
    satellites: ['GPS', 'Galileo'],
  },
  {
    title: 'Geostationary Orbit (GEO)',
    color: '#8b5cf6',
    altitude: '35,786 km',
    description: 'An orbit right above the equator where the satellite revolves at exactly the same speed as the Earth rotates. This makes the satellite appear stationary from the ground — ideal for direct-to-home TV and broadband communication.',
    satellites: ['INSAT Series', 'GSAT Series', 'NavIC (some)'],
  },
  {
    title: 'Sun Synchronous Orbit (SSO)',
    color: '#f59e0b',
    altitude: '600 – 800 km',
    description: 'A special polar orbit (over the north and south poles) where the satellite passes over any given point of the planet\'s surface at the same local solar time. This ensures consistent lighting conditions for Earth observation cameras.',
    satellites: ['Oceansat', 'Resourcesat'],
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

        {/* Orbits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {orbitTopics.map((orbit, index) => (
            <motion.div
              key={orbit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{orbit.title}</h3>
                  <span className="text-xs font-black px-3 py-1 rounded-full border" style={{ color: orbit.color, background: `${orbit.color}15`, borderColor: `${orbit.color}40` }}>
                    {orbit.altitude}
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{orbit.description}</p>
                
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Typical Satellites</p>
                  <div className="flex flex-wrap gap-2">
                    {orbit.satellites.map(sat => (
                      <span key={sat} className="px-3 py-1 rounded-md text-xs font-medium text-slate-300 bg-white/5 border border-white/10">
                        {sat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
