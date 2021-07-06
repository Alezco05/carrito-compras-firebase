import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/products.model';
import { ProductService } from 'src/app/shared/services/product.service';
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
  constructor(private productService: ProductService, public dialog: MatDialog)
  { }

  ngOnInit(): void {
    this.initialQuery();

  }

  initialQuery() {
    this.p = 1;
    this.name.reset();
    this.productService
      .getProducts()
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe(
        (resp) => {
          this.products = resp.sort((a, b) =>
            a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
          );
        },
        (err) => console.log(err)
      );
  }
  deleteUser(product){

  }
 /*  deleteUser(e) {
    Swal.fire({
      title: 'Se eliminara el siguiente usuario',
      text: `${e.target.dataset.idpersona} - ${e.target.dataset.nombrepersona} ${e.target.dataset.apellidopersona}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userSrv
          .deleteUser(e.target.dataset.idpersona)
          .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
          .subscribe(
            () =>
              Swal.fire(
                '¡Listo!',
                'Se elimino al usuario de la BD',
                'success'
              ).then(() => {
                const data: { usuario: string } = {
                  usuario: this.name.value,
                };
                this.userSrv
                  .getUserbyName(data)
                  .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
                  .subscribe(
                    (resp) => (this.users = resp),
                    (err) => console.log(err)
                  );
              }),
            () =>
              Swal.fire('ERROR!', 'Algo ha fallado intente mas tarde', 'error')
          );
      }
    });
  } */

   async updateUser(data): Promise<void> {
    const { ProductAddComponent } = await import('../product-add/product-add.component');
    const dialogRef = this.dialog.open(ProductAddComponent, {
      width: '800px',
      data,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe(() => {
        console.log('a');
      });
  }
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    // Don't forget to unsubscribe from subject itself
    this.unsubscribeSignal.unsubscribe();
  }
}
