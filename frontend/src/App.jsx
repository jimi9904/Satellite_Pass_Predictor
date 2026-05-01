import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// pages
import Home from "./pages/Home";
import SatelliteList from "./pages/SatelliteList";
import SatelliteDetails from "./pages/SatelliteDetails";
import MapView from "./pages/MapView";
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import DisasterSupport from "./pages/DisasterSupport";
import SelfReliance from "./pages/SelfReliance";
import LearningHub from "./pages/learn/LearningHub";
import Orbits from "./pages/learn/Orbits";
import LaunchVehicles from "./pages/learn/LaunchVehicles";
import Gaganyaan from "./pages/learn/Gaganyaan";
import ISROHistory from "./pages/learn/ISROHistory";

// Public full-page routes (handle their own NavBar / layout)
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";

// Routes that render their own full-page layout (no shared NavBar/Footer)
const STANDALONE_ROUTES = ["/", "/login", "/signup"];

function App() {
  const location = useLocation();
  const { t } = useTranslation();

  const isStandalone = STANDALONE_ROUTES.includes(location.pathname);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Shared NavBar only for authenticated inner pages */}
      {!isStandalone && <NavBar />}

      <main className={`flex-1 w-full ${!isStandalone ? 'pt-[60px]' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Routes location={location}>

              {/* ── Public standalone (own nav/layout) ── */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* ── Protected (use shared NavBar + Footer) ── */}
              <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/satellites" element={<PrivateRoute><SatelliteList /></PrivateRoute>} />
              <Route path="/satellites/:id" element={<PrivateRoute><SatelliteDetails /></PrivateRoute>} />
              <Route path="/map" element={<PrivateRoute><MapView /></PrivateRoute>} />
              <Route path="/disaster-support" element={<PrivateRoute><DisasterSupport /></PrivateRoute>} />
              <Route path="/self-reliance" element={<PrivateRoute><SelfReliance /></PrivateRoute>} />
              <Route path="/learn" element={<PrivateRoute><LearningHub /></PrivateRoute>} />
              <Route path="/learn/orbits" element={<PrivateRoute><Orbits /></PrivateRoute>} />
              <Route path="/learn/launchers" element={<PrivateRoute><LaunchVehicles /></PrivateRoute>} />
              <Route path="/learn/gaganyaan" element={<PrivateRoute><Gaganyaan /></PrivateRoute>} />
              <Route path="/learn/history" element={<PrivateRoute><ISROHistory /></PrivateRoute>} />
              <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
              <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />

              {/* 404 */}
              <Route path="*" element={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <p className="label-text mb-4">Error 404</p>
                    <h1 className="font-condensed font-black uppercase text-white" style={{ fontSize: '6rem' }}>
                      Lost in Orbit
                    </h1>
                    <p className="text-white/40 mt-4">{t('app.common.pageNotFound')}</p>
                  </div>
                </div>
              } />

            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Footer only for inner pages */}
      {!isStandalone && <Footer />}
    </div>
  );
}

export default App;
