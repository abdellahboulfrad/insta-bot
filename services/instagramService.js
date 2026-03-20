const env = require('../config/env');
const logger = require('../utils/logger');

async function sendTextMessage({ recipientId, text }) {
  if (!env.pageAccessToken) {
    throw new Error('PAGE_ACCESS_TOKEN is missing');
  }

  const url = `https://graph.facebook.com/${env.graphVersion}/me/messages?access_token=${encodeURIComponent(
    env.pageAccessToken
  )}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipient: { id: recipientId },
      messaging_type: 'RESPONSE',
      message: { text }
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    logger.error(`Instagram send failed: ${JSON.stringify(data)}`);
    throw new Error(`Instagram send failed with status ${response.status}`);
  }

  logger.info(`Message sent to recipient ${recipientId}`);
  return data;
}

module.exports = {
  sendTextMessage
};
