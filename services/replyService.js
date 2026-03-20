const replies = require('../data/replies');
const env = require('../config/env');
const { detectIntent } = require('./intentService');
const instagramService = require('./instagramService');
const aiService = require('./aiService');
const memoryStore = require('../utils/memoryStore');
const { normalizeText } = require('../utils/normalize');

function pickRandom(list) {
  if (!Array.isArray(list) || !list.length) return replies.fallback;
  return list[Math.floor(Math.random() * list.length)];
}

function getRuleBasedReply(messageText) {
  const normalized = normalizeText(messageText);

  if (replies.exact[normalized]) {
    return replies.exact[normalized];
  }

  const intent = detectIntent(normalized);
  return pickRandom(replies.intents[intent] || replies.intents.genericBusiness);
}

function canReplyNow(senderId) {
  const lastReplyAt = memoryStore.get(`last-reply:${senderId}`);
  const now = Date.now();

  if (!lastReplyAt) return true;
  return now - lastReplyAt >= env.replyCooldownMs;
}

function markReplied(senderId) {
  memoryStore.set(`last-reply:${senderId}`, Date.now());
}

async function buildReply(messageText) {
  const ruleReply = getRuleBasedReply(messageText);

  if (!env.enableAi) {
    return ruleReply;
  }

  const aiReply = await aiService.generateReply(messageText);
  return aiReply || ruleReply;
}

async function replyToUser({ senderId, messageText }) {
  if (!canReplyNow(senderId)) {
    return;
  }

  const replyText = await buildReply(messageText);

  await instagramService.sendTextMessage({
    recipientId: senderId,
    text: replyText
  });

  markReplied(senderId);
}

module.exports = {
  replyToUser
};
