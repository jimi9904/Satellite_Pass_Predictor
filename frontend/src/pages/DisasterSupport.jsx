import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiShieldCheck, HiArrowRight } from 'react-icons/hi';
import { FaWind, FaWater, FaFire, FaMountain, FaSun, FaSatellite } from 'react-icons/fa';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const disasters = [
  {
    id: 'cyclones',
    title: 'Cyclones',
    icon: FaWind,
    color: '#06b6d4',
    summary: 'Seasonal low-pressure systems from the Bay of Bengal demand fast imaging and ocean wind mapping.',
    satellites: [
      { name: 'INSAT-3D/3DR', role: 'Rapid-scan infrared images and sounding for IMD warnings.' },
      { name: 'Oceansat-3 (EOS-06)', role: 'Scatterometer winds pinpoint cyclone intensity at sea.' }
    ],
    response: [
      'INSAT rapid imaging delivers storm center fixes every 15 minutes.',
      'Oceansat scatterometer vectors help fishermen advisories and landfall prediction.'
    ]
  },
  {
    id: 'floods',
    title: 'Floods',
    icon: FaWater,
    color: '#3b82f6',
    summary: 'Monsoon-fed rivers and cloudbursts require day-night radar coverage for inundation mapping.',
    satellites: [
      { name: 'RISAT-2BR1', role: 'All-weather Synthetic Aperture Radar cuts through clouds for flood plain updates.' },
      { name: 'Cartosat-3', role: 'Very high-resolution optical shots guide relief logistics and breach monitoring.' }
    ],
    response: [
      'RISAT provides district-level flood layers for NDMA dashboards.',
      'Cartosat imagery supports bridge safety checks and evacuation routes.'
    ]
  },
  {
    id: 'forest-fires',
    title: 'Forest Fires',
    icon: FaFire,
    color: '#ef4444',
    summary: 'Western Ghats and Himalayan forests rely on thermal monitoring and smoke plume tracking.',
    satellites: [
      { name: 'INSAT-3D', role: 'Night-time infrared brightens fire pixels for quick response.' },
      { name: 'RISAT-2BR1', role: 'Radar imaging for all-weather fire detection and monitoring.' }
    ],
    response: [
      'Thermal anomaly feeds slip into Van Agni alerting system.',
      'Geostationary coverage keeps fire control rooms updated every 15 minutes.'
    ]
  },
  {
    id: 'landslides',
    title: 'Landslides',
    icon: FaMountain,
    color: '#f59e0b',
    summary: 'Fragile Himalayan slopes need precise elevation models and rainfall-linked triggers.',
    satellites: [
      { name: 'Cartosat-2F', role: 'Stereo pairs offer 1 m DEMs to detect slope instability.' },
      { name: 'GSAT-30', role: 'Emergency SATCOM backhauls data from remote hill sensors.' }
    ],
    response: [
      'Cartosat DEM differencing flags slope creep near highways.',
      'GSAT-30 ensures uninterrupted SDRF communication during fiber cuts.'
    ]
  },
  {
    id: 'drought',
    title: 'Drought',
    icon: FaSun,
    color: '#eab308',
    summary: 'Arid belts of Vidarbha and Rayalaseema need soil moisture, vegetation, and groundwater cues.',
    satellites: [
      { name: 'Resourcesat-2A', role: 'Multi-spectral Earth observation for vegetation and soil moisture monitoring.' },
      { name: 'RISAT-2BR1', role: 'SAR-derived soil moisture indices for agriculture advisories.' }
    ],
    response: [
      'Resourcesat-2A provides vegetation indices for drought assessment.',
      'RISAT moisture maps feed the National Agricultural Drought Assessment System.'
    ]
  }
];

const DisasterSupport = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #050510 60%, #0a0a0f 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-20">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border"
            style={{ background: '#ef444420', borderColor: '#ef444440', color: '#fca5a5' }}
          >
            <HiShieldCheck size={14} /> NDMA & ISRO Partnership
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            ISRO Assets Protecting<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #ef4444, #f59e0b)' }}>
              1.4 Billion Lives
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Swadeshi spacecraft supply constant data for the IMD, NDMA, Forest Survey, and farmers. 
            Explore how each hazard relies on a unique mix of weather, radar, and communication satellites.
          </p>
        </motion.div>

        {/* Disaster Scenarios */}
        <div className="grid lg:grid-cols-2 gap-8">
          {disasters.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col h-full"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                {/* Color Banner */}
                <div className="h-2" style={{ background: `linear-gradient(90deg, ${scenario.color}, ${scenario.color}40)` }} />

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${scenario.color}22` }}
                    >
                      <Icon size={28} style={{ color: scenario.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">{scenario.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{scenario.summary}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-auto">
                    {/* ISRO Satellites */}
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                      <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4 flex items-center gap-2">
                        <FaSatellite size={12} className="text-cyan-400" /> Key Satellites
                      </p>
                      <ul className="space-y-4">
                        {scenario.satellites.map((sat) => (
                          <li key={sat.name}>
                            <p className="font-bold text-white text-sm">{sat.name}</p>
                            <p className="text-xs text-slate-400 leading-relaxed mt-1">{sat.role}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* How they help */}
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                      <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4 flex items-center gap-2">
                        <HiArrowRight size={12} className="text-amber-400" /> Operational Response
                      </p>
                      <ul className="space-y-3">
                        {scenario.response.map((line) => (
                          <li key={line} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: scenario.color }} />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
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

export default DisasterSupport;
