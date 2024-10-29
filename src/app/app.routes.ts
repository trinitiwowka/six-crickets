import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'deadline',
    loadComponent: () => import('./features/deadline-timer/components/deadline-timer/deadline-timer.component').then(m => m.DeadlineTimerComponent)
  },
  {
    path: 'camera',
    loadComponent: () => import('./features/camera/pages/camera-demo-page/camera-demo-page.component').then(m => m.CameraDemoPageComponent)
  },
  {
    path: '**',
    redirectTo: 'deadline'
  }
];
