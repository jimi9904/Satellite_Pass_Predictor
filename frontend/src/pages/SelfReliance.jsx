import { useTranslation } from 'react-i18next';
import InfoCard from '../components/InfoCard';
import selfRelianceData from '../data/selfReliance.json';

const SelfReliance = () => {
  const { t } = useTranslation();
  const domainKey = (name, field) => `app.selfReliance.data.domains.${name}.${field}`;
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{t('app.selfReliance.atmanirbharIndex')}</p>
        <h2 className="text-3xl font-bold text-white">{t('app.selfReliance.title')}</h2>
        <p className="text-slate-300 max-w-3xl">
          {t('app.selfReliance.subtitle')}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {(selfRelianceData.domains || []).map((entry) => (
          <InfoCard
            key={entry.name}
            title={t(domainKey(entry.name, 'name'), { defaultValue: entry.name })}
            eyebrow={t('app.selfReliance.capabilityMix')}
          >
            <div className="space-y-3">
              <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400"
                  style={{ width: `${entry.indian}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-slate-300">
                <span>{t('app.selfReliance.indian')}: {entry.indian}%</span>
                <span>{t('app.selfReliance.foreignSupport')}: {entry.foreign}%</span>
              </div>
              <p className="text-xs text-slate-400">
                {t(domainKey(entry.name, 'context'), { defaultValue: entry.context })}
              </p>
            </div>
          </InfoCard>
        ))}
      </div>
      <InfoCard title={t('app.selfReliance.atmanirbharInsights')} eyebrow={t('app.selfReliance.narrative')}>
      <ul className="list-disc pl-5 space-y-2 text-slate-300">
        {(selfRelianceData.insights || []).map((line, idx) => (
          <li key={line}>{t(`app.selfReliance.data.insights.${idx}`, { defaultValue: line })}</li>
        ))}
      </ul>
    </InfoCard>
  </section>
  );
};

export default SelfReliance;


