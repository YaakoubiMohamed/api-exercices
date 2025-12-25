/**
 * ============================================================================
 * EXERCISE 5: FOOTBALL DATA - VISUAL EXPLANATION
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-football-explanation-visual',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="explanation-container">
      <header class="explanation-header">
        <h1>⚽ Exercice 5 : Football Data - Explication Visuelle</h1>
        <a routerLink="/exercice5" class="back-link">← Retour à l'exercice</a>
      </header>

      <!-- Step Navigator -->
      <nav class="step-navigator">
        @for (step of steps; track step.id) {
          <button 
            class="step-btn"
            [class.active]="currentStep() === step.id"
            (click)="goToStep(step.id)">
            &#123;&#123; step.icon &#125;&#125; &#123;&#123; step.title &#125;&#125;
          </button>
        }
      </nav>

      <!-- Content Area -->
      <div class="content-area">
        
        <!-- Step 1: HTTP Flow -->
        @if (currentStep() === 1) {
          <section class="step-content fade-in">
            <h2>🌐 Flux de Requête HTTP avec Authentification</h2>
            
            <div class="visual-diagram">
              <svg viewBox="0 0 900 500" class="http-flow">
                <!-- Component -->
                <g class="flow-box animate-pulse-1">
                  <rect x="50" y="50" width="180" height="80" rx="10" fill="#4CAF50"/>
                  <text x="140" y="85" text-anchor="middle" fill="white" font-weight="bold">Component</text>
                  <text x="140" y="105" text-anchor="middle" fill="white" font-size="12">football.component</text>
                </g>
                
                <!-- Arrow 1 -->
                <g class="arrow animate-slide-right-1">
                  <line x1="230" y1="90" x2="320" y2="90" stroke="#333" stroke-width="3" marker-end="url(#arrowhead)"/>
                  <text x="275" y="80" text-anchor="middle" fill="#333" font-size="12">getStandings()</text>
                </g>
                
                <!-- Service -->
                <g class="flow-box animate-pulse-2">
                  <rect x="320" y="50" width="180" height="80" rx="10" fill="#2196F3"/>
                  <text x="410" y="85" text-anchor="middle" fill="white" font-weight="bold">Service</text>
                  <text x="410" y="105" text-anchor="middle" fill="white" font-size="11">FootballService</text>
                </g>
                
                <!-- Auth Header -->
                <g class="auth-box animate-pulse-3">
                  <rect x="280" y="150" width="260" height="60" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
                  <text x="410" y="175" text-anchor="middle" fill="#E65100" font-weight="bold" font-size="12">🔑 Headers</text>
                  <text x="410" y="195" text-anchor="middle" fill="#333" font-size="11">X-Auth-Token: YOUR_API_KEY</text>
                </g>
                
                <!-- Arrow 2 -->
                <g class="arrow animate-slide-right-2">
                  <line x1="500" y1="90" x2="590" y2="90" stroke="#333" stroke-width="3" marker-end="url(#arrowhead)"/>
                  <text x="545" y="80" text-anchor="middle" fill="#333" font-size="12">HTTP GET</text>
                </g>
                
                <!-- API -->
                <g class="flow-box animate-pulse-4">
                  <rect x="590" y="50" width="180" height="80" rx="10" fill="#FF5722"/>
                  <text x="680" y="80" text-anchor="middle" fill="white" font-weight="bold">API</text>
                  <text x="680" y="100" text-anchor="middle" fill="white" font-size="10">football-data.org</text>
                </g>
                
                <!-- Response Arrow -->
                <g class="arrow animate-slide-down">
                  <line x1="680" y1="130" x2="680" y2="240" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrowhead-green)"/>
                  <text x="700" y="185" fill="#4CAF50" font-size="12" font-weight="bold">JSON Response</text>
                </g>
                
                <!-- Observable -->
                <g class="flow-box animate-pulse-5">
                  <rect x="590" y="240" width="180" height="80" rx="10" fill="#9C27B0"/>
                  <text x="680" y="270" text-anchor="middle" fill="white" font-weight="bold">Observable</text>
                  <text x="680" y="290" text-anchor="middle" fill="white" font-size="11">Flux asynchrone</text>
                </g>
                
                <!-- Arrow back -->
                <g class="arrow animate-slide-left">
                  <line x1="590" y1="280" x2="230" y2="280" stroke="#9C27B0" stroke-width="3" marker-end="url(#arrowhead-purple)"/>
                  <text x="410" y="270" text-anchor="middle" fill="#9C27B0" font-size="12">subscribe()</text>
                </g>
                
                <!-- Updated Component -->
                <g class="flow-box animate-pulse-6">
                  <rect x="50" y="240" width="180" height="80" rx="10" fill="#4CAF50" stroke="#FFD700" stroke-width="4"/>
                  <text x="140" y="270" text-anchor="middle" fill="white" font-weight="bold">Component</text>
                  <text x="140" y="290" text-anchor="middle" fill="white" font-size="11">✅ Données reçues</text>
                  <text x="140" y="305" text-anchor="middle" fill="white" font-size="10">standings.set(data)</text>
                </g>
                
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#333" />
                  </marker>
                  <marker id="arrowhead-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#4CAF50" />
                  </marker>
                  <marker id="arrowhead-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#9C27B0" />
                  </marker>
                </defs>
              </svg>
            </div>

            <div class="info-box">
              <h3>🔑 Points Clés</h3>
              <ul>
                <li><strong>HttpHeaders</strong> : Ajouter l'authentification API</li>
                <li><strong>Observable</strong> : Flux de données asynchrone</li>
                <li><strong>subscribe()</strong> : Récupérer les données</li>
                <li><strong>properties</strong> : Gestion d'état du composant</li>
              </ul>
            </div>
          </section>
        }

        <!-- Step 2: Service with Authentication -->
        @if (currentStep() === 2) {
          <section class="step-content fade-in">
            <h2>🔐 Service avec Authentification</h2>
            
            <div class="code-explanation">

              <div class="code-line" (click)="toggleExplanation(2)" [class.active]="activeExplanation() === 2">
                <div class="line-number">2</div>
                <code>import &#123; HttpClient, HttpHeaders &#125; from '@angular/common/http';</code>
                @if (activeExplanation() === 2) {
                  <div class="explanation-popup">
                    <strong>HttpClient</strong> : Service pour les requêtes HTTP<br>
                    <strong>HttpHeaders</strong> : Configuration des en-têtes (auth, content-type)
                  </div>
                }
              </div>

              <div class="code-line" (click)="toggleExplanation(3)" [class.active]="activeExplanation() === 3">
                <div class="line-number">4</div>
                <code>constructor(private readonly http: HttpClient) &#123;&#125;</code>
                @if (activeExplanation() === 3) &#123;
                  <div class="explanation-popup">
                    <strong>private</strong> : Accessible uniquement dans cette classe<br>
                    <strong>readonly</strong> : Ne peut pas être réassigné<br>
                    <strong>constructor</strong> : Injection via constructeur
                  </div>
                }
              </div>

              <div class="code-line" (click)="toggleExplanation(4)" [class.active]="activeExplanation() === 4">
                <div class="line-number">5</div>
                <code>private readonly apiKey = 'YOUR_API_KEY';</code>
                @if (activeExplanation() === 4) {
                  <div class="explanation-popup">
                    Stocke la clé API. En production, utiliser les <strong>environment variables</strong>
                    pour la sécurité.
                  </div>
                }
              </div>

              <div class="code-line" (click)="toggleExplanation(5)" [class.active]="activeExplanation() === 5">
                <div class="line-number">8</div>
                <code>const headers = new HttpHeaders(&#123;</code>
                @if (activeExplanation() === 5) {
                  <div class="explanation-popup">
                    <strong>HttpHeaders</strong> : Crée un objet d'en-têtes HTTP pour l'authentification.
                  </div>
                }
              </div>

              <div class="code-line" (click)="toggleExplanation(6)" [class.active]="activeExplanation() === 6">
                <div class="line-number">9</div>
                <code>  'X-Auth-Token': this.apiKey</code>
                @if (activeExplanation() === 6) {
                  <div class="explanation-popup">
                    <strong>X-Auth-Token</strong> : Header spécifique à l'API Football Data.
                    Chaque API a son propre format d'authentification.
                  </div>
                }
              </div>

              <div class="code-line" (click)="toggleExplanation(7)" [class.active]="activeExplanation() === 7">
                <div class="line-number">12</div>
                <code>return this.http.get&lt;Response&gt;(url, &#123; headers &#125;);</code>
                @if (activeExplanation() === 7) {
                  <div class="explanation-popup">
                    <strong>get&lt;Response&gt;()</strong> : Requête GET typée<br>
                    <strong>&#123; headers &#125;</strong> : Passe les headers à la requête<br>
                    Retourne un <strong>Observable&lt;Response&gt;</strong>
                  </div>
                }
              </div>
            </div>

            <div class="code-block">
              <h4>Code Complet du Service</h4>
              <pre><code>export class FootballService &#123;
  private readonly apiKey = 'YOUR_API_KEY';
  private readonly baseUrl = 'https://api.football-data.org/v4';

  constructor(private readonly http: HttpClient) &#123;&#125;

  getStandings(competitionId: number): Observable&lt;StandingsResponse&gt; &#123;
    const headers = new HttpHeaders(&#123;
      'X-Auth-Token': this.apiKey
    &#125;);
    
    const url = &#96;$&#123;this.baseUrl&#125;/competitions/$&#123;competitionId&#125;/standings&#96;;
    return this.http.get&lt;StandingsResponse&gt;(url, &#123; headers &#125;);
  &#125;
&#125;</code></pre>
            </div>

            <div class="info-box">
              <h3>💡 Astuce</h3>
              <p>Cliquez sur chaque ligne pour voir l'explication détaillée !</p>
            </div>
          </section>
        }

        <!-- Step 3: Component with Properties -->
        @if (currentStep() === 3) &#123;
          <section class="step-content fade-in">
            <h2>⚡ Component avec Propriétés</h2>
            
            <div class="visual-diagram">
              <svg viewBox="0 0 800 450" class="component-diagram">
                <!-- Service Injection -->
                <g class="box animate-pulse-1">
                  <rect x="50" y="50" width="200" height="70" rx="10" fill="#2196F3"/>
                  <text x="150" y="80" text-anchor="middle" fill="white" font-weight="bold">Service Injection</text>
                  <text x="150" y="100" text-anchor="middle" fill="white" font-size="11">constructor(service)</text>
                </g>
                
                <!-- Property Declaration -->
                <g class="box animate-pulse-2">
                  <rect x="300" y="50" width="200" height="70" rx="10" fill="#9C27B0"/>
                  <text x="400" y="80" text-anchor="middle" fill="white" font-weight="bold">Property Declaration</text>
                  <text x="400" y="100" text-anchor="middle" fill="white" font-size="11">standings: Standing[] = []</text>
                </g>
                
                <!-- Subscribe -->
                <g class="box animate-pulse-3">
                  <rect x="550" y="50" width="200" height="70" rx="10" fill="#FF9800"/>
                  <text x="650" y="80" text-anchor="middle" fill="white" font-weight="bold">Subscribe</text>
                  <text x="650" y="100" text-anchor="middle" fill="white" font-size="11">.subscribe(data =&gt; ...)</text>
                </g>
                
                <!-- Arrow Flow -->
                <line x1="150" y1="120" x2="150" y2="180" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-down)" class="animate-draw"/>
                <line x1="400" y1="120" x2="400" y2="180" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-down)" class="animate-draw"/>
                <line x1="650" y1="120" x2="650" y2="180" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-down)" class="animate-draw"/>
                
                <!-- Load Method -->
                <g class="method-box animate-pulse-4">
                  <rect x="150" y="180" width="500" height="100" rx="10" fill="#E8F5E9" stroke="#4CAF50" stroke-width="3"/>
                  <text x="400" y="210" text-anchor="middle" fill="#2E7D32" font-weight="bold" font-size="15">loadStandings() Method</text>
                  <text x="170" y="240" fill="#333" font-size="13" font-family="monospace">this.service.getStandings(id)</text>
                  <text x="180" y="260" fill="#333" font-size="13" font-family="monospace">.subscribe(response =&gt; &#123;</text>
                  <text x="200" y="275" fill="#333" font-size="13" font-family="monospace">this.standings.set(response.standings);</text>
                </g>
                
                <!-- Arrow to Template -->
                <line x1="400" y1="280" x2="400" y2="340" stroke="#9C27B0" stroke-width="3" marker-end="url(#arrow-purple-down)" class="animate-draw-final"/>
                <text x="420" y="310" fill="#9C27B0" font-weight="bold">Auto Update</text>
                
                <!-- Template -->
                <g class="template-box animate-pulse-5">
                  <rect x="150" y="340" width="500" height="80" rx="10" fill="#F3E5F5" stroke="#9C27B0" stroke-width="3"/>
                  <text x="400" y="370" text-anchor="middle" fill="#7B1FA2" font-weight="bold">Template (Vue)</text>
                  <text x="400" y="395" text-anchor="middle" fill="#333" font-size="12">&#64;for (team of standings(); track team.position)</text>
                </g>
                
                <defs>
                  <marker id="arrow-down" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#4CAF50" />
                  </marker>
                  <marker id="arrow-purple-down" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#9C27B0" />
                  </marker>
                </defs>
              </svg>
            </div>

            <div class="code-block">
              <h4>Code du Component</h4>
              <pre><code>export class FootballComponent &#123;
  
  constructor(private readonly footballService: FootballService) &#123;&#125;
  
  standings: Standing[] = [];
  loading: boolean = false;

  loadStandings(competitionId: number) &#123;
    this.loading = true;
    
    this.footballService.getStandings(competitionId)
      .subscribe(&#123;
        next: (response) => &#123;
          this.standings = response.standings&#91;0&#93;.table;
          this.loading = false;
        &#125;,
        error: (err) => &#123;
          console.error(err);
          this.loading = false;
        &#125;
      &#125;);
  &#125;
&#125;</code></pre>
            </div>

            <div class="info-box">
              <h3>✨ Avantages des Propriétés</h3>
              <ul>
                <li>✅ <strong>Réactivité automatique</strong> : Le template se met à jour seul</li>
                <li>✅ <strong>Performance</strong> : Change detection optimisée</li>
                <li>✅ <strong>Simplicité</strong> : Pas besoin de ChangeDetectorRef</li>
                <li>✅ <strong>Type-safe</strong> : TypeScript vérifie les types</li>
              </ul>
            </div>
          </section>
        }

      </div>

      <!-- Navigation -->
      <div class="navigation-buttons">
        @if (currentStep() > 1) {
          <button class="nav-btn prev" (click)="previousStep()">← Précédent</button>
        }
        @if (currentStep() < steps.length) {
          <button class="nav-btn next" (click)="nextStep()">Suivant →</button>
        }
      </div>
    </div>
  `,
    styles: [`
    .explanation-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', sans-serif;
    }

    .explanation-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 15px;
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .explanation-header h1 {
      margin: 0 0 15px 0;
      font-size: 2rem;
    }

    .back-link {
      color: white;
      text-decoration: none;
      transition: opacity 0.3s;
      font-size: 0.9rem;
    }

    .back-link:hover { opacity: 0.8; }

    .step-navigator {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .step-btn {
      padding: 12px 20px;
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.9rem;
    }

    .step-btn:hover {
      border-color: #667eea;
      transform: translateY(-2px);
    }

    .step-btn.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: #667eea;
      font-weight: bold;
    }

    .content-area {
      background: white;
      border-radius: 15px;
      padding: 40px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      min-height: 500px;
    }

    .step-content h2 {
      color: #333;
      margin-bottom: 30px;
      font-size: 1.8rem;
      border-bottom: 3px solid #667eea;
      padding-bottom: 10px;
    }

    .visual-diagram {
      margin: 30px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
    }

    .visual-diagram svg {
      width: 100%;
      height: auto;
    }

    /* Animations */
    .fade-in {
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-pulse-1 { animation: pulse 2s ease-in-out 0.2s infinite; }
    .animate-pulse-2 { animation: pulse 2s ease-in-out 0.4s infinite; }
    .animate-pulse-3 { animation: pulse 2s ease-in-out 0.6s infinite; }
    .animate-pulse-4 { animation: pulse 2s ease-in-out 0.8s infinite; }
    .animate-pulse-5 { animation: pulse 2s ease-in-out 1s infinite; }
    .animate-pulse-6 { animation: pulse 2s ease-in-out 1.2s infinite; }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .animate-slide-right-1 { animation: slideRight 0.8s ease-out 1s both; }
    .animate-slide-right-2 { animation: slideRight 0.8s ease-out 2s both; }

    @keyframes slideRight {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .animate-slide-down {
      animation: slideDown 0.8s ease-out 3s both;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-50px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-slide-left {
      animation: slideLeft 0.8s ease-out 4s both;
    }

    @keyframes slideLeft {
      from { opacity: 0; transform: translateX(50px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .animate-draw {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: draw 0.8s ease-out 1s forwards;
    }

    .animate-draw-final {
      stroke-dasharray: 80;
      stroke-dashoffset: 80;
      animation: draw 0.6s ease-out 2s forwards;
    }

    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }

    .info-box {
      background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
      border-left: 4px solid #667eea;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }

    .info-box h3 {
      margin-top: 0;
      color: #667eea;
    }

    .info-box ul {
      margin: 10px 0;
      padding-left: 25px;
    }

    .info-box li {
      margin: 8px 0;
      line-height: 1.6;
    }

    .code-explanation {
      background: #1e1e1e;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
    }

    .code-line {
      display: flex;
      align-items: flex-start;
      padding: 10px;
      margin: 5px 0;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
    }

    .code-line:hover { background: #2d2d2d; }
    .code-line.active { background: #264f78; }

    .line-number {
      color: #858585;
      margin-right: 20px;
      min-width: 30px;
      text-align: right;
      font-family: 'Courier New', monospace;
    }

    .code-line code {
      color: #d4d4d4;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      flex: 1;
    }

    .explanation-popup {
      position: absolute;
      left: 100%;
      top: 0;
      margin-left: 20px;
      background: #fff;
      color: #333;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.3);
      width: 350px;
      z-index: 1000;
      animation: popIn 0.3s ease-out;
      border: 2px solid #667eea;
    }

    @keyframes popIn {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .explanation-popup strong {
      color: #667eea;
    }

    .code-block {
      background: #1e1e1e;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
    }

    .code-block h4 {
      color: #4CAF50;
      margin-top: 0;
      margin-bottom: 15px;
    }

    .code-block pre {
      margin: 0;
    }

    .code-block code {
      color: #d4d4d4;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.6;
    }

    .navigation-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      gap: 20px;
    }

    .nav-btn {
      padding: 15px 30px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 600;
    }

    .nav-btn.prev {
      background: #e0e0e0;
      color: #333;
    }

    .nav-btn.next {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin-left: auto;
    }

    .nav-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    @media (max-width: 768px) {
      .explanation-popup {
        position: static;
        margin: 10px 0 0 50px;
        width: auto;
      }
    }
  `]
})
export class FootballExplanationVisualComponent {
    currentStep = signal(1);
    activeExplanation = signal<number | null>(null);

    steps = [
        { id: 1, title: 'Flux HTTP', icon: '🌐' },
        { id: 2, title: 'Service Auth', icon: '🔐' },
        { id: 3, title: 'Component Properties', icon: '⚡' }
    ];

    goToStep(step: number) {
        this.currentStep.set(step);
        this.activeExplanation.set(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    nextStep() {
        if (this.currentStep() < this.steps.length) {
            this.currentStep.update(s => s + 1);
            this.activeExplanation.set(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    previousStep() {
        if (this.currentStep() > 1) {
            this.currentStep.update(s => s - 1);
            this.activeExplanation.set(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    toggleExplanation(line: number) {
        this.activeExplanation.update(current => current === line ? null : line);
    }
}
