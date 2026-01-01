/**
 * ============================================================================
 * TOP SCORERS COMPONENT (Angular 20 Best Practices)
 * ============================================================================
 * 
 * 📚 ANGULAR 20 BEST PRACTICES:
 * This component displays the top scorers list.
 * It demonstrates:
 * - input() function with default values (Angular 17.1+)
 * - Signal-based inputs
 * - Array iteration with @for
 * 
 * 🔑 KEYWORDS:
 * - input<T>(defaultValue): Creates input signal with default
 * - InputSignal<T>: Readonly signal for component inputs
 * - ??: Nullish coalescing operator
 * - @for with $index: Built-in variable for current index
 * - [class.first]: Conditional class binding
 */

import { Component, input } from '@angular/core';
import { Scorer } from '../../models/football.model';

@Component({
  selector: 'app-top-scorers',
  standalone: true,
  templateUrl: './top-scorers.component.html',
  styleUrl: './top-scorers.component.css'
})
export class TopScorersComponent {
  // ✅ Modern input() function - Angular 17.1+ best practice
  // Provides default value of empty array
  readonly scorers = input<Scorer[]>([]);
  
  // 📚 NOTE: In template, access with scorers() since it's a signal
  // Example: @for (scorer of scorers(); track scorer.player.id)
}
