/**
 * ============================================================================
 * TOP SCORERS COMPONENT
 * ============================================================================
 * 
 * 📚 EXPLANATION:
 * This component displays the top scorers list.
 * It demonstrates:
 * - @Input with default values
 * - Array iteration with @for
 * - Handling null values with nullish coalescing (??)
 * 
 * 🔑 KEYWORDS:
 * - @Input(): Decorator for receiving data from parent component
 * - ??: Nullish coalescing operator (returns right side if left is null/undefined)
 * - @for with $index: Built-in variable for current index
 * - [class.first]: Conditional class binding
 */

import { Component, Input } from '@angular/core';
import { Scorer } from '../models/football.model';

@Component({
  selector: 'app-top-scorers',
  standalone: true,
  templateUrl: './top-scorers.component.html',
  styleUrl: './top-scorers.component.css'
})
export class TopScorersComponent {
  // @Input property for receiving scorers data from parent
  @Input() scorers: Scorer[] = [];
}
