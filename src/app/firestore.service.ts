import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  async addUser(user: any): Promise<any | string> { // Cambiamos el tipo de retorno
    const userCollection = collection(this.firestore, 'users');

    // Verifica si el usuario ya existe
    const userQuery = query(userCollection, where('numeroCuenta', '==', user.numeroCuenta));
    const rfidQuery = query(userCollection, where('rfidId', '==', user.rfidId));

    const userSnapshot = await getDocs(userQuery);
    const rfidSnapshot = await getDocs(rfidQuery);

    if (!userSnapshot.empty) {
      return 'El número de cuenta ya está registrado.'; // Mensaje de error si ya existe
    }

    if (!rfidSnapshot.empty) {
      return 'El RFID ya está registrado.'; // Mensaje de error si ya existe
    }

    // Agrega el nuevo usuario
    await addDoc(userCollection, user);
    return { ...user }; // Retorna el usuario agregado
  }

}
