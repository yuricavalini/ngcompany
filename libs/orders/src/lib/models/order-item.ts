export class OrderItem {
  id: string;
  productId: string;
  product?: any;
  quantity: number;

  constructor({ id, productId, product, quantity }: OrderItem) {
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.quantity = quantity;
  }
}
