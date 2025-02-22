const Match = require('../models/match');
const Team = require('../models/team');
const Rank = require('../models/rank');

/**
 * Simule un match entre deux équipes
 * Prend en compte les coefficients des équipes et un facteur aléatoire
 */
async function simulateMatch(matchId) {
    const match = await Match.findById(matchId).populate('teamA teamB');

    if (!match) throw new Error("Match non trouvé");

    let probaA = match.teamA.coefficient / (match.teamA.coefficient + match.teamB.coefficient);
    let probaB = match.teamB.coefficient / (match.teamA.coefficient + match.teamB.coefficient);

    let scoreA = Math.round(Math.random() * 3 + (probaA * 2));
    let scoreB = Math.round(Math.random() * 3 + (probaB * 2));

    match.scoreA = scoreA;
    match.scoreB = scoreB;
    match.played = true;

    // Gestion des tirs au but en cas d'égalité (phase finale uniquement)
    if (scoreA === scoreB) {
        match.penaltyA = Math.floor(Math.random() * 5);
        match.penaltyB = Math.floor(Math.random() * 5);
    }

    await match.save();
    return match;
}

/**
 * Simule tous les matchs non joués
 */
async function simulateAllMatches() {
    const matches = await Match.find({ played: false });
    let results = [];

    for (let match of matches) {
        let result = await simulateMatch(match._id);
        results.push(result);
    }

    // Mise à jour du classement après la simulation des matchs
    await updateRankings();
    
    return results;
}

/**
 * Met à jour le classement des équipes après la simulation
 */
async function updateRankings() {
    const teams = await Team.find();
    let rankings = {};

    // Initialisation des points et du goal average pour chaque équipe
    teams.forEach(team => {
        rankings[team._id] = { points: 0, goalDifference: 0 };
    });

    // Calcul des points et goal difference à partir des matchs joués
    const matches = await Match.find({ played: true });

    matches.forEach(match => {
        let teamA = rankings[match.teamA._id];
        let teamB = rankings[match.teamB._id];

        if (match.scoreA > match.scoreB) {
            teamA.points += 3;
        } else if (match.scoreB > match.scoreA) {
            teamB.points += 3;
        } else {
            teamA.points += 1;
            teamB.points += 1;
        }

        teamA.goalDifference += (match.scoreA - match.scoreB);
        teamB.goalDifference += (match.scoreB - match.scoreA);
    });

    // Enregistrement des classements dans MongoDB
    for (const [teamId, data] of Object.entries(rankings)) {
        await Rank.findOneAndUpdate(
            { team: teamId },
            { $set: { points: data.points, goalDifference: data.goalDifference } },
            { upsert: true }
        );
    }

    console.log("Classement mis à jour !");
}

/**
 * Récupère les meilleures équipes pour les qualifications en phase finale
 */
async function getQualifiedTeams() {
    const topTeams = await Rank.find().sort({ points: -1, goalDifference: -1 }).limit(16);
    return topTeams.map(rank => rank.team);
}

/**
 * Simule un match spécifique entre deux équipes
 */
async function simulateMatchBetweenTeams(teamA, teamB) {
    let probaA = teamA.coefficient / (teamA.coefficient + teamB.coefficient);
    let probaB = teamB.coefficient / (teamA.coefficient + teamB.coefficient);

    let scoreA = Math.round(Math.random() * 3 + (probaA * 2));
    let scoreB = Math.round(Math.random() * 3 + (probaB * 2));

    // Si égalité en phase finale, tirs au but
    let penaltyA = 0, penaltyB = 0;
    if (scoreA === scoreB) {
        penaltyA = Math.floor(Math.random() * 5);
        penaltyB = Math.floor(Math.random() * 5);
    }

    return {
        teamA: teamA.name,
        teamB: teamB.name,
        scoreA,
        scoreB,
        penaltyA,
        penaltyB
    };
}

/**
 * Simule la phase finale à élimination directe
 */
async function simulateKnockoutStage() {
    let qualifiedTeams = await getQualifiedTeams();

    console.log("Début des phases finales !");
    
    while (qualifiedTeams.length > 1) {
        let nextRound = [];

        for (let i = 0; i < qualifiedTeams.length; i += 2) {
            let teamA = await Team.findById(qualifiedTeams[i]);
            let teamB = await Team.findById(qualifiedTeams[i + 1]);

            let match = await simulateMatchBetweenTeams(teamA, teamB);
            let winner = match.scoreA > match.scoreB ? teamA : teamB;

            console.log(`${match.teamA} (${match.scoreA}) - (${match.scoreB}) ${match.teamB}`);
            nextRound.push(winner._id);
        }

        qualifiedTeams = nextRound;
    }

    console.log(`Vainqueur de la compétition : ${qualifiedTeams[0].name}`);
}

module.exports = { simulateMatch, simulateAllMatches, updateRankings, getQualifiedTeams, simulateKnockoutStage };
