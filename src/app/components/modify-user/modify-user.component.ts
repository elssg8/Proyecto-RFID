import { Component } from '@angular/core';
import { User } from '../../user.model';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../firestore.service';
import { EditUserService } from '../../shared/edit-user.service';

@Component({
  selector: 'app-modify-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modify-user.component.html',
  styleUrl: './modify-user.component.css'
})
export class ModifyUserComponent {
  users: User[] = [];
  isModalVisible: boolean = false; 
  modalMessage: string = ''; 
  isConfirmModalVisible: boolean = false; 
  userToDelete: User | null = null;

  constructor(private firestoreService: FirestoreService, private userEditService: EditUserService) {}

  ngOnInit(): void {
    this.loadUsers();

    // Escuchar las notificaciones para actualizar la tabla
    this.userEditService.isUpdateTable$.subscribe((shouldUpdate) => {
      if (shouldUpdate) {
        this.loadUsers();  // Recargar los usuarios
        this.userEditService.resetTableUpdateFlag();  // Resetear el flag
      }
    });
  }

  async loadUsers() {
    this.users = await this.firestoreService.getUsers();
  }

  editUser(user: User) {
    this.userEditService.setUserToEdit(user); // Envía los datos al servicio
  }

  confirmDelete(user: User) {
    this.userToDelete = user;  // Almacena el usuario a eliminar
    this.isConfirmModalVisible = true;  // Muestra el modal de confirmación
  }

  async deleteUser() {
    if (this.userToDelete) {
      try {
        await this.firestoreService.deleteUser(this.userToDelete.numeroCuenta);
        this.loadUsers();  // Recargar los usuarios
        this.modalMessage = 'Usuario eliminado correctamente';
        this.isModalVisible = true; // Muestra el modal de éxito
        this.closeConfirmModal();  // Cierra el modal de confirmación
      } catch (error) {
        console.error('Error al eliminar el usuario', error);
      }
    }
  }

  closeConfirmModal() {
    this.isConfirmModalVisible = false; // Oculta el modal de confirmación
  }

  closeModal() {
    this.isModalVisible = false; // Oculta el modal
  }

}
