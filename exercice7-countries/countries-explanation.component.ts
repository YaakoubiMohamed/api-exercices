/**
 * ============================================================================
 * EXERCISE 7: COUNTRIES EXPLANATION COMPONENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries-explanation',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="explanation-container">
      <header>
        <a routerLink="/exercice7" class="back-link">← Retour à l'exercice</a>
        <h1>📚 Exercice 7 - Explication Détaillée</h1>
        <p class="subtitle">Comment rechercher des pays avec une API REST</p>
      </header>
      
      <!-- Step 1 -->
      <section class="step">
        <h2>🎯 Objectif de l'exercice</h2>
        <p>
          Créer une application Angular pour rechercher et afficher des informations 
          sur les pays du monde en utilisant l'API REST Countries.
        </p>
        <div class="api-info">
          <strong>API utilisée:</strong> REST Countries<br>
          <strong>URL de base:</strong> https://restcountries.com/v3.1<br>
          <strong>Authentification:</strong> ❌ Aucune clé API requise !
        </div>
      </section>
      
      <!-- Step 2 -->
      <section class="step">
        <h2>📁 Étape 1: Structure des fichiers</h2>
        <div class="code-block">
          <pre><code>exercice7-countries/
├── models/
│   └── country.model.ts       # Interfaces TypeScript
├── services/
│   └── country.service.ts     # Service HTTP
└── countries.component.ts     # Composant principal</code></pre>
        </div>
      </section>
      
      <!-- Step 3 -->
      <section class="step">
        <h2>📝 Étape 2: Créer les interfaces (Models)</h2>
        <div class="code-block">
          <pre><code>// country.model.ts
export interface Country &#123;
  name: &#123;
    common: string;      // Nom commun (ex: "France")
    official: string;    // Nom officiel
  &#125;;
  capital?: string[];    // Capitale(s) - optionnel
  population: number;    // Population
  region: string;        // Région (ex: "Europe")
  flags: &#123;
    png: string;         // URL du drapeau
    svg: string;
  &#125;;
  languages?: &#123;          // Langues (clés dynamiques)
    [key: string]: string;
  &#125;;
&#125;</code></pre>
        </div>
        <div class="explanation">
          <h3>🔑 Mots-clés TypeScript détaillés:</h3>
          <ul>
            <li><strong>?</strong> (propriété optionnelle): Indique qu'une propriété peut exister ou être undefined. 
            Exemple: capital?: string[] signifie que certains pays peuvent ne pas avoir de capitale dans les données API. 
            Vous devez vérifier son existence avant utilisation: country.capital?.[0] ou country.capital || 'N/A'. 
            Sans le '?', TypeScript générerait une erreur si la propriété est absente.</li>
            <li><strong>[key: string]: string</strong> (Index Signature): Définit un objet avec des clés dynamiques inconnus à l'avance. 
            Exemple pour languages: &#123; "fra": "French", "eng": "English" &#125; - les clés (fra, eng) varient selon le pays. 
            'key' peut être n'importe quelle chaîne, la valeur sera toujours un string. 
            Permet de modéliser des structures JSON flexibles où les noms de propriétés ne sont pas connus à l'avance.</li>
            <li><strong>string[]</strong> (tableau typé): Définit un tableau contenant uniquement des chaînes de caractères. 
            TypeScript vérifiera que vous n'ajoutez que des strings: capitals.push('Paris') ✅, capitals.push(123) ❌. 
            Vous bénéficiez de toutes les méthodes de tableau (map, filter, find) avec autocomplétion et vérification de types. 
            Alternative: Array&lt;string&gt; est équivalent mais string[] est plus concis.</li>
          </ul>
        </div>
      </section>
      
      <!-- Step 4 -->
      <section class="step">
        <h2>🔧 Étape 3: Créer le Service HTTP</h2>
        <div class="code-block">
          <pre><code>// country.service.ts
import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; HttpClient &#125; from '&#64;angular/common/http';
import &#123; Observable &#125; from 'rxjs';

&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class CountryService &#123;
  private readonly apiUrl = 'https://restcountries.com/v3.1';

  constructor(private readonly http: HttpClient) &#123;&#125;

  searchByName(name: string): Observable&lt;Country[]&gt; &#123;
    return this.http.get&lt;Country[]&gt;(
      &#96;$&#123;this.apiUrl&#125;/name/$&#123;name&#125;&#96;
    );
  &#125;

  getByRegion(region: string): Observable&lt;Country[]&gt; &#123;
    return this.http.get&lt;Country[]&gt;(
      &#96;$&#123;this.apiUrl&#125;/region/$&#123;region&#125;&#96;
    );
  &#125;
&#125;</code></pre>
        </div>
        <div class="explanation">
          <h3>🔑 Mots-clés détaillés:</h3>
          <ul>
            <li><strong>constructor()</strong>: Méthode d'initialisation automatiquement appelée par Angular lors de la création du service. 
            Avec 'private readonly http: HttpClient', Angular injecte automatiquement HttpClient et crée une propriété accessible via this.http. 
            'private' = encapsulation (visible uniquement dans le service), 'readonly' = immutabilité (empêche la réassignation). 
            C'est la méthode standard et recommandée pour l'injection de dépendances.</li>
            <li><strong>Observable&lt;T&gt;</strong>: Type générique représentant un flux de données asynchrones. 
            Le &lt;T&gt; spécifie le type des données émises: Observable&lt;Country[]&gt; émettra un tableau de pays. 
            Un Observable est 'cold' (lazy): le code ne s'exécute que lors du subscribe(). Peut émettre 0, 1 ou plusieurs valeurs. 
            Plus puissant qu'une Promise: supporte l'annulation (unsubscribe), les transformations (pipe), et les opérateurs complexes.</li>
            <li><strong>&#96;template literal&#96;</strong>: Syntaxe JavaScript moderne (ES6) pour créer des chaînes avec interpolation. 
            Utilise les backticks ` au lieu de quotes '. Permet d'insérer des variables avec $&#123;&#125;: &#96;Hello $&#123;name&#125;&#96;. 
            Très utile pour construire des URLs dynamiques: &#96;$&#123;this.apiUrl&#125;/users/$&#123;id&#125;&#96; est plus lisible que la concaténation. 
            Supporte aussi les chaînes multi-lignes sans \n.</li>
            <li><strong>http.get&lt;T&gt;()</strong>: Méthode HttpClient qui effectue une requête HTTP GET et retourne un Observable&lt;T&gt;. 
            Le paramètre générique &lt;T&gt; définit le type attendu de la réponse JSON. 
            Angular déserialize automatiquement le JSON en objet TypeScript: get&lt;User&gt;() convertit &#123;"name":"John"&#125; en objet User typé. 
            Vous bénéficiez ainsi de l'autocomplétion et de la vérification de types sur la réponse.</li>
          </ul>
        </div>
      </section>
      
      <!-- Step 5 -->
      <section class="step">
        <h2>🏠 Étape 4: Composant principal</h2>
        <div class="code-block">
          <pre><code>export class CountriesComponent &#123;
  
  constructor(private readonly countryService: CountryService) &#123;&#125;
  
  // State with regular properties
  countries: Country[] = [];
  loading: boolean = false;
  error: string | null = null;
  searchTerm = '';
  
  search(): void &#123;
    if (!this.searchTerm.trim()) return;
    
    this.loading = true;
    this.error = null;
    
    this.countryService.searchByName(this.searchTerm)
      .subscribe(&#123;
        next: (data) =&gt; &#123;
          this.countries = data;
          this.loading = false;
        &#125;,
        error: (err) =&gt; &#123;
          this.error = 'Pays non trouvé';
          this.countries = [];
          this.loading = false;
        &#125;
      &#125;);
  &#125;
&#125;</code></pre>
        </div>
        <div class="explanation">
          <h3>🔑 Mots-clés détaillés:</h3>
          <ul>
            <li><strong>constructor()</strong>: Point d'injection automatique des dépendances par Angular. 
            La syntaxe 'private readonly countryService: CountryService' fait 3 choses en une ligne: 
            1) Déclare le paramètre, 2) Crée une propriété de classe, 3) L'initialise avec l'instance injectée. 
            C'est un raccourci TypeScript très pratique qui évite d'écrire 'this.countryService = countryService;'.</li>
            <li><strong>property = value</strong>: Affectation directe qui remplace complètement la valeur d'une propriété. 
            Exemple: this.countries = data remplace tout le tableau. Angular détecte ce changement et met à jour automatiquement le template. 
            Avec les objets/tableaux, préférez créer une nouvelle référence (immutabilité) pour garantir la détection de changement: 
            this.countries = [...this.countries, newCountry] plutôt que this.countries.push(newCountry).</li>
            <li><strong>.subscribe()</strong>: Méthode qui active l'Observable et commence à écouter ses émissions. 
            Accepte un objet avec callbacks: next (succès), error (erreur), complete (fin). 
            Pour une requête HTTP, 'next' est appelé une fois avec la réponse, puis 'complete' automatiquement. 
            IMPORTANT: Conservez la Subscription retournée pour pouvoir unsubscribe() et éviter les memory leaks.</li>
            <li><strong>next:</strong>: Callback exécuté quand l'Observable émet une valeur avec succès. 
            C'est votre handler de succès, l'équivalent du .then() d'une Promise. 
            Vous recevez les données ici et mettez à jour l'état de votre composant: this.countries = data, this.loading = false. 
            Le nom 'next' vient de la notion d'itérateur: c'est la prochaine valeur dans le flux.</li>
            <li><strong>error:</strong>: Callback exécuté quand une erreur survient dans le flux Observable. 
            Reçoit l'objet d'erreur en paramètre (HttpErrorResponse pour les erreurs HTTP). 
            C'est ici que vous gérez les erreurs: afficher un message, logger pour le débogage, définir une valeur par défaut. 
            Après une erreur, l'Observable se termine (complete) automatiquement - aucune autre valeur ne sera émise.</li>
            <li><strong>.trim()</strong>: Méthode JavaScript qui supprime les espaces blancs (whitespace) en début et fin de chaîne. 
            Essentiel pour valider les inputs utilisateur: '  Paris  '.trim() devient 'Paris'. 
            Empìhe d'envoyer des requêtes API avec juste des espaces. Toujours valider avec .trim() avant traitement!</li>
          </ul>
        </div>
      </section>
      
      <!-- RxJS Section -->
      <section class="step">
        <h2>🔧 Étape 5b: RxJS Observables et Gestion Mémoire</h2>
        <div class="code-block">
          <pre><code>// Service retourne un Observable
searchByName(name: string): Observable&lt;Country[]&gt; &#123;
  return this.http.get&lt;Country[]&gt;(&#96;$&#123;this.apiUrl&#125;/name/$&#123;name&#125;&#96;);
&#125;

// Component avec nettoyage
export class CountriesComponent implements OnDestroy &#123;
  private subscription?: Subscription;
  
  search(): void &#123;
    // Nettoyer l'ancienne subscription si elle existe
    this.subscription?.unsubscribe();
    
    this.subscription = this.countryService.searchByName(this.searchTerm)
      .subscribe(&#123;
        next: (data) =&gt; &#123;
          this.countries = data;
          this.loading = false;
        &#125;,
        error: (err) =&gt; &#123;
          this.error = 'Pays non trouvé';
          this.loading = false;
        &#125;
      &#125;);
  &#125;
  
  ngOnDestroy(): void &#123;
    // IMPORTANT: Évite les memory leaks
    this.subscription?.unsubscribe();
  &#125;
&#125;</code></pre>
        </div>
        <div class="explanation">
          <h3>🔑 Concepts RxJS détaillés:</h3>
          <ul>
            <li><strong>Observable</strong>: Pattern de programmation réactive représentant un flux (stream) de données asynchrones dans le temps. 
            Contrairement aux Promises (1 valeur unique), les Observables peuvent émettre 0, 1 ou plusieurs valeurs. 
            Concepts clés: 
            - 'Cold' (lazy): Ne s'exécute que lors du subscribe() 
            - 'Hot': S'exécute indépendamment des subscriptions (ex: WebSockets) 
            - Composable: Peut être transformé avec des opérateurs (map, filter, merge, etc.) 
            - Annulable: unsubscribe() arrête l'émission et libère les ressources</li>
            <li><strong>subscribe()</strong>: Méthode qui 'démarre' l'Observable et établit une connexion pour recevoir les valeurs émises. 
            Avant subscribe(), l'Observable est inactif (cold). Après subscribe(), le code s'exécute. 
            Prend 3 callbacks optionnels: 
            - next(value): Appelé à chaque émission de valeur 
            - error(err): Appelé en cas d'erreur (termine le flux) 
            - complete(): Appelé quand le flux se termine normalement 
            Retourne une Subscription pour pouvoir unsubscribe() plus tard.</li>
            <li><strong>Subscription</strong>: Objet représentant une exécution active d'un Observable, retourné par subscribe(). 
            Stockez cette référence pour contrôler le cycle de vie: private sub?: Subscription. 
            Méthodes principales: 
            - unsubscribe(): Coupe la connexion et libère les ressources 
            - add(otherSub): Groupe plusieurs subscriptions pour unsubscribe en une fois 
            - closed: Booléen indiquant si la subscription est terminée 
            Toujours nettoyer dans ngOnDestroy() pour éviter les fuites mémoire!</li>
            <li><strong>unsubscribe()</strong>: Méthode CRITIQUE qui annule la subscription et libère toutes les ressources associées. 
            Pourquoi c'est important: 
            - Sans unsubscribe: Le callback continue de s'exécuter même après destruction du composant 
            - Conséquences: Memory leaks (fuite mémoire), comportements inattendus, ralentissements 
            - Sur une SPA, après 100 navigations, vous pourriez avoir 100 subscriptions actives! 
            Pattern recommandé: Toujours implémenter OnDestroy et unsubscribe dans ngOnDestroy(). 
            Alternative: Opérateur takeUntil() avec un Subject pour auto-unsubscribe.</li>
            <li><strong>next</strong>: Callback de succès appelé à chaque émission de valeur par l'Observable. 
            Pour une requête HTTP GET, 'next' est appelé exactement une fois avec les données de réponse. 
            C'est ici que vous mettez à jour l'état du composant: this.countries = data, this.loading = false. 
            Nom technique: 'Observer.next()' - partie du pattern Observer (Observable/Observer).</li>
            <li><strong>error</strong>: Callback d'erreur appelé quand une erreur survient dans le flux (réseau, serveur, timeout, etc.). 
            Reçoit un objet HttpErrorResponse pour les erreurs HTTP, contenant status, statusText, url, error. 
            Après l'appel d'error, le flux se termine automatiquement (complete) - plus d'émissions possibles. 
            Best practices: 
            - Toujours gérer les erreurs pour une bonne UX 
            - Logger pour le débogage: console.error(err) 
            - Afficher un message utilisateur clair 
            - Désactiver le loading: this.loading = false</li>
            <li><strong>complete</strong>: Callback optionnel appelé quand l'Observable se termine normalement (pas d'erreur). 
            Pour les requêtes HTTP, 'complete' est appelé automatiquement après 'next'. 
            Utile pour les Observables qui émettent plusieurs valeurs (WebSocket, interval, etc.). 
            Indique qu'aucune autre valeur ne sera émise. Après complete, la Subscription est automatiquement nettoyée.</li>
          </ul>
          
          <h3>⚠️ Pourquoi unsubscribe() est CRUCIAL ?</h3>
          <ul>
            <li>❌ <strong>Sans unsubscribe</strong>: La subscription reste active indéfiniment, même après que le composant soit détruit et supprimé de l'écran. 
            Le composant 'détruit' reste en mémoire à cause de la référence dans la subscription. 
            Scénario: L'utilisateur navigue 50 fois → 50 composants détruits mais 50 subscriptions actives → Ralentissement sévère!</li>
            <li>❌ <strong>Comportements inattendus</strong>: Les callbacks (next, error) continuent de s'exécuter sur un composant détruit. 
            Cela peut causer des erreurs: Tentative de modifier une propriété d'un composant qui n'existe plus dans le DOM. 
            Les effets de bord (side effects) continuent: Requêtes réseau, mise à jour de cache, etc.</li>
            <li>✅ <strong>Avec unsubscribe dans ngOnDestroy</strong>: Nettoyage propre et automatique des ressources. 
            Dès que le composant est détruit, la subscription est annulée, libérant la mémoire. 
            Garantit que votre application reste rapide et sans fuites mémoire même après des heures d'utilisation.</li>
            <li>💡 <strong>Best practice universelle</strong>: Si vous appelez subscribe() manuellement, vous DEVEZ appeler unsubscribe(). 
            Exception: Les Observables HTTP (get, post, etc.) se 'complete' automatiquement après la réponse, mais mieux vaut unsubscribe par sécurité. 
            Pour les Observables infinis (WebSocket, interval, fromEvent), unsubscribe() est OBLIGATOIRE.</li>
          </ul>
        </div>
      </section>
      
      <!-- Step 6 -->
      <section class="step">
        <h2>📄 Étape 6: Template</h2>
        <div class="code-block">
          <pre><code ngNonBindable>&lt;input 
  type="text" 
  [(ngModel)]="searchTerm"
  placeholder="Rechercher un pays..."
  (keyup.enter)="search()"
/&gt;
&lt;button (click)="search()"&gt;Rechercher&lt;/button&gt;

&#64;if (loading) &#123;
  &lt;p&gt;⏳ Chargement...&lt;/p&gt;
&#125;

&#64;if (error) &#123;
  &lt;p class="error"&gt;❌ {{ error }}&lt;/p&gt;
&#125;

&lt;div class="grid"&gt;
  &#64;for (country of countries; track country.name.common) &#123;
    &lt;div class="card"&gt;
      &lt;img [src]="country.flags.png" [alt]="country.name.common" /&gt;
      &lt;h3&gt;{{ country.name.common }}&lt;/h3&gt;
      &lt;p&gt;🏛️ {{ country.capital?.[0] || 'N/A' }}&lt;/p&gt;
      &lt;p&gt;👥 {{ country.population | number }}&lt;/p&gt;
    &lt;/div&gt;
  &#125;
&lt;/div&gt;</code></pre>
        </div>
        <div class="explanation">
          <h3>🔑 Mots-clés détaillés:</h3>
          <ul>
            <li><strong>[(ngModel)]</strong>: Two-way data binding (liaison bidirectionnelle) - synchro automatique entre template et composant. 
            Les crochets [( )] combinent property binding [ ] (composant → template) et event binding ( ) (template → composant). 
            Quand l'utilisateur tape dans l'input, searchTerm se met à jour; si vous changez searchTerm dans le code, l'input se met à jour. 
            Nécessite FormsModule pour fonctionner. Alternative moderne: utiliser [value] + (input) séparément.</li>
            <li><strong>(keyup.enter)</strong>: Event binding pour écouter la touche Entrée spécifiquement. 
            Syntaxe: (event.modifier) où event=keyup, modifier=enter. Autres exemples: (keyup.escape), (keydown.shift.a). 
            Permet de déclencher la recherche quand l'utilisateur appuie sur Entrée dans l'input, améliorant l'UX. 
            Plus simple que de vérifier event.key === 'Enter' manuellement.</li>
            <li><strong>[src]</strong>: Property binding pour lier dynamiquement un attribut HTML à une expression TypeScript. 
            Les crochets [ ] indiquent à Angular d'évaluer l'expression: [src]="country.flags.png" charge l'URL dynamiquement. 
            Sans crochets, src="country.flags.png" serait interprété comme une chaîne litérale. 
            Fonctionne avec tous les attributs HTML: [href], [disabled], [class], [style], etc.</li>
            <li><strong>@for ... track</strong>: Nouvelle syntaxe de boucle Angular 17+ pour itérer sur des collections. 
            'track' est obligatoire et définit l'identifiant unique de chaque élément (ex: track country.name.common). 
            Angular utilise track pour optimiser: quand les données changent, seuls les éléments modifiés sont ré-rendus. 
            Sans track, Angular recréerait tous les éléments à chaque changement, dégradant les performances sur grandes listes.</li>
            <li><strong>?.[0]</strong>: Optional chaining - accès sécurisé à une propriété qui peut ne pas exister. 
            country.capital?.[0] retourne la première capitale si capital existe, undefined sinon (pas d'erreur). 
            Sans '?', accéder à undefined[0] génèrerait 'Cannot read property 0 of undefined'. 
            Peut être combiné avec || pour valeur par défaut: country.capital?.[0] || 'N/A'.</li>
            <li><strong>| number</strong>: Pipe de transformation Angular qui formate les nombres selon la locale. 
            Ajoute automatiquement les séparateurs de milliers: 1000000 devient '1,000,000' (en-US) ou '1 000 000' (fr-FR). 
            Paramétrable: | number:'1.2-2' affiche toujours 2 décimales. 
            Autres pipes utiles: | date, | currency, | percent, | uppercase. Chainables: value | number | currency.</li>
          </ul>
        </div>
      </section>
      
      <!-- Summary -->
      <section class="summary">
        <h2>📋 Résumé des Concepts</h2>
        <table>
          <tr>
            <th>Concept</th>
            <th>Utilisé pour</th>
          </tr>
          <tr>
            <td>constructor()</td>
            <td>Injection de dépendances</td>
          </tr>
          <tr>
            <td>properties</td>
            <td>Gestion d'état</td>
          </tr>
          <tr>
            <td>Observable + subscribe()</td>
            <td>Appels API asynchrones</td>
          </tr>
          <tr>
            <td>[(ngModel)]</td>
            <td>Two-way data binding</td>
          </tr>
          <tr>
            <td>&#64;if / &#64;for</td>
            <td>Control flow moderne</td>
          </tr>
          <tr>
            <td>Pipe number</td>
            <td>Formatage des nombres</td>
          </tr>
        </table>
      </section>
      
      <!-- Checklist -->
      <section class="checklist">
        <h2>✅ Points de vérification</h2>
        <h3>Avant de commencer:</h3>
        <ul>
          <li>☐ HttpClient configuré dans app.config.ts?</li>
          <li>☐ FormsModule importé dans le composant?</li>
        </ul>
        
        <h3>Tests:</h3>
        <ul>
          <li>☐ Recherche "France" → affiche la France</li>
          <li>☐ Recherche "xyzabc" → affiche erreur</li>
          <li>☐ Filtre par région fonctionne</li>
          <li>☐ Loading s'affiche pendant la requête</li>
        </ul>
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
      border-bottom: 2px solid #38a169;
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
      background: #f0fff4;
      border-left: 4px solid #38a169;
      padding: 1rem;
      border-radius: 0 8px 8px 0;
      margin-top: 1rem;
    }
    
    .explanation h3 {
      margin-top: 0;
      color: #276749;
    }
    
    .explanation ul {
      margin: 0;
      padding-left: 1.5rem;
    }
    
    .explanation li {
      margin: 0.5rem 0;
    }
    
    .api-info {
      background: #f0fff4;
      border: 2px solid #38a169;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
    }
    
    .summary {
      background: #fffaf0;
      border-radius: 12px;
      padding: 1.5rem;
      margin-top: 2rem;
    }
    
    .summary h2 {
      color: #1f2937;
      margin-top: 0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
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
    
    .checklist {
      background: #f0f9ff;
      border-radius: 12px;
      padding: 1.5rem;
      margin-top: 2rem;
    }
    
    .checklist h2 {
      color: #1f2937;
      margin-top: 0;
    }
    
    .checklist h3 {
      color: #374151;
      margin-top: 1rem;
    }
    
    .checklist ul {
      margin: 0.5rem 0;
    }
  `]
})
export class CountriesExplanationComponent {}
