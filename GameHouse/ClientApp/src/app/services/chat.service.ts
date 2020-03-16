import { SignalRService } from './signal-r.service';
import { IListener } from '../models/listener';
import { Message } from '../models/message';
import { Observable, Observer, pipe } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { ChatData } from '../models/chatData';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements IListener {    

  private _notifyOnMessage: Observable<Message>;
  private _notificationObserver: Observer<Message>;

  constructor(
    private signalr: SignalRService,
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient) { }

  getChatData(): Observable<ChatData> {
    return this.http.get<ChatData>(this.baseUrl + 'api/chat/data');
  }

  getNotifications(): Observable<Message> {
    this._startUpSignalr();
    this._notifyOnMessage = new Observable<Message>(observer => this._notificationObserver = observer);
    return this._notifyOnMessage;
  }

  sendMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post(this.baseUrl + 'api/chat/send', body, { headers: headers });
  }

  onReceive(message: Message) {
    this._notificationObserver.next(message);
  }

  private _startUpSignalr() {
    this.signalr.startConnection();
    this.signalr.addDataListener(this);
  }
}
