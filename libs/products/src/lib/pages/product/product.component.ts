import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CartItem,
  CartService,
  Product,
  ProductsService
} from '@ngcompany/shared';
import { MessageService } from 'primeng/api';
import { EMPTY, map, Subject, switchMap, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'ngcompany-products-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit, OnDestroy {
  product: Product | null = null;
  quantity = 1;

  private unsubs$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  addProductToCart() {
    if (!this.product) return;

    const cartItem = new CartItem({
      productId: this.product.id,
      quantity: this.quantity
    });
    this.cartService.setCartItem(cartItem);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Cart Updated!'
    });
  }

  private loadProduct() {
    this.route.params
      .pipe(
        take(1),
        map((params) => params['productId'] as string | undefined),
        switchMap((productId) => {
          if (!productId) {
            return EMPTY;
          }
          return this.getProduct(productId);
        }),
        tap((product) => (this.product = product)),
        takeUntil(this.unsubs$)
      )
      .subscribe();
  }

  private getProduct(productId: string) {
    return this.productsService
      .getProduct(productId)
      .pipe(take(1), takeUntil(this.unsubs$));
  }
}
