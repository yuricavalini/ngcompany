import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'ngcompany-products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: []
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];

  private unsubs$ = new Subject<void>();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  private getFeaturedProducts() {
    this.productsService
      .getFeaturedProducts(4)
      .pipe(take(1), takeUntil(this.unsubs$))
      .subscribe((featuredProducts) => {
        this.featuredProducts = featuredProducts;
      });
  }
}
