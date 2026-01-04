/**
 * ============================================================================
 * EXERCISE 8: RANDOM USERS - SERVICE
 * ============================================================================
 * 
 * 📚 STEP-BY-STEP EXPLANATION:
 * 
 * This service handles all HTTP calls to the RandomUser.me API.
 * 
 * API Documentation: https://randomuser.me/documentation
 * ✅ NO API KEY REQUIRED - Perfect for learning!
 * 
 * 🔑 KEYWORDS EXPLAINED:
 * - HttpParams: Permet de construire des query parameters proprement
 * - map(): Opérateur RxJS pour transformer les données
 * - Les query params: ?results=10&gender=female
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RandomUserResponse, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  // Injection du HttpClient
  private readonly http = inject(HttpClient);
  
  // URL de base de l'API - Pas besoin de clé API!
  private readonly BASE_URL = 'https://randomuser.me/api';

  /**
   * Obtenir des utilisateurs aléatoires
   * 
   * @param count - Nombre d'utilisateurs à récupérer
   * @param gender - Filtrer par genre (optionnel)
   * @returns Observable<User[]> - Liste des utilisateurs
   * 
   * 📚 EXPLANATION:
   * - HttpParams: Classe pour construire les query parameters
   * - .set(): Ajoute un paramètre
   * - pipe(map()): Transforme la réponse pour extraire les users
   */
  getUsers(count: number = 10, gender?: 'male' | 'female'): Observable<User[]> {
    // Construction des query parameters
    let params = new HttpParams()
      .set('results', count.toString());
    
    // Ajouter le filtre de genre si spécifié
    if (gender) {
      params = params.set('gender', gender);
    }
    
    return this.http.get<RandomUserResponse>(this.BASE_URL, { params }).pipe(
      // map() transforme la réponse: on extrait juste le tableau results
      map(response => response.results)
    );
  }

  /**
   * Obtenir des utilisateurs d'une nationalité spécifique
   * 
   * @param nationality - Code de nationalité (fr, us, de, etc.)
   * @param count - Nombre d'utilisateurs
   * @param gender - Filtrer par genre (optionnel)
   * @returns Observable<User[]>
   * 
   * 📚 EXPLANATION:
   * - Multiple params can be chained with .set()
   * - nat parameter filters by nationality
   * - gender parameter filters by gender
   * - The API supports combining both filters!
   */
  getUsersByNationality(nationality: string, count: number = 10, gender?: 'male' | 'female'): Observable<User[]> {
    let params = new HttpParams()
      .set('results', count.toString())
      .set('nat', nationality);
    
    // Ajouter le filtre de genre si spécifié
    if (gender) {
      params = params.set('gender', gender);
    }
    
    return this.http.get<RandomUserResponse>(this.BASE_URL, { params }).pipe(
      map(response => response.results)
    );
  }

  /**
   * Obtenir un seul utilisateur aléatoire
   * 
   * @returns Observable<User> - Un utilisateur unique
   * 
   * 📚 EXPLANATION:
   * - [0] extracts the first (and only) user from results
   */
  getOneUser(): Observable<User> {
    return this.http.get<RandomUserResponse>(`${this.BASE_URL}?results=1`).pipe(
      map(response => response.results[0])
    );
  }
}
