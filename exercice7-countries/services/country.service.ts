/**
 * ============================================================================
 * EXERCISE 7: COUNTRY EXPLORER - SERVICE
 * ============================================================================
 * 
 * 📚 STEP-BY-STEP EXPLANATION:
 * 
 * This service handles all HTTP calls to the REST Countries API.
 * 
 * API Documentation: https://restcountries.com/
 * ✅ NO API KEY REQUIRED - Perfect for learning!
 * 
 * 🔑 KEYWORDS EXPLAINED:
 * - @Injectable({ providedIn: 'root' }): Service disponible dans toute l'app
 * - inject(): Injection de dépendance moderne
 * - Observable<T>: Flux de données asynchrone
 * - catchError(): Opérateur RxJS pour gérer les erreurs
 * - of(): Crée un Observable à partir d'une valeur
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from '../models/country.model';

@Injectable({ providedIn: 'root' })
export class CountryService {
  // Injection du HttpClient avec inject() (Angular 14+)
  private readonly http = inject(HttpClient);
  
  // URL de base de l'API - Pas besoin de clé API!
  private readonly BASE_URL = 'https://restcountries.com/v3.1';

  /**
   * Rechercher des pays par nom
   * 
   * @param name - Nom du pays à rechercher
   * @returns Observable<Country[]> - Liste des pays correspondants
   * 
   * 📚 EXPLANATION:
   * - Template literal `${...}`: Construit l'URL avec le paramètre
   * - pipe(): Chaîne les opérateurs RxJS
   * - catchError(): Attrape les erreurs et retourne un tableau vide
   */
  searchByName(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.BASE_URL}/name/${name}`
    ).pipe(
      catchError(() => of([])) // En cas d'erreur, retourner un tableau vide
    );
  }

  /**
   * Obtenir tous les pays
   * 
   * @returns Observable<Country[]> - Liste de tous les pays
   * 
   * 📚 EXPLANATION:
   * - Simple GET request without parameters
   * - Returns all countries in the world
   */
  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.BASE_URL}/all`
    ).pipe(
      catchError(() => of([]))
    );
  }

  /**
   * Filtrer les pays par région
   * 
   * @param region - Nom de la région (Europe, Asia, Africa, etc.)
   * @returns Observable<Country[]> - Pays de la région
   */
  getByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.BASE_URL}/region/${region}`
    ).pipe(
      catchError(() => of([]))
    );
  }

  /**
   * Obtenir un pays par son code
   * 
   * @param code - Code du pays (FR, US, DE, etc.)
   * @returns Observable<Country[]> - Pays correspondant
   */
  getByCode(code: string): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.BASE_URL}/alpha/${code}`
    ).pipe(
      catchError(() => of([]))
    );
  }
}
