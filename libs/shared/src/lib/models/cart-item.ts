export class CartItem {
  productId: string;
  quantity: number;

  constructor({ productId, quantity }: CartItem) {
    this.productId = productId;
    this.quantity = quantity;
  }
}
