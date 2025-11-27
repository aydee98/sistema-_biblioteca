import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(email: string, password: string): Observable<boolean> {
    if (email === 'admin@example.com' && password === 'password') {
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token';
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify({
        name: 'Administrador',
        email: email,
        role: 'admin'
      }));
      return of(true).pipe(delay(1000));
    }
    return of(false).pipe(delay(1000));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}