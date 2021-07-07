import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, reduce, takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/products.model';
import { ProductService } from 'src/app/shared/services/product.service';
import Swal from 'sweetalert2';
// import Echo from 'laravel-echo';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  searched: Boolean = false;
  //faTrash = faTrash;
  //faPencilAlt = faPencilAlt;
  filterPost = '';
  unsubscribeSignal: Subject<void> = new Subject();
  searchForm: FormGroup;
  products: Product[] = [];
  p: number = 1;
  name = new FormControl('');
  index: number;
  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initialQuery();
  }
  
  initialQuery() {
    this.p = 1;
    this.name.reset();
    this.productService
      .getProducts()
      .pipe(
        map((x) => Object.keys(x).map((key) =>Object.assign(x[key], { total: 0 }))),
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
  sustrabProduct(product) {
    product['total'] = product['total'] < 1 ? 0 : product['total'] - 1;
  }
  addProduct(product) {
    product['total']++;
  }
  onChange(){
    this.p = 1;
  }
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    // Don't forget to unsubscribe from subject itself
    this.unsubscribeSignal.unsubscribe();
  }
}
