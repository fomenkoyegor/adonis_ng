import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MessageService} from '../../../services/message.service';
import {UserAuth} from '../../../interfaces/user-auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


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
          this.message.send('auth', 'user is consist');
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


    this.authService.login(userAuth).subscribe(
      (res) => console.log(res),
      (error) => {
        console.log(error.error[0]);
        if (error.error[0].field === 'email') {
          this.router.navigate(['/auth/logup'], {
            queryParams: {
              auth: false,
              user: false
            }
          });
        }
        if (error.error[0].field === 'password') {
          this.message.send('error', error.error[0].message);
        }
      }
    );
  }


}
