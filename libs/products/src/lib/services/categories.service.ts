import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // apiURLCategories = environment.apiUrl + 'categories';

  private categories = new BehaviorSubject<Category[]>([
    {
      id: '1',
      name: 'category-1',
      icon: 'compass',
      color: '#398888'
    },
    {
      id: '2',
      name: 'category-2',
      icon: 'th-large',
      color: '#000000'
    },
    {
      id: '3',
      name: 'category-3',
      icon: 'heart',
      color: '#f40000'
    }
  ]);

  constructor() {}

  getCategories(): Observable<Category[]> {
    return this.categories.asObservable();
  }

  getCategory(categoryId: string) {
    const categories = this.categories.getValue();
    return of(categories.find((category) => category.id === categoryId));
  }

  createCategory(category: Category) {
    const categories = this.categories.getValue();
    category.id = (categories.length + 1).toString();
    this.categories.next([...this.categories.getValue(), category]);
  }
  updateCategory(category: Category) {
    const categories = this.categories.getValue();
    category.id = (categories.length + 1).toString();
    this.categories.next([...this.categories.getValue(), category]);
  }

  deleteCategory(categoryId: string) {
    const categories = this.categories.getValue();
    const newCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    this.categories.next(newCategories);
  }
}
