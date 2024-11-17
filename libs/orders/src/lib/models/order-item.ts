export class OrderItem {
  product: string;
  quantity: number;

  constructor({ product, quantity }: OrderItem) {
    this.product = product;
    this.quantity = quantity;
  }
}
