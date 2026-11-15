# API REST – Gestion de Projets et de Tâches

## 1. Présentation du projet
Ce projet consiste à développer une API REST permettant la gestion des projets et des tâches à l'aide de Node.js, Express.js et MongoDB.

## 2. Technologies utilisées
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (authentification)
- bcryptjs (cryptage des mots de passe)
- Postman (tests de l'API)
- Git et GitHub

## 3. Fonctionnalités principales

### Authentification
- Inscription des utilisateurs.
- Connexion avec JWT.
- Cryptage des mots de passe.
- Gestion des rôles : User et Manager.

### Gestion des projets
- Créer un projet.
- Afficher les projets.
- Modifier un projet.
- Supprimer un projet.
- Afficher tous les projets pour le Manager.

### Gestion des tâches
- Créer une tâche liée à un projet.
- Afficher les tâches.
- Modifier une tâche.
- Supprimer une tâche.
- Gérer les statuts : todo, doing, done.
- Assigner une tâche à un utilisateur par le Manager.

### Recherche et tri
- Rechercher les tâches par titre.
- Filtrer les tâches par statut et projet.
- Trier les tâches par date de création.

## 4. Structure du projet

```text
gestion-projets-taches/
│
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── middlewares/
│   ├── authMiddleware.js
│   └── managerMiddleware.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## 5. Installation et exécution

1. Cloner le projet :
```bash
git clone URL_DU_PROJET
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer le fichier `.env` :
```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Démarrer le serveur :
```bash
npm start
```

Le serveur sera accessible sur :
`http://localhost:3001`

## 6. Tests
Les fonctionnalités de l'API ont été testées avec Postman : inscription, connexion, création et affichage des projets et tâches, recherche, modification et suppression.

## 7. Base de données
La base de données utilisée est MongoDB. Elle contient trois collections principales :
- Users
- Projects
- Tasks

## 8. Auteur
Projet réalisé individuellement dans le cadre du module DevOps / DS1.