// services/matchService.js
const Match = require('../models/match');
const Team = require('../models/team');

//Fonction pour génerer les match aléatoires
async function generateMatches() {
    // recupère les équipes
    const teams = await Team.find();
    let matches = [];

    // Boucle pour affrontement d'équipe A et B 

    for (let i = 0; i < teams.length; i += 2) {
        if (i + 1 < teams.length) {
            let match = new Match({
                teamA: teams[i]._id,
                teamB: teams[i + 1]._id,
                played: false, 
                date: new Date() 
            });

            await match.save();
            matches.push(match);
        }
    }

    return matches;
}

module.exports = { generateMatches };
