/**
 * ============================================================================
 * EXERCISE 7: COUNTRY EXPLORER - MAIN COMPONENT
 * ============================================================================
 * 
 * 📚 OBJECTIFS DE L'EXERCICE (Pour les étudiants):
 * 
 * Créer une application de recherche de pays qui:
 * 1. Permet de rechercher un pays par son nom
 * 2. Affiche les informations du pays (drapeau, capitale, population)
 * 3. Gère les états de chargement et d'erreur
 * 4. Filtre par région (bonus)
 * 
 * 🔑 CONCEPTS PRATIQUÉS:
 * - HttpClient pour les appels API
 * - Propriétés de composant pour la gestion d'état
 * - @if/@for pour le nouveau control flow
 * - Gestion des erreurs
 * 
 * ⏱️ TEMPS ESTIMÉ: 40 minutes
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CountryService } from './services/country.service';
import { Country } from './models/country.model';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [FormsModule, RouterLink, DecimalPipe],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent {
  // État du composant
  countries: Country[] = [];
  loading = false;
  error: string | null = null;
  hasSearched = false;
  lastSearch = '';
  
  // Variables de recherche
  searchTerm = '';
  
  // Liste des régions disponibles
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
  // Constructor injection
  constructor(private readonly countryService: CountryService) {}
  
  /**
   * Rechercher un pays par nom
   */
  search(): void {
    if (!this.searchTerm.trim()) return;
    
    this.loading = true;
    this.error = null;
    this.hasSearched = true;
    this.lastSearch = this.searchTerm;
    
    this.countryService.searchByName(this.searchTerm).subscribe({
      next: (data) => {
        this.countries = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors de la recherche';
        this.countries = [];
        this.loading = false;
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
      this.countries = [];
      this.hasSearched = false;
      return;
    }
    
    this.loading = true;
    this.hasSearched = true;
    this.lastSearch = region;
    
    this.countryService.getByRegion(region).subscribe({
      next: (data) => {
        this.countries = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du filtrage';
        this.loading = false;
      }
    });
  }
  
  /**
   * Extraire les langues d'un pays
   * Helper pour le template
   */
  getLanguages(country: Country): string[] {
    return country.languages ? Object.values(country.languages) : [];
  }
}
