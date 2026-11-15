const express = require('express');
const router = express.Router();

const {
    createProject,
    getProjects,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

const verifyToken = require('../middlewares/authMiddleware');

// Création d'un projet
router.post('/', verifyToken, createProject);

// Afficher les projets
router.get('/', verifyToken, getProjects);

// Modifier un projet
router.put('/:id', verifyToken, updateProject);

// Supprimer un projet
router.delete('/:id', verifyToken, deleteProject);

module.exports = router;