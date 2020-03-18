import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  private isLogged: boolean;
  private token: string;

  auth(userName: string): Observable<User> {
    return this.http.get<any>(this.baseUrl + 'api/auth/login?userName=' + userName).pipe(
      map(response => {
        let id = response.userId;
        let name = response.userName
        this.token = response.token;
        this.isLogged = true;
        return new User(id, name, null);
      })
    );
  }

  getToken() {
    if (!this.isLogged) throw 'You must login before';
    return this.token;
  }
}
