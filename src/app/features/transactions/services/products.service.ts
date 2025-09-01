import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { datastore } from './datastore.mock';
import { Product } from '../interfaces/products.interface';
import { Property } from '../interfaces/properties.interface';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    // Simulate backend call
    return of(datastore.products).pipe(delay(5000));
  }

  getProperties(): Observable<Property[]> {
    // Simulate backend call
    return of(datastore.properties);
  }
}
