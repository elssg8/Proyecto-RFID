import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { FirestoreService } from '../../firestore.service';
import { NgOptimizedImage } from '@angular/common';
import { User } from '../../user.model';
import { EditUserService } from '../../shared/edit-user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOptimizedImage],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  
  registerForm: FormGroup;
  isModalVisible: boolean = false; 
  modalMessage: string = ''; 
  isUserRegistered: boolean = false;
  isUserEdited: boolean = false;
  isEditMode: boolean = false;  // Nuevo estado para saber si estamos editando
  currentUser: User | null = null;  // Usuario actual a editar

  constructor(private fb: FormBuilder, 
    private wsService: DataService, 
    private firestoreService: FirestoreService,
    private userEditService: EditUserService) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      numeroCuenta: ['', Validators.required],
      carrera: ['', Validators.required],
      semestre: ['', Validators.required],
      rfid: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.wsService.onMessage((data: string) => {
      // Cuando se recibe un mensaje del ESP32, actualizar el campo rfidId
      this.registerForm.patchValue({
        rfid: data
      });
    });

    // Escuchamos el usuario que se va a editar desde el servicio EditUserService
    this.userEditService.currentUser.subscribe((user: User | null) => {
      if (user) {
        this.setUserForEdit(user); // Llenar el formulario con los datos del usuario
      }
    });
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      // Si el formulario no es válido, mostrar un mensaje de error en el modal
      this.modalMessage = 'Por favor, complete todos los campos requeridos.';
      this.isUserRegistered = false;
      this.isModalVisible = true;
      return;  // Detener la ejecución si el formulario no es válido
    }

    if (this.isEditMode && this.currentUser) {
      // Si estamos editando un usuario existente
      this.firestoreService.updateUser(this.registerForm.value)
        .then(() => {
          this.cleanForm();
          this.isUserRegistered = true;
          this.modalMessage = 'Usuario actualizado correctamente';
          this.isEditMode = false;  // Salir del modo de edición
          this.isModalVisible = true; // Muestra el modal
          
          this.userEditService.triggerTableUpdate();
        })
        .catch((error) => {
          console.error('Error al actualizar usuario:', error);
        });
    } else {
      // Registrar nuevo usuario
      this.firestoreService.addUser(this.registerForm.value)
      .then((response) => {
        console.log('Usuario registrado:', response);
        this.cleanForm(); // Limpia el formulario después de registrar
        
        if (response === 'El número de cuenta ya está registrado.') {
          this.modalMessage = response; // Muestra el mensaje de éxito en el modal
          this.isUserRegistered = false;
        } else if (response === 'El RFID ya está registrado.') {
          this.modalMessage = response; // Muestra el mensaje de éxito en el modal
          this.isUserRegistered = false;
        } else {
          this.isUserRegistered = true;
          this.modalMessage = 'Usuario registrado correctamente'; // Muestra el mensaje de éxito en el modal
        }
        this.isModalVisible = true; // Muestra el modal
        this.userEditService.triggerTableUpdate();
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
        this.modalMessage = error; // Muestra el mensaje de error en el modal
        this.isUserRegistered = false;
        this.isModalVisible = true; // Muestra el modal
      });
    }
  }

  // Método para cargar datos del usuario a editar en el formulario
  setUserForEdit(user: User) {
    this.registerForm.patchValue({
      nombre: user.nombre,
      numeroCuenta: user.numeroCuenta,
      carrera: user.carrera,
      semestre: user.semestre,
      rfid: user.rfid
    });
    this.isEditMode = true;  // Activamos el modo de edición
    this.currentUser = user;  // Guardamos el usuario actual
  }

  cancelEdit() {
    this.cleanForm(); // Limpia el formulario
    this.isEditMode = false; // Cambia a modo de registro
    this.currentUser = null; // Limpia el usuario actual
  }
  

  cleanForm() {
    this.registerForm.reset({
      nombre: '',
      numeroCuenta: '',
      carrera: '',
      semestre: '',
      rfidId: ''
    });
  }

  closeModal() {
    this.isModalVisible = false; // Oculta el modal
  }

}
