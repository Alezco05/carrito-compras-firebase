import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports:[NavbarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ]
})
export class NavbarModule { }
