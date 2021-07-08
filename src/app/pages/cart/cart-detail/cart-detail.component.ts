import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductCart } from 'src/app/shared/models/productCarts.model';
import { ProductCartService } from 'src/app/shared/services/productCart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styles: [],
})
export class CartDetailComponent implements OnInit, OnDestroy {
  unsubscribeSignal: Subject<void> = new Subject();
  productCarts: ProductCart[] = [];

  constructor(
    public dialogRef: MatDialogRef<CartDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private pCtService: ProductCartService
  ) {
    this.pCtService
      .getProductByCart(data.id)
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe((resp) => {
        this.productCarts = resp;
      });
  }
  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
