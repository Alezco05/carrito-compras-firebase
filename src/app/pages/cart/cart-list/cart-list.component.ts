import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/shared/models/carts.model';
import { CartService } from 'src/app/shared/services/carts.service';
import { ProductCartService } from 'src/app/shared/services/productCart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styles: ['h1{font-size: 60px;}'],
})
export class CartListComponent implements OnInit {
  unsubscribeSignal: Subject<void> = new Subject();
  valueWatcherSubscription = null;
  carts: Cart[] = [];
  cartsOriginal: Cart[] = [];
  p: number = 1;
  select: FormControl = new FormControl('all');
  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.select.valueChanges
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe((val) => {
        this.carts = val != 'all' ? this.cartsOriginal.filter(x => x.status === val) : this.cartsOriginal;
      });
  }

  ngOnInit(): void {
    this.getCarts();
  }
  getCarts() {
    this.cartService.getCarts().subscribe((resp) => {
      this.cartsOriginal = resp;
      this.carts = this.cartsOriginal;
    });
  }
  createCar() {
    this.cartService.addCart({ status: 'pending' });
  }
  deleteCart(cart: Cart) {
    Swal.fire({
      title: 'Se eliminara el siguiente registro',
      text: `${cart.id} - ${cart.status}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.deleteCart(cart);
        Swal.fire('¡Listo!', 'Se elimino el registro de la BD', 'success');
      }
    });
  }
  addItemsToCart(cart) {
    const queryParams: any = {};
    queryParams.data = btoa(JSON.stringify(cart));
    this.router.navigate(['productos'], { queryParams });
  }
  async viewDetails(data) {
    const { CartDetailComponent } = await import(
      '../cart-detail/cart-detail.component'
    );
    this.dialog.open(CartDetailComponent, {
      width: '800px',
      data,
    });
  }
}
