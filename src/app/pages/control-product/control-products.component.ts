import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-control-products',
  templateUrl: './control-products.component.html',
  styles: [
  ]
})
export class ControlProductsComponent implements OnInit {
  select = new FormControl('listar');
  valueWatcherSubscription = null;
  private destroy$: Subject<void> = new Subject();

  constructor(private viewContainerRef: ViewContainerRef, private cfr: ComponentFactoryResolver, private injector: Injector) {
  }
  ngOnInit(): void {
    this.lazyLoadListUser();
    this.valueWatcherSubscription = this.select.valueChanges
      .pipe(takeUntil(this.destroy$.asObservable()))
      .subscribe(async (val) => {
        if (val === 'agregar') {
          await this.lazyLoadUserForm();
        } else {
          await this.lazyLoadListUser();
        }
      });
  }
  async lazyLoadListUser() {
    this.viewContainerRef.clear();
    const { ProductListComponent } = await import('./product-list/product-list.component');
    this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(ProductListComponent)
    );
  }

  async lazyLoadUserForm(){
    this.viewContainerRef.clear();
    const { ProductAddComponent } = await import('./product-add/product-add.component');
    const quizCardFactory = this.cfr.resolveComponentFactory(
      ProductAddComponent
    );
    const { instance } = this.viewContainerRef.createComponent(
      quizCardFactory,
      null,
      this.injector
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
