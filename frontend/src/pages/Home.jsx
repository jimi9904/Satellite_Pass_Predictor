import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiGlobeAlt, HiSparkles } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import PassTable from '../components/PassTable';
import Card from '../components/Card';
import Button from '../components/Button';
import Select from '../components/ui/Select';

const Home = () => {
  const { t } = useTranslation();
  const [coords, setCoords] = useState(null);
  const [satellites, setSatellites] = useState([]);
  const [selected, setSelected] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSatellites = async () => {
      try {
        const response = await api.get('/satellites');
        // Handle both array response and { satellites: [...] } response
        const satellitesData = Array.isArray(response.data) 
          ? response.data 
          : (response.data?.satellites || []);

        setSatellites(satellitesData);
        if (satellitesData.length) {
          // Backend maps _id to id in response, so use id as primary identifier
          const firstSatId = satellitesData[0].id || satellitesData[0]._id || satellitesData[0].norad_id;
          setSelected(firstSatId);
        }
      } catch (err) {
        setError(t('app.home.errors.unableToLoadCatalog'));
      }
    };
    fetchSatellites();
  }, []);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError(t('app.home.errors.geolocationNotSupported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: Number(pos.coords.latitude.toFixed(4)),
          lon: Number(pos.coords.longitude.toFixed(4)),
        });
      },
      () => {
        setError(t('app.home.errors.locationPermissionNeeded'));
      }
    );
  }, [t]);

  const handlePredict = async () => {
    if (!coords || !selected) return;

    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/predict', {
        lat: coords.lat,
        lon: coords.lon,
        satelliteId: selected,
      });
      setPrediction(data);
    } catch (err) {
      setError(err.response?.data?.message ?? t('app.home.errors.predictionFailed'));
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };


  return (
    <motion.div 
      className="mx-auto max-w-7xl px-8 pt-24 pb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="space-y-20">
        {/* Hero Section */}
        <motion.section
          className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 py-20 ambient-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Ambient Background Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: 'rgba(125, 60, 255, 0.15)' }}
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-3xl"
              style={{ backgroundColor: 'rgba(0, 198, 255, 0.15)' }}
              animate={{
                x: [0, -100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Orbital Illustration */}
          <div className="absolute top-10 right-10 w-64 h-64 opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" fill="none" className="text-white" />
              <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" fill="none" className="text-white" />
              <circle cx="100" cy="20" r="5" fill="currentColor" className="text-white">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 100 100"
                  to="360 100 100"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xs uppercase tracking-wider mb-4 text-slate-400">
                {t('app.home.hero.tagline')}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                {t('app.home.hero.title')}
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mb-8">
                {t('app.home.hero.description')}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Prediction Form */}
        <Card variant="large">
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
                <HiLocationMarker className="inline mr-2" />
                {t('app.home.hero.yourLocation')}
              </label>
              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <p className="text-lg font-semibold text-white">
                  {coords ? `${coords.lat}, ${coords.lon}` : (
                    <span className="text-slate-400">{t('app.common.detecting')}</span>
                  )}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label
                htmlFor="satellite"
                className="block text-xs uppercase tracking-wider text-slate-400 mb-2"
              >
                <HiGlobeAlt className="inline mr-2" />
                {t('app.home.hero.satellite')}
              </label>
              <Select
                value={selected}
                onChange={setSelected}
                options={(() => {
                  return satellites
                    .filter(sat => sat && (sat.id || sat._id || sat.norad_id) && (sat.name || sat.title))
                    .map((sat) => ({
                      value: sat.id || sat._id || sat.norad_id,
                      label: sat.name || sat.title || t('app.card.unknownSatellite'),
                    }));
                })()}
                placeholder={t('app.common.selectSatellite')}
                className="w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-end"
            >
              <Button
                onClick={handlePredict}
                disabled={loading || !coords || !selected}
                loading={loading}
                className="w-full"
              >
                <HiSparkles className="inline mr-2" />
                {t('app.home.hero.predictPass')}
              </Button>
            </motion.div>
          </div>

          {error && (
            <motion.p
              className="mt-4 text-red-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
        </Card>

      {/* Prediction Results */}
      {prediction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PassTable data={prediction} />
        </motion.div>
      )}
      </div>
    </motion.div>
  );
};

export default Home;
