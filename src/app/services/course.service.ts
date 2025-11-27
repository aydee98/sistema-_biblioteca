import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    
    const mockCourses: Course[] = [
      { id: 1, name: 'Angular Básico', description: 'Introducción a Angular y TypeScript', duration: 20, instructor: 'Juan Pérez', price: 100 },
      { id: 2, name: 'TypeScript Avanzado', description: 'Conceptos avanzados de TypeScript', duration: 15, instructor: 'María García', price: 150 },
      { id: 3, name: 'JavaScript Moderno', description: 'ES6+ y características modernas', duration: 25, instructor: 'Carlos López', price: 120 },
      { id: 4, name: 'Node.js Backend', description: 'Desarrollo backend con Node.js', duration: 30, instructor: 'Ana Martínez', price: 200 },
      { id: 5, name: 'React Fundamentals', description: 'Introducción a React', duration: 18, instructor: 'Pedro Rodríguez', price: 110 }
    ];

    return of(mockCourses).pipe(delay(1000));
  }

  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    const newCourse: Course = {
      ...course,
      id: Date.now()
    };
    return of(newCourse).pipe(delay(500));
  }

  updateCourse(course: Course): Observable<Course> {
    return of(course).pipe(delay(500));
  }

  deleteCourse(id: number): Observable<boolean> {
    return of(true).pipe(delay(500));
  }
}