import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private socket: WebSocket;

  constructor() {
    // this.socket = new WebSocket('ws://192.168.252.83:5000');
    this.socket = new WebSocket('ws://192.168.1.82:81');

    this.socket.onopen = () => {
      console.log('Conexión WebSocket abierta');
    };

    this.socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };
  }

  public onMessage(callback: (data: string) => void): void {
    this.socket.onmessage = (event) => {
      callback(event.data);
    };
  }

  public sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  } 
}
