const brand = require('../config/brand');
const env = require('../config/env');

module.exports = {
  exact: {
    cc: `${brand.tone.sampleGreeting} ça va ou quoi ?`,
    cv: `Oui tranquille et toi ? ${brand.cta.default}`,
    cava: `Oui ça va et toi ? ${brand.cta.default}`,
    'ca va': `Oui ça va et toi ? ${brand.cta.default}`,
    'ca va et toi': `Oui tranquille 👌 dis-moi ce qu’il te faut.`,
    'ça va': `Oui ça va et toi ? ${brand.cta.default}`,
    'ça va et toi': `Oui tranquille 👌 dis-moi ce qu’il te faut.`,
    salut: `${brand.tone.sampleGreeting} bienvenue sur ${brand.instagramHandle}`,
    wesh: `${brand.tone.sampleGreeting} tu cherches quoi exactement ?`,
    merci: `Avec plaisir 👌`,
    bonjour: `Bonjour 👋 dis-moi ce que tu veux savoir.`
  },
  intents: {
    greeting: [
      `${brand.tone.sampleGreeting} dis-moi ce qu’il te faut 👌`,
      `Salut 👋 bienvenue, dis-moi ce que tu cherches.`,
      `Hello 👋 je t’écoute.`
    ],
    howAreYou: [
      `Oui tranquille et toi ?`,
      `Ça va nickel 👌 et toi ?`,
      `Oui ça va merci, dis-moi ce qu’il te faut.`
    ],
    pricing: [
      `Pour le prix, explique-moi ton besoin exact et je te donne une fourchette.`,
      `Ça dépend du projet 👌 envoie-moi ce que tu veux faire et je te réponds avec un tarif adapté.`,
      `Tu peux m’envoyer le détail du projet et je te donne une estimation sérieuse.`
    ],
    website: [
      `Oui je fais des sites. Dis-moi le style, le type de business et les pages qu’il te faut.`,
      `Je peux te créer un site propre et moderne. Tu veux un site vitrine, restaurant, portfolio ou autre ?`,
      `Envoie-moi ton besoin pour le site et je te réponds avec une proposition claire.`
    ],
    portfolio: [
      `Oui bien sûr. Portfolio : ${env.publicPortfolio}`,
      `Tu peux voir mes projets ici : ${env.publicPortfolio}`,
      `Je peux t’envoyer mes réalisations ici ou tu peux voir mon portfolio : ${env.publicPortfolio}`
    ],
    collaboration: [
      `Oui avec plaisir. Envoie-moi ton besoin, ton budget et le délai.`,
      `Carrément. Dis-moi le projet, le délai et ce qu’il faut faire.`,
      `Oui possible. Donne-moi les détails et je te réponds rapidement.`
    ],
    contact: [
      `Tu peux me contacter ici, par mail (${env.publicEmail}) ou sur WhatsApp (${env.publicWhatsapp}).`,
      `Le plus simple c’est ici ou WhatsApp : ${env.publicWhatsapp}`,
      `Tu peux aussi m’écrire par mail : ${env.publicEmail}`
    ],
    thanks: [
      `Avec plaisir 👌`,
      `Pas de souci 👌`,
      `Avec grand plaisir.`
    ],
    genericBusiness: [
      `Dis-moi exactement ce qu’il te faut et je te réponds proprement 👌`,
      `Tu peux m’envoyer plus de détails sur ton besoin ?`,
      `Je t’écoute, envoie-moi le contexte et ce que tu veux faire.`
    ]
  },
  fallback: env.defaultFallbackReply
};
