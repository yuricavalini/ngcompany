import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@ngcompany/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'ngadmin-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string) {
    this.productsService.deleteProduct(productId);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product deleted!'
    });
    // this.messageService.add({
    //   severity: 'error',
    //   summary: 'Error',
    //   detail: 'Product not deleted!'
    // });
  }

  confirmDeleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteProduct(productId);
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'Confirmed',
        //   detail: 'Record deleted'
        // });
      },
      reject: () => {}
    });
  }
}
