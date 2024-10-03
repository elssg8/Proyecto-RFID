import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateService } from '../../shared/animate.service';


@Component({
  selector: 'app-access-simulation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './access-simulation.component.html',
  styleUrl: './access-simulation.component.css'
})
export class AccessSimulationComponent {
  doorState: string = ''; // No animation initially

  constructor(private animateService: AnimateService) {}

  ngOnInit() {
    this.animateService.onAnimation().subscribe(() => {
      this.simulateAccess();
    });
  }

  simulateAccess() {
    this.openDoor();

    // Cierra la puerta después de 10 segundos
    setTimeout(() => {
      this.closeDoor();
    }, 5000); // 10000ms = 10 segundos
  }

  openDoor() {
    this.doorState = 'animate-open';
  }

  closeDoor() {
    this.doorState = 'animate-close';
  }
}
