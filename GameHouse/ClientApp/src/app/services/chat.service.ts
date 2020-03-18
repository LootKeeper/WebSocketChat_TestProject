import { SignalRService } from './signal-r.service';
import { IListener } from '../models/listener';
import { Message } from '../models/message';
import { Observable, Observer, pipe } from 'rxjs';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ChatData } from '../models/chatData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ISourceListener from '../models/sourceListener';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements ISourceListener<Message>, OnDestroy {    

  private _notifyOnMessage: Observable<Message>;
  private _notificationObserver: Observer<Message>;

  constructor(
    private signalr: SignalRService,
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient,
    private authService: AuthService) { }

  ngOnDestroy() {
    this._notificationObserver.complete();
  }

  getChatData(): Observable<ChatData> {
    const headers = this.getAuthHeaders();
    return this.http.get<ChatData>(this.baseUrl + 'api/chat/data', { headers: headers });
  }

  getNotifications(): Observable<Message> {
    this._startUpSignalr();
    this._notifyOnMessage = new Observable<Message>(observer => this._notificationObserver = observer);
    return this._notifyOnMessage;
  }

  sendMessage(message: string) {
    const body = { text: message }
    let headers = this.getAuthHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + 'api/chat/send', body, { headers: headers });
  }

  notify(message: Message) {
    this._notificationObserver.next(message);
  }

  notifyOnClosed() {
    this._notificationObserver.error('Disconected from chat');    
  }

  private _startUpSignalr() {
    this.signalr.startConnection();
    this.signalr.addDataListener(this);
  }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.authService.getToken());
    return headers;
  }
}
