import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiClock, HiArrowUp, HiSun, HiCloud } from 'react-icons/hi';
import Card from './Card';
import StatCard from './StatCard';

const PassTable = ({ data }) => {
  const { t } = useTranslation();
  if (!data?.prediction) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              {t('app.passTable.awaitingPrediction')}
            </p>
          </div>
        </Card>
      </motion.div>
    );
  }

  const {
    prediction: {
      startTime,
      endTime,
      durationMinutes,
      maxElevation,
      dayNight,
      visibilityScore,
    },
    weather,
  } = data;

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="large">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            {data.satellite?.name ?? t('app.card.unknownSatellite')}
          </h3>
          <p className="text-sm uppercase tracking-wide text-cyan-400">
            {t('app.passTable.nextVisiblePass')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <HiClock size={16} />
              <p className="text-xs uppercase tracking-wide">{t('app.passTable.duration')}</p>
            </div>
            <p className="text-xl font-bold text-white">{t('app.passTable.durationMinutes', { minutes: durationMinutes })}</p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <HiArrowUp size={16} />
              <p className="text-xs uppercase tracking-wide">{t('app.passTable.maxElevation')}</p>
            </div>
            <p className="text-xl font-bold text-white">{maxElevation}°</p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <HiSun size={16} />
              <p className="text-xs uppercase tracking-wide">{t('app.passTable.time')}</p>
            </div>
            <p className="text-lg font-semibold text-white">
              {dayNight === 'Day' ? t('app.passTable.day') : t('app.passTable.night')}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <HiCloud size={16} />
              <p className="text-xs uppercase tracking-wide">{t('app.passTable.visibility')}</p>
            </div>
            <p className={`text-lg font-semibold ${
              visibilityScore === 'Good' ? 'text-green-400' :
              visibilityScore === 'Average' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {visibilityScore === 'Good' ? t('app.passTable.good') :
               visibilityScore === 'Average' ? t('app.passTable.average') :
               t('app.passTable.poor')}
            </p>
          </div>
        </div>

        {/* Time Details */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
            <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">{t('app.passTable.startTime')}</p>
            <p className="text-white font-medium">
              {startDate.toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'medium',
                timeStyle: 'short',
              })} IST
            </p>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
            <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">{t('app.passTable.endTime')}</p>
            <p className="text-white font-medium">
              {endDate.toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'medium',
                timeStyle: 'short',
              })} IST
            </p>
          </div>
        </div>

        {/* Weather Info */}
        {weather && (
          <div className="pt-6 border-t border-slate-800/50">
            <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <HiCloud className="text-cyan-400" />
              {t('app.passTable.weatherSnapshot')}
            </p>
            {weather.raw ? (
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                <div className="space-y-2 text-sm text-slate-300">
                  {weather.temperature !== null && (
                    <p>
            <span className="font-semibold text-white">{t('app.passTable.temperature')}:</span>{' '}
                      {weather.temperature}°C
                    </p>
                  )}
                  <p>
                    <span className="font-semibold text-white">{t('app.passTable.conditions')}:</span>{' '}
                    {weather.raw.weather?.[0]?.description ?? t('app.common.nA')}
                  </p>
                  <p>
                    <span className="font-semibold text-white">{t('app.passTable.clouds')}:</span>{' '}
                    {weather.raw.clouds?.all ?? t('app.common.nA')}%
                  </p>
                  <p>
                    <span className="font-semibold text-white">{t('app.passTable.visibilityDistance')}:</span>{' '}
                    {weather.raw.visibility ? `${(weather.raw.visibility / 1000).toFixed(1)} km` : t('app.common.nA')}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">{weather.source}</p>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default PassTable;
