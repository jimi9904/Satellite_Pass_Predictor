import { useTranslation } from 'react-i18next';
import InfoCard from '../../components/InfoCard';
import gaganyaanData from '../../data/learning/gaganyaan.json';

const Gaganyaan = () => {
  const { t } = useTranslation();
  const moduleKey = (slug, field) => `app.learning.data.gaganyaan.${slug}.${field}`;
  const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{t('app.nav.gaganyaan')}</p>
        <h2 className="text-3xl font-bold text-white">{t('app.nav.gaganyaan')}</h2>
      </div>
    <div className="grid md:grid-cols-3 gap-5">
      {(gaganyaanData.modules || []).map((item) => {
        const slug = slugify(item.title);
        return (
        <InfoCard key={item.title} title={t(moduleKey(slug, 'title'), { defaultValue: item.title })}>
          <p>{t(moduleKey(slug, 'description'), { defaultValue: item.description })}</p>
        </InfoCard>
      );
      })}
    </div>
  </section>
  );
};

export default Gaganyaan;


