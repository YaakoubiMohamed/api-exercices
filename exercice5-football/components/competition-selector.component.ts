/**
 * ============================================================================
 * COMPETITION SELECTOR COMPONENT
 * ============================================================================
 * 
 * 📚 EXPLANATION:
 * This component displays a dropdown to select a football competition.
 * It demonstrates:
 * - @Output for child-to-parent communication
 * - Simple UI with Angular's new control flow
 * 
 * 🔑 KEYWORDS:
 * - @Output(): Decorator for parent communication
 * - EventEmitter: Object that can emit events to parent components
 * - (change): Event binding for select element changes
 * - $event.target: The DOM element that triggered the event
 */

import { Component, Output, EventEmitter } from '@angular/core';

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
  // @Output EventEmitter for child-to-parent communication
  @Output() selectionChange = new EventEmitter<string>();
  
  // List of free-tier competitions available in Football-Data.org
  competitions: CompetitionOption[] = [
    { code: 'PL', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { code: 'PD', name: 'La Liga', flag: '🇪🇸' },
    { code: 'BL1', name: 'Bundesliga', flag: '🇩🇪' },
    { code: 'SA', name: 'Serie A', flag: '🇮🇹' },
    { code: 'FL1', name: 'Ligue 1', flag: '🇫🇷' },
    { code: 'CL', name: 'Champions League', flag: '🇪🇺' }
  ];
  
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
