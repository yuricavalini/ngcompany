import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  map,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs';

import { CartItemDetailed } from '../../models/cart-item-detailed';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'ngcompany-orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: []
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  private unsubs$ = new Subject<void>();
  totalPrice = 0;

  constructor(
    private ordersService: OrdersService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getOrderSummary();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  private getOrderSummary() {
    this.cartService.cart
      .pipe(
        switchMap((cart) => {
          if (!cart || cart.items.length === 0) {
            return of([]);
          }

          const cartItemObservables$ = cart.items.map((cartItem) =>
            this.ordersService.getProduct(cartItem.productId).pipe(
              take(1),
              map(
                (product) =>
                  new CartItemDetailed({
                    product,
                    quantity: cartItem.quantity
                  })
              )
            )
          );
          return combineLatest(cartItemObservables$).pipe(take(1));
        }),
        map((cartItems) =>
          cartItems.reduce(
            (totalPrice, cartItem) =>
              totalPrice + cartItem.product.price * cartItem.quantity,
            0
          )
        ),
        tap((cartItemsDetailed) => (this.totalPrice = cartItemsDetailed)),
        takeUntil(this.unsubs$)
      )
      .subscribe();
  }
}
