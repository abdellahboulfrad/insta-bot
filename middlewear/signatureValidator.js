const crypto = require('crypto');
const env = require('../config/env');
const logger = require('../utils/logger');

function validateMetaSignature(req) {
  if (!env.enableSignatureValidation) return true;
  if (!env.appSecret) return false;

  const signatureHeader = req.get('x-hub-signature-256');
  if (!signatureHeader) return false;

  const [algorithm, signatureHash] = signatureHeader.split('=');
  if (algorithm !== 'sha256' || !signatureHash) return false;

  const expectedHash = crypto
    .createHmac('sha256', env.appSecret)
    .update(req.body)
    .digest('hex');

  const signatureBuffer = Buffer.from(signatureHash, 'utf8');
  const expectedBuffer = Buffer.from(expectedHash, 'utf8');

  if (signatureBuffer.length !== expectedBuffer.length) return false;

  return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
}

module.exports = function signatureValidator(req, res, next) {
  if (req.method !== 'POST') return next();

  try {
    const ok = validateMetaSignature(req);
    if (!ok) {
      logger.warn('Invalid or missing x-hub-signature-256 header');
      return res.status(403).json({ ok: false, message: 'Invalid signature' });
    }

    return next();
  } catch (error) {
    logger.error(error?.message || 'Signature validation failed');
    return res.status(403).json({ ok: false, message: 'Signature validation failed' });
  }
};
