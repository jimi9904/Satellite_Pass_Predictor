import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import { FaMoon, FaMars, FaSatellite, FaSun, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const milestones = [
  {
    year: '1962',
    title: 'The Thumba Beginning',
    icon: FaSatellite,
    color: '#06b6d4',
    description: 'ISRO\'s origins trace to Thumba Equatorial Rocket Launching Station (TERLS) near Thiruvananthapuram. The first rockets were transported on bicycles and bullock carts. Scientists worked out of a church. Dr. Vikram Sarabhai had convinced PM Nehru that space was essential for a developing nation.',
    facts: ['First sounding rocket launched Nov 21, 1963', 'Used US Nike-Apache rocket initially', 'Church served as launch prep facility', 'Workers cycled rocket parts on bicycles'],
  },
  {
    year: '1975',
    title: 'Aryabhata — First Indian Satellite',
    icon: FaSatellite,
    color: '#f59e0b',
    description: 'India\'s first satellite, named after the ancient mathematician, was launched by the Soviet Union\'s Kosmos-3M rocket on April 19, 1975. It carried payloads for X-ray astronomy, aeronomics, and solar physics — establishing India as a spacefaring nation.',
    facts: ['Launched: April 19, 1975', 'Mass: 360 kg', 'Orbit: 563 × 619 km, 50.7°', 'Operated for 5 days before power failure'],
  },
  {
    year: '1980',
    title: 'SLV-3 — Indigenous Launch Capability',
    icon: FaRocket,
    color: '#8b5cf6',
    description: 'On July 18, 1980, SLV-3 successfully placed the Rohini satellite into orbit — making India the 7th country to achieve indigenous satellite launch capability. Led by Dr. APJ Abdul Kalam, the project took 8 years and overcame a first failure in 1979 through sheer persistence.',
    facts: ['7th nation with indigenous launch capability', 'Rohini satellite placed in 305 × 919 km orbit', 'Led by APJ Abdul Kalam', 'Overcame 1979 first-flight failure'],
  },
  {
    year: '2008',
    title: 'Chandrayaan-1 — Water on the Moon',
    icon: FaMoon,
    color: '#a78bfa',
    description: 'India\'s first lunar mission, launched October 22, 2008, made one of the most significant lunar discoveries in decades: evidence of water molecules on the Moon\'s surface, confirmed by NASA\'s Moon Mineralogy Mapper carried aboard. The mission ended prematurely but its science legacy is enormous.',
    facts: ['Discovered water molecules on the Moon', 'Operated for 312 days', 'Launched aboard PSLV-C11', 'Orbited at 100 km altitude'],
  },
  {
    year: '2013',
    title: 'Mangalyaan — Mars on First Attempt',
    icon: FaMars,
    color: '#ef4444',
    description: 'Mars Orbiter Mission (MOM), launched November 5, 2013, entered Martian orbit on September 24, 2014 — the first Asian nation to reach Mars, and the first nation to succeed on its first attempt. Built in 15 months for just ₹450 crore ($74M), it redefined "frugal space engineering."',
    facts: ['First Asian mission to reach Mars', 'Cost: ₹450 crore ($74M)', 'Built in just 15 months', 'Designed for 6 months, operated for 8 years'],
  },
  {
    year: '2017',
    title: 'PSLV-C37 — 104 Satellites World Record',
    icon: FaSatellite,
    color: '#10b981',
    description: 'On February 15, 2017, PSLV-C37 launched 104 satellites in a single mission — shattering the previous world record of 37. 101 were international co-passengers. This cemented ISRO\'s reputation as the world\'s most reliable commercial launch provider at competitive prices.',
    facts: ['104 satellites in one mission — world record', '101 international co-passengers', 'Deployment in 18 minutes', 'All satellites placed in SSO'],
  },
  {
    year: '2019',
    title: 'Chandrayaan-2 — Partial Success',
    icon: FaMoon,
    color: '#fbbf24',
    description: 'Chandrayaan-2\'s orbiter successfully reached lunar orbit and continues mapping the Moon with its 8 scientific instruments. The Vikram lander lost contact during descent. The orbiter remains operational and has returned over 50,000 images — a significant scientific success despite the lander setback.',
    facts: ['Orbiter still operational after 5+ years', 'Discovered sodium on Moon\'s surface', 'Launched on GSLV Mk-III (LVM3)', 'Detected many new craters'],
  },
  {
    year: '2023',
    title: 'Chandrayaan-3 — Lunar South Pole Landing',
    icon: FaMoon,
    color: '#34d399',
    description: 'On August 23, 2023 — now celebrated as National Space Day — the Vikram lander soft-landed near the lunar south pole at 70°S latitude. Pragyan rover confirmed sulphur, aluminium, calcium, iron, chromium, titanium, manganese, silicon, and oxygen on the Moon\'s surface.',
    facts: ['Soft-landed at 70°S — first ever south pole landing', 'Confirmed sulphur, oxygen, iron on surface', 'Vikram generated 738 Wh solar power', 'August 23 declared National Space Day'],
  },
  {
    year: '2023',
    title: 'Aditya-L1 — Solar Observatory',
    icon: FaSun,
    color: '#fbbf24',
    description: 'India\'s first solar mission reached the Sun-Earth Lagrange Point 1 (L1) on January 6, 2024. Aditya-L1 studies solar corona, solar wind, flares, and space weather. It carries 7 payloads including VELC — the world\'s largest coronagraph ever flown in space.',
    facts: ['Reached L1 on January 6, 2024', 'VELC: largest coronagraph in space', '7 scientific payloads', 'Studies solar wind origins'],
  },
  {
    year: '2024',
    title: 'SpaDeX — Space Docking Mastered',
    icon: FaSatellite,
    color: '#60a5fa',
    description: 'Space Docking Experiment (SpaDeX), launched December 30, 2024, demonstrated autonomous in-space docking and undocking between two spacecraft. India joined the USA, Russia, and China as only nations with proven space docking capability — essential for future space stations, Moon missions, and Mars missions.',
    facts: ['4th nation to master space docking', 'Essential for Gaganyaan & future missions', 'Demonstrated autonomous docking', 'Foundation for Indian Space Station'],
  },
];


const ISROHistory = () => {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #050510 60%, #0a0a0f 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10 pt-16 pb-20">

        {/* Back */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <HiArrowLeft size={16} /> Back to Learning Hub
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp(0.05)} className="mb-14">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">ISRO History</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
            From Bullock Carts to<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #10b981, #06b6d4)' }}>
              Lunar South Pole
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            The story of ISRO is the story of India's scientific ambition — a nation that went from
            assembling rockets in a church to landing on the Moon's south pole in just 61 years.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {milestones.map((m, index) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.year + m.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative pl-16"
              >
                {/* Connector line */}
                {index < milestones.length - 1 && (
                  <div
                    className="absolute left-5 top-12 bottom-0 w-0.5 opacity-20"
                    style={{ background: m.color }}
                  />
                )}
                {/* Icon badge */}
                <div
                  className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-2"
                  style={{ background: `${m.color}22`, borderColor: `${m.color}60` }}
                >
                  <Icon size={18} style={{ color: m.color }} />
                </div>

                <div
                  className="rounded-2xl p-6 border border-white/8 hover:border-white/18 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="text-xs font-black px-3 py-1 rounded-full"
                      style={{ background: `${m.color}22`, color: m.color }}
                    >
                      {m.year}
                    </span>
                    <h3 className="text-white font-bold text-lg">{m.title}</h3>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{m.description}</p>

                  <div className="grid grid-cols-2 gap-2">
                    {m.facts.map((fact) => (
                      <div
                        key={fact}
                        className="flex items-center gap-2 text-xs text-slate-500 p-2 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: m.color }} />
                        {fact}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ISROHistory;
