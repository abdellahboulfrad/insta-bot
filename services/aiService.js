const fs = require('fs');
const path = require('path');
const env = require('../config/env');
const logger = require('../utils/logger');

function readSystemPrompt() {
  const promptPath = path.join(__dirname, '..', 'prompts', 'system.txt');
  return fs.readFileSync(promptPath, 'utf8');
}

async function callOpenAi(userMessage) {
  const response = await fetch(`${env.openAiBaseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.aiApiKey}`
    },
    body: JSON.stringify({
      model: env.aiModel || 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: readSystemPrompt() },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 120
    })
  });

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || '';
}

async function callAnthropic(userMessage) {
  const response = await fetch(`${env.anthropicBaseUrl}/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.aiApiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: env.aiModel || 'claude-3-5-haiku-latest',
      max_tokens: 120,
      system: readSystemPrompt(),
      messages: [{ role: 'user', content: userMessage }]
    })
  });

  const data = await response.json();
  const textPart = Array.isArray(data?.content)
    ? data.content.find((part) => part?.type === 'text')
    : null;
  return textPart?.text?.trim() || '';
}

async function generateReply(userMessage) {
  if (!env.enableAi || !env.aiApiKey) {
    return '';
  }

  try {
    if (env.aiProvider === 'anthropic') {
      return await callAnthropic(userMessage);
    }

    return await callOpenAi(userMessage);
  } catch (error) {
    logger.error(error?.message || 'AI reply generation failed');
    return '';
  }
}

module.exports = {
  generateReply
};
