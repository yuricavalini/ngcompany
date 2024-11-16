import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getProduct(productId: string) {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  createProduct(productData: FormData) {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  updateProduct(productData: FormData) {
    return this.http.put<Product>(
      `${this.apiURLProducts}/${productData.get('id')}`,
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
