import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  
  registerForm: FormGroup;
  isModalVisible: boolean = false; 
  modalMessage: string = ''; 
  isUserRegistered: boolean = false;

  constructor(private fb: FormBuilder, private wsService: DataService, private firestoreService: FirestoreService) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      numeroCuenta: ['', Validators.required],
      carrera: ['', Validators.required],
      semestre: ['', Validators.required],
      rfidId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.wsService.onMessage((data: string) => {
      // Cuando se recibe un mensaje del ESP32, actualizar el campo rfidId
      this.registerForm.patchValue({
        rfidId: data
      });
    });
  }

  onSubmit() {
    // Here you would typically call a service to send the newUser data to your backend
    console.log('User to register:', this.registerForm.value);
    this.firestoreService.addUser(this.registerForm.value)
    .then((response) => {
      console.log('Usuario registrado:', response);
      this.cleanForm(); // Limpia el formulario después de registrar
      this.modalMessage = response; // Muestra el mensaje de éxito en el modal
      this.isUserRegistered = true;
      this.isModalVisible = true; // Muestra el modal
    })
    .catch((error) => {
      console.error('Error al registrar usuario:', error);
      this.modalMessage = error; // Muestra el mensaje de error en el modal
      this.isUserRegistered = false;
      this.isModalVisible = true; // Muestra el modal
    });
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
