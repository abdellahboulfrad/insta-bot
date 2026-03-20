const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    service: 'ig-ultra-pro-auto-reply-bot',
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
