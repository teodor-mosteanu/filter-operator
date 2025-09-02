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
    // Simulate backend call with a delay
    return of(datastore.products).pipe(delay(4000));
  }

  getProperties(): Observable<Property[]> {
    // Simulate backend call with a delay
    return of(datastore.properties).pipe(delay(2000));
    // Simulate backend error after a delay
    // return new Observable<Property[]>(observer => {
    //   setTimeout(() => {
    //     observer.error(new Error('Simulated properties error'));
    //   }, 2000);
    // });
  }
}
