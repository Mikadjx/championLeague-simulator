const express = require('express');
const router = express.Router();
const Rank = require('../models/rank');

// Récupérer le classement
router.get('/', async (req, res) => {
    try {
        const rankings = await Rank.find();
        res.json(rankings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ajouter un nouveau classement
router.post('/', async (req, res) => {
    const { rank, club, country, level, elo, from, to } = req.body;

    const newRank = new Rank({
        rank,
        club,
        country,
        level,
        elo,
        from,
        to
    });

    try {
        const savedRank = await newRank.save();
        res.status(201).json(savedRank);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mettre à jour un classement
router.put('/:id', async (req, res) => {
    try {
        const updatedRank = await Rank.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRank);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Supprimer un classement
router.delete('/:id', async (req, res) => {
    try {
        await Rank.findByIdAndDelete(req.params.id);
        res.json({ message: "Classement supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
