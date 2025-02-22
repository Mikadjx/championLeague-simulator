require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const initializeMatches = require('./services/initMatches');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Importation des routes
const teamRouter = require('./routes/teams');
const matchRouter = require('./routes/matches');
const simulationRouter = require('./routes/simulation');
const rankingRouter = require('./routes/rankings'); 

// Configuration des routes API
app.use('/api/teams', teamRouter);
app.use('/api/matches', matchRouter);
app.use('/api/simulation', simulationRouter);
app.use('/api/rankings', rankingRouter); // 

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connecté à MongoDB');
        await initializeMatches(); // Vérifie et initialise les matchs si besoin
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB :', err);
        process.exit(1);
    });

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gestion d'erreurs pour les routes non trouvées
app.use((req, res) => {
    res.status(404).json({ message: "Route non trouvée" });
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
