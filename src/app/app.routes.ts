import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { CoursesComponent } from './components/courses/courses.component';
import { authGuard } from './guards/auth.guard'; // Cambié AuthGuard por authGuard

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard] // Cambié AuthGuard por authGuard
  },
  { 
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard] // Cambié AuthGuard por authGuard
  },
  { 
    path: 'courses',
    component: CoursesComponent,
    canActivate: [authGuard] // Cambié AuthGuard por authGuard
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];