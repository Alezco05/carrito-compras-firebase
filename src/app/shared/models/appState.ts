import { ProductCart } from './productCarts.model';

export interface AppState {
  readonly productCart: ProductCart[];
}