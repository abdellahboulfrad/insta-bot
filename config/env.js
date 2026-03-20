const dotenv = require('dotenv');

dotenv.config();

function toBool(value, defaultValue = false) {
  if (typeof value === 'undefined') return defaultValue;
  return String(value).toLowerCase() === 'true';
}

function toInt(value, defaultValue) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : defaultValue;
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: toInt(process.env.PORT, 10000),
  baseUrl: process.env.BASE_URL || '',
  verifyToken: process.env.VERIFY_TOKEN || '',
  pageAccessToken: process.env.PAGE_ACCESS_TOKEN || '',
  appSecret: process.env.APP_SECRET || '',
  graphVersion: process.env.GRAPH_VERSION || 'v25.0',
  botName: process.env.BOT_NAME || '___EDIT_ME_BOT_NAME___',
  brandHandle: process.env.BRAND_HANDLE || '@yanis__sem',
  defaultFallbackReply:
    process.env.DEFAULT_FALLBACK_REPLY || 'Oe la team 👋 dis-moi ce qu’il te faut.',
  enableAi: toBool(process.env.ENABLE_AI, false),
  enableSignatureValidation: toBool(process.env.ENABLE_SIGNATURE_VALIDATION, false),
  replyCooldownMs: toInt(process.env.REPLY_COOLDOWN_MS, 5 * 60 * 1000),
  dedupTtlMs: toInt(process.env.DEDUP_TTL_MS, 15 * 60 * 1000),
  publicWhatsapp: process.env.PUBLIC_WHATSAPP || '___EDIT_ME_WHATSAPP___',
  publicEmail: process.env.PUBLIC_EMAIL || '___EDIT_ME_EMAIL___',
  publicPortfolio: process.env.PUBLIC_PORTFOLIO || '___EDIT_ME_PORTFOLIO_URL___',
  publicInstagram: process.env.PUBLIC_INSTAGRAM || 'https://instagram.com/yanis__sem',
  aiProvider: process.env.AI_PROVIDER || 'openai',
  aiApiKey: process.env.AI_API_KEY || '',
  aiModel: process.env.AI_MODEL || '',
  openAiBaseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  anthropicBaseUrl: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com'
};
