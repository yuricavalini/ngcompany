import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '@ngcompany/ui';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';

import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { productsRoutes } from './lib.routes';
import { ProductComponent } from './pages/product/product.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes),
    ButtonModule,
    CheckboxModule,
    RatingModule,
    InputNumberModule,
    RippleModule,
    FormsModule,
    UiModule
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductComponent
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductComponent
  ]
})
export class ProductsModule {}
