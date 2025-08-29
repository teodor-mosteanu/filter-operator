import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { datastore } from './datastore.mock';
import { Product } from '../interfaces/products.interface';
import { Property } from '../interfaces/properties.interface';
import { Operator } from '../interfaces/filter.interface';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    // Simulate backend call
    return of(datastore.products);
  }

  getProperties(): Observable<Property[]> {
    // Simulate backend call
    return of(datastore.properties);
  }

  getOperators(): Observable<Operator[]> {
    // Simulate backend call
    return of(datastore.operators);
  }
}
