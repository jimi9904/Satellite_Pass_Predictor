import { useTranslation } from 'react-i18next';
import InfoCard from '../../components/InfoCard';
import vehiclesData from '../../data/learning/launchVehicles.json';

const LaunchVehicles = () => {
  const { t } = useTranslation();
  const vehicleKey = (slug, field) => `app.learning.data.launchVehicles.${slug}.${field}`;
  const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{t('app.nav.launchVehicles')}</p>
        <h2 className="text-3xl font-bold text-white">{t('app.nav.launchVehicles')}</h2>
      </div>
    <div className="grid gap-5 md:grid-cols-3">
      {(vehiclesData.vehicles || []).map((vehicle) => {
        const slug = slugify(vehicle.name);
        return (
        <InfoCard key={vehicle.name} title={t(vehicleKey(slug, 'name'), { defaultValue: vehicle.name })}>
          <p className="text-sm text-slate-400">
            {t(vehicleKey(slug, 'payload'), { defaultValue: vehicle.payload })}
          </p>
          <p>{t(vehicleKey(slug, 'description'), { defaultValue: vehicle.description })}</p>
        </InfoCard>
      );
      })}
    </div>
  </section>
  );
};

export default LaunchVehicles;


