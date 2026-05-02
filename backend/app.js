const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const os = require('os');

const satelliteRoutes = require('./routes/satelliteRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const telemetryRoutes = require('./routes/telemetryRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const PRODUCTION_ORIGINS = [
  'https://satellitepasspredictor.vercel.app',
];

const allowedOrigins = process.env.CLIENT_URL
  ? [...process.env.CLIENT_URL.split(',').map((o) => o.trim()), ...PRODUCTION_ORIGINS]
  : ['http://localhost:5173', 'http://localhost:5175', ...PRODUCTION_ORIGINS];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests (no origin) or listed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

/* ── Health Check ── */
const DB_STATES = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

const formatUptime = (seconds) => {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
};

const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

app.get('/api/health', (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const mem = process.memoryUsage();

  const healthy = dbState === 1;

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    service: 'satellite-pass-predictor-api',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(process.uptime()),
      human: formatUptime(process.uptime()),
    },
    database: {
      status: DB_STATES[dbState] || 'unknown',
      state: dbState,
    },
    memory: {
      heapUsed: formatBytes(mem.heapUsed),
      heapTotal: formatBytes(mem.heapTotal),
      rss: formatBytes(mem.rss),
    },
    system: {
      platform: os.platform(),
      nodeVersion: process.version,
      cpus: os.cpus().length,
      freeMemory: formatBytes(os.freemem()),
    },
  });
});

app.use('/api/satellites', satelliteRoutes);
app.use('/api/satellites/telemetry', telemetryRoutes);
app.use('/api', predictionRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/auth', authRoutes);


module.exports = app;
