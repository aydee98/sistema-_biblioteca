import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  change?: number;
}

interface RecentActivity {
  id: number;
  action: string;
  user: string;
  time: string;
  type: 'user' | 'course' | 'system';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: StatCard[] = [];
  recentActivities: RecentActivity[] = [];
  isLoading = true;

  
  Math = Math;

  ngOnInit(): void {
    setTimeout(() => {
      this.loadStats();
      this.loadRecentActivities();
      this.isLoading = false;
    }, 1000);
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  loadStats(): void {
    this.stats = [
      {
        title: 'Total Usuarios',
        value: 124,
        icon: '👥',
        color: 'blue',
        change: 12
      },
      {
        title: 'Total Cursos',
        value: 45,
        icon: '📚',
        color: 'green',
        change: 5
      },
      {
        title: 'Estudiantes Activos',
        value: 89,
        icon: '🎓',
        color: 'purple',
        change: 8
      },
      {
        title: 'Profesores',
        value: 15,
        icon: '👨‍🏫',
        color: 'orange',
        change: 2
      }
    ];
  }

  loadRecentActivities(): void {
    this.recentActivities = [
      {
        id: 1,
        action: 'Nuevo usuario registrado',
        user: 'Ana Martínez',
        time: 'Hace 5 minutos',
        type: 'user'
      },
      {
        id: 2,
        action: 'Curso actualizado',
        user: 'Curso de Angular',
        time: 'Hace 15 minutos',
        type: 'course'
      }
    ];
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'user': return '👤';
      case 'course': return '📖';
      case 'system': return '⚙️';
      default: return '🔔';
    }
  }

  getActivityColor(type: string): string {
    switch (type) {
      case 'user': return 'activity-user';
      case 'course': return 'activity-course';
      case 'system': return 'activity-system';
      default: return 'activity-default';
    }
  }
}