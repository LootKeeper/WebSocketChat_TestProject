import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../../models/message';
import { User } from '../../models/user';
import { ChatData } from '../../models/chatData';
import { IListener } from '../../models/listener';

@Component({
  selector: 'thread-block',
  templateUrl: './thread-block.component.html',
  styleUrls: ['./thread-block.component.css']
})
export class ThreadBlockComponent {    

  messages: Message[];

  @Input() set chatData(value: ChatData) {    
    if (value) {
      this.messages = value.messages;
    }
  }

  @Input() currentUser: User;
  @ViewChild('thread', { static: false }) private thread: ElementRef;

  constructor() { }

  isSelf(message: Message) {
    return message.user.userId == this.currentUser.userId;
  }

  _trackById(index, message) {
    return index;
  }

  ngAfterViewChecked() {
    this._scrollThreadToBottom();
  }

  _scrollThreadToBottom() {
    this.thread.nativeElement.scrollTop = this.thread.nativeElement.scrollHeight;
  }
}
