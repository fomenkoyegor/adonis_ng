import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: './pages/auth/auth.module#AuthModule'
  },
  {
    path: 'projects',
    loadChildren: './pages/projects-page/projects-page.module#ProjectsPageModule'
  },
  {
    path: '**',
    loadChildren: './pages/not-found/not-found.module#NotFoundModule'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
