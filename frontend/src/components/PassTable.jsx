import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiClock, HiArrowUp, HiSun, HiCloud } from 'react-icons/hi';

const PassTable = ({ data }) => {
  const { t } = useTranslation();

  if (!data?.prediction) {
    return (
      <div className="py-12 text-center border border-white/8">
        <p className="font-condensed text-[0.75rem] uppercase tracking-[0.18em] text-white/25">
          {t('app.passTable.awaitingPrediction')}
        </p>
      </div>
    );
  }

  const { prediction: { startTime, endTime, durationMinutes, maxElevation, dayNight, visibilityScore }, weather } = data;
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const visColor = visibilityScore === 'Good' ? '#4ade80' : visibilityScore === 'Average' ? '#facc15' : '#f87171';
  const visLabel = visibilityScore === 'Good' ? t('app.passTable.good')
    : visibilityScore === 'Average' ? t('app.passTable.average')
    : t('app.passTable.poor');

  const statRows = [
    { icon: HiClock, label: t('app.passTable.duration'), value: t('app.passTable.durationMinutes', { minutes: durationMinutes }) },
    { icon: HiArrowUp, label: t('app.passTable.maxElevation'), value: `${maxElevation}°` },
    { icon: HiSun, label: t('app.passTable.time'), value: dayNight === 'Day' ? t('app.passTable.day') : t('app.passTable.night') },
    { icon: HiCloud, label: t('app.passTable.visibility'), value: visLabel, color: visColor },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5"
        style={{ border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none', background: '#0a0a0a' }}>
        <div>
          <p className="label-text text-[0.55rem] mb-1">{t('app.passTable.nextVisiblePass')}</p>
          <h3 className="font-condensed font-black uppercase text-white"
            style={{ fontSize: '1.4rem', letterSpacing: '0.06em' }}>
            {data.satellite?.name ?? t('app.card.unknownSatellite')}
          </h3>
        </div>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: visColor }} />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0"
        style={{ border: '1px solid rgba(255,255,255,0.1)', borderTop: 'none', borderBottom: 'none',
          '--tw-divide-opacity': 1, divideColor: 'rgba(255,255,255,0.08)' }}>
        {statRows.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="px-6 py-5 bg-black"
            style={{ borderRight: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-1.5 mb-3">
              <Icon size={11} className="text-white/55" />
              <span className="label-text text-[0.5rem]">{label}</span>
            </div>
            <p className="font-condensed font-black uppercase text-lg"
              style={{ color: color || '#fff', letterSpacing: '0.04em' }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Time Details */}
      <div className="grid md:grid-cols-2"
        style={{ border: '1px solid rgba(255,255,255,0.1)', borderTop: 'none', borderBottom: 'none' }}>
        {[
          { label: t('app.passTable.startTime'), date: startDate },
          { label: t('app.passTable.endTime'), date: endDate },
        ].map(({ label, date }, i) => (
          <div key={label} className="px-6 py-5 bg-black"
            style={{ borderRight: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="label-text text-[0.5rem] mb-3">{label}</p>
            <p className="font-condensed font-bold text-white text-sm">
              {date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'medium' })} IST
            </p>
          </div>
        ))}
      </div>

      {/* Weather */}
      {weather?.raw && (
        <div className="px-6 py-5 bg-black"
          style={{ border: '1px solid rgba(255,255,255,0.1)', borderTop: 'none' }}>
          <p className="label-text text-[0.5rem] mb-4 flex items-center gap-2">
            <HiCloud size={10} /> {t('app.passTable.weatherSnapshot')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { l: t('app.passTable.temperature'), v: weather.temperature != null ? `${weather.temperature}°C` : '—' },
              { l: t('app.passTable.conditions'), v: weather.raw.weather?.[0]?.description ?? '—' },
              { l: t('app.passTable.clouds'), v: weather.raw.clouds?.all != null ? `${weather.raw.clouds.all}%` : '—' },
              { l: t('app.passTable.visibilityDistance'), v: weather.raw.visibility ? `${(weather.raw.visibility / 1000).toFixed(1)} km` : '—' },
            ].map(({ l, v }) => (
              <div key={l}>
                <p className="label-text text-[0.5rem] mb-1">{l}</p>
                <p className="font-condensed font-semibold text-white uppercase text-sm">{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PassTable;
