# Où modifier quoi

Tout ce que tu peux changer rapidement est ici.

---

## 1) Les champs vides les plus importants

### Fichier : `.env.example`
Copie-le en `.env`, puis remplace :

- `___EDIT_ME_VERIFY_TOKEN___`
- `___EDIT_ME_PAGE_ACCESS_TOKEN___`
- `___EDIT_ME_RENDER_URL___`
- `___EDIT_ME_BOT_NAME___`
- `___EDIT_ME_WHATSAPP___`
- `___EDIT_ME_EMAIL___`
- `___EDIT_ME_PORTFOLIO_URL___`

---

## 2) Ton identité / ton style

### Fichier : `src/config/brand.js`
Ici tu modifies :

- ton nom de bot
- ton handle Instagram
- ton portfolio
- ton email
- ton WhatsApp
- ta tonalité
- ton CTA final

---

## 3) Les réponses automatiques

### Fichier : `src/data/replies.js`
Ici tu modifies :

- salutations
- réponses aux petits messages
- réponses aux prospects
- réponses aux prix
- réponses aux collabs
- réponse fallback

---

## 4) Le cerveau IA

### Fichier : `src/prompts/system.txt`
Ici tu modifies :

- la personnalité du bot
- la façon de parler
- les limites
- le style commercial
- la manière de rediriger vers WhatsApp/email/portfolio

---

## 5) Cooldown / anti-spam

### Fichier : `.env`
Tu peux changer :

- `REPLY_COOLDOWN_MS`
- `DEDUP_TTL_MS`

---

## 6) Intentions détectées

### Fichier : `src/services/intentService.js`
Tu peux ajouter de nouveaux mots-clés si tu veux détecter :

- devis
- partenariat
- rendez-vous
- vidéo
- montage
- logo
- etc.

---

## 7) Réponse ultra simple au début

Si tu veux juste un bot ultra basique au début, change seulement :

- `.env`
- `src/config/brand.js`
- `src/data/replies.js`

Et laisse le reste comme il est.
