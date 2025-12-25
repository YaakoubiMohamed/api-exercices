# 📚 Exercices Angular - Consommation d'API REST

## 🏈 Exercice 5 : Football Data

### � API à utiliser
**Football-Data.org**  
Base URL : `https://api.football-data.org/v4/`  
🔑 Authentification requise : Clé API gratuite disponible sur https://www.football-data.org/client/register

### �🎯 Objectifs
Créer une application Angular pour afficher les classements et les meilleurs buteurs des compétitions de football européennes en utilisant l'API Football-Data.org.

### 📋 Fonctionnalités à implémenter
- Sélection d'une compétition (Premier League, La Liga, Bundesliga, Serie A, Ligue 1)
- Affichage du classement des équipes avec :
  - Logo de l'équipe
  - Nom de l'équipe
  - Points, Victoires, Nuls, Défaites
  - Buts marqués et encaissés
- Affichage du top 10 des buteurs avec :
  - Nom du joueur
  - Équipe
  - Nombre de buts

### 🔑 Concepts pratiqués
- HttpClient avec headers personnalisés (authentification API)
- Gestion des états (loading, error)
- @if/@for pour le nouveau control flow
- Architecture en composants réutilisables
- Communication parent-enfant avec @Input/@Output


---

## 🌍 Exercice 7 : Country Explorer

### � API à utiliser
**REST Countries API**  
Base URL : `https://restcountries.com/v3.1/`  
🔓 Pas d'authentification requise

### �🎯 Objectifs
Créer une application de recherche de pays qui permet de trouver et afficher des informations détaillées sur les pays du monde.

### 📋 Fonctionnalités à implémenter
- Recherche d'un pays par son nom
- Affichage des informations du pays :
  - Drapeau
  - Nom officiel et commun
  - Capitale
  - Population
  - Région
  - Langues parlées
- Gestion des états de chargement et d'erreur
- Filtre par région (bonus)

### 🔑 Concepts pratiqués
- HttpClient pour les appels API
- Propriétés de composant pour la gestion d'état
- @if/@for pour le nouveau control flow
- Gestion des erreurs HTTP
- Template literals pour construire les URLs



---

## 👥 Exercice 8 : Random Users

### � API à utiliser
**Random User API**  
Base URL : `https://randomuser.me/api/`  
🔓 Pas d'authentification requise

### �🎯 Objectifs
Créer une application qui charge et affiche une liste d'utilisateurs aléatoires avec pagination et filtres.

### 📋 Fonctionnalités à implémenter
- Chargement initial d'utilisateurs aléatoires
- Affichage des informations utilisateur :
  - Photo de profil
  - Nom complet
  - Email
  - Localisation (ville, pays)
  - Genre
- Filtrage par genre (homme/femme/tous)
- Bouton "Charger plus" pour ajouter 10 utilisateurs supplémentaires
- Actualisation de la liste

### 🔑 Concepts pratiqués
- HttpClient avec query parameters (HttpParams)
- Propriétés de composant pour la gestion d'état
- Filtres dynamiques avec paramètres d'URL
- Pattern "Load More" (ajout de données)
- Opérateur RxJS map() pour transformer les données
- Gestion des subscriptions



---

## 📌 Points communs aux 3 exercices

### APIs utilisées
- **Football Data** : https://www.football-data.org/ (Clé API requise)
- **REST Countries** : https://restcountries.com/v3.1 (Pas de clé API)
- **Random User** : https://randomuser.me/api (Pas de clé API)

### Technologies Angular
- Composants standalone
- Nouveau control flow (@if, @for)
- HttpClient pour les requêtes HTTP
- RxJS (Observable, subscribe, map)
- Property binding et Event binding
- FormsModule pour les formulaires

### Architecture recommandée
```
exercice-X/
├── models/          # Interfaces TypeScript
├── services/        # Services HTTP
├── components/      # Composants enfants (si nécessaire)
├── component.ts     # Composant principal
├── component.html   # Template
└── component.css    # Styles
```

### Best Practices
✅ Toujours typer les réponses HTTP avec des interfaces  
✅ Gérer les états (loading, error)  
✅ Unsubscribe des Observables dans ngOnDestroy  
✅ Utiliser le nouveau control flow (@if/@for)  
✅ Séparer les responsabilités (services pour HTTP, composants pour l'UI)  
✅ Utiliser track dans @for pour les performances

