/**
 * ============================================================================
 * STANDINGS TABLE COMPONENT (Angular 20 Best Practices)
 * ============================================================================
 * 
 * 📚 ANGULAR 20 BEST PRACTICES:
 * This component displays the league standings table.
 * It demonstrates:
 * - input() function for receiving data from parent (Angular 17.1+)
 * - Signal-based inputs for reactive data flow
 * - Required vs optional inputs
 * 
 * 🔑 KEYWORDS:
 * - input(): Modern function-based input (replaces @Input decorator)
 * - input.required(): For required inputs that must be provided
 * - InputSignal<T>: Type returned by input(), acts like a signal
 * - @if/@for: New control flow syntax
 * - track: Required identifier for @for to optimize DOM updates
 */

import { Component, input } from '@angular/core';
import { TeamStanding } from '../../models/football.model';

@Component({
  selector: 'app-standings-table',
  standalone: true,
  templateUrl: './standings-table.component.html',
  styleUrl: './standings-table.component.css'
})
export class StandingsTableComponent {
  // ✅ Modern input() function - Angular 17.1+ best practice
  // Returns an InputSignal that acts like a readonly signal
  // Use input.required<T>() for required inputs
  readonly standings = input<TeamStanding[]>([]);
  
  // 📚 NOTE: In template, access with standings() since it's a signal
  // Example: @for (team of standings(); track team.team.id)
}
