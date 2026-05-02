import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiMenu, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

/* ── SpaceX-style orbit logo ── */
const OrbitLogo = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="1.5" opacity="0.3" />
    <circle cx="20" cy="20" r="11" stroke="white" strokeWidth="1" opacity="0.2" />
    <circle cx="20" cy="20" r="4" fill="white" />
    <circle cx="20" cy="4" r="2.5" fill="white" opacity="0.9">
      <animateTransform attributeName="transform" type="rotate"
        from="0 20 20" to="360 20 20" dur="20s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const language = i18n.language;
  const switchLanguage = (lang) => { i18n.changeLanguage(lang); localStorage.setItem('language', lang); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenDropdown(null); }, [location.pathname]);

  const handleLogout = () => { logout(); navigate('/'); };

  const publicRoutes = ['/', '/login', '/signup'];
  const isPublic = publicRoutes.includes(location.pathname);

  const navItems = [
    { to: '/dashboard', label: t('app.nav.home'), type: 'link' },
    {
      type: 'dropdown', label: t('app.nav.about'), key: 'about',
      items: [{ to: '/about', label: t('app.nav.aboutISRO') }, { to: '/satellites', label: t('app.nav.aboutSatellites') }]
    },
    {
      type: 'dropdown', label: t('app.nav.services'), key: 'services',
      items: [{ to: '/map', label: t('app.nav.map') }, { to: '/disaster-support', label: t('app.nav.disaster') }, { to: '/self-reliance', label: t('app.nav.selfReliance') }]
    },
    {
      type: 'dropdown', label: t('app.nav.learning'), key: 'learning',
      items: [{ to: '/learn', label: t('app.nav.learning') }, { to: '/learn/orbits', label: t('app.nav.orbits') }, { to: '/learn/launchers', label: t('app.nav.launchVehicles') }, { to: '/learn/gaganyaan', label: t('app.nav.gaganyaan') }, { to: '/learn/history', label: t('app.nav.history') }]
    },
    { to: '/feedback', label: t('app.nav.feedback'), type: 'link' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-[60px]">

        {/* Logo */}
        <NavLink to={isAuthenticated && !isPublic ? "/dashboard" : "/"} className="flex items-center gap-3 shrink-0">
          <OrbitLogo />
          <span className="font-condensed font-bold text-white uppercase tracking-[0.12em] text-sm hidden sm:block">
            Swadeshi Space
          </span>
        </NavLink>

        {/* Desktop nav — authenticated only */}
        {isAuthenticated && !isPublic && (
          <nav className="hidden lg:flex items-center gap-0">
            {navItems.map((item) => {
              if (item.type === 'link') {
                const active = location.pathname === item.to || (item.to === '/dashboard' && location.pathname === '/dashboard');
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`relative px-4 py-1 font-condensed text-[0.7rem] uppercase tracking-[0.2em] transition-colors ${active ? 'text-white' : 'text-white/70 hover:text-white'}`}
                  >
                    {item.label}
                    {active && <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-4 right-4 h-[1px] bg-white" />}
                  </NavLink>
                );
              }

              if (item.type === 'dropdown') {
                const isOpen = openDropdown === item.key;
                return (
                  <div key={item.key} className="relative"
                    onMouseEnter={() => setOpenDropdown(item.key)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="flex items-center gap-1 px-4 py-1 font-condensed text-[0.7rem] uppercase tracking-[0.2em] text-white/65 hover:text-white transition-colors">
                      {item.label}
                      <HiChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 min-w-[180px] pt-2"
                        >
                          <div style={{ background: 'rgba(0,0,0,0.96)', border: '1px solid rgba(255,255,255,0.1)' }} className="py-1">
                            {item.items.map((sub) => (
                              <NavLink
                                key={sub.to}
                                to={sub.to}
                                className="block px-5 py-3 font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-white/65 hover:text-white hover:bg-white/5 transition-colors"
                              >
                                {sub.label}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return null;
            })}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="hidden md:flex items-center gap-0" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
            {['en', 'hi'].map((lang) => (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={`px-3 py-1 font-condensed text-[0.6rem] uppercase tracking-[0.18em] transition-all ${language === lang ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Authenticated: Logout */}
          {isAuthenticated && !isPublic && (
            <button
              onClick={handleLogout}
              className="hidden lg:block font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-white/55 hover:text-white px-3 py-1 transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {t('app.nav.logout')}
            </button>
          )}

          {/* Unauthenticated: Login / Signup */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-2">
              <NavLink
                to="/login"
                className="font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-white/65 hover:text-white px-3 py-1 transition-colors"
              >
                {t('app.nav.login')}
              </NavLink>
              <NavLink
                to="/signup"
                className="font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-black bg-white hover:bg-white/80 px-4 py-1.5 transition-colors"
              >
                {t('app.nav.signup')}
              </NavLink>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white/60 hover:text-white p-1 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.97)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <nav className="px-6 py-4 flex flex-col gap-1">
              {isAuthenticated && !isPublic ? (
                <>
                  {navItems.map((item) => {
                    if (item.type === 'link') return (
                      <NavLink key={item.to} to={item.to} className="py-3 font-condensed text-[0.7rem] uppercase tracking-[0.2em] text-white/70 hover:text-white border-b border-white/5 transition-colors">
                        {item.label}
                      </NavLink>
                    );
                    if (item.type === 'dropdown') return (
                      <div key={item.key}>
                        <div className="py-3 font-condensed text-[0.7rem] uppercase tracking-[0.2em] text-white/30 border-b border-white/5">{item.label}</div>
                        {item.items.map((sub) => (
                          <NavLink key={sub.to} to={sub.to} className="block pl-4 py-2 font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-white/65 hover:text-white transition-colors">
                            — {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    );
                    return null;
                  })}
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="mt-3 py-3 font-condensed text-[0.7rem] uppercase tracking-[0.2em] text-white/60 hover:text-white text-left transition-colors">
                    {t('app.nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="py-3 font-condensed text-[0.7rem] uppercase tracking-[0.2em] text-white/70 hover:text-white border-b border-white/5 transition-colors">
                    {t('app.nav.login')}
                  </NavLink>
                  <NavLink to="/signup" className="py-3 font-condensed text-[0.7rem] uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors">
                    {t('app.nav.signup')}
                  </NavLink>
                </>
              )}
              <div className="mt-4 flex gap-0" style={{ border: '1px solid rgba(255,255,255,0.12)', width: 'fit-content' }}>
                {['en', 'hi'].map((lang) => (
                  <button key={lang} onClick={() => switchLanguage(lang)}
                    className={`px-4 py-2 font-condensed text-[0.6rem] uppercase tracking-[0.18em] transition-all ${language === lang ? 'bg-white text-black' : 'text-white/40'}`}>
                    {lang}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
