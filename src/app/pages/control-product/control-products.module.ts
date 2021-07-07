import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductAddComponent } from './product-add/product-add.component';
import { ControlProductsRoutingModule } from './control-products-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ProductListComponent } from './product-list/product-list.component';
import { MyPipesModule } from 'src/app/shared/pipes/pipe.module';
import { ControlProductsComponent } from './control-products.component';
import { PodructsDetailComponent } from './podructs-detail/podructs-detail.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from 'src/app/shared/ngrx/counter.reducer';


@NgModule({
  declarations: [
    ControlProductsComponent,
    ProductAddComponent,
    ProductListComponent,
    PodructsDetailComponent,
  ],
  imports: [
    CommonModule,
    ControlProductsRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MyPipesModule,
  ],
})
export class ControlProductModule {}
