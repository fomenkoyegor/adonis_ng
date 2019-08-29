import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LogupComponent} from './logup/logup.component';
import {LoginComponent} from './login/login.component';
import {NoAuthGuard} from '../../guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'logup', component: LogupComponent, canActivate: [NoAuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
