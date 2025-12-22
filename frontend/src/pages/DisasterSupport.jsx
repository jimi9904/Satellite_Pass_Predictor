import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiGlobeAlt } from 'react-icons/hi';
import SectionHeader from '../components/ui/SectionHeader';
import InfoCard from '../components/InfoCard';
import disasterPayload from '../data/disasterSatellites.json';

const { disasters = [] } = disasterPayload;

const DisasterSupport = () => {
  const { t } = useTranslation();
  const getScenarioKey = (id, suffix) => `app.disaster.items.${id}.${suffix}`;
  return (
    <motion.div 
      className="mx-auto max-w-7xl px-8 py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-16">
      {/* Header Section */}
      <SectionHeader
        title={t('app.disaster.title')}
        subtitle={t('app.disaster.subtitle')}
        icon={HiGlobeAlt}
      />

      {/* Disaster Scenarios Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {disasters.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <InfoCard
              title={t(getScenarioKey(scenario.id, 'title'), { defaultValue: scenario.title })}
              eyebrow={t('app.disaster.impactFocus')}
            >
              <p className="text-slate-300 mb-4">
                {t(getScenarioKey(scenario.id, 'summary'), { defaultValue: scenario.summary })}
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
                    {t('app.disaster.isroSatellites')}
                  </p>
                  <ul className="space-y-2">
                    {scenario.satellites.map((sat) => (
                      <li
                        key={`${scenario.id}-${sat.name}`}
                        className="rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 p-3"
                      >
                        <p className="font-semibold text-white">{sat.name}</p>
                        <p className="text-slate-400 text-sm">
                          {t(getScenarioKey(scenario.id, `satellite.${sat.name}.role`), { defaultValue: sat.role })}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
                    {t('app.disaster.howTheyHelp')}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                    {scenario.response.map((line, idx) => (
                      <li key={line}>
                        {t(getScenarioKey(scenario.id, `response.${idx}`), { defaultValue: line })}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </InfoCard>
          </motion.div>
        ))}
      </div>
      </div>
    </motion.div>
  );
};

export default DisasterSupport;
