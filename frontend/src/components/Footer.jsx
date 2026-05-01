import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();

  const cols = [
    {
      heading: t('app.footer.about'),
      items: [
        { label: t('app.nav.aboutISRO'), to: '/about' },
        { label: t('app.nav.aboutSatellites'), to: '/satellites' },
        { label: t('app.nav.feedback'), to: '/feedback' },
      ]
    },
    {
      heading: t('app.nav.services'),
      items: [
        { label: t('app.nav.map'), to: '/map' },
        { label: t('app.nav.disaster'), to: '/disaster-support' },
        { label: t('app.nav.selfReliance'), to: '/self-reliance' },
      ]
    },
    {
      heading: t('app.nav.learning'),
      items: [
        { label: t('app.nav.orbits'), to: '/learn/orbits' },
        { label: t('app.nav.launchVehicles'), to: '/learn/launchers' },
        { label: t('app.nav.gaganyaan'), to: '/learn/gaganyaan' },
        { label: t('app.nav.history'), to: '/learn/history' },
      ]
    },
    {
      heading: t('app.footer.dataSources'),
      items: [
        { label: 'Space-Track.org', href: 'https://www.space-track.org' },
        { label: 'OpenWeather API', href: 'https://openweathermap.org' },
        { label: 'ISRO Official', href: 'https://www.isro.gov.in' },
      ]
    },
  ];

  const socials = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container-spacex py-16">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {cols.map(({ heading, items }) => (
            <div key={heading}>
              <p className="label-text mb-5">{heading}</p>
              <ul className="space-y-3">
                {items.map(({ label, to, href }) => (
                  <li key={label}>
                    {to ? (
                      <Link to={to} className="font-condensed text-[0.75rem] uppercase tracking-[0.12em] text-white/55 hover:text-white transition-colors">
                        {label}
                      </Link>
                    ) : (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="font-condensed text-[0.75rem] uppercase tracking-[0.12em] text-white/55 hover:text-white transition-colors">
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-x mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-white/35">
            © {new Date().getFullYear()} {t('app.footer.copyright')} &nbsp;·&nbsp; 🇮🇳 Made in India
          </p>

          <div className="flex items-center gap-5">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/25 hover:text-white transition-colors"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
