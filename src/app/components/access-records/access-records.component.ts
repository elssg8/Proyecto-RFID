import { Component, OnInit } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { FirestoreService } from '../../firestore.service';
import { DataService } from '../../data.service';
import { AnimateService } from '../../shared/animate.service';
import { AccessRecord } from '../../access-record.model';
import { User } from '../../user.model';
import { Timestamp } from 'firebase/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-access-records',
  standalone: true,
  imports: [DatePipe, NgFor, CommonModule],
  templateUrl: './access-records.component.html',
  styleUrl: './access-records.component.css'
})
export class AccessRecordsComponent implements OnInit {
  accessRecords: AccessRecord[] = [];
  isModalVisible: boolean = false;
  isAutoCloseModalVisible: boolean = false; // Modal sin botón de cerrar
  isUserRegistered: boolean = true;
  modalMessage: string = '';
  autoCloseMessage: string = '';
  isNotFound: boolean = false;

  constructor(private firestoreService: FirestoreService, 
    private dataService: DataService,
    private animateService: AnimateService ) {}

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
      fechaHoraEntrada: record.fechaHoraEntrada // Mantiene la fecha de entrada como Timestamp
    }))
    .sort((a, b) => {
      // Verificar si ambos registros tienen fechaHoraEntrada válida antes de ordenar
      const dateA = a.fechaHoraEntrada ? a.fechaHoraEntrada.seconds : 0;
      const dateB = b.fechaHoraEntrada ? b.fechaHoraEntrada.seconds : 0;
      return dateB - dateA; // Ordena de más reciente a más antiguo basado solo en la entrada
    });
}
  
    async registerAccess(rfid: string) {
      const user: User | null = await this.firestoreService.getUserByRfid(rfid);
    
      if (user) {
        // Buscar si ya hay un registro de entrada sin salida
        const records = await this.firestoreService.getUserAccessRecords(rfid);
        const lastAccessRecord = records
          .sort((a, b) => {
            const dateA = a.fechaHoraEntrada ? a.fechaHoraEntrada.seconds : 0;
            const dateB = b.fechaHoraEntrada ? b.fechaHoraEntrada.seconds : 0;
            return dateB - dateA;
          })
          .find(record => !record.fechaHoraSalida); // Buscar el último sin salida
    
        if (lastAccessRecord) {
          // Si ya existe un registro de entrada sin salida, actualiza con la fecha de salida
          lastAccessRecord.fechaHoraSalida = Timestamp.fromDate(new Date());
          await this.firestoreService.updateAccessRecord(lastAccessRecord); // Actualizar el registro

          this.autoCloseMessage = `Hasta luego, ${user.nombre}`;
          this.isAutoCloseModalVisible = true;
          setTimeout(() => this.closeAutoCloseModal(), 5000);

          // Enviar mensaje de salida al ESP32
          this.dataService.sendMessage('salida');
        } else {
          // Si no hay registros sin salida, crea un nuevo registro de entrada
          const newAccessRecord: AccessRecord = {
            rfid: rfid,
            nombre: user.nombre,
            numeroCuenta: user.numeroCuenta,
            carrera: user.carrera,
            semestre: user.semestre,
            fechaHoraEntrada: Timestamp.fromDate(new Date()) // Guardar la entrada
          };
          await this.firestoreService.addAccessRecord(newAccessRecord); // Crear un nuevo registro

          this.autoCloseMessage = `Bienvenido(a), ${user.nombre}`;
          this.isAutoCloseModalVisible = true;
          setTimeout(() => this.closeAutoCloseModal(), 5000);
          
          // Enviar mensaje de entrada al ESP32
          this.dataService.sendMessage('entrada');
        }
    
        // Actualizar la tabla después de registrar el acceso
        await this.loadAccessRecords();
        // Disparar la animación de la puerta
        this.animateService.triggerAnimation();
      } else {
         // Mostrar el modal si el usuario no está registrado
         this.autoCloseMessage = 'El usuario no esta registrado.';
         this.isNotFound = true;
         this.isAutoCloseModalVisible = true;
         setTimeout(() => {
          this.closeAutoCloseModal();
          this.isNotFound = false;
        },3000);
      }
    }

    closeModal() {
      this.isModalVisible = false;
    }

    closeAutoCloseModal() {
      this.isAutoCloseModalVisible = false;
    }
    
}
