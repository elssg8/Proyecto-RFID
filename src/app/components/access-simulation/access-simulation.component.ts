import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-access-simulation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './access-simulation.component.html',
  styleUrl: './access-simulation.component.css'
})
export class AccessSimulationComponent {
  doorState: string = ''; // No animation initially

  openDoor() {
    this.doorState = 'animate-open';
  }

  closeDoor() {
    this.doorState = 'animate-close';
  }
}
