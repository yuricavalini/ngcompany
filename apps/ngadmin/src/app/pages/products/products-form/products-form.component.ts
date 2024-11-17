import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriesService,
  Category,
  ProductsService
} from '@ngcompany/products';
import { MessageService } from 'primeng/api';
import { Subject, of, switchMap, take, takeUntil, timer } from 'rxjs';

import { ProductForm } from './product-form';

@Component({
  selector: 'ngadmin-products-form',
  templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  form!: FormGroup<ProductForm>;
  isSubmitted = false;
  editMode = false;
  currentProductId: string | null = null;
  categories: Category[] = [];
  imageDisplay: string | ArrayBuffer | null = null;

  private unsubs$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.createForm();
    this.checkEditMode();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  private getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(take(1), takeUntil(this.unsubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  private createForm() {
    this.form = new FormGroup({
      id: new FormControl('', {
        nonNullable: true
      }),
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      description: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      richDescription: new FormControl('', {
        nonNullable: true
      }),
      image: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      // images: new FormControl<string[]>([], {
      //   nonNullable: true,
      //   validators: [Validators.required]
      // }),
      brand: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      price: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required]
      }),
      category: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      countInStock: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required]
      }),
      // rating: new FormControl(0, {
      //   nonNullable: true,
      //   validators: [Validators.required]
      // }),
      // numReviews: new FormControl(0, {
      //   nonNullable: true,
      //   validators: [Validators.required]
      // }),
      isFeatured: new FormControl(false, {
        nonNullable: true
      }),
      dateCreated: new FormControl('', {
        nonNullable: true
      })
    });
  }

  onImageUpload(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    const file: File | null = fileList ? fileList[0] : null;
    if (file) {
      this.productsService
        .fileToBase64(file)
        .pipe(take(1), takeUntil(this.unsubs$))
        .subscribe({
          next: (base64) => {
            this.imageDisplay = base64 as string;
            this.productForm['image'].patchValue(base64 as string);
            this.productForm['image'].updateValueAndValidity();
          },
          error: (error) => {
            console.error(error);
          }
        });
    }
  }

  onCancel() {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).forEach((key) => {
      productFormData.append(
        key,
        String(this.productForm[key as keyof ProductForm].value)
      );
    });

    if (this.editMode) {
      this.updateProduct(productFormData);
    } else {
      this.createProduct(productFormData);
    }
  }

  private createProduct(productData: FormData) {
    this.productsService
      .createProduct(productData)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: (product) => {
          this.form.reset();
          this.isSubmitted = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${product.name} is created!`
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
            detail: 'Product not created!'
          });
        }
      });
  }

  private updateProduct(productData: FormData) {
    this.productsService
      .updateProduct(productData, this.currentProductId as string)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: () => {
          this.form.reset();
          this.isSubmitted = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product updated!'
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
            detail: 'Product not updated!'
          });
        }
      });
  }

  private checkEditMode() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.currentProductId = params['id'] as string;
          if (this.currentProductId) {
            this.editMode = true;
            return this.productsService.getProduct(this.currentProductId);
          }
          return of(null);
        }),
        takeUntil(this.unsubs$)
      )
      .subscribe({
        next: (product) => {
          if (product) {
            this.form.patchValue({
              id: product.id || this.currentProductId || '',
              name: product.name,
              description: product.description,
              richDescription: product.richDescription,
              image: product.image,
              // images: product!.images,
              brand: product.brand,
              price: product.price,
              category: product.category.id,
              countInStock: product.countInStock,
              // rating: product!.rating,
              // numReviews: product!.numReviews,
              isFeatured: product.isFeatured,
              dateCreated: product.dateCreated
            });
            this.imageDisplay = product.image;
            this.form.controls['image'].setValidators([]);
            this.form.updateValueAndValidity();
          }
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product not found!'
          });
        }
      });
  }

  get productForm() {
    return this.form.controls;
  }
}
