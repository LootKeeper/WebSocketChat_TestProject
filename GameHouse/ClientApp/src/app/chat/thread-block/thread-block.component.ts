import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'thread-block',
  templateUrl: './thread-block.component.html',
  styleUrls: ['./thread-block.component.css']
})
export class ThreadBlockComponent {

  @Input() messages: Message[];

  constructor() { }

  trackById(index, message) {
    return index;
  }
}
