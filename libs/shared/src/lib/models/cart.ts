import { CartItem } from './cart-item';

export class Cart {
  items: CartItem[];

  constructor(items: CartItem[]) {
    this.items = items;
  }
}
