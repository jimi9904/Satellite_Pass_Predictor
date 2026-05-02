import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowLeft, HiStar, HiLightBulb } from 'react-icons/hi';
import { GiAstronautHelmet } from 'react-icons/gi';
import { FaRocket, FaShieldAlt, FaClock } from 'react-icons/fa';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const sections = [
  {
    icon: GiAstronautHelmet,
    color: '#8b5cf6',
    title: 'Crew Module',
    subtitle: 'The Vyomyan Orbiter',
    body: `The Gaganyaan Crew Module (CM) is a pressurized capsule designed to carry 3 Vyomnauts (Indian astronauts) into Low Earth Orbit at ~400 km altitude. Built entirely in India by HAL (Hindustan Aeronautics Limited), the CM features:`,
    bullets: [
      'Fully indigenous Environmental Control & Life Support System (ECLSS)',
      'Touchscreen-based flight management interface',
      'Micro-meteoroid protection and radiation shielding',
      'Reusable design for multiple missions',
      'Parachute + retro-rocket landing in Bay of Bengal',
      'Volume: ~8 m³ pressurized living space for 3 crew',
    ],
  },
  {
    icon: FaShieldAlt,
    color: '#ef4444',
    title: 'Abort & Safety Systems',
    subtitle: 'Crew Escape System (CES)',
    body: `The Crew Escape System is a solid-propellant tower mounted atop the crew module that can pull astronauts to safety in milliseconds during a launch failure. ISRO has conducted two Test Vehicle (TV-D) missions to validate this:`,
    bullets: [
      'TV-D1 (Oct 2023): Successfully validated pad abort at low altitude',
      'TV-D2: Validated abort at Max-Q (maximum aerodynamic pressure)',
      'Separation velocities > 100 m/s from launch vehicle',
      'Indian Navy recovery drills at splash-down zone in Bay of Bengal',
      'Redundant parachute system: drogue + main + pilot chutes',
      'Crew module rated for 40G deceleration during abort',
    ],
  },
  {
    icon: FaRocket,
    color: '#06b6d4',
    title: 'Launch Vehicle — LVM3',
    subtitle: 'The Human-Rated Rocket',
    body: `Gaganyaan will fly on LVM3 (formerly GSLV Mk-III) — ISROs heaviest rocket. For human spaceflight, LVM3 has been "human-rated": every system reviewed to the highest reliability standards. Configuration:`,
    bullets: [
      'Two solid S200 strap-on boosters (250 tonnes propellant each)',
      'L110 liquid core stage (hydrogen peroxide + UDMH)',
      'CE-20 indigenous cryogenic upper stage (20 kN thrust)',
      'Payload to LEO: 10 tonnes — enough for crew module + service module',
      'Human-rating adds redundancy to avionics, propulsion valves',
      '6 LVM3 flights since 2014; all successful as of 2024',
    ],
  },
  {
    icon: HiLightBulb,
    color: '#10b981',
    title: 'Vyomnauts Training',
    subtitle: 'Preparing India\'s Astronauts',
    body: `Four Indian Air Force pilots — Gp. Capt. Prashanth Balakrishnan Nair, Gp. Capt. Ajit Krishnan, Gp. Capt. Angad Pratap, and Wing Cdr. Shubhanshu Shukla — were selected as Vyomnauts. Their training included:`,
    bullets: [
      '13 months at Yuri Gagarin Cosmonaut Training Centre, Russia',
      'Microgravity adaptation and EVA suit familiarization',
      'Centrifuge training up to 8G for launch and re-entry loads',
      'System familiarization at ISRO Human Space Flight Centre, Bengaluru',
      'Wg. Cdr. Shubhanshu flew to ISS aboard Axiom Mission 4 (2025)',
      'Medical training, underwater neutral buoyancy, parachute drills',
    ],
  },
  {
    icon: FaClock,
    color: '#fbbf24',
    title: 'Mission Timeline',
    subtitle: 'Road to First Crewed Flight',
    body: `Gaganyaan follows a phased approach with uncrewed and robotic flights before risking human life. The programme has been designed to build confidence systematically:`,
    bullets: [
      'TV-D1 (Oct 2023): Crew Escape System validated — SUCCESS',
      'G1 (2025-26): First uncrewed LVM3 orbital mission',
      'G2 (2026): Second uncrewed mission with Vyommitra robot',
      'H1 (2027): First crewed mission — 3 Vyomnauts, 3-day LEO mission',
      'Future: Docking capability for Bharatiya Antariksha Station (BAS)',
      'BAS: India\'s own space station planned for 2035',
    ],
  },
];

const Gaganyaan = () => {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #050510 60%, #0a0a0f 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10 pt-16 pb-20">

        {/* Back */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <Link to="/learn" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <HiArrowLeft size={16} /> Back to Learning Hub
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp(0.05)} className="mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border"
            style={{ background: '#8b5cf620', borderColor: '#8b5cf640', color: '#c4b5fd' }}>
            <HiStar size={12} /> Human Spaceflight Programme
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
            Gaganyaan —<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }}>
              India Reaches for the Stars
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            India's first human spaceflight programme. Three Vyomnauts. Three days in Low Earth Orbit.
            An entirely indigenous crew module, rocket, and mission control — built in India, for India.
          </p>
        </motion.div>

        {/* Hero Stats */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { value: '400 km', label: 'Orbital Altitude', color: '#8b5cf6' },
            { value: '3 Days', label: 'Mission Duration', color: '#06b6d4' },
            { value: '3', label: 'Vyomnauts', color: '#10b981' },
            { value: '2027', label: 'Target Year', color: '#f59e0b' },
          ].map(({ value, label, color }) => (
            <div key={label} className="rounded-2xl p-5 text-center border border-white/8"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <p className="text-2xl font-black mb-1" style={{ color }}>{value}</p>
              <p className="text-slate-500 text-xs">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((sec, index) => {
            const Icon = sec.icon;
            return (
              <motion.div
                key={sec.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <div className="p-7">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${sec.color}22` }}>
                      <Icon size={24} style={{ color: sec.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{sec.title}</h3>
                      <p className="text-xs font-semibold" style={{ color: sec.color }}>{sec.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{sec.body}</p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: sec.color }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Gaganyaan;
