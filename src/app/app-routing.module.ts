import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionGuard } from './core/authentication/autenticacion.guard';
import { LoginGuard } from './core/authentication/login.guard';

const routes: Routes = [
  {
    path: 'auth/:param',
    loadChildren: () => import('./core/authentication/login/login.module').then(m => m.LoginModule),
    canLoad: [LoginGuard]
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    // canLoad: [AutenticacionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
