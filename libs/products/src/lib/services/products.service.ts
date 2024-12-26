import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // apiURLProducts = environment.apiUrl + 'products';
  apiURLProducts = 'api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.apiURLProducts + `/get/featured/${count}`
    );
  }

  getProductsCount(): Observable<{ productsCount: number }> {
    return this.http
      .get<Product[]>(this.apiURLProducts)
      .pipe(map((products) => ({ productsCount: products.length })));
  }

  getProduct(productId: string) {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  createProduct(productData: FormData) {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  updateProduct(productData: FormData, productId: string) {
    return this.http.put<Product>(
      `${this.apiURLProducts}/${productId}`,
      productData
    );
  }

  deleteProduct(productId: string) {
    return this.http.delete<Product>(`${this.apiURLProducts}/${productId}`);
  }

  fileToBase64(file: File): Observable<string | ArrayBuffer> {
    return new Observable<string | ArrayBuffer>((observer) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result !== null) {
          observer.next(reader.result);
          observer.complete();
        } else {
          observer.error(new Error('FileReader result is null.'));
        }
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsDataURL(file);
    });
  }
}
