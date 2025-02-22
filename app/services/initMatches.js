const Match = require('../models/match');
const Team = require('../models/team');

async function initializeMatches() {
    const matchCount = await Match.countDocuments();
    
    if (matchCount === 0) {
        console.log("📢 Aucune donnée trouvée, génération automatique des matchs...");

        const teams = await Team.find(); // Récupère toutes les équipes

        let matches = [];
        for (let i = 0; i < teams.length; i += 2) {
            if (i + 1 < teams.length) {
                matches.push({
                    teamA: teams[i]._id,
                    teamB: teams[i + 1]._id,
                    played: false,
                    date: new Date()
                });
            }
        }

        await Match.insertMany(matches);
        console.log("✅ Matchs ajoutés automatiquement !");
    }
}

module.exports = initializeMatches;
