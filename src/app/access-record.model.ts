import { Timestamp } from 'firebase/firestore'; // Asegúrate de importar Timestamp

export interface AccessRecord {
    rfid?: string; // Para almacenar el ID del documento en Firestore
    nombre: string;
    numeroCuenta: string;
    carrera: string;
    semestre: number;
    fechaHoraEntrada: Timestamp; // Cambiar Date a Timestamp
    fechaHoraSalida?: Timestamp; // Nuevo campo opcional
}