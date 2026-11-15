const Project = require('../models/Project');

// Création d'un projet
const createProject = async (req, res) => {
    try {
        const { nom, description, statut } = req.body;

        const project = await Project.create({
            nom,
            description,
            statut,
            proprietaire: req.user.id
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Afficher les projets
const getProjects = async (req, res) => {
    try {
        let projects;

        if (req.user.role === 'manager') {
            projects = await Project.find().populate('proprietaire', 'nom login');
        } else {
            projects = await Project.find({
                proprietaire: req.user.id
            });
        }

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier un projet
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Projet introuvable' });
        }

        if (
            req.user.role !== 'manager' &&
            project.proprietaire.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: 'Accès refusé' });
        }

        Object.assign(project, req.body);
        await project.save();

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un projet
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Projet introuvable' });
        }

        if (
            req.user.role !== 'manager' &&
            project.proprietaire.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: 'Accès refusé' });
        }

        await project.deleteOne();

        res.json({ message: 'Projet supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
};