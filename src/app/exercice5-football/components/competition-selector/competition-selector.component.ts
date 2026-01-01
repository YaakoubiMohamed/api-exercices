/**
 * ============================================================================
 * COMPETITION SELECTOR COMPONENT (Angular 20 Best Practices)
 * ============================================================================
 * 
 * 📚 ANGULAR 20 BEST PRACTICES:
 * This component displays a dropdown to select a football competition.
 * It demonstrates:
 * - output() function for child-to-parent communication (Angular 17.3+)
 * - Signal-based state management
 * 
 * 🔑 KEYWORDS:
 * - output(): Modern function-based output (replaces @Output decorator)
 * - OutputEmitterRef: Type returned by output()
 * - .emit(): Sends value to parent component
 * - signal(): Reactive state primitive
 */

import { Component, output, signal } from '@angular/core';

// Available competitions with their codes
// These are free-tier competitions from Football-Data.org
interface CompetitionOption {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-competition-selector',
  standalone: true,
  templateUrl: './competition-selector.component.html',
  styleUrl: './competition-selector.component.css'
})
export class CompetitionSelectorComponent {
  // ✅ Modern output() function - Angular 17.3+ best practice
  // Replaces @Output() decorator with a cleaner functional approach
  readonly selectionChange = output<string>();
  
  // ✅ Signal for reactive state (readonly array doesn't need signal here, but shown for demo)
  readonly competitions = signal<CompetitionOption[]>([
    { code: 'PL', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { code: 'PD', name: 'La Liga', flag: '🇪🇸' },
    { code: 'BL1', name: 'Bundesliga', flag: '🇩🇪' },
    { code: 'SA', name: 'Serie A', flag: '🇮🇹' },
    { code: 'FL1', name: 'Ligue 1', flag: '🇫🇷' },
    { code: 'CL', name: 'Champions League', flag: '🇪🇺' }
  ]);
  
  /**
   * Handle selection change
   * 
   * 📚 EXPLANATION:
   * - $event: The native DOM event object
   * - as HTMLSelectElement: Type assertion to access .value property
   * - this.selectionChange.emit(): Sends the value to parent component
   */
  onSelectionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectionChange.emit(select.value);
  }
}
