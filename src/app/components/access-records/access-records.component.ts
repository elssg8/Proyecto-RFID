import { Component } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';

interface AccessRecord {
  nombre: string;
  numeroCuenta: string;
  carrera: string;
  semestre: number;
  fechaHora: Date;
  tipoAcceso: string;
}

@Component({
  selector: 'app-access-records',
  standalone: true,
  imports: [DatePipe, NgFor],
  templateUrl: './access-records.component.html',
  styleUrl: './access-records.component.css'
})
export class AccessRecordsComponent {
  accessRecords: AccessRecord[] = [
    {
      nombre: 'Juan Pérez',
      numeroCuenta: '20180001',
      carrera: 'Ingeniería en Sistemas',
      semestre: 6,
      fechaHora: new Date('2023-05-15T08:30:00'),
      tipoAcceso: 'Entrada'
    },
    {
      nombre: 'María García',
      numeroCuenta: '20190002',
      carrera: 'Medicina',
      semestre: 4,
      fechaHora: new Date('2023-05-15T09:15:00'),
      tipoAcceso: 'Entrada'
    },
    {
      nombre: 'Carlos Rodríguez',
      numeroCuenta: '20200003',
      carrera: 'Derecho',
      semestre: 2,
      fechaHora: new Date('2023-05-15T14:45:00'),
      tipoAcceso: 'Salida'
    },
    {
      nombre: 'Carlos Rodríguez',
      numeroCuenta: '20200003',
      carrera: 'Derecho',
      semestre: 2,
      fechaHora: new Date('2023-05-15T14:45:00'),
      tipoAcceso: 'Salida'
    },
    {
      nombre: 'Carlos Rodríguez',
      numeroCuenta: '20200003',
      carrera: 'Derecho',
      semestre: 2,
      fechaHora: new Date('2023-05-15T14:45:00'),
      tipoAcceso: 'Salida'
    },
    {
      nombre: 'Carlos Rodríguez',
      numeroCuenta: '20200003',
      carrera: 'Derecho',
      semestre: 2,
      fechaHora: new Date('2023-05-15T14:45:00'),
      tipoAcceso: 'Salida'
    },
    {
      nombre: 'Carlos Rodríguez',
      numeroCuenta: '20200003',
      carrera: 'Derecho',
      semestre: 2,
      fechaHora: new Date('2023-05-15T14:45:00'),
      tipoAcceso: 'Salida'
    },
    {
      nombre: 'Carlos Rodríguez',
      numeroCuenta: '20200003',
      carrera: 'Derecho',
      semestre: 2,
      fechaHora: new Date('2023-05-15T14:45:00'),
      tipoAcceso: 'Salida'
    },
    {
      nombre: 'Carlos Rodríguez',
      numeroCuenta: '20200003',
      carrera: 'Derecho',
      semestre: 2,
      fechaHora: new Date('2023-05-15T14:45:00'),
      tipoAcceso: 'Salida'
    }
  ];
}
