import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CartItem,
  CartItemDetailed,
  CartService,
  CategoriesService,
  Category,
  Product,
  ProductsService
} from '@ngcompany/shared';
import { MessageService } from 'primeng/api';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs';

interface CategoryListItem extends Category {
  selected: boolean;
}

@Component({
  selector: 'ngcompany-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categoryListItens: CategoryListItem[] = [];
  isCategoryPage = false;

  private categoryFilterSubject = new Subject<void>();
  private unsubs$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cartService: CartService,
    private router: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.filterProductsByCategory();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  categoryFilter(): void {
    this.categoryFilterSubject.next();
  }

  private loadData() {
    return this.router.params
      .pipe(
        take(1),
        map((params) => params['categoryId'] as string | undefined),
        tap((categoryId) => {
          categoryId
            ? (this.isCategoryPage = true)
            : (this.isCategoryPage = false);
        }),
        switchMap((categoryId) => {
          return combineLatest([
            this.getProducts(categoryId ? [categoryId] : undefined),
            this.getCategoryListItens()
          ]).pipe(take(1));
        }),
        tap(([products, categoriesListItens]) => {
          this.products = products;
          this.categoryListItens = categoriesListItens;
        }),
        takeUntil(this.unsubs$)
      )
      .subscribe();
  }

  private getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    return this.productsService
      .getProducts(categoriesFilter)
      .pipe(take(1), takeUntil(this.unsubs$));
  }

  private getCategoryListItens(): Observable<CategoryListItem[]> {
    return this.categoriesService.getCategories().pipe(
      take(1),
      map((categories) =>
        categories.map<CategoryListItem>((category) => ({
          ...category,
          selected: false
        }))
      ),
      takeUntil(this.unsubs$)
    );
  }

  private filterProductsByCategory() {
    this.categoryFilterSubject
      .pipe(
        debounceTime(300),
        map(() => this.getSelectedCategories()),
        distinctUntilChanged(),
        switchMap((selectedCategories) => this.getProducts(selectedCategories)),
        tap((products) => {
          this.products = products;
        }),
        takeUntil(this.unsubs$)
      )
      .subscribe();
  }

  private getSelectedCategories(): string[] {
    return this.categoryListItens
      .filter((category) => category.selected)
      .map((category) => category.id);
  }

  private addProductToCart({ product, quantity }: CartItemDetailed) {
    if (!product) return;

    const cartItem = new CartItem({
      productId: product.id,
      quantity: quantity
    });
    this.cartService.setCartItem(cartItem);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Cart Updated!'
    });
  }

  onProductAdded({ product, quantity }: CartItemDetailed) {
    this.addProductToCart({ product, quantity });
  }
}
