import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/carts.service';
import { ProductCartService } from 'src/app/shared/services/productCart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-podructs-detail',
  templateUrl: './podructs-detail.component.html',
  styles: [],
})
export class PodructsDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PodructsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private cartService: CartService,
    private pCservice: ProductCartService,
    private router: Router
  ) {
  }

  ngOnInit(): void { }
  createProductCart() {
    this.data.forEach((d) => {
      this.pCservice.addProductCart({
        cart_id: d.cart_id,
        product_id: d.product_id,
        quantity: d.quantity,
      });
    });
    this.updateCart();
    Swal.fire('Exito!', 'Se ha enviado la informacion de manera exitosa', 'success');
    this.router.navigate(['']);
    this.closeModal();
  }
  updateCart() {
    const data = {
      id: this.data[0].cart_id,
      status: 'completed'
    }
    this.cartService.putCart(data);
    
  }
  presentSwall(title, html, icon, timer) {
    Swal.fire({ title, html, icon, timer, timerProgressBar: true });
  }
  closeModal() {
    this.dialogRef.close();
  }
}
