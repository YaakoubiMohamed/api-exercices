/**
 * ============================================================================
 * EXERCISE 5: FOOTBALL DATA - VISUAL EXPLANATION
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-football-explanation-visual',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './football-explanation-visual.component.html',
    styleUrl: './football-explanation-visual.component.css'
})
export class FootballExplanationVisualComponent {
    currentStep = signal(1);
    activeExplanation = signal<number | null>(null);

    steps = [
        { id: 1, title: 'Flux HTTP', icon: '🌐' },
        { id: 2, title: 'Service Auth', icon: '🔐' },
        { id: 3, title: 'Component Properties', icon: '⚡' }
    ];

    goToStep(step: number) {
        this.currentStep.set(step);
        this.activeExplanation.set(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    nextStep() {
        if (this.currentStep() < this.steps.length) {
            this.currentStep.update(s => s + 1);
            this.activeExplanation.set(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    previousStep() {
        if (this.currentStep() > 1) {
            this.currentStep.update(s => s - 1);
            this.activeExplanation.set(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    toggleExplanation(line: number) {
        this.activeExplanation.update(current => current === line ? null : line);
    }
}
