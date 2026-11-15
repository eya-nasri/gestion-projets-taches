const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    proprietaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    statut: {
        type: String,
        enum: ['en cours', 'terminé', 'en pause'],
        default: 'en cours'
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
});

// Houni na3mlou model mta3 projet
module.exports = mongoose.model('Project', projectSchema);