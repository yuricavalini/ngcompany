import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@ngcompany/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'ngadmin-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  deleteCategory(categoryId: string) {
    this.categoriesService.deleteCategory(categoryId);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Category deleted!'
    });
    // this.messageService.add({
    //   severity: 'error',
    //   summary: 'Error',
    //   detail: 'Category not deleted!'
    // });
  }

  confirmDeleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteCategory(categoryId);
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
