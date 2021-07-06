import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styles: [],
})
export class ProductAddComponent implements OnInit, OnDestroy {
  unsubscribeSignal: Subject<void> = new Subject();
  destroy$ = new Subject();
  ip: string;
  alert: boolean = false;
  form: FormGroup;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<ProductAddComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) {}
  ngOnInit(): void {
    this.makeForm();
    this.data && this.fillData();
  }
  makeForm() {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      sku: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }
  fillData() {
    Object.keys(this.form.controls).forEach((key) => {
      this.data[key] && this.form.get(key).setValue(this.data[key].toString());
    });
  }
  OnSubmit() {
    this.productService.addProduct(this.form.value);
    this.form.reset();
  }
  OnUpdate() {
    this.productService.putProduct(this.form.value);
    this.closeModal();
  }
  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    // Don't forget to unsubscribe from subject itself
    this.unsubscribeSignal.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
