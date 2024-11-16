import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // apiURLCategories = environment.apiUrl + 'categories';
  apiURLCategories = 'api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURLCategories);
  }

  getCategory(categoryId: string) {
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
  }

  createCategory(category: Category) {
    return this.http.post<Category>(this.apiURLCategories, category);
  }

  updateCategory(category: Category) {
    return this.http.put<Category>(
      `${this.apiURLCategories}/${category.id}`,
      category
    );
  }

  deleteCategory(categoryId: string) {
    return this.http.delete<Category>(`${this.apiURLCategories}/${categoryId}`);
  }
}
