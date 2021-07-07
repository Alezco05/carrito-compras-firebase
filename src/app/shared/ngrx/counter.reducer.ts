// 1 - Importaciones
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
