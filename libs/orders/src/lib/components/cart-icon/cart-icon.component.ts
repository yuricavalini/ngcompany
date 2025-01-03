import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'ngcompany-orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: []
})
export class CartIconComponent implements OnInit, OnDestroy {
  cartCount = 0;
  cartCountString = '';

  private unsubs$ = new Subject<void>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.pipe(takeUntil(this.unsubs$)).subscribe((cart) => {
      if (cart) {
        this.cartCount = cart.items.length;
        this.cartCountString = this.cartCount.toString();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }
}
