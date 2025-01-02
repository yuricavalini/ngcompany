import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngcompany-orders-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent {
  constructor(private router: Router) {}

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem() {}
}
