import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InfoCard from '../../components/InfoCard';
import modulesData from '../../data/learning/modules.json';

const LearningHub = () => {
  const { t } = useTranslation();
  const moduleKey = (path, field) => `app.learning.data.modules.${path}.${field}`;
  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{t('app.learning.hub.tagline')}</p>
        <h2 className="text-3xl font-bold text-white">{t('app.learning.hub.title')}</h2>
        <p className="text-slate-300 max-w-3xl">
          {t('app.learning.hub.subtitle')}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {(modulesData.modules || []).map((module) => (
          <InfoCard
            key={module.path}
            title={t(moduleKey(module.path, 'title'), { defaultValue: module.title })}
          >
            <p>{t(moduleKey(module.path, 'summary'), { defaultValue: module.summary })}</p>
            <Link
              to={module.path}
              className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 text-sm"
            >
              {t('app.learning.hub.exploreModule')}
            </Link>
          </InfoCard>
        ))}
      </div>
    </section>
  );
};

export default LearningHub;


