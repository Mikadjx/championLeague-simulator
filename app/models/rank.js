// models/rank.js
const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema({
    rank: { type: Number, required: true }, // Position dans le classement
    club: { type: String, required: true }, // Nom du club
    country: { type: String, required: true }, // Pays
    level: { type: Number, required: true }, // Niveau de l'équipe
    elo: { type: Number, required: true }, // Score Elo
    from: { type: Date, required: true }, // Date de début de validité
    to: { type: Date, required: true } // Date de fin de validité
});

module.exports = mongoose.model('Rank', RankSchema);
