const { normalizeText, includesAny } = require('../utils/normalize');

const intentRules = [
  {
    name: 'howAreYou',
    keywords: ['cv', 'cava', 'ca va', 'ça va', 'ca va et toi', 'ça va et toi', 'sava']
  },
  {
    name: 'greeting',
    keywords: ['cc', 'salut', 'bonjour', 'hello', 'wesh', 'slt', 'yo']
  },
  {
    name: 'pricing',
    keywords: ['prix', 'tarif', 'combien', 'devis', 'budget', 'cost']
  },
  {
    name: 'website',
    keywords: ['site', 'website', 'web', 'portfolio site', 'landing page']
  },
  {
    name: 'portfolio',
    keywords: ['portfolio', 'projets', 'realisations', 'réalisations', 'travaux', 'work']
  },
  {
    name: 'collaboration',
    keywords: ['collab', 'collaboration', 'travailler', 'work together', 'partenariat', 'partnership']
  },
  {
    name: 'contact',
    keywords: ['whatsapp', 'email', 'mail', 'contact', 'numero', 'numéro']
  },
  {
    name: 'thanks',
    keywords: ['merci', 'thanks', 'thank you']
  }
];

function detectIntent(rawText) {
  const text = normalizeText(rawText);

  for (const rule of intentRules) {
    if (includesAny(text, rule.keywords)) {
      return rule.name;
    }
  }

  return 'genericBusiness';
}

module.exports = {
  detectIntent
};
