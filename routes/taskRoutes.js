const express = require('express');
const router = express.Router();

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

const verifyToken = require('../middlewares/authMiddleware');

// Création d'une tâche
router.post('/', verifyToken, createTask);

// Afficher les tâches
router.get('/', verifyToken, getTasks);

// Modifier une tâche
router.put('/:id', verifyToken, updateTask);

// Supprimer une tâche
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;