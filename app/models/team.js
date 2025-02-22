// models/team.js
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nom du club
    country: { type: String, required: true }, // Pays
    coefficient: { type: Number, required: true } // Coefficient UEFA ou autre indicateur
});

module.exports = mongoose.model('Team', TeamSchema);
