import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Subject, switchMap, take, takeUntil, tap } from 'rxjs';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'ngcompany-products-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit, OnDestroy {
  product: Product | null = null;
  quantity: number | null = null;

  private unsubs$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  addProductToCart() {

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
