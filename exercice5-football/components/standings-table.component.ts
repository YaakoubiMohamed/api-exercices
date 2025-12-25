/**
 * ============================================================================
 * STANDINGS TABLE COMPONENT
 * ============================================================================
 * 
 * 📚 EXPLANATION:
 * This component displays the league standings table.
 * It demonstrates:
 * - @Input for receiving data from parent
 * - Displaying complex data structures
 * - Conditional rendering with @if
 * 
 * 🔑 KEYWORDS:
 * - @Input(): Decorator for receiving data from parent component
 * - @if: New control flow syntax for conditional rendering
 * - @for: New control flow syntax for iteration
 * - track: Required identifier for @for to optimize DOM updates
 */

import { Component, Input } from '@angular/core';
import { TeamStanding } from '../models/football.model';

@Component({
  selector: 'app-standings-table',
  standalone: true,
  templateUrl: './standings-table.component.html',
  styleUrl: './standings-table.component.css'
})
export class StandingsTableComponent {
  // @Input property for receiving standings data from parent
  @Input() standings: TeamStanding[] = [];
}
