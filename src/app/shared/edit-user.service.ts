import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user.model'

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  private userToEdit = new BehaviorSubject<User | null>(null);
  currentUser = this.userToEdit.asObservable();

  private isUpdateTableSubject = new BehaviorSubject<boolean>(false);
  isUpdateTable$ = this.isUpdateTableSubject.asObservable(); 

  constructor() {}

  setUserToEdit(user: User) {
    this.userToEdit.next(user);
  }

  clearUserToEdit() {
    this.userToEdit.next(null);
  }

  triggerTableUpdate() {  // Método para notificar actualización
    this.isUpdateTableSubject.next(true);
  }

  resetTableUpdateFlag() {  // Método para resetear el flag
    this.isUpdateTableSubject.next(false);
  }
}
