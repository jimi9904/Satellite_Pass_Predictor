const express = require('express');
const cors = require('cors');

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

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/satellites', satelliteRoutes);
app.use('/api/satellites/telemetry', telemetryRoutes);
app.use('/api', predictionRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/auth', authRoutes);


module.exports = app;

