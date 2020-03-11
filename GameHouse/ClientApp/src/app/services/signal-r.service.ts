import { Injectable, Inject } from '@angular/core';
import * as SignalR from '@aspnet/signalr';
import { IListener } from '../models/listener';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  hubConnection: SignalR.HubConnection;
  listeners: IListener[] = [];
  baseUrl: string;

  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public addDataListener(listener: IListener) {
    if (!this.hubConnection) throw 'call startConnection before.';
    this.listeners.push(listener);
  }

  public send(msg: Message) {
    this.hubConnection.invoke("SendMessage", msg);
  }

  public startConnection() {
    if (this.hubConnection) return;

    const url = this.baseUrl + 'chathub';

    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: SignalR.HttpTransportType.WebSockets 
        })
      .build(); 

    this.hubConnection.start()
      .then(() => this.bindListener())
      .catch((e) => {
        console.log(e);
      });  
  }

  private bindListener() {
    this.hubConnection.on('ReceiveMessage', (msg: Message) => this.listeners.forEach((listener) => listener.onReceive(msg)));
  }
}
