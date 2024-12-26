import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ProductsSearchComponent, CategoriesBannerComponent],
  exports: [ProductsSearchComponent, CategoriesBannerComponent]
})
export class ProductsModule {}
