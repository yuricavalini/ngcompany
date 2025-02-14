import { Product } from './product';

export class OrderItem {
  id: string;
  product: Product;
  quantity: number;

  constructor({ id, product, quantity }: OrderItem) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
  }
}
