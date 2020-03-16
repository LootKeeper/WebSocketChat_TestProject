import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatData } from '../models/chatData';
import { Message } from '../models/message';
import { User } from '../models/user';
import { ChatService } from '../services/chat.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnDestroy {    

  @Input() user: User;

  data: ChatData;  
  private messageSubscription: Subscription;

  constructor(private chatService: ChatService) {
    this.chatService.getChatData().subscribe(data => {
      this.data = new ChatData(data.messages);
      this.subscribeOnNotifications();
    });    
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();   
  }

  private subscribeOnNotifications() {
    this.messageSubscription = this.chatService.getNotifications()
      .pipe(
        debounceTime(700),
        distinctUntilChanged())
      .subscribe(message => this.data.push(message));
  }

  private send(message: Message) {
    this.chatService.sendMessage(message).subscribe(
      {
        next: result => {

        },
        error: e => {
          this.messageSubscription.unsubscribe();
          console.log(e);
        }
      });
  }

  handleUserInput(msg: string) {
    this.send(new Message(this.user, msg));
  }
}
