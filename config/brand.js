const env = require('./env');

module.exports = {
  botName: env.botName,
  instagramHandle: env.brandHandle,
  publicInstagram: env.publicInstagram,
  publicPortfolio: env.publicPortfolio,
  publicEmail: env.publicEmail,
  publicWhatsapp: env.publicWhatsapp,
  tone: {
    style: 'casual, propre, pro, jeune, direct',
    sampleGreeting: 'Oe la team 👋',
    sampleClosing: 'Je peux te partager plus d’infos ici ou sur WhatsApp.'
  },
  cta: {
    default: 'Dis-moi ce qu’il te faut 👌',
    portfolio: 'Je peux aussi t’envoyer mon portfolio / mes projets.',
    pricing: 'Explique vite fait ton besoin et je te donne une idée de prix.',
    collaboration: 'Envoie ton besoin ici et je te réponds rapidement.'
  }
};
