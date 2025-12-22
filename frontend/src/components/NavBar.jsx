import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../context/AuthContext";

// Modern orbit-style logo SVG
const OrbitLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" stroke="url(#gradient1)" strokeWidth="2" opacity="0.6" />
    <circle cx="20" cy="20" r="12" stroke="url(#gradient2)" strokeWidth="1.5" opacity="0.4" />
    <circle cx="20" cy="20" r="6" fill="url(#gradient3)" />
    <circle cx="20" cy="4" r="3" fill="#7d3cff">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 20 20"
        to="360 20 20"
        dur="20s"
        repeatCount="indefinite"
      />
    </circle>
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7d3cff" />
        <stop offset="100%" stopColor="#00c6ff" />
      </linearGradient>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00c6ff" />
        <stop offset="100%" stopColor="#7d3cff" />
      </linearGradient>
      <radialGradient id="gradient3">
        <stop offset="0%" stopColor="#7d3cff" />
        <stop offset="100%" stopColor="#00c6ff" />
      </radialGradient>
    </defs>
  </svg>
);

// Satyameva Jayate Emblem (Simplified Ashoka Chakra with Lions)
const SatyamevaJayateEmblem = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ashoka Chakra - Simplified */}
    <circle cx="20" cy="20" r="12" fill="none" stroke="#ffb84d" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="8" fill="none" stroke="#ffb84d" strokeWidth="1" />
    {/* Spokes */}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30) * Math.PI / 180;
      const x1 = 20 + 8 * Math.cos(angle);
      const y1 = 20 + 8 * Math.sin(angle);
      const x2 = 20 + 12 * Math.cos(angle);
      const y2 = 20 + 12 * Math.sin(angle);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#ffb84d"
          strokeWidth="1.5"
        />
      );
    })}
    {/* Center circle */}
    <circle cx="20" cy="20" r="2" fill="#ffb84d" />
    {/* Lion silhouette at top (simplified) */}
    <path
      d="M 18 8 L 16 10 L 15 12 L 16 14 L 20 13 L 24 14 L 25 12 L 24 10 L 22 8 Z"
      fill="#ffb84d"
      opacity="0.8"
    />
  </svg>
);

// Dropdown Component
const Dropdown = ({ label, items, isOpen, onToggle, children }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-3 py-2 text-base font-medium tracking-tight transition-all duration-150 text-slate-300 hover:text-white"
      >
        {label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 min-w-[200px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const language = i18n.language;
  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [learningDropdown, setLearningDropdown] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    about: false,
    services: false,
    learning: false,
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActiveRoute = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const publicRoutes = ["/login", "/signup"];

  // Close all dropdowns when clicking outside (for mobile)
  const closeAllDropdowns = () => {
    setMobileDropdowns({ about: false, services: false, learning: false });
  };

  const navItems = [
    { to: '/', label: t('app.nav.home'), type: 'link' },
    {
      type: 'dropdown',
      label: t('app.nav.about'),
      key: 'about',
      items: [
        { to: '/about', label: t('app.nav.aboutISRO') },
        { to: '/satellites', label: t('app.nav.aboutSatellites') },
      ]
    },
    {
      type: 'dropdown',
      label: t('app.nav.services'),
      key: 'services',
      items: [
        { to: '/map', label: t('app.nav.map') },
        { to: '/disaster-support', label: t('app.nav.disaster') },
        { to: '/self-reliance', label: t('app.nav.selfReliance') },
      ]
    },
    {
      type: 'dropdown',
      label: t('app.nav.learning'),
      key: 'learning',
      items: [
        { to: '/learn', label: t('app.nav.learning') },
        { to: '/learn/orbits', label: t('app.nav.orbits') },
        { to: '/learn/launchers', label: t('app.nav.launchVehicles') },
        { to: '/learn/gaganyaan', label: t('app.nav.gaganyaan') },
        { to: '/learn/history', label: t('app.nav.history') },
      ]
    },
    { to: '/feedback', label: t('app.nav.feedback'), type: 'link' },
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', damping: 25, stiffness: 200 }}
    >
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LEFT: Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-3"
          >
            <NavLink to="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <OrbitLogo />
              </motion.div>
            </NavLink>
          </motion.div>

          {/* CENTER: Website Name */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <motion.h1
              className="text-lg md:text-xl font-bold text-white tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t('app.title')}
            </motion.h1>
          </div>

          {/* RIGHT: Emblem + Language Switcher */}
          <div className="flex items-center gap-3">
            {/* Satyameva Jayate Emblem */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block"
            >
              <SatyamevaJayateEmblem />
            </motion.div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-1">
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('hi')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  language === 'hi'
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                HI
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t('app.nav.menuToggle', 'Toggle menu')}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.25 }}
              >
                {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGATION SECTION (Desktop) */}
      {isAuthenticated && !publicRoutes.includes(location.pathname) && (
        <nav className="hidden lg:flex items-center justify-center gap-6 px-4 md:px-8 pb-4 border-t border-white/10 pt-3">
          {navItems.map((item) => {
            if (item.type === 'link') {
              const isActive = isActiveRoute(item.to);
              return (
                <NavLink key={item.to} to={item.to} className="relative px-2 py-1">
                  <motion.span
                    className={`text-base font-medium tracking-tight transition-all duration-150 ${
                      isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.03 }}
                  >
                    {item.label}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                      layoutId="nav-active-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              );
            }

            if (item.type === 'dropdown') {
              const isOpen = item.key === 'about' ? aboutDropdown : item.key === 'services' ? servicesDropdown : learningDropdown;
              const toggleDropdown = () => {
                if (item.key === 'about') {
                  setAboutDropdown(!aboutDropdown);
                  setServicesDropdown(false);
                  setLearningDropdown(false);
                } else if (item.key === 'services') {
                  setServicesDropdown(!servicesDropdown);
                  setAboutDropdown(false);
                  setLearningDropdown(false);
                } else {
                  setLearningDropdown(!learningDropdown);
                  setAboutDropdown(false);
                  setServicesDropdown(false);
                }
              };

              return (
                <Dropdown
                  key={item.key}
                  label={item.label}
                  isOpen={isOpen}
                  onToggle={toggleDropdown}
                >
                  <div className="py-2">
                    {item.items.map((subItem) => (
                      <NavLink
                        key={subItem.to}
                        to={subItem.to}
                        onClick={() => {
                          if (item.key === 'about') setAboutDropdown(false);
                          else if (item.key === 'services') setServicesDropdown(false);
                          else setLearningDropdown(false);
                        }}
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                </Dropdown>
              );
            }
            return null;
          })}

          {/* Logout Button (Desktop) */}
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-lg transition-all backdrop-blur-sm"
          >
            {t('app.nav.logout')}
          </button>
        </nav>
      )}

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden border-t border-white/10 bg-white/10 backdrop-blur-xl rounded-2xl mx-4 mb-4 shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="py-4 px-4 space-y-2">
              {isAuthenticated && !publicRoutes.includes(location.pathname) && (
                <>
                  {navItems.map((item, index) => {
                    if (item.type === 'link') {
                      const isActive = isActiveRoute(item.to);
                      return (
                        <motion.div
                          key={item.to}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <NavLink
                            to={item.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                              isActive
                                ? 'bg-white/10 text-white font-semibold border border-white/20'
                                : 'text-slate-300 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </NavLink>
                        </motion.div>
                      );
                    }

                    if (item.type === 'dropdown') {
                      const isOpen = mobileDropdowns[item.key];
                      return (
                        <div key={item.key}>
                          <button
                            onClick={() => {
                              setMobileDropdowns({
                                ...mobileDropdowns,
                                [item.key]: !isOpen,
                              });
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                              isActiveRoute(item.items[0]?.to || '')
                                ? 'bg-white/10 text-white font-semibold border border-white/20'
                                : 'text-slate-300 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {item.label}
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <HiChevronDown size={20} />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 space-y-1 mt-2">
                                  {item.items.map((subItem) => (
                                    <NavLink
                                      key={subItem.to}
                                      to={subItem.to}
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        closeAllDropdowns();
                                      }}
                                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white rounded-lg transition-all"
                                    >
                                      {subItem.label}
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

                  {/* Mobile Logout Button */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 font-medium mt-3 backdrop-blur-sm"
                  >
                    {t('app.nav.logout')}
                  </button>
                </>
              )}

              {/* Login/Signup for non-authenticated */}
              {!isAuthenticated && (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                  >
                    {t('app.nav.login')}
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                  >
                    {t('app.nav.signup')}
                  </NavLink>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login/Signup buttons for desktop when not authenticated */}
      {!isAuthenticated && !publicRoutes.includes(location.pathname) && (
        <div className="hidden lg:flex items-center justify-center gap-4 px-4 md:px-8 pb-4 border-t border-white/10 pt-3">
          <NavLink
            to="/login"
            className="px-4 py-2 text-base font-medium text-slate-300 hover:text-white transition-all"
          >
            {t('app.nav.login')}
          </NavLink>
          <span className="text-slate-500">|</span>
          <NavLink
            to="/signup"
            className="px-4 py-2 text-base font-medium text-slate-300 hover:text-white transition-all"
          >
            {t('app.nav.signup')}
          </NavLink>
        </div>
      )}
    </motion.header>
  );
};

export default NavBar;
