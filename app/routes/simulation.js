const express = require('express');
const router = express.Router();
const { generateMatches, simulateAllMatches } = require('../services/simulationService');

// Générer des matchs
router.post('/generate', async (req, res) => {
    try {
        const matches = await generateMatches();
        res.json({ message: "Matchs générés avec succès", matches });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Simuler tous les matchs
router.post('/simulate', async (req, res) => {
    try {
        const results = await simulateAllMatches();
        res.json({ message: "Matchs simulés avec succès", results });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
