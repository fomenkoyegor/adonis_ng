import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../interfaces/user-token';
import {UserAuth} from '../interfaces/user-auth';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TasksService} from './tasks.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url = '/api/auth/';
  private token: null;
  public isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router,
              private tasksService: TasksService
  ) {
    this.isAuth$.next(this.isAuthenticated());
  }

  public login(user: UserAuth): Observable<UserToken> {
    return this.http.post<UserToken>(`${this.url}login`, user)
      .pipe(tap(
        (userToken: UserToken) => {
          window.localStorage.setItem('token', `${userToken.type} ${userToken.token}`);
          this.setToken(`${userToken.type} ${userToken.token}`);
          this.isAuth$.next(true);
          this.router.navigate(['/projects']);
        }
      ));
  }

  public logup(user: UserAuth): Observable<UserToken> {
    return this.http.post<UserToken>(`${this.url}register`, user)
      .pipe(tap(
        (userToken: UserToken) => {
          window.localStorage.setItem('token', `${userToken.type} ${userToken.token}`);
          this.setToken(`${userToken.type} ${userToken.token}`);
          this.isAuth$.next(true);
          this.router.navigate(['/projects']);
        }
      ));
  }


  private setToken(token): void {
    this.token = token;
  }

  public getToken(): string {
    return this.token ? this.token : window.localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public logout(): void {
    this.setToken(null);
    localStorage.clear();
    this.isAuth$.next(false);
    this.tasksService.tasks$.next([]);
    this.router.navigate(['/auth']);
  }


}
