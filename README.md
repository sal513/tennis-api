# 🎾 Tennis API – Projet Étudiant (NestJS)

## 📌 Contexte
Ce projet a été réalisé dans le cadre d’un TP de développement backend avec **NestJS**.  
L’objectif est de construire une API REST simple permettant de gérer des **terrains de tennis** (`courts`) tout en intégrant une **API publique externe** (TheSportsDB) pour enrichir les données.  

---

## ⚙️ Fonctionnalités

### Gestion locale des courts (CRUD)
- `GET /courts` → liste tous les courts.
- `GET /courts/:id` → récupère un court par son identifiant.
- `POST /courts` → ajoute un nouveau court (selon DTO).
- `PUT /courts/:id` → met à jour le favori d’un court.
- `PATCH /courts/:id/favorite` → met à jour uniquement le champ favori.
- `DELETE /courts/:id` → supprime un court.

Les données locales sont stockées dans un fichier **JSON maison** au lancement.

### Intégration API externe – TheSportsDB
- `GET /tennis/player?name=<nom>` → recherche un joueur de tennis via l’API publique.  
  Exemple : `/tennis/player?name=Federer`
- `GET /tennis/event?name=<event>` → recherche un évènement (tournoi, match, …).  
  Exemple : `/tennis/event?name=Wimbledon`

L’API externe utilisée est **TheSportsDB (free key: 123)**.

## 🔍 Exemples de requêtes

### Avec navigateur
- [http://localhost:3000/courts](http://localhost:3000/courts)  
- [http://localhost:3000/courts/court-md-1](http://localhost:3000/courts/court-md-1)  
- [http://localhost:3000/tennis/player?name=Nadal](http://localhost:3000/tennis/player?name=Nadal)

---

Lancer les tests :
```bash
npm run test
