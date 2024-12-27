import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { productsRoutes } from './lib.routes';
import { ProductsListComponent } from './pages/products-list/products-list.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(productsRoutes), ButtonModule],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent
  ]
})
export class ProductsModule {}
