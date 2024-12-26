import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'ngcompany-products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})
export class ProductItemComponent {
  @Input() product: Product | null = null;
}
