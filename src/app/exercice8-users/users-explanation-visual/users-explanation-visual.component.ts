import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-users-explanation-visual",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./users-explanation-visual.component.html",
  styleUrls: ["./users-explanation-visual.component.css"]
})
export class UsersExplanationVisualComponent {
  currentStep = signal(1);

  steps = [
    { id: 1, title: "HttpParams", icon: "🔗" },
    { id: 2, title: "Load More", icon: "🔄" },
    { id: 3, title: "Filtres", icon: "🎯" }
  ];

  goToStep(step: number) {
    this.currentStep.set(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  nextStep() {
    if (this.currentStep() < this.steps.length) {
      this.currentStep.update(s => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}
