import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { CreateOrderDTO } from '../libs/orders/src/lib/models/create-order-dto';

import { Order } from '../libs/orders/src';
import { Product } from '../libs/products/src';
import { CategoriesFakeDb } from './categories-db-fake';
import { OrdersFakeDb } from './orders-db-fake';
import { ProductsFakeDb } from './products-db-fake';
import { UsersFakeDb } from './users-db-fake';

type GenericObject<T> = T & { id: string };

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      products: ProductsFakeDb.products,
      categories: CategoriesFakeDb.categories,
      users: UsersFakeDb.users,
      orders: OrdersFakeDb.orders
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

  // Override the `get` method
  get(requestInfo: RequestInfo) {
    const collectionName = requestInfo.collectionName;

    if (collectionName === 'products') {
      if (requestInfo.url.includes('featured')) {
        const count = parseInt(requestInfo.url[requestInfo.url.length - 1]);
        const featuredProducts = ProductsFakeDb.products.filter(
          (product) => product.isFeatured
        );

        return requestInfo.utils.createResponse$(() => ({
          body: featuredProducts.slice(0, count),
          status: 200
        }));
      }

      const query = requestInfo.query;
      const hasCategoriesParams = query.has('categories');
      const categoriesParams = query.get('categories');

      if (hasCategoriesParams && categoriesParams?.length) {
        const filteredProducts = ProductsFakeDb.products.filter((product) =>
          categoriesParams.includes(product.category.id)
        );

        return requestInfo.utils.createResponse$(() => ({
          body: filteredProducts,
          status: 200
        }));
      }
    }

    if (collectionName === 'orders') {
      // Simulate a "join" between orders and users based on `userId`
      const ordersDataJoin = (requestInfo.collection as Order[]).map(
        (order) => {
          const currentOrder = order;
          const orderItemsDataJoin = order.orderItems.map((orderItem) => {
            const product = ProductsFakeDb.products.find(
              (product) => product.id === orderItem.product.id
            );

            if (!product) return orderItem;

            return {
              ...orderItem,
              product
            };
          });

          currentOrder.orderItems = orderItemsDataJoin;

          const user = UsersFakeDb.users.find(
            (user) => user.id === order.user.id
          );

          return {
            ...currentOrder,
            user: user ?? null
          };
        }
      );

      if (requestInfo.id) {
        return requestInfo.utils.createResponse$(() => ({
          body: ordersDataJoin.find((order) => order.id === requestInfo.id),
          status: 200
        }));
      }

      // Return the joined data as the response
      return requestInfo.utils.createResponse$(() => ({
        body: ordersDataJoin,
        status: 200
      }));
    }

    // Default handling for other collections
    return undefined;
  }

  // Optional: Override POST response
  put(requestInfo: RequestInfo) {
    const collectionName = requestInfo.collectionName;

    if (collectionName === 'orders') {
      // Extract raw request body
      const rawBody = requestInfo.utils.getJsonBody(requestInfo.req);

      // Update number fields
      rawBody['status'] = String(rawBody['status']);

      // Update the object in the collection
      const orderIndex = requestInfo.collection.findIndex(
        (item: Order) => item.id === requestInfo.id
      );
      requestInfo.collection[orderIndex] = {
        ...requestInfo.collection[orderIndex],
        ...rawBody
      };

      // Return the created object in the response
      return requestInfo.utils.createResponse$(() => ({
        body: requestInfo.collection[orderIndex],
        status: 200
      }));
    }

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

    if (collectionName === 'orders') {
      const createOrderDTO: CreateOrderDTO = requestInfo.utils.getJsonBody(
        requestInfo.req
      );
      const orderItems = createOrderDTO.orderItems.map((orderItem, index) => {
        const product = ProductsFakeDb.products.find(
          (product) => product.id === orderItem.productId
        );
        if (!product) {
          throw new Error(`Product with id ${orderItem.productId} not found`);
        }

        return {
          id: `${index + 1}`,
          product,
          quantity: orderItem.quantity
        };
      });

      const user = UsersFakeDb.users.find(
        (user) => user.id === createOrderDTO.userId
      );

      const order = new Order({
        id: this.genId(requestInfo.collection as any[]),
        orderItems,
        shippingAddress1: createOrderDTO.shippingAddress1,
        shippingAddress2: createOrderDTO.shippingAddress2,
        city: createOrderDTO.city,
        zip: createOrderDTO.zip,
        country: createOrderDTO.country,
        phone: createOrderDTO.phone,
        status: createOrderDTO.status,
        totalPrice: orderItems.reduce(
          (acc, orderItem) =>
            acc + orderItem.product.price * orderItem.quantity,
          0
        ),
        user:
          user ??
          (() => {
            throw new Error(`User with id ${createOrderDTO.userId} not found`);
          })(),
        dateOrdered: new Date(
          parseInt(createOrderDTO.dateOrdered, 10)
        ).toISOString()
      });

      requestInfo.collection.push(order);

      // Return the created object in the response
      return requestInfo.utils.createResponse$(() => ({
        body: order,
        status: 201
      }));
    }

    if (collectionName === 'users' && requestInfo.id === 'login') {
      // Extract raw request body
      const rawBody = requestInfo.utils.getJsonBody(requestInfo.req);

      // Find user
      const user = UsersFakeDb.users.find(
        (user) => user.email === rawBody['email']
      );

      // Check if user exists
      if (!user) {
        return requestInfo.utils.createResponse$(() => ({
          body: { error: 'User not found.' },
          status: 400
        }));
      }

      // Check if password is correct
      if (user.password !== rawBody['password']) {
        return requestInfo.utils.createResponse$(() => ({
          body: { error: 'Invalid password.' },
          status: 400
        }));
      }

      // Return the user in the response
      return requestInfo.utils.createResponse$(() => ({
        body: user,
        status: 200
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
