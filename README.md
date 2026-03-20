# Instagram Auto-Reply Bot — Ultra Pro Version

Bot Instagram DM prêt pour **Meta Webhooks + Render**.

Il répond automatiquement aux messages simples, avec une logique configurable, un fallback propre, une option IA, une validation optionnelle de signature, un anti-doublon, un cooldown anti-spam et des fichiers séparés pour que tu puisses modifier facilement le ton et les réponses.

---

## 1) Ce projet fait quoi ?

- Vérifie le webhook Meta
- Reçoit les DM Instagram via webhook
- Détecte les messages fréquents (`cc`, `cv`, `ça va`, `prix`, `site`, `portfolio`, `collab`, etc.)
- Répond avec des messages personnalisables
- Peut utiliser une IA **optionnelle** si tu ajoutes une clé API
- Évite d’envoyer plusieurs fois la même réponse au même événement
- Évite de spammer un utilisateur dans une fenêtre de temps définie
- Fournit un endpoint `/health` pour Render

---

## 2) Structure du projet

```text
ig-ultra-pro-auto-reply-bot/
├─ .env.example
├─ .gitignore
├─ package.json
├─ render.yaml
├─ README.md
├─ WHERE_TO_EDIT.md
└─ src/
   ├─ server.js
   ├─ app.js
   ├─ config/
   │  ├─ env.js
   │  └─ brand.js
   ├─ controllers/
   │  └─ webhookController.js
   ├─ data/
   │  └─ replies.js
   ├─ middleware/
   │  └─ signatureValidator.js
   ├─ prompts/
   │  └─ system.txt
   ├─ routes/
   │  ├─ healthRoutes.js
   │  └─ webhookRoutes.js
   ├─ services/
   │  ├─ aiService.js
   │  ├─ inboundMessageService.js
   │  ├─ intentService.js
   │  ├─ instagramService.js
   │  └─ replyService.js
   └─ utils/
      ├─ dedupStore.js
      ├─ logger.js
      ├─ memoryStore.js
      ├─ normalize.js
      └─ time.js
```

---

## 3) Les fichiers que tu modifies le plus

Regarde **`WHERE_TO_EDIT.md`**.

Les plus importants :

- `.env.example` → tes clés et URLs
- `src/config/brand.js` → ton style, tes liens, ton WhatsApp, ton email
- `src/data/replies.js` → toutes les réponses automatiques
- `src/prompts/system.txt` → le comportement de l’IA si tu l’actives

---

## 4) Installation locale

```bash
npm install
cp .env.example .env
npm run dev
```

Le serveur démarre sur :

```text
http://localhost:10000
```

Test santé :

```text
GET /health
```

Test vérification webhook :

```text
GET /webhook
```

---

## 5) Déploiement sur Render

### Méthode simple

1. Dézippe le projet
2. Mets le dossier sur GitHub
3. Va sur Render
4. New → Web Service
5. Connecte ton repo
6. Build Command : `npm install`
7. Start Command : `npm start`
8. Ajoute les variables d’environnement depuis `.env.example`
9. Déploie

### Avec le fichier `render.yaml`

Render peut aussi lire le blueprint du repo automatiquement.

---

## 6) Configuration Meta / Instagram

### Pré-requis

- Ton compte Instagram doit être en **compte professionnel**
- Il doit être lié à une **Page Facebook**
- Il faut une **app Meta for Developers**
- Il faut configurer le **webhook callback** vers :

```text
https://TON-SERVICE.onrender.com/webhook
```

### Vérification

Dans Meta, mets exactement le même `VERIFY_TOKEN` que dans ton `.env`.

---

## 7) Variables obligatoires

Dans `.env` :

- `VERIFY_TOKEN`
- `PAGE_ACCESS_TOKEN`
- `BASE_URL`

Recommandé :

- `APP_SECRET`
- `ENABLE_SIGNATURE_VALIDATION=true`

---

## 8) Mode IA optionnel

Par défaut le bot fonctionne **sans IA**.

Si tu veux des réponses plus naturelles :

- `ENABLE_AI=true`
- ajoute `AI_API_KEY`
- choisis `AI_PROVIDER=openai` ou `AI_PROVIDER=anthropic`
- mets le modèle dans `AI_MODEL`

Le bot utilise alors d’abord ses règles, puis peut produire une réponse plus naturelle selon le prompt dans `src/prompts/system.txt`.

---

## 9) Comment changer le style “oe la team”

Ouvre :

```text
src/data/replies.js
```

Tu peux changer :

- les salutations
- les réponses “ça va et toi”
- les réponses “prix / tarif”
- les réponses “site / portfolio”
- les réponses “collab / travail”
- le fallback général

---

## 10) Conseils pro

- Garde d’abord **les réponses par règles** : plus stable
- Active l’IA seulement après que le webhook fonctionne
- Commence avec un ton simple et cohérent
- Teste avec un deuxième compte Instagram
- Remplis bien `brand.js` avant de mettre en ligne

---

## 11) Commandes utiles

```bash
npm install
npm run dev
npm start
npm run check
```

---

## 12) Dépannage rapide

### Le webhook Meta ne se valide pas
- Vérifie `VERIFY_TOKEN`
- Vérifie l’URL exacte `/webhook`
- Vérifie que Render est bien déployé

### Render dit qu’aucun port n’est ouvert
- Vérifie que l’app écoute bien sur `0.0.0.0`
- Vérifie `PORT`
- Vérifie `npm start`

### Le bot ne répond pas
- Vérifie le `PAGE_ACCESS_TOKEN`
- Vérifie les permissions Meta
- Vérifie les logs Render

---

## 13) Licence

Projet de base pour personnalisation privée.
