export class CreateOrderItem {
  productId: string;
  quantity: number;

  constructor({ productId, quantity }: CreateOrderItem) {
    this.productId = productId;
    this.quantity = quantity;
  }
}
