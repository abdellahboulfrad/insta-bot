const express = require('express');
const healthRoutes = require('./routes/healthRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const logger = require('./utils/logger');

const app = express();

app.use('/webhook', express.raw({ type: 'application/json' }));
app.use('/health', express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/health', healthRoutes);
app.use('/webhook', webhookRoutes);

app.use((req, res) => {
  res.status(404).json({ ok: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  logger.error(err?.stack || err?.message || 'Unknown server error');
  res.status(500).json({ ok: false, message: 'Internal server error' });
});

module.exports = app;
