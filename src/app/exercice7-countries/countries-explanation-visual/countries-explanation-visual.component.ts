/**
 * ============================================================================
 * EXERCISE 7: COUNTRIES - VISUAL EXPLANATION
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries-explanation-visual',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './countries-explanation-visual.component.html',
  styleUrl: './countries-explanation-visual.component.css'
})
export class CountriesExplanationVisualComponent {
  currentStep = signal(1);

  steps = [
    { id: 1, title: 'API Structure', icon: '🏗️' },
    { id: 2, title: 'Recherche', icon: '🔍' },
    { id: 3, title: 'Optionnels', icon: '❓' }
  ];

  goToStep(step: number) {
    this.currentStep.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextStep() {
    if (this.currentStep() < this.steps.length) {
      this.currentStep.update(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
