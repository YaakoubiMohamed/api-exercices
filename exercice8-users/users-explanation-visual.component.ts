/**
 * ============================================================================
 * EXERCISE 8: RANDOM USERS - VISUAL EXPLANATION
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-explanation-visual',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="explanation-container">
      <header class="explanation-header">
        <h1>👥 Exercice 8 : Random Users - Explication Visuelle</h1>
        <a routerLink="/exercice8" class="back-link">← Retour à l'exercice</a>
      </header>

      <!-- Step Navigator -->
      <nav class="step-navigator">
        @for (step of steps; track step.id) {
          <button 
            class="step-btn"
            [class.active]="currentStep() === step.id"
            (click)="goToStep(step.id)">
            {{ step.icon }} {{ step.title }}
          </button>
        }
      </nav>

      <!-- Content Area -->
      <div class="content-area">
        
        <!-- Step 1: API with Query Parameters -->
        @if (currentStep() === 1) {
          <section class="step-content fade-in">
            <h2>🔗 API avec Paramètres de Requête</h2>
            
            <div class="visual-diagram">
              <svg viewBox="0 0 900 450" class="api-params-diagram">
                <!-- Base URL -->
                <g class="url-segment animate-slide-1">
                  <rect x="50" y="50" width="280" height="60" rx="10" fill="#3F51B5"/>
                  <text x="190" y="90" text-anchor="middle" fill="white" font-size="16" font-weight="bold">
                    https://randomuser.me/api
                  </text>
                </g>
                
                <!-- Question Mark -->
                <text x="350" y="90" text-anchor="middle" fill="#FF9800" font-size="40" font-weight="bold" class="animate-pulse-1">?</text>
                
                <!-- Parameter 1: results -->
                <g class="param-box animate-slide-2">
                  <rect x="380" y="50" width="150" height="60" rx="8" fill="#4CAF50"/>
                  <text x="455" y="75" text-anchor="middle" fill="white" font-size="14" font-weight="bold">results=10</text>
                  <text x="455" y="95" text-anchor="middle" fill="white" font-size="11">Nombre d'users</text>
                </g>
                
                <!-- Ampersand -->
                <text x="550" y="90" text-anchor="middle" fill="#FF9800" font-size="30" font-weight="bold" class="animate-pulse-2">&</text>
                
                <!-- Parameter 2: gender -->
                <g class="param-box animate-slide-3">
                  <rect x="580" y="50" width="150" height="60" rx="8" fill="#9C27B0"/>
                  <text x="655" y="75" text-anchor="middle" fill="white" font-size="14" font-weight="bold">gender=male</text>
                  <text x="655" y="95" text-anchor="middle" fill="white" font-size="11">Filtre genre</text>
                </g>
                
                <!-- Arrow down -->
                <line x1="450" y1="110" x2="450" y2="180" stroke="#333" stroke-width="3" marker-end="url(#arrow)" class="animate-draw"/>
                
                <!-- HttpParams Box -->
                <g class="code-box animate-pulse-3">
                  <rect x="200" y="180" width="500" height="180" rx="10" fill="#1e1e1e" stroke="#4CAF50" stroke-width="3"/>
                  <text x="450" y="210" text-anchor="middle" fill="#4CAF50" font-size="18" font-weight="bold">
                    Code avec HttpParams
                  </text>
                  
                  <text x="220" y="245" fill="#d4d4d4" font-size="14" font-family="monospace">
                    const params = new HttpParams()
                  </text>
                  <text x="220" y="270" fill="#d4d4d4" font-size="14" font-family="monospace">
                    .set('results', '10')
                  </text>
                  <text x="220" y="295" fill="#d4d4d4" font-size="14" font-family="monospace">
                    .set('gender', 'male');
                  </text>
                  <text x="220" y="330" fill="#d4d4d4" font-size="14" font-family="monospace">
                    this.http.get(url, &#123; params &#125;)
                  </text>
                </g>
                
                <!-- Result -->
                <g class="result-box animate-pulse-4">
                  <rect x="150" y="380" width="600" height="50" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
                  <text x="450" y="412" text-anchor="middle" fill="#2E7D32" font-size="15" font-weight="bold">
                    ✅ URL finale: https://randomuser.me/api?results=10&gender=male
                  </text>
                </g>
                
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#333" />
                  </marker>
                </defs>
              </svg>
            </div>

            <div class="info-box">
              <h3>🔑 HttpParams</h3>
              <ul>
                <li>✅ <strong>Type-safe</strong> : Evite les erreurs de typage dans l'URL</li>
                <li>✅ <strong>Immutable</strong> : Chaque .set() retourne un nouvel objet</li>
                <li>✅ <strong>Encodage auto</strong> : Gère les espaces et caractères spéciaux</li>
              </ul>
            </div>
          </section>
        }

        <!-- Step 2: Load More Pattern -->
        @if (currentStep() === 2) {
          <section class="step-content fade-in">
            <h2>🔄 Pattern "Load More" avec Propriétés</h2>
            
            <div class="visual-diagram">
              <svg viewBox="0 0 800 500" class="load-more-diagram">
                <!-- Initial State -->
                <g class="state-card animate-pulse-1">
                  <rect x="50" y="50" width="200" height="100" rx="10" fill="#E3F2FD" stroke="#2196F3" stroke-width="3"/>
                  <text x="150" y="85" text-anchor="middle" fill="#1976D2" font-weight="bold">État Initial</text>
                  <text x="150" y="110" text-anchor="middle" fill="#333" font-size="13">users: User[] = []</text>
                  <text x="150" y="130" text-anchor="middle" fill="#333" font-size="13">page = 1</text>
                </g>
                
                <!-- First Load -->
                <line x1="250" y1="100" x2="320" y2="100" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-green)" class="animate-draw"/>
                
                <g class="state-card animate-pulse-2">
                  <rect x="320" y="50" width="200" height="100" rx="10" fill="#E8F5E9" stroke="#4CAF50" stroke-width="3"/>
                  <text x="420" y="85" text-anchor="middle" fill="#2E7D32" font-weight="bold">1er Chargement</text>
                  <text x="420" y="110" text-anchor="middle" fill="#333" font-size="13">GET /api?page=1</text>
                  <text x="420" y="130" text-anchor="middle" fill="#333" font-size="13">users = [1,2,3]</text>
                </g>
                
                <!-- Load More Button Click -->
                <line x1="420" y1="150" x2="420" y2="220" stroke="#FF9800" stroke-width="3" marker-end="url(#arrow-orange)" class="animate-draw-down"/>
                
                <g class="button-card animate-pulse-3">
                  <rect x="320" y="220" width="200" height="60" rx="10" fill="#FFF3E0" stroke="#FF9800" stroke-width="3"/>
                  <text x="420" y="257" text-anchor="middle" fill="#E65100" font-weight="bold" font-size="15">
                    🖱️ Click "Load More"
                  </text>
                </g>
                
                <!-- Arrow to update -->
                <line x1="420" y1="280" x2="420" y2="350" stroke="#9C27B0" stroke-width="3" marker-end="url(#arrow-purple)" class="animate-draw-final"/>
                
                <!-- Update State -->
                <g class="state-card animate-pulse-4">
                  <rect x="320" y="350" width="200" height="100" rx="10" fill="#F3E5F5" stroke="#9C27B0" stroke-width="3"/>
                  <text x="420" y="385" text-anchor="middle" fill="#7B1FA2" font-weight="bold">Mise à jour</text>
                  <text x="420" y="410" text-anchor="middle" fill="#333" font-size="13">page = 2</text>
                  <text x="420" y="430" text-anchor="middle" fill="#333" font-size="13">users = [...users, 4,5,6]</text>
                </g>
                
                <!-- Comparison set vs update -->
                <g class="comparison-box">
                  <rect x="550" y="170" width="230" height="200" rx="10" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/>
                  <text x="665" y="195" text-anchor="middle" fill="#F57F17" font-weight="bold">⚡ set() vs update()</text>
                  
                  <text x="565" y="225" fill="#333" font-size="13" font-weight="bold">❌ set() - Remplace</text>
                  <text x="565" y="245" fill="#666" font-size="12" font-family="monospace">users = newData</text>
                  <text x="565" y="262" fill="#666" font-size="11">[1,2,3] → [4,5,6]</text>
                  
                  <line x1="565" y1="275" x2="765" y2="275" stroke="#999" stroke-width="1"/>
                  
                  <text x="565" y="295" fill="#333" font-size="13" font-weight="bold">✅ update() - Ajoute</text>
                  <text x="565" y="315" fill="#666" font-size="12" font-family="monospace">users = [...users,</text></text>
                  <text x="575" y="332" fill="#666" font-size="12" font-family="monospace">[...old, ...new])</text>
                  <text x="565" y="350" fill="#4CAF50" font-size="11" font-weight="bold">[1,2,3] → [1,2,3,4,5,6]</text>
                </g>
                
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

            <div class="code-block">
              <h4>Code du Component</h4>
              <pre><code>users: User[] = [];
currentPage = 1;

loadMore() &#123;
  this.currentPage++;
  
  this.userService.getUsers(this.currentPage)
    .subscribe(response =&gt; &#123;
      // ✅ Spread operator pour ajouter à l'existant
      this.users = [
        ...this.users,        // Garde l'existant
        ...response.results   // Ajoute le nouveau
      ];
    &#125;);
&#125;</code></pre>
            </div>

            <div class="info-box">
              <h3>💡 Pattern Load More</h3>
              <ul>
                <li><strong>set()</strong> : Remplacer complètement (recherche, reset)</li>
                <li><strong>update()</strong> : Modifier/Ajouter (load more, toggle)</li>
              </ul>
            </div>
          </section>
        }

        <!-- Step 3: Gender Filter -->
        @if (currentStep() === 3) {
          <section class="step-content fade-in">
            <h2>🎯 Filtre Dynamique</h2>
            
            <div class="visual-diagram">
              <svg viewBox="0 0 700 450" class="filter-diagram">
                <!-- Dropdown -->
                <g class="select-box animate-pulse-1">
                  <rect x="250" y="50" width="200" height="60" rx="10" fill="#2196F3" stroke="#1976D2" stroke-width="2"/>
                  <text x="350" y="85" text-anchor="middle" fill="white" font-weight="bold" font-size="16">
                    &lt;select&gt; Gender
                  </text>
                  <polygon points="420,75 430,85 420,95" fill="white"/>
                </g>
                
                <!-- Options -->
                <g class="option animate-slide-1">
                  <rect x="150" y="130" width="120" height="40" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
                  <text x="210" y="155" text-anchor="middle" fill="#1976D2">All</text>
                </g>
                <g class="option animate-slide-2">
                  <rect x="290" y="130" width="120" height="40" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
                  <text x="350" y="155" text-anchor="middle" fill="#1976D2">Male</text>
                </g>
                <g class="option animate-slide-3">
                  <rect x="430" y="130" width="120" height="40" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
                  <text x="490" y="155" text-anchor="middle" fill="#1976D2">Female</text>
                </g>
                
                <!-- Arrow down -->
                <line x1="350" y1="170" x2="350" y2="230" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-down)" class="animate-draw"/>
                
                <!-- Function Call -->
                <g class="function-box animate-pulse-2">
                  <rect x="150" y="230" width="400" height="100" rx="10" fill="#1e1e1e" stroke="#4CAF50" stroke-width="3"/>
                  <text x="350" y="260" text-anchor="middle" fill="#4CAF50" font-size="15" font-weight="bold">
                    (change)="filterByGender($event)"
                  </text>
                  <text x="165" y="290" fill="#d4d4d4" font-size="13" font-family="monospace">
                    filterByGender(gender: string) &#123;
                  </text>
                  <text x="175" y="310" fill="#d4d4d4" font-size="13" font-family="monospace">
                    this.selectedGender = gender;
                  </text>
                  <text x="165" y="320" fill="#d4d4d4" font-size="13" font-family="monospace">
                    &#125;
                  </text>
                </g>
                
                <!-- Arrow to API -->
                <line x1="350" y1="330" x2="350" y2="380" stroke="#FF9800" stroke-width="3" marker-end="url(#arrow-orange-down)" class="animate-draw-final"/>
                
                <!-- API Call -->
                <g class="api-call-box animate-pulse-3">
                  <rect x="100" y="380" width="500" height="50" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
                  <text x="350" y="412" text-anchor="middle" fill="#E65100" font-size="14" font-weight="bold">
                    📡 GET /api?results=10&gender=male
                  </text>
                </g>
                
                <defs>
                  <marker id="arrow-down" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#4CAF50" />
                  </marker>
                  <marker id="arrow-orange-down" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#FF9800" />
                  </marker>
                </defs>
              </svg>
            </div>

            <div class="code-block">
              <h4>Template HTML</h4>
              <pre><code>&lt;select (change)="filterByGender($event.target.value)"&gt;
  &lt;option value=""&gt;All&lt;/option&gt;
  &lt;option value="male"&gt;Male&lt;/option&gt;
  &lt;option value="female"&gt;Female&lt;/option&gt;
&lt;/select&gt;</code></pre>
            </div>

            <div class="code-block">
              <h4>Component Code</h4>
              <pre><code>selectedGender = '';

filterByGender(gender: string) &#123;
  this.selectedGender = gender;
  this.currentPage = 1;  // Reset à la page 1
  
  // Nouvelle recherche avec filtre
  this.loadUsers();
&#125;</code></pre>
            </div>

            <div class="info-box">
              <h3>🎯 Points Clés</h3>
              <ul>
                <li>✅ Reset de la pagination lors du changement de filtre</li>
                <li>✅ Utiliser <code>set()</code> car on remplace complètement les résultats</li>
                <li>✅ $event.target.value pour récupérer la valeur du select</li>
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
    .animate-pulse-2 { animation: pulse 2s ease-in-out 0.6s infinite; }
    .animate-pulse-3 { animation: pulse 2s ease-in-out 1s infinite; }
    .animate-pulse-4 { animation: pulse 2s ease-in-out 1.4s infinite; }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .animate-slide-1 { animation: slideIn 0.6s ease-out 0.5s both; }
    .animate-slide-2 { animation: slideIn 0.6s ease-out 0.8s both; }
    .animate-slide-3 { animation: slideIn 0.6s ease-out 1.1s both; }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .animate-draw {
      stroke-dasharray: 150;
      stroke-dashoffset: 150;
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
      .visual-diagram {
        overflow-x: auto;
      }
    }
  `]
})
export class UsersExplanationVisualComponent {
  currentStep = signal(1);

  steps = [
    { id: 1, title: 'HttpParams', icon: '🔗' },
    { id: 2, title: 'Load More', icon: '🔄' },
    { id: 3, title: 'Filtres', icon: '🎯' }
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
