import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  HiGlobeAlt, HiLightBulb, HiShieldCheck, HiStar,
  HiChevronRight, HiClock
} from 'react-icons/hi';
import {
  FaRocket, FaSatellite, FaMoon, FaMars,
  FaSun, FaUsers, FaMapMarkedAlt, FaFlask
} from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const StatCard = ({ value, label, icon: Icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.04, y: -4 }}
    className="relative overflow-hidden rounded-2xl p-6 border border-white/10"
    style={{
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(12px)',
    }}
  >
    <div
      className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-xl"
      style={{ background: color }}
    />
    <div className="flex items-start justify-between mb-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${color}22` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
    </div>
    <p className="text-3xl font-black text-white mb-1">{value}</p>
    <p className="text-sm text-slate-400">{label}</p>
  </motion.div>
);

const MissionCard = ({ icon: Icon, title, details, color, delay }) => (
  <motion.div
    {...fadeUp(delay)}
    whileHover={{ scale: 1.02, y: -4 }}
    className="group relative rounded-2xl p-6 border border-white/10 overflow-hidden cursor-default transition-all duration-300"
    style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: `radial-gradient(ellipse at 20% 20%, ${color}15, transparent 60%)` }}
    />
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
      style={{ background: `${color}20` }}
    >
      <Icon size={24} style={{ color }} />
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{details}</p>
  </motion.div>
);

const TimelineItem = ({ year, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative pl-16 pb-8 group"
  >
    {/* Connector line */}
    <div
      className="absolute left-5 top-10 bottom-0 w-0.5 opacity-30"
      style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }}
    />
    {/* Year badge */}
    <div
      className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white border-2"
      style={{ background: `${color}33`, borderColor: color }}
    >
      {year.slice(2)}
    </div>
    <div
      className="rounded-2xl p-5 border border-white/8 group-hover:border-white/20 transition-all duration-300"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${color}22`, color }}
        >
          {year}
        </span>
        <h4 className="text-white font-semibold text-sm">{title}</h4>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const LeaderCard = ({ name, role, years, contribution }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="rounded-2xl p-5 border border-white/10 transition-all duration-300 hover:border-amber-500/30"
    style={{ background: 'rgba(255,255,255,0.04)' }}
  >
    <div className="flex items-start gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #f59e0b33, #0891b233)' }}
      >
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="text-white font-bold text-sm">{name}</h4>
        <p className="text-amber-400 text-xs mb-1">{role}</p>
        <p className="text-slate-500 text-xs mb-2">{years}</p>
        <p className="text-slate-400 text-xs leading-relaxed">{contribution}</p>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '56+', label: 'Years of Excellence', icon: HiClock, color: '#06b6d4' },
    { value: '125+', label: 'Successful Missions', icon: FaRocket, color: '#f59e0b' },
    { value: '7th', label: 'Nation to Reach Orbit', icon: FaSatellite, color: '#8b5cf6' },
    { value: '1st', label: 'Mars Mission First Try', icon: FaMars, color: '#ef4444' },
  ];

  const missions = [
    {
      icon: FaSatellite,
      title: 'Cartosat Constellation',
      details: 'High-resolution imaging satellites powering Atmanirbhar mapping, smart city planning, and rapid disaster response with sub-meter accuracy.',
      color: '#06b6d4',
    },
    {
      icon: HiShieldCheck,
      title: 'RISAT Radar Eyes',
      details: 'All-weather, day-and-night Synthetic Aperture Radar satellites that secure our oceans, monitor agriculture, and support strategic reconnaissance.',
      color: '#10b981',
    },
    {
      icon: HiGlobeAlt,
      title: 'GSAT Communication Backbone',
      details: 'Geostationary fleet of 16+ satellites keeping Bharat connected via broadband, television broadcasting, maritime and in-flight communications.',
      color: '#f59e0b',
    },
    {
      icon: FaMapMarkedAlt,
      title: 'NavIC / IRNSS',
      details: 'Indias own regional navigation constellation delivering sub-10m accuracy across land, sea, and air — entirely designed and built in India.',
      color: '#8b5cf6',
    },
    {
      icon: FaMoon,
      title: 'Chandrayaan Programme',
      details: 'Three landmark lunar missions: Chandrayaan-1 discovered lunar water, Chandrayaan-2 orbiter still maps the Moon, Chandrayaan-3 soft-landed at the south pole in 2023.',
      color: '#a78bfa',
    },
    {
      icon: FaSun,
      title: 'Aditya-L1 Solar Mission',
      details: "India's first dedicated space-based solar observatory studying coronal heating, solar winds, and space weather — stationed at Sun-Earth L1 Lagrange point.",
      color: '#fbbf24',
    },
    {
      icon: FaMars,
      title: 'Mangalyaan (MOM)',
      details: 'Mars Orbiter Mission — India became the 4th country to reach Mars, doing it on the first attempt and at a fraction of the cost of comparable missions.',
      color: '#f87171',
    },
    {
      icon: FaUsers,
      title: 'Gaganyaan Programme',
      details: 'Indias human spaceflight mission. Crew modules tested, Vyomnauts trained with the Russian Yuri Gagarin training centre. Crewed flight targeted for 2027.',
      color: '#34d399',
    },
    {
      icon: FaFlask,
      title: 'SpaDeX Mission (2024)',
      details: 'Space Docking Experiment successfully demonstrated in-space rendezvous and docking technology, making India only the 4th country to achieve this critical capability.',
      color: '#60a5fa',
    },
  ];

  const timeline = [
    {
      year: '1962',
      title: 'INCOSPAR Founded',
      description: 'Indian National Committee for Space Research established by Dr. Vikram Sarabhai on the recommendation of PM Jawaharlal Nehru, sowing the seeds of the Indian space programme.',
      color: '#06b6d4',
    },
    {
      year: '1969',
      title: 'ISRO Established',
      description: 'Indian Space Research Organisation formally created on August 15, 1969 — Independence Day — succeeding INCOSPAR with a broader mandate for space research and application.',
      color: '#06b6d4',
    },
    {
      year: '1975',
      title: 'Aryabhata — First Indian Satellite',
      description: 'Indias first satellite launched aboard a Soviet Kosmos-3M rocket. Named after the ancient Indian mathematician, it carried experiments for X-ray astronomy and solar physics.',
      color: '#f59e0b',
    },
    {
      year: '1980',
      title: 'SLV-3 — Indigenous Launch',
      description: 'Satellite Launch Vehicle SLV-3 successfully placed the Rohini satellite into orbit, making India the 7th country in the world to achieve indigenous orbital launch capability.',
      color: '#f59e0b',
    },
    {
      year: '1993',
      title: 'PSLV Era Begins',
      description: 'After an initial setback, PSLV-D2 achieved success in 1994, launching IRS-P2. The PSLV went on to become the most reliable rocket in ISROs fleet.',
      color: '#8b5cf6',
    },
    {
      year: '2008',
      title: 'Chandrayaan-1 Moon Mission',
      description: 'Indias first lunar probe discovered water molecules on the Moon using the Moon Impact Probe and NASAs M3 instrument, revolutionising our understanding of the lunar surface.',
      color: '#a78bfa',
    },
    {
      year: '2013',
      title: 'Mars Orbiter Mission (Mangalyaan)',
      description: 'ISRO launched Mangalyaan on 5 November 2013 using PSLV-C25. It successfully entered Martian orbit in September 2014 — first Asian nation to reach Mars on a debut attempt.',
      color: '#ef4444',
    },
    {
      year: '2014',
      title: 'PSLV-C37 World Record',
      description: 'ISRO set a world record by launching 104 satellites in a single mission aboard PSLV-C37 in February 2017, cementing its status as the premier commercial launch provider.',
      color: '#06b6d4',
    },
    {
      year: '2019',
      title: 'Chandrayaan-2 & RISAT-2BR1',
      description: 'Chandrayaan-2 orbiter continues mapping the Moon\'s poles. RISAT-2BR1 added all-weather SAR imaging capabilities for defence and disaster management applications.',
      color: '#10b981',
    },
    {
      year: '2023',
      title: 'Chandrayaan-3 South Pole Landing',
      description: 'On 23 August 2023, Vikram lander and Pragyan rover successfully soft-landed near the lunar south pole — a world first — confirming sulfur, aluminium, and other elements.',
      color: '#f59e0b',
    },
    {
      year: '2023',
      title: 'Aditya-L1 Solar Observatory',
      description: 'India\'s first solar mission reached the Sun-Earth L1 Lagrange point, studying solar corona, solar winds, and space weather to protect Earth\'s technological infrastructure.',
      color: '#fbbf24',
    },
    {
      year: '2024',
      title: 'SpaDeX Docking Mission',
      description: 'SpaDeX (Space Docking Experiment) in December 2024 demonstrated autonomous in-space docking — India became the 4th country globally to master this critical future technology.',
      color: '#60a5fa',
    },
  ];

  const leaders = [
    {
      name: 'Dr. Vikram Sarabhai',
      role: 'Father of Indian Space Programme',
      years: '1919–1971',
      contribution: 'Visionary physicist who convinced Nehru to start India\'s space programme. Founded PRL, INCOSPAR, and set the philosophical foundation: space technology for national development.',
    },
    {
      name: 'Dr. APJ Abdul Kalam',
      role: 'Rocket Man of India',
      years: '1931–2015',
      contribution: 'Pioneered SLV-3, Agni, and Prithvi missiles. Led India\'s defense and civil space rocketry. Later became India\'s 11th President, beloved as the People\'s President.',
    },
    {
      name: 'Dr. U.R. Rao',
      role: 'Satellite Pioneer',
      years: '1932–2017',
      contribution: 'Led design and fabrication of Aryabhata and subsequent satellites. Built India\'s satellite technology from scratch. As ISRO Chairman, oversaw the INSAT and IRS programmes.',
    },
    {
      name: 'Dr. S. Somnath',
      role: 'ISRO Chairman (2022–present)',
      years: '2022–Present',
      contribution: 'Chief architect behind LVM3 and the Gaganyaan programme. Under his leadership, Chandrayaan-3 and Aditya-L1 achieved landmark success, redefining India\'s global space stature.',
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #050510 50%, #0a0a0f 100%)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #0891b2 0%, #7c3aed 50%, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border"
              style={{ background: '#06b6d420', borderColor: '#06b6d440', color: '#67e8f9' }}
            >
              <HiStar size={12} /> Est. 1969 · Bengaluru, India
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Indian Space Research<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #f59e0b)' }}
              >
                Organisation
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              From a humble rocket launch facility in Thumba — where parts were transported on bullock carts —
              to landing on the Moon's south pole and docking spacecraft in orbit, ISRO's journey is one of
              human ingenuity, frugal innovation, and unwavering national resolve.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20 space-y-20">

        {/* Foundation & Vision */}
        <motion.section {...fadeUp(0.1)}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-400 mb-3 font-bold">Our Origins</p>
              <h2 className="text-3xl font-black text-white mb-5">
                Built on a Vision of<br />
                <span className="text-cyan-400">Space for All</span>
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  ISRO was established on <strong className="text-white">15 August 1969</strong>, Independence Day, under the vision of
                  Dr. Vikram Sarabhai who famously said: <em className="text-slate-300">"There are some who question the relevance of space activities
                  in a developing nation. To us, there is no ambiguity of purpose."</em>
                </p>
                <p>
                  Headquartered in <strong className="text-white">Bengaluru</strong>, ISRO operates under the Department of Space and the Space Commission of India.
                  It manages over <strong className="text-white">13 major centres and units</strong> across the country, including VSSC in Thiruvananthapuram,
                  SAC in Ahmedabad, NRSC in Hyderabad, and the Satish Dhawan Space Centre in Sriharikota.
                </p>
                <p>
                  With an annual budget of roughly <strong className="text-white">₹12,543 crore (2023–24)</strong>, ISRO delivers space capabilities
                  at a fraction of what comparable agencies spend — proving that <em className="text-slate-300">frugal engineering</em> is not compromise,
                  but <strong className="text-white">innovation under constraint</strong>.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Headquarters', value: 'Bengaluru, Karnataka', color: '#06b6d4' },
                { label: 'Founded', value: '15 August 1969', color: '#f59e0b' },
                { label: 'Parent Agency', value: 'Department of Space, Govt. of India', color: '#8b5cf6' },
                { label: 'Annual Budget (2023–24)', value: '₹12,543 Crore (~$1.5B)', color: '#10b981' },
                { label: 'Major Centres', value: '13+ including VSSC, SAC, NRSC, SDSC', color: '#f87171' },
                { label: 'Launch Site', value: 'Satish Dhawan Space Centre, Sriharikota', color: '#fbbf24' },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/8"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: color }} />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
                    <p className="text-sm text-white font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Mission Highlights */}
        <motion.section {...fadeUp(0.1)}>
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-cyan-400 mb-3 font-bold">Flagship Programmes</p>
            <h2 className="text-3xl font-black text-white mb-4">Missions That Define India</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">From Earth observation to deep space, ISRO's diverse mission portfolio addresses both national development needs and scientific curiosity.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {missions.map((mission, index) => (
              <MissionCard key={mission.title} {...mission} delay={index * 0.07} />
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section {...fadeUp(0.1)}>
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-cyan-400 mb-3 font-bold">Six Decades of Progress</p>
            <h2 className="text-3xl font-black text-white mb-4">ISRO Timeline</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Every milestone in ISRO's history represents the effort of thousands of scientists, engineers, and technicians working with a singular purpose.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <TimelineItem key={`${item.year}-${item.title}`} {...item} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Visionaries */}
        <motion.section {...fadeUp(0.1)}>
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-amber-400 mb-3 font-bold">The People Behind the Rockets</p>
            <h2 className="text-3xl font-black text-white mb-4">ISRO's Visionaries</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Great organisations are built by great people. These are the leaders whose decisions shaped India's space destiny.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {leaders.map((leader) => (
              <LeaderCard key={leader.name} {...leader} />
            ))}
          </div>
        </motion.section>

        {/* Atmanirbhar Banner */}
        <motion.section {...fadeUp(0.1)}>
          <div
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 border border-white/10"
            style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(139,92,246,0.12) 50%, rgba(245,158,11,0.08) 100%)' }}
          >
            <div className="absolute top-0 right-0 w-80 h-80 opacity-10 blur-3xl"
              style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
            />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <GiArtificialIntelligence size={32} className="text-amber-400" />
                <HiLightBulb size={28} className="text-cyan-400" />
                <FaRocket size={24} className="text-purple-400" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-5">
                Atmanirbhar Bharat in Orbit
              </h3>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed mb-6">
                ISRO embodies the spirit of Atmanirbhar Bharat — self-reliant India. Indigenous launch vehicles,
                indigenous avionics, indigenous payloads. From the cryogenic engine that took 20 years to master
                after technology denial, to the Chandrayaan-3 landing that the whole world watched — ISRO proves
                India can build world-class space technology from within.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {['Indigenous Cryogenic Engine', 'Domestic Satellite Fabrication', 'Self-Reliant Navigation (NavIC)', 'Commercial Launch Services', 'Deep Space Network'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-bold px-4 py-2 rounded-full border"
                    style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', color: '#94a3b8' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default About;
