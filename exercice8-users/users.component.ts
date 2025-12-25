/**
 * ============================================================================
 * EXERCISE 8: RANDOM USERS - MAIN COMPONENT
 * ============================================================================
 * 
 * 📚 OBJECTIFS DE L'EXERCICE (Pour les étudiants):
 * 
 * Créer une application qui:
 * 1. Charge une liste d'utilisateurs aléatoires
 * 2. Permet de filtrer par genre (homme/femme)
 * 3. Affiche les informations utilisateur (avatar, nom, email, localisation)
 * 4. Implémente un bouton "Charger plus" pour ajouter des utilisateurs
 * 
 * 🔑 CONCEPTS PRATIQUÉS:
 * - HttpClient avec query parameters (HttpParams)
 * - Propriétés de composant pour la gestion d'état
 * - Filtrage avec paramètres d'URL
 * - Ajout de données (load more pattern)
 * 
 * ⏱️ TEMPS ESTIMÉ: 40 minutes
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  // État du composant
  users: User[] = [];
  loading = false;
  loadingMore = false;
  error: string | null = null;
  selectedGender: 'male' | 'female' | undefined = undefined;
  selectedNationality = '';
  
  // Liste des nationalités disponibles
  nationalities = [
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'us', name: 'États-Unis', flag: '🇺🇸' },
    { code: 'gb', name: 'Royaume-Uni', flag: '🇬🇧' },
    { code: 'de', name: 'Allemagne', flag: '🇩🇪' },
    { code: 'es', name: 'Espagne', flag: '🇪🇸' },
    { code: 'br', name: 'Brésil', flag: '🇧🇷' },
    { code: 'au', name: 'Australie', flag: '🇦🇺' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' }
  ];
  
  // Constructor injection
  constructor(private readonly userService: UserService) {}
  
  /**
   * Charger les utilisateurs initiaux
   */
  loadInitialUsers(): void {
    this.loading = true;
    this.error = null;
    
    this.userService.getUsers(10, this.selectedGender).subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement';
        this.loading = false;
      }
    });
  }
  
  /**
   * Définir le filtre de genre
   */
  setGenderFilter(gender: 'male' | 'female' | undefined): void {
    this.selectedGender = gender;
    if (this.users.length > 0) {
      this.refreshUsers();
    }
  }
  
  /**
   * Définir le filtre de nationalité
   */
  setNationalityFilter(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedNationality = select.value;
    if (this.users.length > 0) {
      this.refreshUsers();
    }
  }
  
  /**
   * Actualiser la liste des utilisateurs
   */
  refreshUsers(): void {
    this.loading = true;
    this.error = null;
    
    // Si une nationalité est sélectionnée, utiliser cette méthode
    if (this.selectedNationality) {
      this.userService.getUsersByNationality(this.selectedNationality, 10).subscribe({
        next: (data) => {
          // Filtrer par genre côté client si nécessaire
          const filtered = this.selectedGender 
            ? data.filter(u => u.gender === this.selectedGender)
            : data;
          this.users = filtered;
          this.loading = false;
        },
        error: () => {
          this.error = 'Erreur lors du chargement';
          this.loading = false;
        }
      });
    } else {
      this.userService.getUsers(10, this.selectedGender).subscribe({
        next: (data) => {
          this.users = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Erreur lors du chargement';
          this.loading = false;
        }
      });
    }
  }
  
  /**
   * Charger plus d'utilisateurs (Load More pattern)
   * 
   * 📚 EXPLANATION:
   * - Array concatenation: Combine existing and new data
   * - [...current, ...newData]: Spread operator to merge arrays
   */
  loadMore(): void {
    this.loadingMore = true;
    
    this.userService.getUsers(10, this.selectedGender).subscribe({
      next: (newUsers) => {
        // Concatenate new users to existing array
        this.users = [...this.users, ...newUsers];
        this.loadingMore = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement';
        this.loadingMore = false;
      }
    });
  }
}
