/**
 * ============================================================================
 * EXERCISE 8: RANDOM USERS - MAIN COMPONENT (Angular 20 Best Practices)
 * ============================================================================
 * 
 * 📚 ANGULAR 20 BEST PRACTICES DEMONSTRATED:
 * 
 * This component showcases modern Angular patterns:
 * 
 * 1. DEPENDENCY INJECTION with inject()
 *    - inject(): Modern functional DI (replaces constructor injection)
 * 
 * 2. REACTIVE STATE with Signals
 *    - signal<T>(): Creates reactive state primitives
 *    - .set(): Replaces the signal value
 *    - .update(): Updates based on current value (great for arrays!)
 * 
 * 3. COMPUTED SIGNALS (when derived state is needed)
 *    - computed(): Creates derived/calculated values from other signals
 * 
 * 🔑 CONCEPTS PRATIQUÉS:
 * - HttpClient avec query parameters (HttpParams)
 * - Signals pour la gestion d'état reactive
 * - Filtrage avec paramètres d'URL
 * - Pattern "Load More" avec signal.update()
 * 
 * ⏱️ TEMPS ESTIMÉ: 40 minutes
 */

import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  // ✅ Modern DI with inject() - cleaner than constructor injection
  private readonly userService = inject(UserService);
  
  // ✅ Reactive state with Signals - Angular 16+ best practice
  readonly users = signal<User[]>([]);
  readonly loading = signal(false);
  readonly loadingMore = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedGender = signal<'male' | 'female' | undefined>(undefined);
  readonly selectedNationality = signal('');
  
  // Liste des nationalités disponibles (readonly constant)
  readonly nationalities = [
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'us', name: 'États-Unis', flag: '🇺🇸' },
    { code: 'gb', name: 'Royaume-Uni', flag: '🇬🇧' },
    { code: 'de', name: 'Allemagne', flag: '🇩🇪' },
    { code: 'es', name: 'Espagne', flag: '🇪🇸' },
    { code: 'br', name: 'Brésil', flag: '🇧🇷' },
    { code: 'au', name: 'Australie', flag: '🇦🇺' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' }
  ] as const;
  
  /**
   * Charger les utilisateurs initiaux
   */
  loadInitialUsers(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.userService.getUsers(10, this.selectedGender()).subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erreur lors du chargement');
        this.loading.set(false);
      }
    });
  }
  
  /**
   * Définir le filtre de genre
   */
  setGenderFilter(gender: 'male' | 'female' | undefined): void {
    this.selectedGender.set(gender);
    if (this.users().length > 0) {
      this.refreshUsers();
    }
  }
  
  /**
   * Définir le filtre de nationalité
   */
  setNationalityFilter(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedNationality.set(select.value);
    if (this.users().length > 0) {
      this.refreshUsers();
    }
  }
  
  /**
   * Actualiser la liste des utilisateurs
   */
  refreshUsers(): void {
    this.loading.set(true);
    this.error.set(null);
    
    const nationality = this.selectedNationality();
    const gender = this.selectedGender();
    
    // Si une nationalité est sélectionnée, utiliser cette méthode
    if (nationality) {
      this.userService.getUsersByNationality(nationality, 10).subscribe({
        next: (data) => {
          // Filtrer par genre côté client si nécessaire
          const filtered = gender 
            ? data.filter(u => u.gender === gender)
            : data;
          this.users.set(filtered);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Erreur lors du chargement');
          this.loading.set(false);
        }
      });
    } else {
      this.userService.getUsers(10, gender).subscribe({
        next: (data) => {
          this.users.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Erreur lors du chargement');
          this.loading.set(false);
        }
      });
    }
  }
  
  /**
   * Charger plus d'utilisateurs (Load More pattern)
   * 
   * 📚 EXPLANATION:
   * - signal.update(): Updates based on current value
   * - [...current, ...newData]: Spread operator to merge arrays
   * - This is the reactive way to append data with signals!
   */
  loadMore(): void {
    this.loadingMore.set(true);
    
    this.userService.getUsers(10, this.selectedGender()).subscribe({
      next: (newUsers) => {
        // ✅ Use update() to append to existing array
        this.users.update(current => [...current, ...newUsers]);
        this.loadingMore.set(false);
      },
      error: () => {
        this.error.set('Erreur lors du chargement');
        this.loadingMore.set(false);
      }
    });
  }
}
