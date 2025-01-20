import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@ngcompany/shared';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'ngadmin-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  protected categories: Category[] = [];

  private unsubs$ = new Subject<void>();

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(take(1), takeUntil(this.unsubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  deleteCategory(categoryId: string) {
    this.categoriesService
      .deleteCategory(categoryId)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: () => {
          this.getCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category deleted!'
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category not deleted!'
          });
        }
      });
  }

  confirmDeleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteCategory(categoryId);
      },
      reject: () => {}
    });
  }
}
