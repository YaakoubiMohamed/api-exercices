/**
 * ============================================================================
 * EXERCISE 5: VISUAL INTERACTIVE EXPLANATION
 * ============================================================================
 */

import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-football-explanation",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./football-explanation.component.html",
  styleUrl: "./football-explanation.component.css"
})
export class FootballExplanationComponent {}
