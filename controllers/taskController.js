const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');

// Création d'une tâche
const createTask = async (req, res) => {
    try {
        const { titre, description, statut, deadline, projet } = req.body;

        const project = await Project.findById(projet);

        if (!project) {
            return res.status(404).json({ message: 'Projet introuvable' });
        }

        if (
            req.user.role !== 'manager' &&
            project.proprietaire.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: 'Accès refusé' });
        }

        const task = await Task.create({
            titre,
            description,
            statut,
            deadline,
            projet
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Afficher et rechercher les tâches
const getTasks = async (req, res) => {
    try {
        const filter = {};

        if (req.query.statut) {
            filter.statut = req.query.statut;
        }

        if (req.query.projet) {
            filter.projet = req.query.projet;
        }

        if (req.query.search) {
            filter.titre = { $regex: req.query.search, $options: 'i' };
        }

        const sort = req.query.sort === 'asc' ? 1 : -1;

        const tasks = await Task.find(filter)
            .populate('projet')
            .populate('utilisateurAssigne', 'nom login')
            .sort({ dateCreation: sort });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier une tâche
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Tâche introuvable' });
        }

        if (req.body.utilisateurAssigne && req.user.role !== 'manager') {
            return res.status(403).json({
                message: 'Seul le manager peut assigner une tâche'
            });
        }

        if (req.body.utilisateurAssigne) {
            const user = await User.findById(req.body.utilisateurAssigne);

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur introuvable' });
            }
        }

        const allowedFields = ['titre', 'description', 'statut', 'deadline'];

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                task[field] = req.body[field];
            }
        });

        if (req.body.utilisateurAssigne && req.user.role === 'manager') {
            task.utilisateurAssigne = req.body.utilisateurAssigne;
        }

        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Tâche introuvable' });
        }

        await task.deleteOne();

        res.json({ message: 'Tâche supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};