import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'productos',
    loadChildren: () => import('./control-product/control-products.module').then(m => m.ControlProductModule),
  },
  {
    path: 'carritos',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
  },
  {
    path: '',
    redirectTo: '/carritos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
