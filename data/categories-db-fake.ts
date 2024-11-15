import { Category } from "../libs/products/src";

export abstract class CategoriesFakeDb {
  public static categories: Category[] = [
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
  ];
}
