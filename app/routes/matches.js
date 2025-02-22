const express = require('express');
const router = express.Router();
const Match = require('../models/match'); 

// Ajouter un match
router.post('/', async (req, res) => {
    try {
        const match = new Match(req.body);
        const savedMatch = await match.save();
        res.status(201).json(savedMatch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Récupérer tous les matchs
router.get('/', async (req, res) => {
    try {
        const matches = await Match.find().populate('homeTeam awayTeam'); // Récupère les noms des équipes
        res.json(matches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Récupérer un match spécifique
router.get('/:id', getMatch, (req, res) => {
    res.json(res.match);
});

// Mettre à jour un match (modifier le score si nécessaire)
router.put('/:id', getMatch, async (req, res) => {
    if (req.body.homeScore != null) {
        res.match.homeScore = req.body.homeScore;
    }
    if (req.body.awayScore != null) {
        res.match.awayScore = req.body.awayScore;
    }
    try {
        const updatedMatch = await res.match.save();
        res.json(updatedMatch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer un match
router.delete('/:id', getMatch, async (req, res) => {
    try {
        await res.match.deleteOne();
        res.json({ message: 'Match supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// récupérer un match par ID
async function getMatch(req, res, next) {
    let match;
    try {
        match = await Match.findById(req.params.id).populate('homeTeam awayTeam');
        if (match == null) {
            return res.status(404).json({ message: 'Match non trouvé' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.match = match;
    next();
}

module.exports = router;
