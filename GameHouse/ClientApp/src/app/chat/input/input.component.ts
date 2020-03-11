import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'chat-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Output() _emmitMessage: EventEmitter<string> = new EventEmitter();
  @ViewChild('messageInput', { static: false }) input: ElementRef<HTMLInputElement>;

  handleInput() {    
    this._emmitMessage.emit(this.input.nativeElement.value);
    this.input.nativeElement.value = '';
  }
}
