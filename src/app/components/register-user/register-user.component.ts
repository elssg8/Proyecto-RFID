import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private wsService: DataService) {
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
    this.cleanForm();
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
}
