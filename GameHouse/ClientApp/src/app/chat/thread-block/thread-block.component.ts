import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'thread-block',
  templateUrl: './message-block.component.html',
  styleUrls: ['./message-block.component.css']
})
export class ThreadBlockComponent {

  @Input() messages: Message[];

  constructor() { }

  trackById(index, message) {
    return index;
  }
}
