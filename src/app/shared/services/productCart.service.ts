import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";
import { ProductCart } from "../models/productCarts.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductCartService {
  productCartsColeccion: AngularFirestoreCollection<ProductCart>;
  productCartDoc: AngularFirestoreDocument<ProductCart>;
  productsCarts: Observable<ProductCart[]>;
  productCart: Observable<ProductCart>;
  constructor(private db: AngularFirestore) {
    this.productCartsColeccion = db.collection("productsCarts");
  }
  getProductCarts(): Observable<ProductCart[]> {
    //Obtener los clientes
    this.productsCarts = this.productCartsColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as ProductCart;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.productsCarts;
  }
  addProductCart(productCart:ProductCart){
    this.productCartsColeccion.add(productCart);
  }
  getProductCart(id:string){
    this.productCartDoc = this.db.doc<ProductCart>(`productsCarts/${id}`);
    this.productCart = this.productCartDoc.snapshotChanges().pipe(map(
      accion =>{
        if(accion.payload.exists == false){
          return null;
        }
        else{
          const datos = accion.payload.data() as ProductCart;
          datos.id = accion.payload.id;
          return datos;
        }
      }));
      return this.productCart;
  }
  putProductCart(productCart:ProductCart){
    this.productCartDoc = this.db.doc(`productsCarts/${productCart.product_id}`);
    this.productCartDoc.update(productCart);
  }
  deleteProductCart(productCart:ProductCart){
    this.productCartDoc = this.db.doc(`productsCarts/${productCart.product_id}`);
    this.productCartDoc.delete();
  }
}
