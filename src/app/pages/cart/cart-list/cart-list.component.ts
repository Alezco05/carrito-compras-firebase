import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/carts.model';
import { CartService } from 'src/app/shared/services/carts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styles: [
  ]
})
export class CartListComponent implements OnInit {
  carts: Cart[] = [];
  p: number = 1;
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getCarts();
  }
  getCarts(){
    this.cartService.getCarts().subscribe(
      resp => this.carts = resp 
    );
  }
  createCar(){
    this.cartService.addCart({status: 'pending'});
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
  addItemsToCart(cart){
    const queryParams: any = {};
    queryParams.data = btoa(JSON.stringify(cart));
    this.router.navigate(['productos'], { queryParams });

  }
}
