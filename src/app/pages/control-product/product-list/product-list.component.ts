import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/shared/models/carts.model';
import { ProductCart } from 'src/app/shared/models/productCarts.model';
import { Product } from 'src/app/shared/models/products.model';
import { ProductService } from 'src/app/shared/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  total: ProductCart[] = [];
  filterPost = '';
  unsubscribeSignal: Subject<void> = new Subject();
  searchForm: FormGroup;
  products: Product[] = [];
  p: number = 1;
  name = new FormControl('');
  cart: Cart;
  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { 
    const data = this.activatedRoute.snapshot.queryParamMap.get('data');
    this.cart = JSON.parse(atob(data));
  }

  ngOnInit(): void {
    this.initialQuery();
  }

  initialQuery() {
    this.p = 1;
    this.name.reset();
    this.productService
      .getProducts()
      .pipe(
        map((x) =>
          Object.keys(x).map((key) => Object.assign(x[key], { total: 0 }))
        ),
        takeUntil(this.unsubscribeSignal.asObservable())
      )
      .subscribe(
        (resp) => {
          this.products = resp.sort((a, b) =>
            a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
          );
        },
        (err) => console.log(err)
      );
  }

  deleteProduct(product: Product) {
    Swal.fire({
      title: 'Se eliminara el siguiente registro',
      text: `${product.nombre} - ${product.sku}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(product);
        Swal.fire('¡Listo!', 'Se elimino el registro de la BD', 'success');
      }
    });
  }

  async updateProduct(data): Promise<void> {
    const { ProductAddComponent } = await import(
      '../product-add/product-add.component'
    );
    this.dialog.open(ProductAddComponent, {
      width: '800px',
      data,
    });
  }
  findProduct(id): ProductCart {
    return this.total.find(
      (element) => element.product_id === id
    );
  }
  sustrabProduct(product) {
    product['total'] = product['total'] < 1 ? 0 : product['total'] - 1;
    const found = this.findProduct(product.id);
    if (found !== undefined) {
      const i = this.total.indexOf(found);
      this.total[i].quantity = product['total'];
      product['total'] === 0 && this.total.splice(i,1);
    }
  }
  addProduct(product: Product) {
    product['total']++;
    const found = this.findProduct(product.id);
    if (found === undefined) {
      this.total.push({
        product_id: product.id,
        product_name: product.nombre,
        quantity: product['total'],
      });
    } else {
      const i = this.total.indexOf(found);
      this.total[i].quantity = product['total'];
    }
   }
  
  async viewDetail(): Promise<void> {
    const data = this.total;
    data['cart_id'] = this.cart.id;
    const { PodructsDetailComponent } = await import(
      '../podructs-detail/podructs-detail.component'
    );
    this.dialog.open(PodructsDetailComponent, {
      width: '800px',
      data,
    });
  }
  onChange() {
    this.p = 1;
  }
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
