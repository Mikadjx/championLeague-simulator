<div align="center">

# ⚽ Champions League Simulator 2025

<img src="https://www.ostadium.com/galleries/ligue-des-champions-de-luefa-illus.jpg" alt="Banner" width="600">
</div>

<p align="center">
Une simulation de la Ligue des Champions 2024/2025, construite avec Node.js, Express, et Mongoose pour gérer une base MongoDB (NoSQL). Utilise Docker pour un déploiement simplifié des services, avec une touche de HTML pour l’interface.</p>

---

## 🎯 En bref

Simulez une compétition réaliste avec des équipes de football, leurs performances, et une dose de hasard, le tout orchestré via Docker et stocké dans une base NoSQL.

---

## ✨ Fonctionnalités

- Simulation de matchs
- API REST pour gérer les équipes
- Stockage NoSQL avec MongoDB
- Interface web légère
- Conteneurisation avec Docker

---

## 🚀 Démarrage

1. Clonez le repo :
   ```bash
   git clone https://github.com/votre-utilisateur/champions-league-simulator.git
2. Lancez avec Docker
docker-compose up --build

3. Accédez
API : http://localhost:3000/teams
Interface : http://localhost:8081

4. API
GET /teams : Liste des équipes
POST /teams/team : Ajouter une équipe
