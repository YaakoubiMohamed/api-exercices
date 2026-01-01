/**
 * ============================================================================
 * EXERCISE 7: COUNTRIES EXPLANATION COMPONENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries-explanation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './countries-explanation.component.html',
  styleUrls: ['./countries-explanation.component.css']
})
export class CountriesExplanationComponent {}
