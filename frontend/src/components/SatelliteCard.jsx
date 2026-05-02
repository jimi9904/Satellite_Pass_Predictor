import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiCalendar } from 'react-icons/hi';
import { FaRocket } from 'react-icons/fa';
import fallbackSatellite from '../assets/fallback-satellite.svg';

const SatelliteCard = ({ satellite }) => {
  const { t } = useTranslation();
  const getMissionBadgeColor = (mission) => {
    if (mission?.toLowerCase().includes('earth observation')) return 'bg-green-500/20 text-green-400';
    if (mission?.toLowerCase().includes('communication')) return 'bg-blue-500/20 text-blue-400';
    if (mission?.toLowerCase().includes('navigation')) return 'bg-purple-500/20 text-purple-400';
    if (mission?.toLowerCase().includes('science')) return 'bg-cyan-500/20 text-cyan-400';
    return 'bg-slate-500/20 text-slate-400';
  };

  const getSatelliteImage = (name, mission) => {
    const nameUpper = (name || '').toUpperCase();
    const missionLower = (mission || '').toLowerCase();
    
    if (nameUpper.includes('CARTOSAT') || nameUpper.includes('RISAT') || missionLower.includes('earth observation')) {
      return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop'; // Earth view
    }
    if (nameUpper.includes('GSAT') || missionLower.includes('communication')) {
      return 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=600&auto=format&fit=crop'; // Space comms
    }
    if (nameUpper.includes('IRNSS') || missionLower.includes('navigation')) {
      return 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?q=80&w=600&auto=format&fit=crop'; // Network/Orbit
    }
    if (nameUpper.includes('INSAT') || missionLower.includes('meteorological') || missionLower.includes('weather')) {
      return 'https://images.unsplash.com/photo-1534088568595-a066f410cbda?q=80&w=600&auto=format&fit=crop'; // Clouds from space
    }
    
    return 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&auto=format&fit=crop'; // Default satellite
  };

  const imageUrl = satellite.image_url || getSatelliteImage(satellite.name, satellite.mission);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col h-full"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={satellite.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackSatellite;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white">
            NORAD {satellite.norad_id}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow bg-white/5 backdrop-blur-sm">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2">{satellite.name}</h3>
          <p className="text-sm text-slate-300 line-clamp-3">{satellite.mission}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getMissionBadgeColor(satellite.mission)}`}>
            {satellite.purpose || t('app.common.mission')}
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between text-xs text-slate-300 py-3 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <HiCalendar size={14} className="text-cyan-400" />
              <span>{t('app.common.launch')} {satellite.launch_year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaRocket size={14} className="text-amber-400" />
              <span>{t('app.common.active')}</span>
            </div>
          </div>

          <Link
            to={`/satellites/${satellite.id ?? satellite._id ?? satellite.norad_id}`}
            className="block w-full mt-2 px-4 py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 backdrop-blur-sm border border-cyan-400/30"
          >
            {t('app.common.viewDetails')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SatelliteCard;
