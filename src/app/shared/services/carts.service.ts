import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";
import { Cart } from "../models/carts.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CartService {
  cartsColeccion: AngularFirestoreCollection<Cart>;
  cartDoc: AngularFirestoreDocument<Cart>;
  carts: Observable<Cart[]>;
  cart: Observable<Cart>;
  constructor(private db: AngularFirestore) {
    this.cartsColeccion = db.collection("carts");
  }
  getCarts(): Observable<Cart[]> {
    //Obtener los clientes
    this.carts = this.cartsColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Cart;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.carts;
  }
  addCart(cart:Cart){
    this.cartsColeccion.add(cart);
  }
  getCart(id:string){
    this.cartDoc = this.db.doc<Cart>(`carts/${id}`);
    this.cart = this.cartDoc.snapshotChanges().pipe(map(
      accion =>{
        if(accion.payload.exists == false){
          return null;
        }
        else{
          const datos = accion.payload.data() as Cart;
          datos.id = accion.payload.id;
          return datos;
        }
      }));
      return this.cart;
  }
  putCart(cart:Cart){
    this.cartDoc = this.db.doc(`carts/${cart.id}`);
    this.cartDoc.update(cart);
  }
  deleteCart(cart:Cart){
    this.cartDoc = this.db.doc(`carts/${cart.id}`);
    this.cartDoc.delete();
  }
}
