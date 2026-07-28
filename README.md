# 📦 MemoryLane Backend

> **Revisitez et préservez vos plus beaux souvenirs** — Une API backend dédiée à la gestion et à l'organisation de vos moments précieux sous forme de timeline interactive.

---

## ⭐ Badges

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.1.5-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-9.1.5-880000?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-2.9.0-30A8EF?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&logo=mit)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge)](https://semver.org/)

---

## 📜 À propos du projet

**MemoryLane Backend** est une **API RESTful** conçue pour alimenter une application de **timeline de souvenirs**. Elle permet aux utilisateurs de :

- **Créer** des souvenirs sous forme de moments ponctuels ou de périodes
- **Organiser** leurs souvenirs avec des médias (images, vidéos, audio, texte)
- **Personnaliser** l'apparence avec des couleurs et des positions
- **Gérer** leur compte utilisateur avec authentification sécurisée
- **Stocker** leurs médias dans le cloud via Cloudinary

Parfaite pour les applications qui veulent offrir une expérience **nostalgique et visuelle** de revisite du passé.

---

## 🔧 Stack Technique

| Catégorie            | Technologie                                    | Version | Rôle                                  |
| -------------------- | ---------------------------------------------- | ------- | ------------------------------------- |
| **Runtime**          | [Node.js](https://nodejs.org/)                 | 20+     | Environnement d'exécution             |
| **Framework**        | [Express.js](https://expressjs.com/)           | 5.2.1   | Framework web                         |
| **Base de données**  | [MongoDB](https://www.mongodb.com/)            | Atlas   | Base de données NoSQL                 |
| **ODM**              | [Mongoose](https://mongoosejs.com/)            | 9.1.5   | Modélisation MongoDB                  |
| **Authentification** | [bcrypt](https://www.npmjs.com/package/bcrypt) | 6.0.0   | Hashage des mots de passe             |
| **Tokens**           | [uid2](https://www.npmjs.com/package/uid2)     | 1.0.0   | Génération de tokens                  |
| **Stockage Cloud**   | [Cloudinary](https://cloudinary.com/)          | 2.9.0   | Hébergement des médias                |
| **Upload local**     | [Multer](https://www.npmjs.com/package/multer) | -       | Gestion des fichiers                  |
| **CORS**             | [cors](https://www.npmjs.com/package/cors)     | 2.8.6   | Middleware CORS                       |
| **Environnement**    | [dotenv](https://www.npmjs.com/package/dotenv) | 17.2.3  | Gestion des variables d'environnement |
| **Déploiement**      | [Vercel](https://vercel.com/)                  | -       | Hébergement serverless                |

---

## ✨ Fonctionnalités

### 👤 **Gestion des Utilisateurs**

- ✅ **Inscription** (`POST /user/signup`) – Création de compte avec nom d'utilisateur et mot de passe
- ✅ **Connexion** (`POST /user/signin`) – Authentification et réception d'un token
- ✅ **Token d'authentification** – Système de token unique par utilisateur
- ✅ **Rôles** – Distinction entre utilisateurs normaux et administrateurs

### 📚 **Gestion des Souvenirs (Memories)**

- ✅ **Création** (`POST /memories`) – Ajout d'un nouveau souvenir avec médias
- ✅ **Lecture** (`GET /memories/all`) – Récupération de tous les souvenirs de l'utilisateur
- ✅ **Lecture unique** (`GET /memories/:id`) – Récupération d'un souvenir spécifique
- ✅ **Mise à jour** (`PUT /memories/:id`) – Modification complète d'un souvenir
- ✅ **Mise à jour partielle** – Edition du titre, description ou légende des médias
- ✅ **Suppression** (`DELETE /memories/:id`) – Suppression d'un souvenir
- ✅ **Gestion des médias** – Ajout et suppression de médias dans un souvenir

### 📁 **Modèle de Souvenir**

```javascript
{
  user: ObjectId,          // Référence à l'utilisateur
  title: String,           // Titre du souvenir
  startDate: Date,         // Date de début (obligatoire)
  endDate: Date,           // Date de fin (optionnelle)
  type: "moment" | "period", // Type de souvenir
  thumbnail: String,       // URL de la miniature
  position: { x: Number, y: Number }, // Position pour la timeline
  medias: [                // Liste des médias
    {
      type: "image" | "video" | "audio" | "text",
      url: String,
      caption: String
    }
  ],
  colors: [String],        // Palette de couleurs
  description: String,     // Description textuelle
  createdAt: Date,         // Date de création (auto)
  updatedAt: Date          // Date de mise à jour (auto)
}
```

### 🖼️ **Gestion des Médias**

- ✅ **Upload local** – Stockage temporaire via Multer (`/uploads`)
- ✅ **Cloudinary Integration** – Génération de signatures pour upload direct
- ✅ **Endpoint de signature** (`GET /uploads/cloudinary-signature`) – Sécurisation des uploads
- ✅ **Support multi-format** – Images, vidéos, audio, texte

### 🔒 **Sécurité & Authentification**

- ✅ **Protection des routes** – Vérification du token Bearer
- ✅ **Hashage des mots de passe** – Utilisation de bcrypt (cost factor: 10)
- ✅ **CORS configuré** – Autorisation des requêtes cross-origin
- ✅ **Limite de taille** – 50MB pour les requêtes JSON et URL-encoded

---

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version 20 ou supérieure)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) (ou instance locale)
- [Cloudinary](https://cloudinary.com/) (pour le stockage des médias)

### Étapes

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/dankysten/memoryLane-backend.git
   cd memoryLane-backend
   ```

2. **Installer les dépendances**

   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configurer l'environnement**
   Créer un fichier `.env` à la racine avec les variables suivantes :

   ```env
   CONNECTION_STRING=mongodb+srv://<user>:<password>@cluster0.XXXXXXX.mongodb.net/memorylane
   URL_BACKEND=http://localhost:5000
   CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
   CLOUDINARY_CLOUD_NAME=<cloud_name>
   CLOUDINARY_API_KEY=<api_key>
   CLOUDINARY_API_SECRET=<api_secret>
   PORT=5000
   ```

4. **Lancer le serveur**

   ```bash
   # Mode développement (avec rechargement automatique)
   yarn dev
   # ou
   npm run dev

   # Mode production
   yarn start
   # ou
   npm start
   ```

5. **Accéder à l'API**
   ```
   🚀 Serveur lancé sur le port 5000
   🗄 -- 🖥 Database connected ✅
   ```
   L'API sera disponible à l'URL : `http://localhost:5000`

---

## 📡 Endpoints API

### 🔹 **Base URL**

```
http://localhost:5000
```

### 🔹 **Utilisateurs**

| Méthode | Endpoint       | Description                         | Authentification |
| ------- | -------------- | ----------------------------------- | ---------------- |
| POST    | `/user/signup` | Inscription d'un nouvel utilisateur | ❌ Non           |
| POST    | `/user/signin` | Connexion et réception du token     | ❌ Non           |

### 🔹 **Souvenirs (Memories)**

| Méthode | Endpoint                                    | Description                                  | Authentification |
| ------- | ------------------------------------------- | -------------------------------------------- | ---------------- |
| GET     | `/memories/all`                             | Récupère tous les souvenirs de l'utilisateur | ✅ Oui           |
| GET     | `/memories/:id`                             | Récupère un souvenir spécifique              | ✅ Oui           |
| POST    | `/memories`                                 | Crée un nouveau souvenir                     | ✅ Oui           |
| PUT     | `/memories/:id`                             | Met à jour un souvenir                       | ✅ Oui           |
| PUT     | `/memories/title/:id`                       | Met à jour le titre                          | ✅ Oui           |
| PUT     | `/memories/description/:id`                 | Met à jour la description                    | ✅ Oui           |
| PUT     | `/memories/caption/:id`                     | Met à jour la légende d'un média             | ✅ Oui           |
| DELETE  | `/memories/:id`                             | Supprime un souvenir                         | ✅ Oui           |
| POST    | `/memories/:id/add-media`                   | Ajoute un média à un souvenir                | ✅ Oui           |
| POST    | `/memories/:memoryId/delete-media/:mediaId` | Supprime un média                            | ✅ Oui           |

### 🔹 **Uploads & Médias**

| Méthode | Endpoint                        | Description                     | Authentification |
| ------- | ------------------------------- | ------------------------------- | ---------------- |
| GET     | `/uploads/cloudinary-signature` | Génère une signature Cloudinary | ❌ Non           |
| GET     | `/uploads/*`                    | Accède aux fichiers locaux      | ❌ Non           |

### 🔹 **Health Check**

| Méthode | Endpoint | Description                         | Authentification |
| ------- | -------- | ----------------------------------- | ---------------- |
| GET     | `/`      | Vérifie que le serveur est en ligne | ❌ Non           |

---

## 📂 Structure du Projet

```
memoryLane-backend/
├── index.js                    # Point d'entrée de l'application
├── package.json               # Dépendances et scripts
├── vercel.json                # Configuration Vercel
├── .env                       # Variables d'environnement
├── .gitignore                 # Fichiers ignorés par Git
│
├── config/
│   └── multer.js              # Configuration de Multer pour les uploads
│
├── models/
│   ├── connection.js          # Connexion à MongoDB
│   ├── memories.js            # Modèle Memory (Mongoose)
│   └── users.js               # Modèle User (Mongoose)
│
├── modules/
│   └── checkBody.js           # Middleware de validation des requêtes
│
├── routes/
│   ├── memories.js            # Routes pour les souvenirs
│   ├── upload.js              # Routes pour les uploads
│   └── users.js               # Routes pour les utilisateurs
│
└── uploads/                   # Dossier de stockage local temporaire
```

---

## 🛡️ Configuration de Déploiement (Vercel)

Le projet est configuré pour être déployé sur **Vercel** avec :

- Runtime : Node.js
- Serverless Functions : Activées
- Configuration automatique via `vercel.json`

**Pour déployer :**

1. Pousser le code sur un dépôt GitHub/GitLab/Bitbucket
2. Importer le projet sur Vercel
3. Configurer les **Environment Variables** dans les paramètres Vercel :
   - `CONNECTION_STRING`
   - `CLOUDINARY_URL`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Déployer !

---

## 📝 Exemples de Requêtes

### ✅ Inscription d'un utilisateur

```bash
curl -X POST http://localhost:5000/user/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "password": "securePassword123"}'
```

### ✅ Connexion

```bash
curl -X POST http://localhost:5000/user/signin \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "password": "securePassword123"}'
```

### ✅ Récupérer ses souvenirs

```bash
curl -X GET http://localhost:5000/memories/all \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### ✅ Créer un souvenir

```bash
curl -X POST http://localhost:5000/memories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Mon voyage à Paris",
    "startDate": "2024-05-15",
    "endDate": "2024-05-20",
    "type": "period",
    "description": "Un voyage inoubliable",
    "medias": [
      {"type": "image", "url": "https://res.cloudinary.com/.../paris.jpg", "caption": "Tour Eiffel"}
    ],
    "colors": ["#FF5733", "#33FF57"],
    "position": {"x": 100, "y": 200}
  }'
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

- **Ouvrir une issue** pour signaler un bug ou proposer une amélioration
- **Forker le projet** et soumettre une Pull Request

---

## 📜 Licence

Ce projet est sous licence **[MIT](https://opensource.org/licenses/MIT)**.

---

## 👤 Auteur

📌 **Romain Authier**  
📧 [dankysten](https://github.com/dankysten)  
💼 Développeur Fullstack junior

---

> _"Les souvenirs sont les trésors de l'âme, et MemoryLane est la carte qui vous guide pour les retrouver."_ 🗺️✨
