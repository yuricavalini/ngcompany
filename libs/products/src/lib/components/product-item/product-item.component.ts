import { Component, Input } from '@angular/core';
import { CartItem, CartService } from '@ngcompany/orders';

import { Product } from '../../models/product';

@Component({
  selector: 'ngcompany-products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})
export class ProductItemComponent {
  @Input() product: Product | null = null;

  constructor(private cartService: CartService) {}

  addProductToCart() {
    if (!this.product) return;

    const cartItem = new CartItem({
      productId: this.product.id,
      quantity: 1
    });
    this.cartService.setCartItem(cartItem);
  }
}
