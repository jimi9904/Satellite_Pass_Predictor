import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiGlobeAlt } from 'react-icons/hi';
import { FaRocket, FaBolt } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';

const About = () => {
  const { t } = useTranslation();
  const missionHighlights = [
    {
      key: 'cartosat',
      icon: HiGlobeAlt,
    },
    {
      key: 'risat',
      icon: FaRocket,
    },
    {
      key: 'gsat',
      icon: FaBolt,
    },
    {
      key: 'navic',
      icon: HiGlobeAlt,
    },
    {
      key: 'emisat',
      icon: FaRocket,
    },
    {
      key: 'aditya',
      icon: FaBolt,
    },
  ];

  const timeline = [
    { year: '1969', key: 'isroEstablished' },
    { year: '1975', key: 'aryabhata' },
    { year: '1980', key: 'slv3' },
    { year: '2008', key: 'chandrayaan1' },
    { year: '2013', key: 'mangalyaan' },
    { year: '2023', key: 'chandrayaan3' },
  ];

  return (
    <motion.div 
      className="mx-auto max-w-7xl px-8 pt-24 pb-20 space-y-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title={t('app.about.title')}
        subtitle={t('app.about.subtitle')}
      />

    {/* Mission Highlights Grid */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {missionHighlights.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <div className="mb-4 text-cyan-400">
                <Icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t(`app.about.missionHighlights.${item.key}.title`)}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {t(`app.about.missionHighlights.${item.key}.details`)}
              </p>
            </Card>
          </motion.div>
        );
      })}
    </div>

    {/* Timeline Section */}
    <Card variant="large">
      <h2 className="text-2xl font-bold text-white mb-6">{t('app.about.timeline')}</h2>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              className="relative pl-20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute left-6 top-1 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-900" />
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <p className="text-cyan-400 font-bold text-lg mb-1">{item.year}</p>
                <p className="text-slate-200">
                  {t(`app.about.timelineItems.${item.key}`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>

    {/* Atmanirbhar Section */}
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl p-8 md:p-12 border border-white/10 ambient-glow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
          {t('app.about.atmanirbharTitle')}
        </h3>
        <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
          {t('app.about.atmanirbharDescription')}
        </p>
      </div>
    </motion.div>
  </motion.div>
  );
};

export default About;
