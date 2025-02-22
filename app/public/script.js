const API_URL = "/api";

// Récupérer la liste des équipes et les afficher en tableau
async function fetchTeams() {
    try {
        const response = await fetch(`${API_URL}/teams`);
        const teams = await response.json();

        let teamTable = document.getElementById("team-table");
        teamTable.innerHTML = ""; // Vider le tableau avant d'ajouter les nouvelles données

        teams.forEach(team => {
            let row = teamTable.insertRow();
            row.insertCell(0).textContent = team.name;
            row.insertCell(1).textContent = team.country;
            row.insertCell(2).textContent = team.coefficient;
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des équipes :", error);
    }
}

// Générer les matchs
async function generateMatches() {
    await fetch(`${API_URL}/matches/generate`, { method: "POST" });
    fetchMatches(); // Recharger les matchs
}

// Simuler les matchs
async function simulateMatches() {
    await fetch(`${API_URL}/matches/simulate`, { method: "POST" });
    fetchMatches(); // Recharger les matchs
    fetchRanking(); // Mettre à jour le classement
}

// Récupérer les matchs
async function fetchMatches() {
    const response = await fetch(`${API_URL}/matches`);
    const matches = await response.json();

    let matchList = document.getElementById("match-list");
    matchList.innerHTML = "";
    matches.forEach(match => {
        let li = document.createElement("li");
        li.textContent = `${match.teamA.name} (${match.scoreA}) - (${match.scoreB}) ${match.teamB.name}`;
        matchList.appendChild(li);
    });
}

// Récupérer le classement
async function fetchRanking() {
    const response = await fetch(`${API_URL}/rankings`);
    const rankings = await response.json();

    let rankingTable = document.getElementById("ranking-table");
    rankingTable.innerHTML = "";
    rankings.forEach(rank => {
        let row = rankingTable.insertRow();
        row.insertCell(0).textContent = rank.rank;
        row.insertCell(1).textContent = rank.club;
        row.insertCell(2).textContent = rank.elo.toFixed(2);
    });
}

// Liste des musiques FIFA classiques (basé sur tes fichiers)
const fifaSongs = [
    { title: "Blur - Song 2 (FIFA 98)", url: "mp3/Blur - Song 2.mp3" },
    { title: "FIFA 98 Theme", url: "mp3/fifa-298032.mp3" },
    { title: "Enjoy The Ride", url: "mp3/enjoy-the-ride-231386.mp3" },
    { title: "Football Skills Beat", url: "mp3/football-skills-trap-beat-277426.mp3" },
    { title: "Lofi Chill", url: "mp3/lofi-chill-medium-version-159456.mp3" }
];

const audioPlayer = document.getElementById("audio-player");

// Fonction pour jouer une musique aléatoire
function playRandomTrack() {
    const randomIndex = Math.floor(Math.random() * fifaSongs.length);
    const selectedSong = fifaSongs[randomIndex];

    audioPlayer.src = selectedSong.url;
    audioPlayer.play();

    console.log(`Lecture : ${selectedSong.title}`);
}


// Charger les données au démarrage
document.addEventListener("DOMContentLoaded", () => {
    playRandomTrack();
    fetchTeams();
    fetchMatches();
    fetchRanking();
});
