const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');

// Route d'inscription
router.post('/register', register);

// Route de connexion
router.post('/login', login);


router.get('/test', (req, res) => {
    res.send('Auth Routes fonctionne !');
});


module.exports = router;
