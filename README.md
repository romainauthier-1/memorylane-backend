# 📦 MemoryLane — Backend

API REST de MemoryLane, une application pour rassembler ses souvenirs sur une frise visuelle : comptes utilisateurs, souvenirs et médias, signature des uploads Cloudinary.

**Frontend :** [memorylane-frontend](https://github.com/romainauthier-1/memorylane-frontend) · **Démo :** [memorylane-frontend-ruddy.vercel.app](https://memorylane-frontend-ruddy.vercel.app)

![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

---

## Fonctionnalités

- **Comptes** : inscription et connexion, mots de passe hachés avec bcrypt, token aléatoire (uid2) remis à la connexion.
- **Authentification et contrôle d'accès** : toutes les routes de souvenirs passent par un middleware qui vérifie le token `Bearer` (`401` sinon). Chaque accès à un souvenir précis vérifie que l'utilisateur en est le propriétaire (`403` sinon, `404` si le souvenir n'existe pas). Un compte administrateur a accès à tous les souvenirs.
- **Souvenirs** : CRUD complet, souvenirs ponctuels ou sur une période, couleurs, description, édition ciblée (titre, description, légende d'un média).
- **Médias** : ajout et suppression de médias (image, vidéo, audio) dans un souvenir.
- **Upload signé Cloudinary** : l'API génère une signature à usage limité dans le temps pour que le navigateur envoie les fichiers directement à Cloudinary, sans exposer le secret.

Les middlewares d'authentification sont regroupés dans `modules/auth.js` (`requireAuth`, `loadOwnedMemory`).

## Stack technique

Node.js, Express 5, MongoDB (Atlas) avec Mongoose 9, bcrypt, uid2, SDK Cloudinary, déploiement serverless sur Vercel.

## Routes

| Méthode | Route                                   | Auth          | Description                              |
| ------- | --------------------------------------- | ------------- | ---------------------------------------- |
| POST    | `/user/signup`                          | —             | inscription, renvoie un token            |
| POST    | `/user/signin`                          | —             | connexion, renvoie le token              |
| GET     | `/uploads/cloudinary-signature`         | token         | signature pour un upload Cloudinary      |
| GET     | `/memories/all`                         | token         | souvenirs de l'utilisateur               |
| POST    | `/memories`                             | token         | création d'un souvenir                   |
| GET     | `/memories/:id`                         | propriétaire  | détail                                   |
| PUT     | `/memories/:id`                         | propriétaire  | modification                             |
| PUT     | `/memories/title/:id` · `/description/:id` · `/caption/:id` | propriétaire | édition ciblée |
| DELETE  | `/memories/:id`                         | propriétaire  | suppression                              |
| POST    | `/memories/:id/add-media`               | propriétaire  | ajout de médias                          |
| DELETE  | `/memories/:memoryId/media/:mediaId`    | propriétaire  | suppression d'un média                   |

## Installation

Prérequis : Node.js 20+, [corepack](https://nodejs.org/api/corepack.html) (active la bonne version de Yarn), une base MongoDB (Atlas ou locale), un compte Cloudinary.

```bash
git clone https://github.com/romainauthier-1/memorylane-backend.git
cd memorylane-backend
corepack enable
yarn install
cp .env.example .env    # renseigner les variables ci-dessous
yarn dev                # http://localhost:5000
```

| Variable                 | Rôle                               |
| ------------------------ | ---------------------------------- |
| `CONNECTION_STRING`      | chaîne de connexion MongoDB        |
| `CLOUDINARY_CLOUD_NAME`  | nom du cloud Cloudinary            |
| `CLOUDINARY_API_KEY`     | clé API Cloudinary                 |
| `CLOUDINARY_API_SECRET`  | secret Cloudinary (reste côté API) |

## Structure

```
index.js          configuration Express, CORS, routes
models/           connexion MongoDB, schémas User et Memory
modules/          auth (requireAuth, loadOwnedMemory), checkBody
routes/           users, memories, upload (signature Cloudinary)
```

---

Romain Authier — [GitHub](https://github.com/romainauthier-1)
