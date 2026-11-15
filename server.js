
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
// Création de l'application
const app = express();

// Middleware JSON
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue dans notre API de gestion de projets et de tâches !');
});

// Démarrage du serveur après connexion MongoDB
const startServer = async () => {
    try {
        await connectDB();

       const PORT = 3001;

        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    } catch (error) {
        console.log('Erreur serveur :', error.message);
        process.exit(1);
    }
};

startServer();
