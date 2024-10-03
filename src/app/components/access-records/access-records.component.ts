import { Component, OnInit } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { FirestoreService } from '../../firestore.service';
import { DataService } from '../../data.service';
import { AccessRecord } from '../../access-record.model';
import { User } from '../../user.model';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-access-records',
  standalone: true,
  imports: [DatePipe, NgFor],
  templateUrl: './access-records.component.html',
  styleUrl: './access-records.component.css'
})
export class AccessRecordsComponent implements OnInit {
  accessRecords: AccessRecord[] = [];

  constructor(private firestoreService: FirestoreService, 
    private dataService: DataService) {}

    ngOnInit() {
      this.loadAccessRecords();
      this.dataService.onMessage((data: string) => {
        const rfid = data; // Suponiendo que el ESP32 envía solo el RFID
        this.registerAccess(rfid);
      });
    }

    async loadAccessRecords() {
      const records = await this.firestoreService.getAccessRecords();
      this.accessRecords = records
        .map(record => ({
          ...record,
          fechaHora: record.fechaHora // Mantiene como Timestamp para el modelo
        }))
        .sort((a, b) => b.fechaHora.seconds - a.fechaHora.seconds); // Ordena de más reciente a más antiguo
    }
  
    async registerAccess(rfid: string) {
      const user: User | null = await this.firestoreService.getUserByRfid(rfid);
    
      if (user) {
        // Obtener registros de acceso anteriores para el mismo RFID
        const records = await this.firestoreService.getUserAccessRecords(rfid);
        
        // Ordenar los registros por fecha, de más reciente a más antiguo
        const sortedRecords = records
          .map(record => ({
            ...record
          }))
          .sort((a, b) => b.fechaHora.seconds - a.fechaHora.seconds);
        
        // Determinar tipo de acceso por defecto es 'Entrada'
        let tipoAcceso: 'Entrada' | 'Salida' = 'Entrada'; 
        
        if (sortedRecords.length > 0) {
          // Obtén el último registro de acceso
          const lastAccessRecord = sortedRecords[0]; // El más reciente es el primero en la lista
          
          // Cambiar el tipo de acceso según el último registro
          tipoAcceso = (lastAccessRecord.tipoAcceso === 'Entrada') ? 'Salida' : 'Entrada';
        }
    
        // Crear un nuevo registro de acceso
        const accessRecord: AccessRecord = {
          rfid: rfid,
          nombre: user.nombre,
          numeroCuenta: user.numeroCuenta,
          carrera: user.carrera,
          semestre: user.semestre,
          fechaHora: Timestamp.fromDate(new Date()), // Usar Timestamp para fecha y hora actual
          tipoAcceso: tipoAcceso
        };
    
        // Guardar el registro en la base de datos
        await this.firestoreService.addAccessRecord(accessRecord);
        
        // Actualizar la tabla después de registrar el acceso
        await this.loadAccessRecords(); 
      } else {
        console.error('Usuario no encontrado para el RFID:', rfid);
        // Aquí podrías manejar el caso cuando el usuario no se encuentra, como mostrar una alerta
      }
    }
}
