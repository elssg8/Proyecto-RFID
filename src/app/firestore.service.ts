import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { AccessRecord } from './access-record.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  async addUser(user: any): Promise<any | string> { // Cambiamos el tipo de retorno
    const userCollection = collection(this.firestore, 'users');

    // Verifica si el usuario ya existe
    const userQuery = query(userCollection, where('numeroCuenta', '==', user.numeroCuenta));
    const rfidQuery = query(userCollection, where('rfid', '==', user.rfid));

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
    return {...user}
  }

  // Método para obtener los usuarios
  async getUsers(): Promise<User[]> {
    const userCollection = collection(this.firestore, 'users');
    const userSnapshot = await getDocs(userCollection);
    
    return userSnapshot.docs.map(doc => doc.data() as User);
  }

  async getUserByRfid(rfid: string): Promise<User | null> {
    const userCollection = collection(this.firestore, 'users');
    const userQuery = query(userCollection, where('rfid', '==', rfid));
    const userSnapshot = await getDocs(userQuery);
    
    if (!userSnapshot.empty) {
      return userSnapshot.docs[0].data() as User; // Retorna el primer usuario encontrado
    }
    return null; // Si no se encuentra, retorna null
  }

  // Método para editar un usuario
  async editUser(user: any): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', user.id);
    await updateDoc(userDocRef, {
      nombre: user.nombre,
      numeroCuenta: user.numeroCuenta,
      carrera: user.carrera,
      semestre: user.semestre,
      rfid: user.rfid // Si el campo RFID está en uso
    });
  }

  // Método para eliminar un usuario
  async deleteUser(numeroCuenta: string): Promise<void> {
    const userCollection = collection(this.firestore, 'users');
    const userQuery = query(userCollection, where('numeroCuenta', '==', numeroCuenta));
  
    const userSnapshot = await getDocs(userQuery);
  
    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0].ref;
      await deleteDoc(userDoc);
    } else {
      throw new Error('Usuario no encontrado');
    }
  }

  async updateUser(user: any): Promise<void> {
    const userCollection = collection(this.firestore, 'users');
    const userQuery = query(userCollection, where('numeroCuenta', '==', user.numeroCuenta));
  
    const userSnapshot = await getDocs(userQuery);
  
    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0].ref;
      await updateDoc(userDoc, user);
    } else {
      throw new Error('Usuario no encontrado');
    }
  }

  async addAccessRecord(accessRecord: any): Promise<void> {
    const accessRecordsCollection = collection(this.firestore, 'accessRecords');
    await addDoc(accessRecordsCollection, accessRecord);
  }

  async getAccessRecords(): Promise<any[]> {
    const accessRecordsCollection = collection(this.firestore, 'accessRecords');
    const accessRecordsSnapshot = await getDocs(accessRecordsCollection);
    
    return accessRecordsSnapshot.docs.map(doc => ({...doc.data() } as AccessRecord));
}

async getUserAccessRecords(rfid: string): Promise<AccessRecord[]> {
    const accessRecordsCollection = collection(this.firestore, 'accessRecords');
    const accessRecordsSnapshot = await getDocs(accessRecordsCollection);
    
    return accessRecordsSnapshot.docs
        .map(doc => ({...doc.data() } as AccessRecord))
        .filter(record => record.rfid === rfid); // Filtra por RFID en lugar de número de cuenta
}
       
}
