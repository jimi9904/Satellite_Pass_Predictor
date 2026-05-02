import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    title: 'Cyclones & Storms',
    icon: FaWind,
    color: '#06b6d4',
    bgImg: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=800&auto=format&fit=crop',
    summary: 'Seasonal low-pressure systems from the Bay of Bengal demand fast imaging and ocean wind mapping to track landfall and intensity.',
    satellites: [
      { name: 'INSAT-3D/3DR', role: 'Rapid-scan infrared images and sounding for IMD warnings every 15 minutes.' },
      { name: 'Oceansat-3 (EOS-06)', role: 'Scatterometer winds pinpoint cyclone intensity and direction at sea.' }
    ],
    response: [
      'INSAT rapid imaging delivers storm center fixes almost in real-time.',
      'Oceansat scatterometer vectors help fishermen advisories and landfall prediction.',
      'Data feeds directly into the Cyclone Warning Division of IMD.'
    ]
  },
  {
    id: 'floods',
    title: 'Floods & Inundation',
    icon: FaWater,
    color: '#3b82f6',
    bgImg: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800&auto=format&fit=crop',
    summary: 'Monsoon-fed rivers and sudden cloudbursts require day-night radar coverage to see through thick rain clouds for inundation mapping.',
    satellites: [
      { name: 'RISAT-2BR1', role: 'All-weather Synthetic Aperture Radar (SAR) cuts through clouds for flood plain updates.' },
      { name: 'Cartosat-3', role: 'Very high-resolution optical shots guide relief logistics and breach monitoring after rains stop.' }
    ],
    response: [
      'RISAT provides district-level flood layers for NDMA and state dashboards.',
      'Cartosat imagery supports bridge safety checks and rescue route planning.',
      'Helps deploy NDRF teams to the most severely inundated zones.'
    ]
  },
  {
    id: 'forest-fires',
    title: 'Forest Fires',
    icon: FaFire,
    color: '#ef4444',
    bgImg: 'https://images.unsplash.com/photo-1602980068989-cb21ea54ba2e?q=80&w=800&auto=format&fit=crop',
    summary: 'Vast forests in the Western Ghats and Himalayas rely on thermal monitoring and smoke plume tracking during the dry summer months.',
    satellites: [
      { name: 'INSAT-3D', role: 'Night-time infrared imaging brightens active fire pixels for quick response.' },
      { name: 'Resourcesat-2A', role: 'Multi-spectral imaging assesses the burn scar area and vegetation loss.' }
    ],
    response: [
      'Thermal anomaly feeds are integrated directly into the Forest Survey of India alerts.',
      'Geostationary coverage keeps state fire control rooms updated continuously.',
      'Helps prevent the spread of fires to nearby tribal and rural settlements.'
    ]
  },
  {
    id: 'landslides',
    title: 'Landslides & Earthquakes',
    icon: FaMountain,
    color: '#f59e0b',
    bgImg: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=800&auto=format&fit=crop',
    summary: 'Fragile Himalayan slopes and seismic zones need precise elevation models, slope stability analysis, and emergency communications.',
    satellites: [
      { name: 'Cartosat-2/3', role: 'Stereo pairs offer 1-meter Digital Elevation Models (DEM) to detect slope instability.' },
      { name: 'GSAT-30', role: 'Emergency SATCOM backhauls data from remote hill sensors when terrestrial networks fail.' }
    ],
    response: [
      'Cartosat DEM differencing flags slope creep near critical highways.',
      'GSAT-30 ensures uninterrupted State Disaster Response Force (SDRF) communication.',
      'Post-earthquake high-resolution mapping aids urban search and rescue.'
    ]
  },
  {
    id: 'drought',
    title: 'Drought & Agriculture',
    icon: FaSun,
    color: '#eab308',
    bgImg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    summary: 'Arid agricultural belts of Vidarbha and Rayalaseema need long-term soil moisture, vegetation health, and groundwater cues.',
    satellites: [
      { name: 'Resourcesat-2A', role: 'Multi-spectral Earth observation for Normalized Difference Vegetation Index (NDVI).' },
      { name: 'RISAT-2B', role: 'SAR-derived soil moisture indices for agriculture advisories.' }
    ],
    response: [
      'Provides vegetation indices for state-level drought assessment declarations.',
      'Moisture maps feed the National Agricultural Drought Assessment System (NADAS).',
      'Helps the government allocate water resources and crop compensation accurately.'
    ]
  }
];

const DisasterSupport = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(disasters[0]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #050510 60%, #0a0a0f 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-20">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border"
            style={{ background: '#ef444420', borderColor: '#ef444440', color: '#fca5a5' }}
          >
            <HiShieldCheck size={14} /> NDMA & ISRO Partnership
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
            Protecting <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #ef4444, #f59e0b)' }}>1.4 Billion Lives</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            When disaster strikes, ISRO's fleet is the nation's first responder from space.
            Select a hazard below to see how satellites guide ground teams during critical hours.
          </p>
        </motion.div>

        {/* Interactive Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[600px]">
          
          {/* Left Sidebar Menu */}
          <motion.div {...fadeUp(0.1)} className="lg:w-1/3 flex flex-col gap-3">
            {disasters.map((d) => {
              const Icon = d.icon;
              const isActive = activeTab.id === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveTab(d)}
                  className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-300 border ${
                    isActive ? 'bg-white/10 border-white/20 shadow-xl' : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isActive ? '' : 'opacity-70'}`}
                    style={{ background: isActive ? `${d.color}33` : 'rgba(255,255,255,0.05)' }}>
                    <Icon size={20} style={{ color: isActive ? d.color : '#94a3b8' }} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isActive ? 'text-white' : 'text-slate-400'}`}>{d.title}</h3>
                    {isActive && (
                      <motion.div layoutId="activeIndicator" className="h-1 w-8 rounded-full mt-2" style={{ background: d.color }} />
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right Content Area */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/10 overflow-hidden bg-white/5 h-full flex flex-col shadow-2xl relative"
              >
                {/* Hero Background Image */}
                <div className="h-48 md:h-64 relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0f] z-10" />
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  <img src={activeTab.bgImg} alt={activeTab.title} className="w-full h-full object-cover transform scale-105" />
                  
                  <div className="absolute bottom-6 left-6 md:left-10 z-20">
                    <h2 className="text-3xl md:text-4xl font-black text-white">{activeTab.title} Support</h2>
                  </div>
                </div>

                <div className="p-6 md:p-10 flex flex-col flex-grow relative z-20 -mt-6">
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    {activeTab.summary}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mt-auto">
                    {/* ISRO Satellites */}
                    <div>
                      <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-4 flex items-center gap-2">
                        <FaSatellite size={12} className="text-cyan-400" /> Dedicated Satellites
                      </p>
                      <ul className="space-y-4">
                        {activeTab.satellites.map((sat) => (
                          <li key={sat.name} className="bg-black/20 rounded-xl p-4 border border-white/5">
                            <p className="font-bold text-white text-sm mb-1">{sat.name}</p>
                            <p className="text-xs text-slate-400 leading-relaxed">{sat.role}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* How they help */}
                    <div>
                      <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-4 flex items-center gap-2">
                        <HiArrowRight size={12} className="text-amber-400" /> Operational Response
                      </p>
                      <ul className="space-y-4">
                        {activeTab.response.map((line) => (
                          <li key={line} className="flex items-start gap-3 bg-black/20 rounded-xl p-4 border border-white/5">
                            <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: activeTab.color, boxShadow: `0 0 10px ${activeTab.color}` }} />
                            <span className="text-sm text-slate-300 leading-relaxed">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DisasterSupport;
