import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import SatelliteCard from '../components/SatelliteCard';
import PageHeader from '../components/PageHeader';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import { HiGlobeAlt, HiStar } from 'react-icons/hi';
import { FaSatellite, FaMapMarkedAlt, FaCloudSun, FaShieldAlt } from 'react-icons/fa';

const fleetCategories = [
  {
    name: 'Earth Observation',
    icon: FaSatellite,
    color: '#06b6d4',
    count: '20+',
    desc: 'Cartosat, Resourcesat, Oceansat, RISAT, and EOS series providing sub-meter imaging, SAR radar, ocean colour, and vegetation monitoring for agriculture, defence, and urban planning.',
    examples: ['Cartosat-3: 0.25m resolution', 'RISAT-2BR1: All-weather SAR', 'EOS-06 (Oceansat-3): Ocean monitoring'],
  },
  {
    name: 'Communication (INSAT/GSAT)',
    icon: HiGlobeAlt,
    color: '#f59e0b',
    count: '16+',
    desc: 'INSAT and GSAT series geostationary satellites providing DTH television, broadband internet, VSAT, disaster warning, and emergency communication across India and neighbouring regions.',
    examples: ['GSAT-20 (2024): Ka-band HTS broadband', 'GSAT-30: Ku/C-band communications', 'INSAT-3D/3DR: Weather + comms'],
  },
  {
    name: 'Navigation (NavIC/IRNSS)',
    icon: FaMapMarkedAlt,
    color: '#8b5cf6',
    count: '7',
    desc: 'India\'s own regional navigation satellite system. 3 in GEO orbit + 4 in inclined GSO orbits deliver sub-10m positional accuracy across India and 1,500 km surrounding region. Completely independent of foreign GPS systems.',
    examples: ['IRNSS-1A through 1I series', 'NVS-01 (2023): New generation with atomic clock', 'Used by Indian military, fishermen, aviation'],
  },
  {
    name: 'Meteorology',
    icon: FaCloudSun,
    color: '#10b981',
    count: '4+',
    desc: 'Dedicated weather satellites providing India Meteorological Department (IMD) with rapid-scan imagery every 15 minutes. Critical for cyclone tracking, monsoon monitoring, and agricultural forecasting.',
    examples: ['INSAT-3D: 6-channel imager + sounder', 'INSAT-3DR: Advanced meteorological imaging', 'INSAT-3DS (2024): Third-generation weather satellite'],
  },
  {
    name: 'Scientific & Deep Space',
    icon: HiStar,
    color: '#fbbf24',
    count: '5+',
    desc: 'Astrophysics, solar science, and planetary exploration missions. AstroSat, Chandrayaan series, Mangalyaan, Aditya-L1, and XPoSat represent India\'s growing deep-space ambitions.',
    examples: ['Aditya-L1: Solar observatory at L1 point', 'AstroSat: Multi-wavelength astronomy', 'Chandrayaan-2 orbiter: Active lunar mapping'],
  },
  {
    name: 'Strategic / Reconnaissance',
    icon: FaShieldAlt,
    color: '#ef4444',
    count: '5+',
    desc: 'EMISAT for electronic intelligence and RISAT series for dual-use (civil and defence) Synthetic Aperture Radar. These satellites enhance India\'s strategic awareness and border monitoring capabilities.',
    examples: ['EMISAT: Electronic intelligence (ELINT)', 'RISAT-2BR1: High-resolution SAR', 'Microsat-R: Technology demonstration'],
  },
];

const stats = [
  { value: '50+', label: 'Operational Satellites', color: '#06b6d4' },
  { value: '400+', label: 'Foreign Satellites Launched', color: '#f59e0b' },
  { value: '100%', label: 'Indigenous Navigation', color: '#8b5cf6' },
  { value: '36,000km', label: 'GEO Communication Coverage', color: '#10b981' },
];

const SatelliteList = () => {
  const { t } = useTranslation();
  const [satellites, setSatellites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'EO', 'COM', 'NAV', 'MET'];

  useEffect(() => {
    const loadSatellites = async () => {
      try {
        const { data } = await api.get('/satellites');
        setSatellites(data);
      } catch (err) {
        setError(err.response?.data?.message ?? t('app.satellites.failedToFetch'));
      } finally {
        setLoading(false);
      }
    };
    loadSatellites();
  }, [t]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #050510 60%, #0a0a0f 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border"
            style={{ background: '#06b6d420', borderColor: '#06b6d440', color: '#67e8f9' }}
          >
            <FaSatellite size={12} /> ISRO Satellite Fleet
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            India's Eyes in{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #06b6d4, #8b5cf6)' }}
            >
              Space
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            ISRO operates over 50 satellites serving 1.4 billion people — from weather forecasting
            and navigation to internet connectivity, disaster management, and deep space science.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {stats.map(({ value, label, color }) => (
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

        {/* Fleet Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">Fleet Overview</p>
            <h2 className="text-2xl font-black text-white">Satellite Categories</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {fleetCategories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="rounded-2xl p-6 border border-white/10 hover:border-white/22 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${cat.color}22` }}
                    >
                      <Icon size={20} style={{ color: cat.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">{cat.name}</h3>
                      <span
                        className="text-xs font-black"
                        style={{ color: cat.color }}
                      >
                        {cat.count} satellites
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">{cat.desc}</p>
                  <ul className="space-y-1.5">
                    {cat.examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="relative mb-14">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/8" />
          </div>
          <div className="relative flex justify-center">
            <span
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full border"
              style={{ background: '#0a0a0f', borderColor: 'rgba(255,255,255,0.1)', color: '#64748b' }}
            >
              Live Satellite Data
            </span>
          </div>
        </div>

        {/* Live Satellite Cards */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Tracked Fleet</p>
              <h2 className="text-2xl font-black text-white">{t('app.satellites.fleet')}</h2>
            </div>
            {!loading && !error && (
              <span className="text-xs text-slate-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/8">
                {satellites.length} satellites tracked
              </span>
            )}
          </div>

          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} variant="rect" height={300} className="rounded-xl" />
              ))}
            </div>
          )}

          {error && <ErrorState message={error} />}

          {!loading && !error && (
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {satellites.map((sat, index) => (
                <motion.div
                  key={sat.id ?? sat._id ?? sat.norad_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <SatelliteCard satellite={sat} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SatelliteList;
