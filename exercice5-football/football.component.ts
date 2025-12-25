/**
 * ============================================================================
 * EXERCISE 5: FOOTBALL DATA - MAIN COMPONENT
 * ============================================================================
 * 
 * 📚 STEP-BY-STEP EXPLANATION:
 * 
 * This is the main component that orchestrates the Football Data application.
 * It demonstrates:
 * 
 * 1. SERVICE INJECTION with constructor
 *    - Constructor injection: Traditional Angular dependency injection
 *    - private/readonly: Ensures service is accessible only within the component
 * 
 * 2. COMPONENT STATE MANAGEMENT
 *    - Regular properties: Simple and straightforward state management
 *    - Change detection: Angular automatically updates the view
 * 
 * 3. HTTP CALLS WITH SUBSCRIBE
 *    - service.method().subscribe(): Executes the HTTP call
 *    - next: Handles successful response
 *    - error: Handles errors
 * 
 * 4. COMPONENT COMPOSITION
 *    - Breaking UI into smaller, reusable components
 *    - Parent-child communication with @Input/@Output
 * 
 * 🔑 KEYWORDS EXPLAINED:
 * - constructor: Where we inject dependencies
 * - subscribe(): Triggers Observable execution
 * - @if/@else: New control flow for conditions
 * - (selectionChange): Event binding to child output
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FootballService } from './services/football.service';
import { CompetitionSelectorComponent } from './components/competition-selector.component';
import { StandingsTableComponent } from './components/standings-table.component';
import { TopScorersComponent } from './components/top-scorers.component';
import { TeamStanding, Scorer } from './models/football.model';

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
  // Component state properties
  standings: TeamStanding[] = [];
  scorers: Scorer[] = [];
  loading = false;
  error: string | null = null;
  
  // Store current competition for retry functionality
  private currentCompetition = 'PL';
  
  // Constructor injection for services
  constructor(private readonly footballService: FootballService) {}
  
  /**
   * Handle competition change from child component
   * 
   * 📚 EXPLANATION:
   * This method is called when the user selects a different competition.
   * It triggers two API calls: one for standings and one for top scorers.
   */
  onCompetitionChange(competitionCode: string): void {
    this.currentCompetition = competitionCode;
    this.loadData(competitionCode);
  }
  
  /**
   * Load data from the API
   * 
   * 📚 EXPLANATION:
   * - Direct property assignment: Updates component state
   * - subscribe(): Executes the Observable and handles responses
   * - next: Called when data arrives successfully
   * - error: Called when an error occurs
   */
  private loadData(competitionCode: string): void {
    // Reset state
    this.loading = true;
    this.error = null;
    
    // Load standings
    this.footballService.getStandings(competitionCode).subscribe({
      next: (response) => {
        // Get the TOTAL standings (not HOME or AWAY)
        const totalStandings = response.standings.find(s => s.type === 'TOTAL');
        this.standings = totalStandings?.table ?? [];
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du classement';
        this.loading = false;
        console.error('Standings error:', err);
      }
    });
    
    // Load top scorers
    this.footballService.getTopScorers(competitionCode).subscribe({
      next: (response) => {
        this.scorers = response.scorers;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des buteurs';
        this.loading = false;
        console.error('Scorers error:', err);
      }
    });
  }
  
  /**
   * Retry loading data after an error
   */
  retry(): void {
    this.loadData(this.currentCompetition);
  }
}
