import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <main style="max-width: 700px; margin: 2rem auto; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 2.5rem;">
      <h1 style="text-align:center;">Angular 20 - Exercices API</h1>
      <nav style="display: flex; flex-direction: column; gap: 1.5rem; margin: 2.5rem 0;">
        <a routerLink="/football" style="display: flex; align-items: center; gap: 1rem; font-size: 1.2rem; padding: 1rem 1.5rem; border-radius: 8px; background: #f0f9ff; text-decoration: none; border: 1px solid #bae6fd; transition: background 0.2s;">
          <span style="font-size:2rem;">🏈</span>
          <span>
            <strong>Football Data</strong><br>
            <span style="font-size:0.95rem; color:#0369a1;">Classements & buteurs des grandes ligues</span>
          </span>
        </a>
        <a routerLink="/countries" style="display: flex; align-items: center; gap: 1rem; font-size: 1.2rem; padding: 1rem 1.5rem; border-radius: 8px; background: #f0fdf4; text-decoration: none; border: 1px solid #bbf7d0; transition: background 0.2s;">
          <span style="font-size:2rem;">🌍</span>
          <span>
            <strong>Country Explorer</strong><br>
            <span style="font-size:0.95rem; color:#059669;">Recherche et infos détaillées sur les pays</span>
          </span>
        </a>
        <a routerLink="/users" style="display: flex; align-items: center; gap: 1rem; font-size: 1.2rem; padding: 1rem 1.5rem; border-radius: 8px; background: #fef9f5; text-decoration: none; border: 1px solid #fdba74; transition: background 0.2s;">
          <span style="font-size:2rem;">👥</span>
          <span>
            <strong>Random Users</strong><br>
            <span style="font-size:0.95rem; color:#ea580c;">Pagination, filtres et profils aléatoires</span>
          </span>
        </a>
      </nav>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}
