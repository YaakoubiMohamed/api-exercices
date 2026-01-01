/**
 * ============================================================================
 * EXERCISE 7: COUNTRY EXPLORER - MAIN COMPONENT (Angular 20 Best Practices)
 * ============================================================================
 * 
 * 📚 ANGULAR 20 BEST PRACTICES DEMONSTRATED:
 * 
 * This component showcases modern Angular patterns:
 * 
 * 1. DEPENDENCY INJECTION with inject()
 *    - inject(): Modern functional DI (replaces constructor injection)
 *    - Cleaner and more concise than constructor injection
 * 
 * 2. REACTIVE STATE with Signals
 *    - signal<T>(): Creates reactive state primitives
 *    - .set(): Updates the signal value
 *    - .update(): Updates based on current value
 *    - Automatic view updates when signals change
 * 
 * 3. MODEL SIGNALS for Two-Way Binding
 *    - model<T>(): Creates a writable signal for two-way binding
 *    - Works with [(ngModel)] equivalent using [value] and (input)
 * 
 * 🔑 CONCEPTS PRATIQUÉS:
 * - HttpClient pour les appels API
 * - Signals pour la gestion d'état reactive
 * - @if/@for pour le nouveau control flow
 * - Gestion des erreurs
 * 
 * ⏱️ TEMPS ESTIMÉ: 40 minutes
 */

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CountryService } from '../services/country.service';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [FormsModule, RouterLink, DecimalPipe],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent {
  // ✅ Modern DI with inject() - cleaner than constructor injection
  private readonly countryService = inject(CountryService);
  
  // ✅ Reactive state with Signals - Angular 16+ best practice
  readonly countries = signal<Country[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly hasSearched = signal(false);
  readonly lastSearch = signal('');
  
  // ✅ Signal for form input (can also use model() for two-way binding)
  readonly searchTerm = signal('');
  
  // Liste des régions disponibles (readonly constant)
  readonly regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;
  
  /**
   * Update search term from input
   */
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
  
  /**
   * Rechercher un pays par nom
   */
  search(): void {
    const term = this.searchTerm();
    if (!term.trim()) return;
    
    this.loading.set(true);
    this.error.set(null);
    this.hasSearched.set(true);
    this.lastSearch.set(term);
    
    this.countryService.searchByName(term).subscribe({
      next: (data) => {
        this.countries.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erreur lors de la recherche');
        this.countries.set([]);
        this.loading.set(false);
      }
    });
  }
  
  /**
   * Filtrer par région
   */
  filterByRegion(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const region = select.value;
    
    if (!region) {
      this.countries.set([]);
      this.hasSearched.set(false);
      return;
    }
    
    this.loading.set(true);
    this.hasSearched.set(true);
    this.lastSearch.set(region);
    
    this.countryService.getByRegion(region).subscribe({
      next: (data) => {
        this.countries.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erreur lors du filtrage');
        this.loading.set(false);
      }
    });
  }
  
  /**
   * Extraire les langues d'un pays
   * Helper pour le template
   */
  getLanguages(country: Country): string[] {
    if (!country.languages) return [];
    // Use Object.keys + map to avoid Object.values compatibility issues
    return Object.keys(country.languages).map(key => country.languages![key]);
  }
}
