import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SignalRService } from './services/signal-r.service';
import { ChatComponent } from './chat/chat.component';
import { MessageBlockComponent } from './chat/message-block/message-block.component';
import { MessageComponent } from './chat/message-block/message/message.component';
import { InputComponent } from './chat/input/input.component';
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ChatComponent,
    MessageBlockComponent,
    MessageComponent,
    InputComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ])
  ],
  providers: [SignalRService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
