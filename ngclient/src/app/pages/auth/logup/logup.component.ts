import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MessageService} from '../../../services/message.service';
import {FormControl, Validators} from '@angular/forms';
import {UserAuth} from '../../../interfaces/user-auth';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.scss']
})
export class LogupComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;

  constructor(
    private authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private message: MessageService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        console.log(params);
        if (params.registred) {
          this.message.send('auth', 'login now');

        } else if (params.accesDenied) {
          this.message.send('auth', 'login retry');

        } else if (params.sessionFailed) {
          this.message.send('auth', 'sessionFailed');

        } else if (params.user) {
          this.message.send('auth', 'user not found');
        }
      }
    );
  }


  public getErrorMessageEmail(): string {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  public getErrorMessagePassword(): string {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.value.length ? 'min length 6 char' :
        '';
  }

  public onSubmit(): void {

    const userAuth: UserAuth = {
      email: this.email.value,
      password: this.password.value
    };


    this.authService.logup(userAuth).subscribe(
      (res) => console.log(res),
      (error) => {
        console.log(error.error.error);
        if (error.error.error.name === 'Error') {
          this.router.navigate(['/auth/login'], {
            queryParams: {
              auth: false,
              user: false
            }
          });
        }
      }
    );
  }

}
