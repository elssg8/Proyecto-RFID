import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimateService {
  private doorAnimationSubject = new Subject<void>();

  constructor() { }

  // Método para emitir la animación
  triggerAnimation() {
    this.doorAnimationSubject.next();
  }

  // Método para observar la animación
  onAnimation() {
    return this.doorAnimationSubject.asObservable();
  }
}
