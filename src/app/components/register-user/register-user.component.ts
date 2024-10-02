import { Component } from '@angular/core';
import { User } from '../../user.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  newUser: User = {
    nombre: '',
    numeroCuenta: '',
    carrera: '',
    semestre: 0
  };

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      numeroCuenta: ['', Validators.required],
      carrera: ['', Validators.required],
      semestre: ['', Validators.required],
      rfidId: ['AABBCCDDEEFF', Validators.required]
    });
  }

  onSubmit() {
    // Here you would typically call a service to send the newUser data to your backend
    console.log('User to register:', this.registerForm.value);
    this.cleanForm();
  }

  cleanForm() {
    this.registerForm.reset({
      nombre: '',
      numeroCuenta: '',
      carrera: '',
      semestre: '',
      rfidId: 'AABBCCDDEEFF'
    });
  }
}
