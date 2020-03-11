import { Component } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { IListener } from '../models/listener';
import { Message } from '../models/message';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {    

  private isLoggedIn: boolean;
  private user: User;

  private userName: string;

  handleLogin() {
    if (this.userName) {
      this.user = new User(1, this.userName, '');
      this.isLoggedIn = true;
    }
  }
}
