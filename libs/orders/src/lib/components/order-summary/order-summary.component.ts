import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CartItemDetailed,
  CartService,
  ProductsService
} from '@ngcompany/shared';
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

@Component({
  selector: 'ngcompany-orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: []
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  private unsubs$ = new Subject<void>();
  totalPrice = 0;
  isCheckout = false;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verifyIsCheckout();
    this.getOrderSummary();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  private verifyIsCheckout() {
    this.router.url.includes('checkout')
      ? (this.isCheckout = true)
      : (this.isCheckout = false);
  }

  private getOrderSummary() {
    this.cartService.cart
      .pipe(
        switchMap((cart) => {
          if (!cart || cart.items.length === 0) {
            return of([]);
          }

          const cartItemObservables$ = cart.items.map((cartItem) =>
            this.productService.getProduct(cartItem.productId).pipe(
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

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
