const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription d'un nouvel utilisateur
const register = async (req, res) => {
    try {
        const { nom, login, password, role } = req.body;

        const existe = await User.findOne({ login });

        if (existe) {
            return res.status(400).json({
                message: 'Ce login existe déjà'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            nom,
            login,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: {
                id: user._id,
                nom: user.nom,
                login: user.login,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Connexion d'un utilisateur
const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findOne({ login });

        if (!user) {
            return res.status(401).json({
                message: 'Login ou mot de passe incorrect'
            });
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: 'Login ou mot de passe incorrect'
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Connexion réussie',
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login };