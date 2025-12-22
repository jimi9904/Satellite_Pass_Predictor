import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="mt-20 border-t border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">{t('app.footer.about')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('app.footer.aboutDescription')}
            </p>
          </motion.div>

          {/* Data Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">{t('app.footer.dataSources')}</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• {t('app.footer.sources.spaceTrack')}</li>
              <li>• {t('app.footer.sources.openWeather')}</li>
              <li>• {t('app.footer.sources.isroOfficial')}</li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">{t('app.footer.connect')}</h3>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Gradient Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-6" />

        {/* Copyright */}
        <div className="text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {t('app.footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
