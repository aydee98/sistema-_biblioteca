import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    
    const mockUsers: User[] = [
      { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'admin' },
      { id: 2, name: 'María García', email: 'maria@example.com', role: 'teacher' },
      { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'student' },
      { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'student' },
      { id: 5, name: 'Pedro Rodríguez', email: 'pedro@example.com', role: 'teacher' }
    ];

    return of(mockUsers).pipe(delay(1000));
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    const newUser: User = {
      ...user,
      id: Date.now()
    };
    return of(newUser).pipe(delay(500));
  }

  updateUser(user: User): Observable<User> {
    return of(user).pipe(delay(500));
  }

  deleteUser(id: number): Observable<boolean> {
    return of(true).pipe(delay(500));
  }
}