/**
 * ============================================================================
 * EXERCISE 5: FOOTBALL DATA - SERVICE
 * ============================================================================
 * 
 * 📚 STEP-BY-STEP EXPLANATION:
 * 
 * 1. IMPORTS: We import necessary tools from Angular and RxJS
 * 2. @Injectable: Decorator that marks this class as available for dependency injection
 * 3. providedIn: 'root': Creates a single instance (singleton) available app-wide
 * 4. inject(): Modern way to inject dependencies (replaces constructor injection)
 * 5. HttpClient: Angular's service for making HTTP requests
 * 6. Observable: Represents a stream of data over time (like a Promise that can emit multiple values)
 * 
 * 🔑 KEYWORDS EXPLAINED:
 * - @Injectable(): Decorator that tells Angular this class can be injected
 * - inject(): Function to get a dependency (Angular 14+)
 * - readonly: Property that cannot be reassigned after initialization
 * - Observable<T>: Generic type representing an async data stream
 * - HttpHeaders: Used to add custom headers to HTTP requests
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  CompetitionsResponse, 
  StandingsResponse, 
  ScorersResponse 
} from '../models/football.model';

@Injectable({ providedIn: 'root' })
export class FootballService {
  // inject() is the modern way to inject dependencies in Angular 14+
  // It's cleaner than constructor injection and works with standalone components
  private readonly http = inject(HttpClient);
  
  // API Configuration
  // Football-Data.org requires an API key in the header
  // Get your free key at: https://www.football-data.org/client/register
  private readonly API_KEY = '9be36b8187f24de0951f540fb962b655'; // Replace with your key
  private readonly BASE_URL = '/api/football'; // Using proxy to avoid CORS issues
  
  // Headers required by the API
  // The 'X-Auth-Token' header authenticates our requests
  private readonly headers = new HttpHeaders({
    'X-Auth-Token': this.API_KEY
  });

  /**
   * Get all available competitions (leagues/tournaments)
   * 
   * 📚 EXPLANATION:
   * - this.http.get<T>(): Makes a GET request and types the response as T
   * - { headers: this.headers }: Passes our authentication headers
   * - Returns an Observable that will emit the response when ready
   */
  getCompetitions(): Observable<CompetitionsResponse> {
    return this.http.get<CompetitionsResponse>(
      `${this.BASE_URL}/competitions`,
      { headers: this.headers }
    );
  }

  /**
   * Get standings (league table) for a specific competition
   * 
   * 📚 EXPLANATION:
   * - competitionCode: Short code like 'PL' (Premier League), 'PD' (La Liga)
   * - Template literal `${...}`: Modern way to build strings with variables
   */
  getStandings(competitionCode: string): Observable<StandingsResponse> {
    return this.http.get<StandingsResponse>(
      `${this.BASE_URL}/competitions/${competitionCode}/standings`,
      { headers: this.headers }
    );
  }

  /**
   * Get top scorers for a specific competition
   * 
   * 📚 EXPLANATION:
   * - limit parameter: Restricts how many results we get
   * - Query params could also be passed using HttpParams
   */
  getTopScorers(competitionCode: string, limit: number = 10): Observable<ScorersResponse> {
    return this.http.get<ScorersResponse>(
      `${this.BASE_URL}/competitions/${competitionCode}/scorers?limit=${limit}`,
      { headers: this.headers }
    );
  }
}
