import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ModifyUserComponent } from './components/modify-user/modify-user.component';
import { AccessRecordsComponent } from './components/access-records/access-records.component';
import { AccessSimulationComponent } from './components/access-simulation/access-simulation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RegisterUserComponent, ModifyUserComponent, AccessRecordsComponent, AccessSimulationComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-rfid';
  showAccessRecords = true; // Controla qué componente mostrar

  toggleComponents() {
    this.showAccessRecords = !this.showAccessRecords;
  }
}
