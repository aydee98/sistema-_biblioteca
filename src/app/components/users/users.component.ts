import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  newUser: User = { id: 0, name: '', email: '', role: 'student' };
  editingUser: User | null = null;
  searchTerm: string = '';
  selectedRole: string = 'all';

  roles: string[] = ['admin', 'teacher', 'student'];

  ngOnInit(): void {
    this.loadUsers();
    this.filterUsers();
  }

  loadUsers(): void {
    this.users = [
      { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'admin' },
      { id: 2, name: 'María García', email: 'maria@example.com', role: 'teacher' },
      { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'student' },
      { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'student' },
      { id: 5, name: 'Pedro Rodríguez', email: 'pedro@example.com', role: 'teacher' },
      { id: 6, name: 'Laura Sánchez', email: 'laura@example.com', role: 'admin' }
    ];
    this.filteredUsers = [...this.users];
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesRole = this.selectedRole === 'all' || user.role === this.selectedRole;
      
      return matchesSearch && matchesRole;
    });
  }

  onSearchChange(): void {
    this.filterUsers();
  }

  onFilterChange(): void {
    this.filterUsers();
  }

  addUser(): void {
    if (this.newUser.name && this.newUser.email) {
      const user: User = {
        ...this.newUser,
        id: Date.now()
      };
      this.users.push(user);
      this.resetNewUser();
      this.filterUsers();
      alert('Usuario creado exitosamente!');
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }

  editUser(user: User): void {
    this.editingUser = { ...user };
  }

  updateUser(): void {
    if (this.editingUser) {
      const index = this.users.findIndex(u => u.id === this.editingUser!.id);
      if (index !== -1) {
        this.users[index] = { ...this.editingUser };
      }
      this.cancelEdit();
      this.filterUsers();
      alert('Usuario actualizado exitosamente!');
    }
  }

  cancelEdit(): void {
    this.editingUser = null;
  }

  deleteUser(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.users = this.users.filter(user => user.id !== id);
      this.filterUsers();
    }
  }

  resetNewUser(): void {
    this.newUser = { id: 0, name: '', email: '', role: 'student' };
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'admin': return 'role-admin';
      case 'teacher': return 'role-teacher';
      case 'student': return 'role-student';
      default: return 'role-default';
    }
  }

  getRoleDisplayName(role: string): string {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'teacher': return 'Profesor';
      case 'student': return 'Estudiante';
      default: return role;
    }
  }

  getTotalUsers(): number {
    return this.users.length;
  }

  getUsersByRole(role: string): number {
    return this.users.filter(user => user.role === role).length;
  }
}