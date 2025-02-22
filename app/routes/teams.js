const express = require('express');
const router = express.Router();
const Team = require('../models/team');

// Récupérer toutes les équipes
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Récupérer une seule équipe par ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Équipe non trouvée" });
        res.json(team);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ajouter une nouvelle équipe
router.post('/', async (req, res) => {
    const { name, country, coefficient } = req.body;

    const newTeam = new Team({
        name,
        country,
        coefficient
    });

    try {
        const savedTeam = await newTeam.save();
        res.status(201).json(savedTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mettre à jour une équipe
router.put('/:id', async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTeam);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Supprimer une équipe
router.delete('/:id', async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.json({ message: "Équipe supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
