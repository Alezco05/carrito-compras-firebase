/* // 1 - Importaciones
import { ProductCart } from './../models/productCarts.model';
import * as ProductCartActions from './counter.actions';

const initialState: ProductCart[] = [];

export function taskReducer(
  state: ProductCart[] = initialState,
  action: ProductCartActions.Actions
) {
  switch (action.type) {
    case ProductCartActions.ADD_PRODUCTCART:
      return [...state, action.payload];
    case ProductCartActions.UPDATE_PRODUCTCART:
      let index = state.map(review => review.id).indexOf(action.payload.id);
      return [
          ...state.slice(0, index),
          Object.assign({}, state[index], {
            quantity: action.payload.quantity
          }),
          ...state.slice(index + 1)
      ];
    default:
      return state;
  }
}
 */

import { createReducer, on } from '@ngrx/store';
import { ProductCart } from './../models/productCarts.model';
import { Add, Remove, Update } from './counter.actions';

const initialState: Array<ProductCart> = [];

export const todoReducer = createReducer(initialState,
  on(Add, (state, action) => ([...state, action])),
  on(Update, (state, action) => {
    let index = state.map(review => review.id).indexOf(action.id);
    return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          quantity: action.quantity
        }),
        ...state.slice(index + 1)
    ];}),
  on(Remove, (state, action) => state.slice(0, action.index)),

  //on(Remove, (state, action) => state.map(i => i.id === action.id ? {...i, todo: !i} : i)),
)