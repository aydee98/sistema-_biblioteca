import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Course {
  id: number;
  name: string;
  description: string;
  duration: number;
  instructor: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  students: number;
  rating: number;
  isActive: boolean;
  startDate: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  newCourse: Course = {
    id: 0,
    name: '',
    description: '',
    duration: 0,
    instructor: '',
    category: '',
    level: 'beginner',
    price: 0,
    students: 0,
    rating: 0,
    isActive: true,
    startDate: ''
  };
  
  editingCourse: Course | null = null;
  searchTerm: string = '';
  selectedCategory: string = 'all';
  selectedLevel: string = 'all';
  
  categories: string[] = ['Programación', 'Diseño', 'Marketing', 'Negocios', 'Idiomas'];
  levels: string[] = ['beginner', 'intermediate', 'advanced'];

  ngOnInit(): void {
    this.loadCourses();
    this.filterCourses();
  }

  loadCourses(): void {
    // Datos de ejemplo
    this.courses = [
      {
        id: 1,
        name: 'Angular desde Cero',
        description: 'Aprende Angular desde los fundamentos hasta conceptos avanzados',
        duration: 40,
        instructor: 'María García',
        category: 'Programación',
        level: 'beginner',
        price: 299,
        students: 125,
        rating: 4.8,
        isActive: true,
        startDate: '2024-01-15'
      },
      {
        id: 2,
        name: 'TypeScript Avanzado',
        description: 'Domina TypeScript con patrones avanzados y mejores prácticas',
        duration: 25,
        instructor: 'Carlos López',
        category: 'Programación',
        level: 'advanced',
        price: 199,
        students: 89,
        rating: 4.9,
        isActive: true,
        startDate: '2024-02-01'
      },
      {
        id: 3,
        name: 'Diseño UX/UI',
        description: 'Principios de diseño de experiencia e interfaz de usuario',
        duration: 30,
        instructor: 'Ana Martínez',
        category: 'Diseño',
        level: 'intermediate',
        price: 249,
        students: 156,
        rating: 4.7,
        isActive: true,
        startDate: '2024-01-20'
      }
    ];
    this.filteredCourses = [...this.courses];
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || course.category === this.selectedCategory;
      const matchesLevel = this.selectedLevel === 'all' || course.level === this.selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }

  onSearchChange(): void {
    this.filterCourses();
  }

  onFilterChange(): void {
    this.filterCourses();
  }

  addCourse(): void {
    if (this.newCourse.name && this.newCourse.description && this.newCourse.instructor) {
      const course: Course = {
        ...this.newCourse,
        id: Date.now(),
        students: 0,
        rating: 0
      };
      this.courses.push(course);
      this.resetNewCourse();
      this.filterCourses();
      alert('Curso creado exitosamente!');
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }

  editCourse(course: Course): void {
    this.editingCourse = { ...course };
  }

  updateCourse(): void {
    if (this.editingCourse) {
      const index = this.courses.findIndex(c => c.id === this.editingCourse!.id);
      if (index !== -1) {
        this.courses[index] = { ...this.editingCourse };
      }
      this.cancelEdit();
      this.filterCourses();
      alert('Curso actualizado exitosamente!');
    }
  }

  cancelEdit(): void {
    this.editingCourse = null;
  }

  deleteCourse(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este curso?')) {
      this.courses = this.courses.filter(course => course.id !== id);
      this.filterCourses();
    }
  }

  toggleCourseStatus(course: Course): void {
    course.isActive = !course.isActive;
  }

  resetNewCourse(): void {
    this.newCourse = {
      id: 0,
      name: '',
      description: '',
      duration: 0,
      instructor: '',
      category: '',
      level: 'beginner',
      price: 0,
      students: 0,
      rating: 0,
      isActive: true,
      startDate: ''
    };
  }

  getLevelDisplayName(level: string): string {
    switch (level) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return level;
    }
  }

  getLevelBadgeClass(level: string): string {
    switch (level) {
      case 'beginner': return 'level-beginner';
      case 'intermediate': return 'level-intermediate';
      case 'advanced': return 'level-advanced';
      default: return 'level-default';
    }
  }

  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
  }

  getTotalStudents(): number {
    return this.courses.reduce((total, course) => total + course.students, 0);
  }

  getTotalRevenue(): number {
    return this.courses.reduce((total, course) => total + (course.price * course.students), 0);
  }
}