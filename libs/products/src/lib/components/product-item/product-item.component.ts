import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItemDetailed, Product } from '@ngcompany/shared';

@Component({
  selector: 'ngcompany-products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})
export class ProductItemComponent {
  @Input() product: Product | null = null;
  @Output() productAdded = new EventEmitter<CartItemDetailed>();

  constructor() {}

  onClickAddProductToCart() {
    if (!this.product) return;

    this.productAdded.emit(
      new CartItemDetailed({
        product: this.product,
        quantity: 1
      })
    );
  }
}
