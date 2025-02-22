// models/match.js
const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    teamA: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    teamB: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    scoreA: { type: Number, default: 0 },
    scoreB: { type: Number, default: 0 },
    penaltyA: { type: Number, default: null }, // tir au but
    penaltyB: { type: Number, default: null }, 
    played: { type: Boolean, default: false }, // Indique si le match a été joué
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Match', MatchSchema);
