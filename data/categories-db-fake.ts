import { Category } from "../libs/products/src";

export abstract class CategoriesFakeDb {
  public static categories: Category[] = [
    {
      id: '1',
      name: 'Mobile',
      icon: 'mobile',
      color: '#F0E4E1'
    },
    {
      id: '2',
      name: 'Beauty',
      icon: 'palette',
      color: '#F0E8DE'
    },
    {
      id: '3',
      name: 'Computers',
      icon: 'desktop',
      color: '#E1F0E7'
    },
    {
      id: '4',
      name: 'House',
      icon: 'home',
      color: '#E2E1F0'
    },
    {
      id: '5',
      name: 'Games',
      icon: 'sun',
      color: '#FFB8B8'
    }
  ];
}
