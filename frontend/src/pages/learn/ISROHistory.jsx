import { useTranslation } from 'react-i18next';
import InfoCard from '../../components/InfoCard';
import historyData from '../../data/learning/history.json';

const ISROHistory = () => {
  const { t } = useTranslation();
  const itemKey = (slug, field) => `app.learning.data.history.${slug}.${field}`;
  const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{t('app.nav.history')}</p>
        <h2 className="text-3xl font-bold text-white">{t('app.nav.history')}</h2>
      </div>
    <div className="grid gap-5">
      {(historyData.milestones || []).map((item) => {
        const slug = slugify(item.title);
        return (
        <InfoCard key={item.title} title={t(itemKey(slug, 'title'), { defaultValue: item.title })}>
          <p>{t(itemKey(slug, 'description'), { defaultValue: item.description })}</p>
        </InfoCard>
      );
      })}
    </div>
  </section>
  );
};

export default ISROHistory;


