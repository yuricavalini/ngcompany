import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@ngcompany/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ngadmin-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit, OnDestroy {
  protected products: Product[] = [];

  private unsubs$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  getProducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.unsubs$))
      .subscribe((products) => {
        this.products = products;
      });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string) {
    this.productsService
      .deleteProduct(productId)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: () => {
          this.getProducts();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product deleted!'
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product not deleted!'
          });
        }
      });
  }

  confirmDeleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteProduct(productId);
      },
      reject: () => {}
    });
  }
}
