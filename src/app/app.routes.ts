import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then(m => m.AppComponent)
  },
  {
    path: 'football',
    loadComponent: () => import('./exercice5-football/football/football.component').then(m => m.FootballComponent)
  },
  {
    path: 'countries',
    loadComponent: () => import('./exercice7-countries/countries/countries.component').then(m => m.CountriesComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./exercice8-users/users/users.component').then(m => m.UsersComponent)
  },
  // Explanation Routes
  {
    path: 'football/explanation',
    loadComponent: () => import('./exercice5-football/football-explanation/football-explanation.component').then(m => m.FootballExplanationComponent)
  },
  {
    path: 'football/visual',
    loadComponent: () => import('./exercice5-football/football-explanation-visual/football-explanation-visual.component').then(m => m.FootballExplanationVisualComponent)
  },
  {
    path: 'countries/explanation',
    loadComponent: () => import('./exercice7-countries/countries-explanation/countries-explanation.component').then(m => m.CountriesExplanationComponent)
  },
  {
    path: 'countries/visual',
    loadComponent: () => import('./exercice7-countries/countries-explanation-visual/countries-explanation-visual.component').then(m => m.CountriesExplanationVisualComponent)
  },
  {
    path: 'users/explanation',
    loadComponent: () => import('./exercice8-users/users-explanation/users-explanation.component').then(m => m.UsersExplanationComponent)
  },
  {
    path: 'users/visual',
    loadComponent: () => import('./exercice8-users/users-explanation-visual/users-explanation-visual.component').then(m => m.UsersExplanationVisualComponent)
  }
];
