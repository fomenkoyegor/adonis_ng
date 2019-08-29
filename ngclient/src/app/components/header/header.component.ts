import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuth$: Observable<boolean>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.onAuth();
  }


  onAuth() {
    this.isAuth$ = this.authService.isAuth$;
  }

  onLogOut() {
    this.authService.logout();
  }

}
