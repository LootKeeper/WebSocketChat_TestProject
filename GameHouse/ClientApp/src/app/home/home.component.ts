import { Component } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { IListener } from '../models/listener';
import { Message } from '../models/message';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {    

  private isLoggedIn: boolean;
  private user: User;

  private userName: string;

  constructor(private authService: AuthService) {}

  handleLogin() {
    if (this.userName) {
      this.authService.auth(this.userName).subscribe(user => {
        this.user = user;
        this.isLoggedIn = true;
      });      
    }
  }
}
