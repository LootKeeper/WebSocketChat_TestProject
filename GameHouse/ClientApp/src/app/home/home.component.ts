import { Component } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { IListener } from '../models/listener';
import { Message } from '../models/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements IListener {    

  name: string;
  message: string;

  constructor(private signalRService: SignalRService) {
    signalRService.startConnection();
    signalRService.addDataListener(this);
  }

  public send() {
    this.signalRService.send(new Message(this.name, this.message));
  }

  public onReceive(message: Message) {
    console.log(message);
  }
}
