import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CartItem,
  CartItemDetailed,
  CartService,
  ProductsService
} from '@ngcompany/shared';
import { MessageService } from 'primeng/api';
import { InputNumberInputEvent } from 'primeng/inputnumber';
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
    private productsService: ProductsService,
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

          const cartItemObservables$ = cart.items.map((cartItem) =>
            this.productsService.getProduct(cartItem.productId).pipe(
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

  updateCartItemQuantity(
    event: InputNumberInputEvent,
    cartItem: CartItemDetailed
  ) {
    this.cartService.setCartItem(
      new CartItem({
        productId: cartItem.product.id,
        quantity: parseFloat(event.value)
      }),
      true
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Cart Updated!'
    });
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
