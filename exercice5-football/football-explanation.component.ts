/**
 * ============================================================================
 * EXERCISE 5: VISUAL INTERACTIVE EXPLANATION
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-football-explanation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="explanation-container">
      <header>
        <a routerLink="/exercice5" class="back-link">← Retour à l'exercice</a>
        <h1>📚 Exercice 5 - Explication Détaillée</h1>
        <p class="subtitle">Comment consommer une API REST avec Angular</p>
      </header>
      
      <!-- Step 1 -->
      <section class="step">
        <h2>🔷 Étape 1: Configuration de HttpClient</h2>
        <div class="code-block">
          <pre><code>// app.config.ts
import &#123; provideHttpClient &#125; from '&#64;angular/common/http';

export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideHttpClient() // Active HttpClient dans l'application
  ]
&#125;;</code></pre>
        </div>
        <div class="explanation">
          <h3>🔑 Mots-clés détaillés:</h3>
          <ul>
            <li><strong>provideHttpClient()</strong>: Fonction qui configure et active le module HttpClient dans toute l'application. 
            Sans cet appel dans app.config.ts, vous ne pourrez pas utiliser HttpClient dans vos services. 
            C'est l'équivalent moderne de l'ancien HttpClientModule dans les applications standalone.</li>
            <li><strong>ApplicationConfig</strong>: Interface TypeScript qui définit la configuration globale de votre application Angular. 
            Le tableau 'providers' contient tous les services et configurations disponibles dans toute l'application. 
            C'est ici qu'on configure les éléments transversaux comme HTTP, routing, animations, etc.</li>
          </ul>
        </div>
      </section>
      
      <!-- Step 2 -->
      <section class="step">
        <h2>🔷 Étape 2: Créer les Interfaces (Models)</h2>
        <div class="code-block">
          <pre><code>// models/football.model.ts
export interface Team &#123;
  id: number;          // Identifiant unique
  name: string;        // Nom complet
  shortName: string;   // Nom court
  crest: string | null; // URL du logo (peut être null)
&#125;

// string | null = Type Union (peut être string OU null)</code></pre>
        </div>
        <div class="explanation">
          <h3>🔑 Pourquoi des interfaces? (Explications détaillées)</h3>
          <ul>
            <li><strong>Typage fort (Type Safety)</strong>: TypeScript vérifie que vous utilisez les bonnes propriétés avec les bons types. 
            Par exemple, si vous essayez d'accéder à team.namee (avec faute), TypeScript vous alertera immédiatement. 
            Cela évite les erreurs à l'exécution qui sont difficiles à débugger.</li>
            <li><strong>Autocomplétion intelligente (IntelliSense)</strong>: Quand vous tapez 'team.', VS Code affiche automatiquement toutes les propriétés disponibles (id, name, shortName, crest). 
            Cela accélère le développement et réduit les erreurs de frappe.</li>
            <li><strong>Documentation vivante</strong>: Les interfaces servent de documentation technique. Un développeur qui rejoint le projet peut voir immédiatement la structure des données. 
            C'est mieux qu'un commentaire car c'est vérifié par le compilateur.</li>
            <li><strong>Refactoring sécurisé</strong>: Si vous renommez une propriété dans l'interface, TypeScript vous montrera tous les endroits du code qui doivent être mis à jour. 
            Sans interface, vous devriez chercher manuellement dans tout le code.</li>
          </ul>
        </div>
      </section>
      
      <!-- Step 3 -->
      <section class="step">
        <h2>🔷 Étape 3: Créer le Service</h2>
        <div class="code-block">
          <pre><code>// services/football.service.ts
import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; HttpClient &#125; from '&#64;angular/common/http';
import &#123; Observable &#125; from 'rxjs';

&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class FootballService &#123;
  // Constructor injection: Traditional Angular DI
  constructor(private readonly http: HttpClient) &#123;&#125;
  
  getStandings(): Observable&lt;StandingsResponse&gt; &#123;
    return this.http.get&lt;StandingsResponse&gt;(url);
  &#125;
&#125;</code></pre>
        </div>
        <div class="explanation">
          <h3>🔑 Mots-clés détaillés:</h3>
          <ul>
            <li><strong>@Injectable()</strong>: Décorateur Angular qui marque une classe comme étant injectable dans le système de Dependency Injection. 
            Cela signifie qu'Angular peut créer des instances de ce service et les fournir automatiquement aux composants qui en ont besoin. 
            Sans ce décorateur, vous ne pourriez pas injecter le service.</li>
            <li><strong>providedIn: 'root'</strong>: Configure le service comme un Singleton au niveau de l'application entière. 
            Une seule instance du service est créée et partagée par tous les composants. Cela économise la mémoire et permet de partager l'état. 
            C'est l'approche moderne recommandée qui remplace l'ancien système de providers dans les modules.</li>
            <li><strong>constructor()</strong>: Méthode spéciale appelée automatiquement par Angular lors de la création du service. 
            C'est ici qu'on déclare les dépendances (comme HttpClient) que Angular injectera automatiquement. 
            Le mot-clé 'private' crée automatiquement une propriété de classe accessible via 'this.http'.</li>
            <li><strong>private readonly</strong>: 'private' signifie que la propriété n'est accessible que dans cette classe (encapsulation). 
            'readonly' empêche toute réassignation après l'initialisation, garantissant l'immutabilité et évitant les bugs. 
            Ces deux mots-clés ensemble créent un code plus sûr et maintenable.</li>
            <li><strong>Observable&lt;T&gt;</strong>: Type RxJS représentant un flux de données asynchrones. C'est comme une Promise mais plus puissant: 
            peut émettre plusieurs valeurs dans le temps, supporte l'annulation (unsubscribe), et permet des transformations chainées avec les opérateurs. 
            Le &lt;T&gt; définit le type des données émises (ex: Observable&lt;User[]&gt; émettra un tableau d'utilisateurs).</li>
            <li><strong>http.get&lt;T&gt;()</strong>: Méthode qui effectue une requête HTTP GET et retourne un Observable. 
            Le &lt;T&gt; spécifie le type attendu de la réponse JSON. Angular déserializera automatiquement le JSON en objet TypeScript typé. 
            Par exemple, get&lt;User[]&gt;() retourne Observable&lt;User[]&gt;, garantissant la sécurité des types.</li>
          </ul>
        </div>
      </section>
      
      <!-- Step 4 -->
      <section class="step">
        <h2>🔷 Étape 4: Utiliser le Service dans un Composant</h2>
        <div class="code-block">
          <pre><code>// football.component.ts
import &#123; Component &#125; from '&#64;angular/core';

export class FootballComponent &#123;
  // Constructor injection
  constructor(private readonly service: FootballService) &#123;&#125;
  
  // Regular properties for state management
  standings: TeamStanding[] = [];
  loading: boolean = false;
  
  loadData(): void &#123;
    this.loading = true;
    
    this.service.getStandings('PL').subscribe(&#123;
      next: (response) =&gt; &#123;
        this.standings = response.standings;
        this.loading = false;
      &#125;,
      error: (err) =&gt; &#123;
        console.error(err);
        this.loading = false;
      &#125;
    &#125;);
  &#125;
&#125;</code></pre>
        </div>
        <div class="explanation">
          <h3>🔑 Mots-clés détaillés:</h3>
          <ul>
            <li><strong>constructor()</strong>: Point d'entrée pour l'injection de dépendances dans Angular. 
            Toutes les dépendances déclarées ici (comme FootballService) sont automatiquement instanciées et injectées par Angular. 
            C'est la méthode traditionnelle et recommandée qui rend le code explicite et testable.</li>
            <li><strong>property: Type = value</strong>: Déclaration TypeScript complète d'une propriété. 
            'property' est le nom, 'Type' spécifie le type (string, number, User[], etc.), '= value' définit la valeur initiale. 
            Cette syntaxe garantit la sécurité des types et facilite la compréhension du code.</li>
            <li><strong>this.property = value</strong>: Affectation directe qui met à jour la valeur d'une propriété. 
            Angular détecte automatiquement ce changement et met à jour la vue (template) correspondante. 
            C'est la méthode traditionnelle de gestion d'état, simple et efficace.</li>
            <li><strong>subscribe()</strong>: Méthode qui déclenche l'exécution d'un Observable (flux RxJS). 
            Avant subscribe(), l'Observable est 'froid' (lazy) et ne fait rien. Après subscribe(), la requête HTTP est lancée. 
            On fournit des callbacks (next, error) pour réagir aux événements du flux.</li>
            <li><strong>next</strong>: Callback appelé quand l'Observable émet une valeur avec succès. 
            Pour une requête HTTP GET, c'est ici que vous recevez les données de la réponse. 
            C'est l'équivalent du 'then()' d'une Promise. Vous mettez à jour votre état ici.</li>
            <li><strong>error</strong>: Callback appelé si une erreur se produit (réseau, serveur 404/500, timeout, etc.). 
            C'est ici que vous gérez les erreurs: afficher un message, logger, définir une valeur par défaut. 
            C'est l'équivalent du 'catch()' d'une Promise. Toujours gérer les erreurs pour une bonne UX!</li>
          </ul>
        </div>
      </section>
      
      <!-- Step 5 -->
      <section class="step">
        <h2>🔷 Étape 5: Afficher les Données dans le Template</h2>
        <div class="code-block">
          <pre><code ngNonBindable>&lt;!-- Template avec nouveau control flow --&gt;
&#64;if (loading()) &#123;
  &lt;p&gt;Chargement...&lt;/p&gt;
&#125;

&#64;if (standings().length &gt; 0) &#123;
  &#64;for (team of standings; track team.id) &#123;
    &lt;div&gt;{{ team.name }}&lt;/div&gt;
  &#125;
&#125; &#64;else &#123;
  &lt;p&gt;Aucune donnée&lt;/p&gt;
&#125;</code></pre>
        </div>
        <div class="explanation">
          <h3>🔑 Mots-clés détaillés:</h3>
          <ul>
            <li><strong>@if</strong>: Nouvelle syntaxe de condition Angular 17+ qui remplace *ngIf. 
            Plus lisible et performante, elle permet de conditionner l'affichage d'éléments dans le template. 
            Si la condition est false, l'élément n'est même pas créé dans le DOM (contrairement à [hidden] qui le cache seulement).</li>
            <li><strong>@for</strong>: Nouvelle syntaxe de boucle Angular 17+ qui remplace *ngFor. 
            Itère sur un tableau et crée un élément DOM pour chaque item. 
            Plus performante et offre une meilleure détection des erreurs au moment de la compilation.</li>
            <li><strong>track</strong>: Identifiant unique pour chaque élément de la boucle (obligatoire avec @for). 
            Angular l'utilise pour optimiser le rendu: quand les données changent, Angular sait quels éléments réutiliser, mettre à jour ou détruire. 
            Utilisez une propriété unique comme 'id' ou 'uuid'. Sans track, les performances seraient dégradées sur les grandes listes.</li>
            <li><strong>property</strong>: Accès direct aux propriétés publiques du composant depuis le template. 
            Le template est lié (data binding) au composant: quand une propriété change dans le code, la vue se met à jour automatiquement. 
            Pas besoin d'appeler une fonction comme property(), accédez directement à la valeur.</li>
            <li><strong ngNonBindable>{{ }}</strong>: Interpolation - syntaxe pour afficher des valeurs dans le HTML. 
            Angular évalue l'expression TypeScript entre les accolades et insère le résultat comme texte dans le DOM. 
            Exemple: {{ user.name }} affiche le nom, {{ price * 1.2 }} calcule et affiche le prix TTC.</li>
          </ul>
        </div>
      </section>
      
      <!-- RxJS Explanation -->
      <section class="step">
        <h2>🔷 Étape 6: Comprendre RxJS et les Observables</h2>
        <div class="code-block">
          <pre><code>// RxJS: Reactive Extensions for JavaScript
import &#123; Observable &#125; from 'rxjs';
import &#123; map, catchError, finalize &#125; from 'rxjs/operators';

// Service retourne un Observable
getStandings(): Observable&lt;StandingsResponse&gt; &#123;
  return this.http.get&lt;StandingsResponse&gt;(url).pipe(
    map(data =&gt; data.standings[0].table),  // Transforme
    catchError(error =&gt; of([])),            // Gère erreurs
    finalize(() =&gt; console.log('Done'))     // Toujours exécuté
  );
&#125;

// Component s'abonne
this.service.getStandings().subscribe(&#123;
  next: (data) =&gt; this.standings = data,
  error: (err) =&gt; this.error = err.message
&#125;);</code></pre>
        </div>
        <div class="explanation">
          <h3>🔑 Mots-clés RxJS détaillés:</h3>
          <ul>
            <li><strong>Observable</strong>: Concept central de RxJS représentant un flux (stream) de données asynchrones dans le temps. 
            Contrairement à une Promise qui émet une seule valeur, un Observable peut émettre zéro, une ou plusieurs valeurs. 
            Exemple: Une requête HTTP émet une valeur (la réponse), un websocket émet continuellement des messages. 
            Les Observables sont 'lazy' (paresseux): le code ne s'exécute que quand quelqu'un s'abonne avec subscribe().</li>
            <li><strong>pipe()</strong>: Méthode qui permet d'enchaîner plusieurs opérateurs RxJS pour transformer, filtrer ou gérer le flux de données. 
            Chaque opérateur dans le pipe reçoit les données, les transforme, et passe le résultat à l'opérateur suivant. 
            C'est comme une chaîne de production où chaque étape traite les données. Syntaxe: observable.pipe(op1(), op2(), op3()).</li>
            <li><strong>map()</strong>: Opérateur RxJS qui transforme chaque valeur émise par l'Observable. 
            Similaire à Array.map(), il prend une fonction de transformation et applique cette fonction à chaque émission. 
            Exemple: map(response => response.data) extrait la propriété 'data' de chaque réponse. 
            Très utile pour extraire des données spécifiques de réponses API complexes.</li>
            <li><strong>catchError()</strong>: Opérateur RxJS qui intercepte les erreurs dans le flux Observable. 
            Quand une erreur se produit, catchError() peut la gérer et retourner un Observable de remplacement (fallback). 
            Exemple: catchError(error => of([])) retourne un tableau vide en cas d'erreur au lieu de casser l'application. 
            Permet de gérer les erreurs de manière déclarative directement dans le flux.</li>
            <li><strong>finalize()</strong>: Opérateur RxJS qui exécute du code de nettoyage après que l'Observable se termine (avec succès ou erreur). 
            Similaire au bloc 'finally' en try/catch, il est toujours exécuté. 
            Parfait pour désactiver un indicateur de chargement: finalize(() => this.loading = false). 
            Garantit que le code de nettoyage s'exécute dans tous les cas.</li>
            <li><strong>subscribe()</strong>: Méthode qui active l'Observable et commence à écouter ses émissions. 
            Prend jusqu'à 3 callbacks: next (données), error (erreurs), complete (fin du flux). 
            subscribe() retourne un objet Subscription qui peut être utilisé pour unsubscribe() et annuler l'écoute. 
            C'est le point final du flux RxJS où vous recevez effectivement les données.</li>
            <li><strong>Subscription</strong>: Objet retourné par subscribe() représentant une exécution active d'un Observable. 
            Conservez cette référence pour pouvoir annuler l'écoute plus tard avec unsubscribe(). 
            Exemple: private sub = this.http.get().subscribe(...); puis dans ngOnDestroy: this.sub.unsubscribe(). 
            Essentiel pour éviter les fuites mémoire et les comportements inattendus.</li>
            <li><strong>unsubscribe()</strong>: Méthode appelée sur une Subscription pour annuler l'écoute et libérer les ressources. 
            CRITIQUE pour éviter les memory leaks: Sans unsubscribe(), le composant détruit continue d'écouter l'Observable. 
            Appelez toujours unsubscribe() dans ngOnDestroy(). Alternative moderne: utiliser l'opérateur takeUntil() avec un Subject. 
            Règle d'or: Si vous subscribe(), vous devez unsubscribe() (sauf pour les HTTP requests qui se completent automatiquement).</li>
          </ul>
          
          <h3>⚠️ Important: Memory Leaks</h3>
          <p>Sans unsubscribe(), votre composant continue d'écouter l'Observable même après sa destruction. 
          Cela cause des fuites mémoire (memory leaks) car l'ancien composant reste en mémoire. 
          Sur une Single Page Application, après plusieurs navigations, cela peut ralentir sérieusement l'application. 
          TOUJOURS implémenter ngOnDestroy() pour nettoyer vos subscriptions!</p>
          <p>Toujours nettoyer les subscriptions:</p>
          <pre><code>private subscription?: Subscription;

ngOnInit() &#123;
  this.subscription = this.service.getStandings()
    .subscribe(data =&gt; this.standings = data);
&#125;

ngOnDestroy() &#123;
  // CRITIQUE: évite les fuites mémoire
  this.subscription?.unsubscribe();
&#125;</code></pre>
        </div>
      </section>
      
      <!-- Summary -->
      <section class="summary">
        <h2>📋 Résumé des Concepts</h2>
        <table>
          <tr>
            <th>Concept</th>
            <th>Angular</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>Injection</td>
            <td>constructor()</td>
            <td>Injection de dépendances</td>
          </tr>
          <tr>
            <td>État</td>
            <td>properties</td>
            <td>Propriétés du composant</td>
          </tr>
          <tr>
            <td>HTTP</td>
            <td>HttpClient</td>
            <td>Appels API REST</td>
          </tr>
          <tr>
            <td>Async</td>
            <td>Observable</td>
            <td>Flux de données</td>
          </tr>
          <tr>
            <td>Conditions</td>
            <td>&#64;if/&#64;else</td>
            <td>Nouveau control flow</td>
          </tr>
          <tr>
            <td>Boucles</td>
            <td>&#64;for</td>
            <td>Nouveau control flow</td>
          </tr>
        </table>
      </section>
    </div>
  `,
  styles: [`
    .explanation-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .back-link {
      display: inline-block;
      margin-bottom: 1rem;
      color: #3b82f6;
      text-decoration: none;
    }
    
    h1 { 
      font-size: 2rem; 
      color: #1f2937;
      margin: 0;
    }
    
    .subtitle {
      color: #6b7280;
    }
    
    .step {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .step h2 {
      color: #1f2937;
      margin-top: 0;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 0.5rem;
    }
    
    .code-block {
      background: #1f2937;
      border-radius: 8px;
      padding: 1rem;
      overflow-x: auto;
      margin: 1rem 0;
    }
    
    .code-block code {
      color: #e5e7eb;
      font-family: 'Consolas', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
    }
    
    .explanation {
      background: #f0f9ff;
      border-left: 4px solid #3b82f6;
      padding: 1rem;
      border-radius: 0 8px 8px 0;
    }
    
    .explanation h3 {
      margin-top: 0;
      color: #1e40af;
    }
    
    .explanation ul {
      margin: 0;
      padding-left: 1.5rem;
    }
    
    .explanation li {
      margin: 0.5rem 0;
    }
    
    .summary {
      background: #f8fafc;
      border-radius: 12px;
      padding: 1.5rem;
    }
    
    .summary h2 {
      color: #1f2937;
      margin-top: 0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
    
    th {
      background: #f3f4f6;
      font-weight: 600;
    }
  `]
})
export class FootballExplanationComponent {}
