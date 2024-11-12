import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriesService,
  Category,
  Product,
  ProductsService
} from '@ngcompany/products';
import { MessageService } from 'primeng/api';
import { take, timer } from 'rxjs';

import { ProductForm } from './product-form';

@Component({
  selector: 'ngadmin-products-form',
  templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit {
  form!: FormGroup<ProductForm>;
  isSubmitted = false;
  editMode = false;
  currentProductId: string | null = null;
  categories: Category[] = [];

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

  private getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(take(1))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  private createForm() {
    this.form = new FormGroup({
      id: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
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

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const product: Partial<Product> = {
      id: this.currentProductId || '',
      name: this.productForm.name.value,
      description: this.productForm.description.value,
      richDescription: this.productForm.richDescription.value,
      image: this.productForm.image.value,
      // images: this.productForm.images.value,
      brand: this.productForm.brand.value,
      price: this.productForm.price.value,
      // category: this.productForm.category_id.value as any,
      // countInStock: this.productForm.countInStock.value,
      // rating: this.productForm.rating.value,
      // numReviews: this.productForm.numReviews.value,
      isFeatured: this.productForm.isFeatured.value,
      dateCreated: this.productForm.dateCreated.value
    };

    if (this.editMode) {
      this.updateProduct(product as Product);
    } else {
      this.createProduct(product as Product);
    }
  }

  createProduct(product: Product) {
    this.productsService.createProduct(product);
    this.form.reset();
    this.isSubmitted = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Product ${product.name} is created!`
    });
    // this.messageService.add({
    //   severity: 'error',
    //   summary: 'Error',
    //   detail: 'Product not created!'
    // });

    timer(2000)
      .pipe(take(1))
      .subscribe(() => {
        this.location.back();
      });
  }

  updateProduct(product: Product) {
    this.productsService.updateProduct(product);
    this.form.reset();
    this.isSubmitted = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product updated!'
    });
    // this.messageService.add({
    //   severity: 'error',
    //   summary: 'Error',
    //   detail: 'Product not created!'
    // });

    timer(2000)
      .pipe(take(1))
      .subscribe(() => {
        this.location.back();
      });
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      this.currentProductId = params['id'] as string;
      if (this.currentProductId) {
        this.editMode = true;

        this.productsService
          .getProduct(this.currentProductId)
          .subscribe((product) => {
            this.form.patchValue({
              id: this.currentProductId || '',
              name: product!.name,
              description: product!.description,
              richDescription: product!.richDescription,
              image: product!.image,
              // images: product!.images,
              brand: product!.brand,
              price: product!.price,
              category: product!.category.id,
              countInStock: product!.countInStock,
              // rating: product!.rating,
              // numReviews: product!.numReviews,
              isFeatured: product!.isFeatured,
              dateCreated: product!.dateCreated
            });
          });
      }
    });
  }

  get productForm() {
    return this.form.controls;
  }
}
