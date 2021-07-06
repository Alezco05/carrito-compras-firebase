import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlProductsComponent } from './control-products.component';

const routes: Routes = [
  {
    path: '',
    component: ControlProductsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlProductsRoutingModule { }
