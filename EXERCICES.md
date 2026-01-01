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

### Technologies Angular 20
- Composants standalone
- Nouveau control flow (@if, @for)
- HttpClient pour les requêtes HTTP
- **Signals** pour la gestion d'état réactive
- **inject()** pour l'injection de dépendances
- **input()/output()** pour la communication parent-enfant
- RxJS (Observable, subscribe, map)
- Property binding et Event binding

### Architecture recommandée
```
exercice-X/
├── models/                        # Interfaces TypeScript
│   └── model.model.ts
├── services/                      # Services HTTP
│   └── service.service.ts
├── components/                    # Composants enfants (chaque composant dans son dossier)
│   ├── component-a/
│   │   ├── component-a.component.ts
│   │   ├── component-a.component.html
│   │   └── component-a.component.css
│   └── component-b/
│       ├── component-b.component.ts
│       ├── component-b.component.html
│       └── component-b.component.css
├── main-component/                # Composant principal dans son propre dossier
│   ├── main.component.ts
│   ├── main.component.html
│   └── main.component.css
├── explanation.component.ts       # Composant d'explication
└── explanation-visual.component.ts # Composant d'explication visuelle
```

> **Note:** Chaque composant a son propre dossier avec ses fichiers TS, HTML et CSS. 
> Cela facilite la navigation et la maintenance du code.

### ✅ Angular 20 Best Practices

#### 1. Injection de Dépendances avec inject()
```typescript
// ❌ Ancienne méthode (constructor injection)
constructor(private readonly service: MyService) {}

// ✅ Nouvelle méthode (inject() function)
private readonly service = inject(MyService);
```

#### 2. Gestion d'État avec Signals
```typescript
// ❌ Ancienne méthode (propriétés simples)
users: User[] = [];
loading = false;
error: string | null = null;

// ✅ Nouvelle méthode (Signals)
readonly users = signal<User[]>([]);
readonly loading = signal(false);
readonly error = signal<string | null>(null);

// Mise à jour des signals
this.users.set(newUsers);           // Remplacer la valeur
this.users.update(arr => [...arr, newUser]); // Mettre à jour basé sur la valeur actuelle
```

#### 3. Inputs avec input()
```typescript
// ❌ Ancienne méthode (@Input decorator)
@Input() data: User[] = [];

// ✅ Nouvelle méthode (input() function)
readonly data = input<User[]>([]);           // Avec valeur par défaut
readonly data = input.required<User[]>();    // Requis
```

#### 4. Outputs avec output()
```typescript
// ❌ Ancienne méthode (@Output decorator)
@Output() selectionChange = new EventEmitter<string>();

// ✅ Nouvelle méthode (output() function)
readonly selectionChange = output<string>();
```

#### 5. Accès aux Signals dans les Templates
```html
<!-- ❌ Ancienne méthode (propriétés) -->
@if (loading) { ... }
@for (user of users; track user.id) { ... }

<!-- ✅ Nouvelle méthode (Signals avec parenthèses) -->
@if (loading()) { ... }
@for (user of users(); track user.id) { ... }
```

#### 6. Computed Signals pour les Valeurs Dérivées
```typescript
// Signal de base
readonly users = signal<User[]>([]);

// Signal calculé (derived state)
readonly userCount = computed(() => this.users().length);
readonly hasUsers = computed(() => this.users().length > 0);
```

### 🔑 Avantages des Signals

| Aspect | Propriétés | Signals |
|--------|------------|---------|
| Réactivité | Via Zone.js | Fine-grained |
| Performance | Vérifie tout | Vérifie uniquement ce qui change |
| Debugging | Difficile | Plus facile à tracer |
| Mutabilité | Mutable | Immutable (via set/update) |

### Best Practices Résumées
✅ Utiliser `inject()` au lieu de constructor injection  
✅ Utiliser `signal()` pour l'état du composant  
✅ Utiliser `input()` au lieu de `@Input()`  
✅ Utiliser `output()` au lieu de `@Output()`  
✅ Utiliser `computed()` pour les valeurs dérivées  
✅ Toujours typer les réponses HTTP avec des interfaces  
✅ Gérer les états (loading, error) avec des signals  
✅ Utiliser le nouveau control flow (@if/@for)  
✅ Séparer les responsabilités (services pour HTTP, composants pour l'UI)  
✅ Utiliser `track` dans @for pour les performances
✅ Accéder aux signals avec `()` dans les templates

