import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'deadline',
    loadComponent: () => import('./features/deadline-timer/components/deadline-timer/deadline-timer.component').then(m => m.DeadlineTimerComponent)
  },
  {
    path:'**',
    redirectTo: 'unknown'
  }
];
