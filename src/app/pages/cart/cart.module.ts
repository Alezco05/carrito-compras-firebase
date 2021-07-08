import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';

import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    CartListComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    NgxPaginationModule,
  ]
})
export class CartModule { }
