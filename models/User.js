
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },

    login: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'manager'],
        default: 'user'
    },

    dateCreation: {
        type: Date,
        default: Date.now
    }

});

// Houni na3mlou model mta3 utilisateur
module.exports = mongoose.model('User', userSchema);
