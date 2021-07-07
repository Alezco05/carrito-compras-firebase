import { Action, createAction } from '@ngrx/store'
import { ProductCart } from './../models/productCarts.model'

export const ADD_PRODUCTCART = 'Add ProductCart';
export const UPDATE_PRODUCTCART = 'Update ProductCart';

export class AddProductCart implements Action {
  readonly type = ADD_PRODUCTCART
  constructor(public payload: ProductCart) { }
}

export class UpdateProductCart implements Action {
    readonly type = UPDATE_PRODUCTCART
    constructor(public payload: ProductCart) { }
  }
  
// 4 - Exportación de la acción
export type Actions = UpdateProductCart | AddProductCart;