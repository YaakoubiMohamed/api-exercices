/**
 * ============================================================================
 * EXERCISE 5: FOOTBALL DATA - MAIN COMPONENT (Angular 20 Best Practices)
 * ============================================================================
 * 
 * 📚 ANGULAR 20 BEST PRACTICES DEMONSTRATED:
 * 
 * This component showcases modern Angular patterns:
 * 
 * 1. DEPENDENCY INJECTION with inject()
 *    - inject(): Modern functional DI (replaces constructor injection)
 *    - Cleaner, more concise, works great with standalone components
 * 
 * 2. REACTIVE STATE with Signals
 *    - signal<T>(): Creates a reactive primitive for state
 *    - .set(): Updates the signal value
 *    - .update(): Updates based on current value
 *    - Signals provide fine-grained reactivity and better performance
 * 
 * 3. COMPONENT COMPOSITION
 *    - Breaking UI into smaller, reusable components
 *    - Parent-child communication with input()/output()
 * 
 * 🔑 KEYWORDS EXPLAINED:
 * - inject(): Function to get dependencies (Angular 14+, recommended)
 * - signal(): Creates reactive state (Angular 16+)
 * - computed(): Derived state from signals (when needed)
 * - @if/@for: New control flow for templates
 */

import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FootballService } from '../services/football.service';
import { CompetitionSelectorComponent } from '../components/competition-selector/competition-selector.component';
import { StandingsTableComponent } from '../components/standings-table/standings-table.component';
import { TopScorersComponent } from '../components/top-scorers/top-scorers.component';
import { TeamStanding, Scorer } from '../models/football.model';

@Component({
  selector: 'app-football',
  standalone: true,
  imports: [
    RouterLink,
    CompetitionSelectorComponent,
    StandingsTableComponent,
    TopScorersComponent
  ],
  templateUrl: './football.component.html',
  styleUrl: './football.component.css'
})
export class FootballComponent {
  // ✅ Modern DI with inject() - cleaner than constructor injection
  private readonly footballService = inject(FootballService);
  
  // ✅ Reactive state with Signals - Angular 16+ best practice
  // Signals provide fine-grained reactivity and better change detection
  readonly standings = signal<TeamStanding[]>([]);
  readonly scorers = signal<Scorer[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  
  // Private signal for retry functionality
  private readonly currentCompetition = signal('PL');
  
  /**
   * Handle competition change from child component
   * 
   * 📚 EXPLANATION:
   * This method is called when the user selects a different competition.
   * It triggers two API calls: one for standings and one for top scorers.
   */
  onCompetitionChange(competitionCode: string): void {
    this.currentCompetition.set(competitionCode);
    this.loadData(competitionCode);
  }
  
  /**
   * Load data from the API
   * 
   * 📚 EXPLANATION:
   * - signal.set(): Updates the signal value reactively
   * - subscribe(): Executes the Observable and handles responses
   * - The view automatically updates when signals change
   */
  private loadData(competitionCode: string): void {
    // Reset state using signal.set()
    this.loading.set(true);
    this.error.set(null);
    
    // Load standings
    this.footballService.getStandings(competitionCode).subscribe({
      next: (response) => {
        // Get the TOTAL standings (not HOME or AWAY)
        const totalStandings = response.standings.find(s => s.type === 'TOTAL');
        this.standings.set(totalStandings?.table ?? []);
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement du classement');
        this.loading.set(false);
        console.error('Standings error:', err);
      }
    });
    
    // Load top scorers
    this.footballService.getTopScorers(competitionCode).subscribe({
      next: (response) => {
        console.log(response.scorers);
        this.scorers.set(response.scorers);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement des buteurs');
        this.loading.set(false);
        console.error('Scorers error:', err);
      }
    });
  }
  
  /**
   * Retry loading data after an error
   */
  retry(): void {
    this.loadData(this.currentCompetition());
  }
}
