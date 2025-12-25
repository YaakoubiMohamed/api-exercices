/**
 * ============================================================================
 * EXERCISE 7: COUNTRIES - VISUAL EXPLANATION
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries-explanation-visual',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="explanation-container">
      <header class="explanation-header">
        <h1>🌍 Exercice 7 : Country Explorer - Explication Visuelle</h1>
        <a routerLink="/exercice7" class="back-link">← Retour à l'exercice</a>
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
        
        <!-- Step 1: API Structure -->
        @if (currentStep() === 1) {
          <section class="step-content fade-in">
            <h2>🏗️ Structure de l'API REST Countries</h2>
            
            <div class="visual-diagram">
              <svg viewBox="0 0 800 500" class="api-diagram">
                <!-- Base URL -->
                <g class="api-element animate-pulse-1">
                  <rect x="50" y="50" width="700" height="60" rx="10" fill="#3F51B5"/>
                  <text x="400" y="90" text-anchor="middle" fill="white" font-size="18" font-weight="bold">
                    https://restcountries.com/v3.1
                  </text>
                </g>
                
                <!-- Endpoints -->
                <g class="endpoint animate-slide-1" transform="translate(0, 120)">
                  <rect x="50" y="50" width="200" height="70" rx="8" fill="#4CAF50"/>
                  <text x="150" y="80" text-anchor="middle" fill="white" font-weight="bold">/all</text>
                  <text x="150" y="100" text-anchor="middle" fill="white" font-size="12">Tous les pays</text>
                </g>
                
                <g class="endpoint animate-slide-2" transform="translate(0, 120)">
                  <rect x="300" y="50" width="200" height="70" rx="8" fill="#FF9800"/>
                  <text x="400" y="80" text-anchor="middle" fill="white" font-weight="bold">/name/:name</text>
                  <text x="400" y="100" text-anchor="middle" fill="white" font-size="12">Par nom</text>
                </g>
                
                <g class="endpoint animate-slide-3" transform="translate(0, 120)">
                  <rect x="550" y="50" width="200" height="70" rx="8" fill="#9C27B0"/>
                  <text x="650" y="80" text-anchor="middle" fill="white" font-weight="bold">/region/:region</text>
                  <text x="650" y="100" text-anchor="middle" fill="white" font-size="12">Par région</text>
                </g>
                
                <!-- Response -->
                <g class="response-box animate-pulse-2" transform="translate(0, 270)">
                  <rect x="200" y="50" width="400" height="130" rx="10" fill="#E8F5E9" stroke="#4CAF50" stroke-width="3"/>
                  <text x="400" y="80" text-anchor="middle" fill="#2E7D32" font-weight="bold" font-size="16">
                    📦 Réponse JSON
                  </text>
                  <text x="400" y="110" text-anchor="middle" fill="#333" font-size="13" font-family="monospace">
                    [&#123; name: &#123; common: "France" &#125;,
                  </text>
                  <text x="400" y="135" text-anchor="middle" fill="#333" font-size="13" font-family="monospace">
                    population: 67391582,
                  </text>
                  <text x="400" y="160" text-anchor="middle" fill="#333" font-size="13" font-family="monospace">
                    flags: &#123; png: "url..." &#125; &#125;]
                  </text>
                </g>
                
                <!-- Arrows -->
                <line x1="150" y1="190" x2="350" y2="320" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-green)" class="animate-draw"/>
                <line x1="400" y1="190" x2="400" y2="320" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow-orange)" class="animate-draw"/>
                <line x1="650" y1="190" x2="450" y2="320" stroke="#9C27B0" stroke-width="2" marker-end="url(#arrow-purple)" class="animate-draw"/>
                
                <defs>
                  <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#4CAF50" />
                  </marker>
                  <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#FF9800" />
                  </marker>
                  <marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#9C27B0" />
                  </marker>
                </defs>
              </svg>
            </div>

            <div class="info-box">
              <h3>✨ Caractéristiques</h3>
              <ul>
                <li>✅ <strong>Gratuit</strong> : Aucune clé API requise</li>
                <li>✅ <strong>Simple</strong> : Pas d'authentification</li>
                <li>✅ <strong>Riche</strong> : Données complètes sur 250+ pays</li>
              </ul>
            </div>
          </section>
        }

        <!-- Step 2: Search Implementation -->
        @if (currentStep() === 2) {
          <section class="step-content fade-in">
            <h2>🔍 Implémentation de la Recherche</h2>
            
            <div class="visual-diagram">
              <svg viewBox="0 0 800 400" class="search-flow">
                <!-- Input -->
                <g class="flow-element animate-pulse-1">
                  <rect x="50" y="50" width="150" height="80" rx="10" fill="#2196F3"/>
                  <text x="125" y="85" text-anchor="middle" fill="white" font-weight="bold">Input</text>
                  <text x="125" y="105" text-anchor="middle" fill="white" font-size="12">searchTerm</text>
                </g>
                
                <!-- Button Click -->
                <g class="flow-element animate-pulse-2">
                  <rect x="250" y="50" width="150" height="80" rx="10" fill="#FF9800"/>
                  <text x="325" y="85" text-anchor="middle" fill="white" font-weight="bold">Button</text>
                  <text x="325" y="105" text-anchor="middle" fill="white" font-size="12">(click)="search()"</text>
                </g>
                
                <!-- Arrow 1 -->
                <line x1="200" y1="90" x2="250" y2="90" stroke="#333" stroke-width="2" marker-end="url(#arrow-black)" class="animate-draw"/>
                
                <!-- Service Call -->
                <g class="flow-element animate-pulse-3">
                  <rect x="450" y="50" width="180" height="80" rx="10" fill="#9C27B0"/>
                  <text x="540" y="80" text-anchor="middle" fill="white" font-weight="bold">Service</text>
                  <text x="540" y="100" text-anchor="middle" fill="white" font-size="11">searchByName()</text>
                </g>
                
                <!-- Arrow 2 -->
                <line x1="400" y1="90" x2="450" y2="90" stroke="#333" stroke-width="2" marker-end="url(#arrow-black)" class="animate-draw"/>
                
                <!-- Loading State -->
                <g class="state-box animate-pulse-4">
                  <rect x="250" y="180" width="150" height="60" rx="8" fill="#FFC107" stroke="#F57C00" stroke-width="2"/>
                  <text x="325" y="215" text-anchor="middle" fill="#333" font-weight="bold">Loading...</text>
                </g>
                
                <!-- Arrow down -->
                <line x1="325" y1="130" x2="325" y2="180" stroke="#FFC107" stroke-width="2" marker-end="url(#arrow-yellow)" class="animate-draw-down"/>
                
                <!-- Result Signal -->
                <g class="state-box animate-pulse-5">
                  <rect x="450" y="180" width="180" height="60" rx="8" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>
                  <text x="540" y="215" text-anchor="middle" fill="white" font-weight="bold">countries = data</text>
                </g>
                
                <!-- Arrow from service -->
                <line x1="540" y1="130" x2="540" y2="180" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-green-big)" class="animate-draw-down"/>
                
                <!-- Template Update -->
                <g class="template-box animate-pulse-6">
                  <rect x="200" y="290" width="400" height="80" rx="10" fill="#E8F5E9" stroke="#4CAF50" stroke-width="3"/>
                  <text x="400" y="320" text-anchor="middle" fill="#2E7D32" font-weight="bold">Template mis à jour</text>
                  <text x="400" y="345" text-anchor="middle" fill="#333" font-size="12">
                    &#64;for (country of countries(); ...)
                  </text>
                </g>
                
                <!-- Final arrow -->
                <line x1="400" y1="240" x2="400" y2="290" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-green-big)" class="animate-draw-final"/>
                
                <defs>
                  <marker id="arrow-black" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#333" />
                  </marker>
                  <marker id="arrow-yellow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#FFC107" />
                  </marker>
                  <marker id="arrow-green-big" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto">
                    <polygon points="0 0, 12 4, 0 8" fill="#4CAF50" />
                  </marker>
                </defs>
              </svg>
            </div>

            <div class="code-block">
              <h4>Code du Component</h4>
              <pre><code>countries: Country[] = [];
loading: boolean = false;
searchTerm = '';

search() &#123;
  this.loading = true;
  
  this.countryService.searchByName(this.searchTerm)
    .subscribe(&#123;
      next: (data) =&gt; &#123;
        this.countries = data;
        this.loading = false;
      &#125;,
      error: (err) =&gt; &#123;
        console.error(err);
        this.loading = false;
      &#125;
    &#125;);
&#125;</code></pre>
            </div>

            <div class="info-box">
              <h3>🎯 Points Clés</h3>
              <ul>
                <li>✅ Propriétés pour la réactivité (countries, loading)</li>
                <li>✅ Gestion des états (loading, error)</li>
                <li>✅ subscribe() avec next et error callbacks</li>
              </ul>
            </div>
          </section>
        }

        <!-- Step 3: Optional Properties -->
        @if (currentStep() === 3) {
          <section class="step-content fade-in">
            <h2>❓ Propriétés Optionnelles en TypeScript</h2>
            
            <div class="code-comparison">
              <div class="property-card required">
                <h4>✅ Propriété Requise</h4>
                <pre><code>interface Country &#123;
  name: &#123;
    common: string;  // Toujours présent
  &#125;
&#125;</code></pre>
                <p>✅ <strong>Doit</strong> être présent</p>
              </div>
              
              <div class="property-card optional">
                <h4>❓ Propriété Optionnelle</h4>
                <pre><code>interface Country &#123;
  capital?: string[];  // Peut être absent
  languages?: &#123;
    [key: string]: string;
  &#125;;
&#125;</code></pre>
                <p>⚠️ <strong>Peut</strong> être undefined</p>
              </div>
            </div>

            <div class="safe-access">
              <h3>🛡️ Accès Sécurisé</h3>
              <div class="access-methods">
                <div class="method">
                  <h4>1. Optional Chaining</h4>
                  <pre><code>country.capital?.[0]</code></pre>
                  <p>Retourne <code>undefined</code> si capital n'existe pas</p>
                </div>
                
                <div class="method">
                  <h4>2. &#64;if dans Template</h4>
                  <pre><code>&#64;if (item.capital) &#123;
  &lt;p&gt;&#123; &#123; item.capital&#91;0&#93; &#125; &#125;&lt;/p&gt;
&#125;</code></pre>
                  <p>Affiche uniquement si capital existe</p>
                </div>
                
                <div class="method">
                  <h4>3. Valeur par Défaut</h4>
                  <pre><code>country.capital?.[0] ?? 'N/A'</code></pre>
                  <p>Utilise 'N/A' si undefined</p>
                </div>
              </div>
            </div>

            <div class="visual-diagram">
              <svg viewBox="0 0 700 300" class="optional-diagram">
                <!-- Data Flow -->
                <g class="data-box animate-pulse-1">
                  <rect x="50" y="50" width="180" height="100" rx="10" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
                  <text x="140" y="80" text-anchor="middle" fill="#1976D2" font-weight="bold">API Data</text>
                  <text x="140" y="105" text-anchor="middle" fill="#333" font-size="12">capital: undefined</text>
                  <text x="140" y="125" text-anchor="middle" fill="#333" font-size="12">languages: &#123;...&#125;</text>
                </g>
                
                <!-- Warning -->
                <g class="warning-box animate-pulse-2">
                  <rect x="280" y="50" width="180" height="100" rx="10" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
                  <text x="370" y="80" text-anchor="middle" fill="#E65100" font-weight="bold">⚠️ Sans ?</text>
                  <text x="370" y="105" text-anchor="middle" fill="#333" font-size="11">capital[0]</text>
                  <text x="370" y="125" text-anchor="middle" fill="#D32F2F" font-size="11" font-weight="bold">TypeError!</text>
                </g>
                
                <!-- Safe Access -->
                <g class="safe-box animate-pulse-3">
                  <rect x="510" y="50" width="180" height="100" rx="10" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
                  <text x="600" y="80" text-anchor="middle" fill="#2E7D32" font-weight="bold">✅ Avec ?</text>
                  <text x="600" y="105" text-anchor="middle" fill="#333" font-size="11">capital?.[0]</text>
                  <text x="600" y="125" text-anchor="middle" fill="#4CAF50" font-size="11" font-weight="bold">undefined ✓</text>
                </g>
                
                <!-- Arrows -->
                <line x1="230" y1="100" x2="280" y2="100" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow-orange-opt)" class="animate-draw"/>
                <line x1="230" y1="100" x2="280" y2="100" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-green-opt)" class="animate-draw" transform="translate(280, 0)"/>
                
                <defs>
                  <marker id="arrow-orange-opt" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#FF9800" />
                  </marker>
                  <marker id="arrow-green-opt" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#4CAF50" />
                  </marker>
                </defs>
              </svg>
            </div>

            <div class="info-box warning">
              <h3>⚠️ Attention</h3>
              <p>Sans <code>?</code>, TypeScript génère une erreur de compilation si la propriété peut être undefined.</p>
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

    .animate-slide-1 { animation: slideDown 0.6s ease-out 0.5s both; }
    .animate-slide-2 { animation: slideDown 0.6s ease-out 0.8s both; }
    .animate-slide-3 { animation: slideDown 0.6s ease-out 1.1s both; }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-draw {
      stroke-dasharray: 300;
      stroke-dashoffset: 300;
      animation: draw 1s ease-out 1.5s forwards;
    }

    .animate-draw-down {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: draw 0.8s ease-out 2s forwards;
    }

    .animate-draw-final {
      stroke-dasharray: 80;
      stroke-dashoffset: 80;
      animation: draw 0.6s ease-out 2.5s forwards;
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

    .info-box.warning {
      background: linear-gradient(135deg, #ff980015 0%, #ff572215 100%);
      border-left-color: #ff9800;
    }

    .info-box h3 {
      margin-top: 0;
      color: #667eea;
    }

    .info-box.warning h3 {
      color: #ff9800;
    }

    .info-box ul {
      margin: 10px 0;
      padding-left: 25px;
    }

    .info-box li {
      margin: 8px 0;
      line-height: 1.6;
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

    .code-comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 30px 0;
    }

    .property-card {
      border-radius: 10px;
      overflow: hidden;
      border: 2px solid;
    }

    .property-card.required {
      border-color: #4CAF50;
    }

    .property-card.optional {
      border-color: #FF9800;
    }

    .property-card h4 {
      padding: 15px;
      margin: 0;
      color: white;
    }

    .property-card.required h4 {
      background: #4CAF50;
    }

    .property-card.optional h4 {
      background: #FF9800;
    }

    .property-card pre {
      background: #1e1e1e;
      padding: 15px;
      margin: 0;
    }

    .property-card code {
      color: #d4d4d4;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.5;
    }

    .property-card p {
      padding: 15px;
      margin: 0;
      font-weight: bold;
    }

    .safe-access {
      margin: 30px 0;
    }

    .safe-access h3 {
      color: #667eea;
      margin-bottom: 20px;
    }

    .access-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .method {
      background: #f8f9fa;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      padding: 20px;
      transition: all 0.3s;
    }

    .method:hover {
      border-color: #667eea;
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .method h4 {
      color: #667eea;
      margin-top: 0;
    }

    .method pre {
      background: #1e1e1e;
      padding: 10px;
      border-radius: 5px;
      margin: 10px 0;
    }

    .method code {
      color: #d4d4d4;
      font-family: 'Courier New', monospace;
      font-size: 13px;
    }

    .method p {
      margin: 10px 0 0 0;
      font-size: 0.9rem;
      color: #666;
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
      .code-comparison {
        grid-template-columns: 1fr;
      }

      .access-methods {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CountriesExplanationVisualComponent {
  currentStep = signal(1);

  steps = [
    { id: 1, title: 'API Structure', icon: '🏗️' },
    { id: 2, title: 'Recherche', icon: '🔍' },
    { id: 3, title: 'Optionnels', icon: '❓' }
  ];

  goToStep(step: number) {
    this.currentStep.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextStep() {
    if (this.currentStep() < this.steps.length) {
      this.currentStep.update(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
