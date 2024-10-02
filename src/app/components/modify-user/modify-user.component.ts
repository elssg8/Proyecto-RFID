import { Component } from '@angular/core';
import { User } from '../../user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modify-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modify-user.component.html',
  styleUrl: './modify-user.component.css'
})
export class ModifyUserComponent {
  users: User[] = [
    { id: 1, nombre: 'Juan Pérez', numeroCuenta: '20230001', carrera: 'Ingeniería Informática', semestre: 3 },
    { id: 2, nombre: 'María García', numeroCuenta: '20230002', carrera: 'Medicina', semestre: 5 },
    { id: 3, nombre: 'Carlos Rodríguez', numeroCuenta: '20230003', carrera: 'Derecho', semestre: 2 },
    { id: 4, nombre: 'Ana Martínez', numeroCuenta: '20230004', carrera: 'Arquitectura', semestre: 4 },
    { id: 5, nombre: 'Luis Sánchez', numeroCuenta: '20230005', carrera: 'Psicología', semestre: 1 },
    { id: 6, nombre: 'Elena López', numeroCuenta: '20230006', carrera: 'Ingeniería Civil', semestre: 2 },
    { id: 7, nombre: 'Miguel Torres', numeroCuenta: '20230007', carrera: 'Ingeniería Eléctrica', semestre: 3 },
    { id: 8, nombre: 'Laura Ramírez', numeroCuenta: '20230008', carrera: 'Ingeniería Mecánica', semestre: 4 },
    { id: 9, nombre: 'Javier Gómez', numeroCuenta: '20230009', carrera: 'Ingeniería Química', semestre: 5 },
    { id: 10, nombre: 'Sandra Díaz', numeroCuenta: '20230010', carrera: 'Ingeniería Industrial', semestre: 6 }
  ];

  editUser(user: User) {
    // Implement edit logic here
    console.log('Editing user:', user);
  }

  deleteUser(user: User): void {
    // Implement user deletion logic here
    console.log('Deleting user:', user);
  }
}
