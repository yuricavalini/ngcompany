import { Product } from './product';

export class CartItemDetailed {
  product: Product;
  quantity: number;

  constructor({ product, quantity }: CartItemDetailed) {
    this.product = product;
    this.quantity = quantity;
  }
}
