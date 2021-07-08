/* import { Action, createAction } from '@ngrx/store'
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
export type Actions = UpdateProductCart | AddProductCart; */

import {createAction, props} from '@ngrx/store';
import { ProductCart } from '../models/productCarts.model';
export const Add = createAction('[Todo Component] Add', props<ProductCart>());
export const Remove = createAction('[Todo Component] Remove', props<{index: any}>());
export const Update = createAction('[Todo Component] Update', props<ProductCart>());