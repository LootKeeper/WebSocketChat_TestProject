import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../models/message';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input() message: Message;

  constructor() { }
}
