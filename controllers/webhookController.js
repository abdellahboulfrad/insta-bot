const env = require('../config/env');
const logger = require('../utils/logger');
const inboundMessageService = require('../services/inboundMessageService');

function verifyWebhook(req, res) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === env.verifyToken) {
    logger.info('Webhook verified successfully');
    return res.status(200).send(challenge);
  }

  logger.warn('Webhook verification failed');
  return res.status(403).send('Verification failed');
}

async function receiveWebhook(req, res) {
  let payload;

  try {
    payload = JSON.parse(req.body.toString('utf8'));
  } catch (error) {
    logger.error('Invalid JSON payload received');
    return res.status(400).json({ ok: false, message: 'Invalid JSON payload' });
  }

  res.status(200).json({ ok: true });

  try {
    await inboundMessageService.handleWebhookPayload(payload);
  } catch (error) {
    logger.error(error?.stack || error?.message || 'Webhook processing failed');
  }
}

module.exports = {
  verifyWebhook,
  receiveWebhook
};
