import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  selector: 'ngcompany-orders-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit, OnDestroy {
  private unsubs$ = new Subject<void>();

  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  private getCartDetails() {
    this.cartService.cart
      .pipe(
        switchMap((cart) => {
          if (!cart || cart.items.length === 0) {
            return of([]);
          }

          const productObservables$ = cart.items.map((cartItem) =>
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
          return combineLatest(productObservables$).pipe(take(1));
        }),
        tap((cartItems) => {
          this.cartItemsDetailed = cartItems;
          this.cartCount = cartItems.length;
        }),
        takeUntil(this.unsubs$)
      )
      .subscribe();
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Cart Updated!'
    });
  }
}
