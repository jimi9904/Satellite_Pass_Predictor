import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { FaRocket } from 'react-icons/fa';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const vehicles = [
  {
    name: 'SSLV',
    full: 'Small Satellite Launch Vehicle',
    color: '#10b981',
    payload: '500 kg to LEO / 300 kg to SSO',
    height: '34 m',
    stages: '3 solid + VTM',
    firstFlight: '2022',
    status: 'Operational',
    desc: 'ISROs newest rocket designed for fast, low-cost launch of small satellites (up to 500 kg) to low Earth orbit. Can be assembled in just 72 hours with a small team — enabling rapid commercial launches and responsive space access.',
    missions: ['EOS-02 (Aug 2022 — partial failure)', 'EOS-07 (Feb 2023 — success)', 'Designed for on-demand commercial launches'],
  },
  {
    name: 'PSLV',
    full: 'Polar Satellite Launch Vehicle',
    color: '#06b6d4',
    payload: '1,750 kg to LEO / 1,200 kg to SSO / 1,100 kg to GTO',
    height: '44 m',
    stages: '4 alternating solid-liquid',
    firstFlight: '1993 (success: 1994)',
    status: 'Operational — 60+ successes',
    desc: 'The workhorse of ISRO. PSLV uses a unique 4-stage alternating solid-liquid propulsion design. It has launched Chandrayaan-1, Mangalyaan, Astrosat, 104 satellites in one shot, and hundreds of international co-passengers. Available in PSLV-G, PSLV-CA, and PSLV-XL configurations.',
    missions: ['Chandrayaan-1 (2008)', 'Mangalyaan/MOM (2013)', '104 satellites world record (2017)', 'Aditya-L1 (2023)', '60+ consecutive successes'],
  },
  {
    name: 'GSLV Mk-II',
    full: 'Geosynchronous Satellite Launch Vehicle Mk-II',
    color: '#f59e0b',
    payload: '2,500 kg to GTO / 5,000 kg to LEO',
    height: '49.1 m',
    stages: '3 (2 solid strap-ons + liquid core + cryogenic)',
    firstFlight: '2001 (indigenous cryo: 2014)',
    status: 'Operational',
    desc: 'GSLV Mk-II carries ISROs indigenous CE-7.5 cryogenic upper stage — a triumph over a decade of technology denial. It enables India to deploy 2.5-tonne class communication satellites to geosynchronous transfer orbit without depending on foreign rockets.',
    missions: ['GISAT-1 (2021)', 'NVS-01 NavIC satellite (2023)', 'Various GSAT communication satellites', 'Fully indigenous cryogenic stage'],
  },
  {
    name: 'LVM3',
    full: 'Launch Vehicle Mark-3 (formerly GSLV Mk-III)',
    color: '#8b5cf6',
    payload: '4,000 kg to GTO / 10,000 kg to LEO',
    height: '43.5 m',
    stages: '2 solid strap-ons + liquid core + CE-20 cryo',
    firstFlight: '2017 (operational: 2022)',
    status: 'Operational — Human-Rated for Gaganyaan',
    desc: 'ISROs most powerful rocket and the future of Indian heavy-lift. LVM3 uses the CE-20 cryogenic engine — the most powerful cryogenic engine built in India. Selected for Gaganyaan human spaceflight, it has placed OneWeb commercial satellites in orbit, demonstrating competitiveness with SpaceX Falcon 9.',
    missions: ['OneWeb 36-satellite batches (2022, 2023)', 'Chandrayaan-3 (2023)', 'Gaganyaan human missions (2027)', 'Future deep space missions'],
  },
];

const LaunchVehicles = () => {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #050510 60%, #0a0a0f 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-20">

        {/* Back */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <Link to="/learn" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <HiArrowLeft size={16} /> Back to Learning Hub
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp(0.05)} className="mb-14">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">Launch Vehicles</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
            ISRO's Rocket<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #f59e0b, #8b5cf6)' }}>
              Arsenal
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            From a small solid rocket launcher to a human-rated heavy-lift vehicle — ISRO has built a complete
            family of rockets covering all payload classes. Each rocket tells a story of indigenous engineering.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div {...fadeUp(0.1)} className="rounded-2xl border border-white/10 overflow-hidden mb-14">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">Rocket</th>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">Payload to LEO</th>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">Height</th>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v, i) => (
                  <tr
                    key={v.name}
                    className="border-t border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className="font-black text-white">{v.name}</span>
                      <span className="ml-2 text-xs text-slate-500">{v.full}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-300">{v.payload.split('/')[0].trim()}</td>
                    <td className="px-5 py-4 text-slate-300">{v.height}</td>
                    <td className="px-5 py-4">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background: `${v.color}20`, color: v.color }}
                      >
                        {v.status.split('—')[0].trim()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Vehicle Detail Cards */}
        <div className="space-y-8">
          {vehicles.map((v, index) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {/* Top color bar */}
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${v.color}, ${v.color}44)` }} />

              <div className="p-7">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${v.color}22` }}>
                      <FaRocket size={22} style={{ color: v.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{v.name}</h3>
                      <p className="text-xs text-slate-500">{v.full}</p>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1.5 rounded-full font-bold"
                    style={{ background: `${v.color}20`, color: v.color }}>
                    Since {v.firstFlight}
                  </span>
                </div>

                {/* Specs row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: 'Payload (LEO)', value: v.payload.split('/')[0].trim() },
                    { label: 'Height', value: v.height },
                    { label: 'Stages', value: v.stages },
                    { label: 'First Flight', value: v.firstFlight },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <p className="text-xs text-slate-500 mb-1">{label}</p>
                      <p className="text-sm text-white font-bold">{value}</p>
                    </div>
                  ))}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">{v.desc}</p>

                <div>
                  <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: v.color }}>Key Missions</p>
                  <ul className="space-y-1.5">
                    {v.missions.map((m) => (
                      <li key={m} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: v.color }} />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LaunchVehicles;
