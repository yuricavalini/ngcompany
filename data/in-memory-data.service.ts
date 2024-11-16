import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { CategoriesFakeDb } from './categories-db-fake';
import { ProductsFakeDb } from './products-db-fake';
import { Product } from '../libs/products/src';

type GenericObject<T> = T & { id: string };

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      products: ProductsFakeDb.products,
      categories: CategoriesFakeDb.categories
    };
  }

  // Optional: Override genId method
  genId<T>(collection: GenericObject<T>[]): string {
    if (!collection || collection.length === 0) {
      return '1';
    }

    const maxId = Math.max(...collection.map((item) => parseInt(item.id, 10)));
    return (maxId + 1).toString();
  }

  // Optional: Override POST response
  put(requestInfo: RequestInfo) {
    const collectionName = requestInfo.collectionName;

    if (collectionName === 'products') {
      // Extract raw request body
      const rawBody = requestInfo.utils.getJsonBody(requestInfo.req);

      // Check if the body is FormData and convert it to JSON
      const jsonBody = this.formDataToJson(rawBody);

      if (!jsonBody) {
        return requestInfo.utils.createResponse$(() => ({
          body: { error: 'Invalid form data' },
          status: 400
        }));
      }

      // Update boolean field
      jsonBody['isFeatured'] = jsonBody['isFeatured'] === 'true';

      // Update number fields
      jsonBody['price'] = parseFloat(jsonBody['price']);
      jsonBody['countInStock'] = parseInt(jsonBody['countInStock'], 10);

      // Update category object with the new product
      const category = CategoriesFakeDb.categories.find(
        (category) => category.id === jsonBody['category']
      );

      const updatedData = { ...jsonBody, category };

      // Update the object in the collection
      const productIndex = requestInfo.collection.findIndex(
        (item: Product) => item.id === jsonBody['id']
      );
      requestInfo.collection[productIndex] = {
        ...requestInfo.collection[productIndex],
        ...updatedData
      };

      // Return the created object in the response
      return requestInfo.utils.createResponse$(() => ({
        body: requestInfo.collection[productIndex],
        status: 200
      }));
    }

    return undefined; // Default handling for other collections
  }

  // Optional: Override POST response
  post(requestInfo: RequestInfo) {
    const collectionName = requestInfo.collectionName;

    if (collectionName === 'products') {
      // Extract raw request body
      const rawBody = requestInfo.utils.getJsonBody(requestInfo.req);

      // Check if the body is FormData and convert it to JSON
      const jsonBody = this.formDataToJson(rawBody);

      if (!jsonBody) {
        return requestInfo.utils.createResponse$(() => ({
          body: { error: 'Invalid form data' },
          status: 400
        }));
      }

      // Update boolean field
      jsonBody['isFeatured'] = jsonBody['isFeatured'] === 'true';

      // Update number fields
      jsonBody['price'] = parseFloat(jsonBody['price']);
      jsonBody['countInStock'] = parseInt(jsonBody['countInStock'], 10);
      jsonBody['rating'] = 0;
      jsonBody['numReviews'] = 0;

      // Update category object with the new product
      const category = CategoriesFakeDb.categories.find(
        (category) => category.id === jsonBody['category']
      );

      // Add creatio date
      const dateCreated = new Date().toISOString();

      // Generate new ID
      const id = this.genId(requestInfo.collection as any[]);

      const createdObject = { ...jsonBody, dateCreated, category, id };
      requestInfo.collection.push(createdObject);

      // Return the created object in the response
      return requestInfo.utils.createResponse$(() => ({
        body: createdObject,
        status: 201
      }));
    }

    return undefined; // Default handling for other collections
  }

  // Utility: Convert FormData to JSON
  private formDataToJson(formData: any): Record<string, any> | null {
    if (formData instanceof FormData) {
      const json: Record<string, any> = {};
      formData.forEach((value, key) => {
        json[key] = value;
      });
      return json;
    }
    return null;
  }
}
