// Houni nthabtou elli l'utilisateur manager
const verifyManager = (req, res, next) => {

    if (req.user.role !== 'manager') {
        return res.status(403).json({
            message: 'Accès refusé : réservé au manager'
        });
    }

    next();
};

module.exports = verifyManager;