import { Injectable, Inject } from '@angular/core';
import * as SignalR from '@aspnet/signalr';
import { IListener } from '../models/listener';
import { Message } from '../models/message';
import ISourceListener from '../models/sourceListener';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  hubConnection: SignalR.HubConnection;
  listeners: ISourceListener<Message>[] = [];
  baseUrl: string;

  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public addDataListener(listener: ISourceListener<Message>) {
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
        this.notifyListenersOnClose(e);
        console.log(e);
      });
    this.hubConnection.onclose((e) => this.notifyListenersOnClose(e));
  }

  private bindListener() {
    this.hubConnection.on('ReceiveMessage', (msg: Message) => this.listeners.forEach((listener) => listener.notify(msg)));
  }

  private notifyListenersOnClose(e: Error) {
    this.listeners.forEach((listener) => listener.notifyOnClosed());
  }
}
