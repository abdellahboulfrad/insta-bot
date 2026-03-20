const logger = require('../utils/logger');
const dedupStore = require('../utils/dedupStore');
const replyService = require('./replyService');

function extractMessagingEvents(payload) {
  const events = [];
  const entries = Array.isArray(payload?.entry) ? payload.entry : [];

  for (const entry of entries) {
    const messaging = Array.isArray(entry?.messaging) ? entry.messaging : [];
    for (const event of messaging) {
      events.push(event);
    }
  }

  return events;
}

function buildDedupKey(event) {
  return [
    event?.message?.mid,
    event?.sender?.id,
    event?.timestamp
  ]
    .filter(Boolean)
    .join(':');
}

async function handleMessageEvent(event) {
  const senderId = event?.sender?.id;
  const text = event?.message?.text;
  const isEcho = Boolean(event?.message?.is_echo);

  if (!senderId || !text || isEcho) {
    return;
  }

  await replyService.replyToUser({
    senderId,
    messageText: text
  });
}

async function handleWebhookPayload(payload) {
  const events = extractMessagingEvents(payload);

  if (!events.length) {
    logger.info('No messaging events found in payload');
    return;
  }

  for (const event of events) {
    const dedupKey = buildDedupKey(event);

    if (dedupKey && dedupStore.has(dedupKey)) {
      logger.info(`Skipped duplicate event: ${dedupKey}`);
      continue;
    }

    if (dedupKey) {
      dedupStore.set(dedupKey, true);
    }

    await handleMessageEvent(event);
  }
}

module.exports = {
  handleWebhookPayload
};
