import { useTranslation } from 'react-i18next';
import InfoCard from '../../components/InfoCard';
import orbitsData from '../../data/learning/orbits.json';

const Orbits = () => {
  const { t } = useTranslation();
  const topicKey = (slug, field) => `app.learning.data.orbits.topics.${slug}.${field}`;
  const insightKey = (slug, field) => `app.learning.data.orbits.insights.${slug}.${field}`;
  const slugify = (title) => {
    if (title.includes('Low Earth')) return 'leo';
    if (title.includes('Medium Earth')) return 'meo';
    if (title.includes('Geostationary')) return 'geo';
    if (title.includes('Sun Synchronous')) return 'sso';
    return title.toLowerCase().replace(/\s+/g, '-');
  };
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{t('app.learning.orbits.tagline')}</p>
        <h2 className="text-3xl font-bold text-white">{t('app.learning.orbits.title')}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {(orbitsData.orbitTopics || []).map((topic) => {
          const slug = slugify(topic.title);
          return (
          <InfoCard
            key={topic.title}
            title={t(topicKey(slug, 'title'), { defaultValue: topic.title })}
          >
            <p>{t(topicKey(slug, 'description'), { defaultValue: topic.description })}</p>
          </InfoCard>
        );
        })}
      </div>

      <InfoCard title={t('app.learning.data.orbits.insights.title')} eyebrow={t('app.learning.orbits.whyItMatters')}>
      <div className="grid md:grid-cols-3 gap-5">
        {(orbitsData.tleInsights || []).map((item) => (
          <div key={item.title}>
            <p className="font-semibold text-white">
              {t(insightKey(item.title.toLowerCase().includes('project') ? 'project' : item.title.toLowerCase().includes('sgp4') ? 'sgp4' : 'tle', 'title'), { defaultValue: item.title })}
            </p>
            <p className="text-sm text-slate-300">
              {t(insightKey(item.title.toLowerCase().includes('project') ? 'project' : item.title.toLowerCase().includes('sgp4') ? 'sgp4' : 'tle', 'text'), { defaultValue: item.text })}
            </p>
          </div>
        ))}
      </div>
    </InfoCard>
  </section>
  );
};

export default Orbits;


