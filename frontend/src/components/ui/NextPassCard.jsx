import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiClock, HiArrowUp } from 'react-icons/hi';
import Card from '../Card';
import Badge from './Badge';

const NextPassCard = ({ nextPass, satelliteName }) => {
  const { t } = useTranslation();
  if (!nextPass) return null;

  const startTime = new Date(nextPass.startTime);
  const minutesUntil = Math.round((startTime - new Date()) / 60000);
  const peakTime = startTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 200 }}
    >
      <Card variant="small" style={{ borderColor: 'rgba(139, 92, 246, 0.2)' }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#8b5cf6' }}>{t('app.passTable.nextVisiblePass')}</p>
            <p className="text-sm font-semibold text-white">{satelliteName}</p>
          </div>
          <Badge variant="next-pass">{t('app.passTable.nextVisiblePass')}</Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <HiClock size={16} style={{ color: '#8b5cf6' }} />
            <span>{t('app.passTable.inMinutes', { minutes: minutesUntil })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <HiArrowUp size={16} style={{ color: '#8b5cf6' }} />
            <span>{t('app.passTable.peakAt', { elevation: nextPass.maxElevationDeg.toFixed(1), time: peakTime })}</span>
          </div>
          {nextPass.bestObserver && (
            <p className="text-xs text-slate-400 mt-2">
              {t('app.passTable.bestViewFrom', { location: nextPass.bestObserver.name })}
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default NextPassCard;
