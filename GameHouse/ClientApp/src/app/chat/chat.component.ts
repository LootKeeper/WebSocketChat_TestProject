import { Component, OnInit, Input } from '@angular/core';
import { ChatData } from '../models/chatData';
import { Message } from '../models/message';
import { User } from '../models/user';
import { ChatService } from '../services/chat.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {    

  @Input() data: ChatData
  @Input() user: User;

  constructor(private chatService: ChatService) {
    this.chatService.getChatData().subscribe(data => {
      this.data = data
      this.subscribeOnNotifications();
    });    
  }

  private subscribeOnNotifications() {
    this.chatService.getNotifications()
      .pipe(
        debounceTime(700),
        distinctUntilChanged())
      .subscribe(message => this.data.push(message));
  }

  private send(message: Message) {
    this.chatService.sendMessage(message);
  }

  handleUserInput(msg: string) {
    this.send(new Message(this.user, msg));
  }
}
