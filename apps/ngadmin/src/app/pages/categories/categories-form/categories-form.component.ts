import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@ngcompany/shared';
import { MessageService } from 'primeng/api';
import { of, Subject, switchMap, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'ngadmin-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup<{
    name: FormControl<string>;
    icon: FormControl<string>;
    color: FormControl<string>;
  }>;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string | null = null;

  private unsubs$ = new Subject<void>();

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.checkEditMode();
  }

  private createForm() {
    this.form = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      icon: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      color: new FormControl('#fff', {
        nonNullable: true
      })
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category = new Category({
      id: this.currentCategoryId || '',
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      color: this.form.controls['color'].value
    });

    if (this.editMode) {
      this.updateCategory(category);
    } else {
      this.createCategory(category);
    }
  }

  private createCategory(category: Category) {
    this.categoriesService
      .createCategory(category)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: () => {
          this.form.reset();
          this.isSubmitted = false;

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Category ${category.name} is created!`
          });
          timer(2000)
            .pipe(takeUntil(this.unsubs$))
            .subscribe(() => {
              this.location.back();
            });
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category not created!'
          });
        }
      });
  }

  private updateCategory(category: Category) {
    this.categoriesService
      .updateCategory(category, this.currentCategoryId as string)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: () => {
          this.form.reset();
          this.isSubmitted = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category updated!'
          });
          timer(2000)
            .pipe(takeUntil(this.unsubs$))
            .subscribe(() => {
              this.location.back();
            });
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category not updated!'
          });
        }
      });
  }

  private checkEditMode() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.currentCategoryId = params['id'] as string;
          if (this.currentCategoryId) {
            this.editMode = true;
            return this.categoriesService.getCategory(this.currentCategoryId);
          }
          return of(null);
        }),
        takeUntil(this.unsubs$)
      )
      .subscribe({
        next: (category) => {
          if (category) {
            this.form.patchValue({
              name: category.name,
              icon: category.icon,
              color: category.color
            });
          }
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category not found!'
          });
        }
      });
  }

  get categoryForm() {
    return this.form.controls;
  }
}
