import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.apiUrl;

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model:User)
  {
    return this.http.post<User>(`${this.baseUrl}account/login`,model).pipe(
      map((response:any)=>{
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model:any){
    return this.http.post<User>(`${this.baseUrl}account/register`,model).pipe(
      map((response:any)=>{
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentuser(user: User){
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
