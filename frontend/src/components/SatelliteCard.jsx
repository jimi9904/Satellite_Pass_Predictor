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

  const imageUrl = satellite.image_url || fallbackSatellite;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48 overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
            NORAD {satellite.norad_id}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3 bg-white/5 backdrop-blur-sm">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{satellite.name}</h3>
          <p className="text-sm text-slate-300 line-clamp-2">{satellite.mission}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getMissionBadgeColor(satellite.mission)}`}>
            {satellite.purpose || t('app.common.mission')}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
          <div className="flex items-center gap-1">
            <HiCalendar size={14} />
            <span>{t('app.common.launch')} {satellite.launch_year}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRocket size={14} />
            <span>{t('app.common.active')}</span>
          </div>
        </div>

        <Link
          to={`/satellites/${satellite.id ?? satellite._id ?? satellite.norad_id}`}
          className="block w-full mt-4 px-4 py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 backdrop-blur-sm border border-cyan-400/30"
        >
          {t('app.common.viewDetails')}
        </Link>
      </div>
    </motion.div>
  );
};

export default SatelliteCard;
