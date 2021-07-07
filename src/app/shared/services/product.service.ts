import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";
import { Product } from "../models/products.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  productsColeccion: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  products: Observable<Product[]>;
  product: Observable<Product>;
  constructor(private db: AngularFirestore) {
    this.productsColeccion = db.collection("products", ref =>
      ref.orderBy("nombre", "asc")
    );
  }
  getProducts(): Observable<Product[]> {
    this.products = this.productsColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Product;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.products;
  }
  addProduct(product:Product){
    this.productsColeccion.add(product);
  }
  getProduct(id:string){
    this.productDoc = this.db.doc<Product>(`products/${id}`);
    this.product = this.productDoc.snapshotChanges().pipe(map(
      accion =>{
        if(accion.payload.exists == false){
          return null;
        }
        else{
          const datos = accion.payload.data() as Product;
          datos.id = accion.payload.id;
          return datos;
        }
      }));
      return this.product;
  }
  putProduct(product:Product){
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.update(product);
  }
  deleteProduct(product:Product){
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.delete();
  }
}
