import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@ngcompany/shared';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'ngcompany-products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: []
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];

  private unsubs$ = new Subject<void>();

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(take(1), takeUntil(this.unsubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }
}
