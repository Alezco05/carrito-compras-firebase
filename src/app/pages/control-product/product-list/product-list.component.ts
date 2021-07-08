import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/shared/models/carts.model';
import { ProductCart } from 'src/app/shared/models/productCarts.model';
import { Product } from 'src/app/shared/models/products.model';
import { ProductService } from 'src/app/shared/services/product.service';
import Swal from 'sweetalert2';
import * as TaskActions from './../../../shared/ngrx/counter.actions';
import { Add } from './../../../shared/ngrx/counter.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  filterPost = '';
  unsubscribeSignal: Subject<void> = new Subject();
  searchForm: FormGroup;
  products: Product[] = [];
  p: number = 1;
  name = new FormControl('');
  cart: Cart;
  task: Observable<ProductCart[]>;
  todos$: Observable<ProductCart[]>;
  total: ProductCart[] = [];
  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ todoState: Array<ProductCart> }>
  ) {
    this.todos$ = store.select((state) => state.todoState);
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
    let found;
    this.todos$.pipe(takeUntil(this.unsubscribeSignal.asObservable())).subscribe((x) => {
      this.total = x;
      found = x.find((element) => element.product_id === id);
    });
    return found;
  }
  sustrabProduct(product) {
    product['total'] = product['total'] < 1 ? 0 : product['total'] - 1;
    const found = this.findProduct(product.id);
    if (found !== undefined) {
      const i = this.total.indexOf(found);
      product['quantity'] = product['total'];
      this.store.dispatch(TaskActions.Update(product));
      product['total'] === 0 &&
        this.store.dispatch(TaskActions.Remove({ index: i }));
    }
  }
  addProduct(product: Product) {
    product['total']++;
    product['quantity'] = product['total'];
    product['product_id'] = product.id;
    const found = this.findProduct(product.id);
    if (found === undefined) {
      this.store.dispatch(Add(product));
    } else {
      this.store.dispatch(TaskActions.Update(product));
    }
  }

  async viewDetail(): Promise<void> {
    let data: any = {};
    this.todos$.pipe(takeUntil(this.unsubscribeSignal.asObservable())).subscribe((x) => {
      data = x.map((item) =>
        Object.assign({}, item, {
          product_name: item['nombre'],
          cart_id: this.cart.id,
        })
      );
    });
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
