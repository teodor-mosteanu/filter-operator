import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PLACEHOLDER_CONTENT } from '../../../../core/constants/app.constants';
import { OPERATOR_IDS } from '../../../../core/constants/operator.constants';
import { OPERATORS } from '../../../../core/constants/operators';
import { Product } from '../../interfaces/products.interface';
import { Property } from '../../interfaces/properties.interface';
import { Operator } from '../../interfaces/filter.interface';
import { FiltersComponent } from '../../components/filters/filters.component';
import { TableComponent } from '../../components/table/table.component';
import { DatastoreService } from '../../services/products.service';
import { PlaceholderComponent } from '../../components/placeholder/placeholder.component';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-products-view',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    FiltersComponent,
    TableComponent,
    PlaceholderComponent,
  ],
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.scss',
})
export class ProductsViewComponent {
  allProducts: Product[] = [];
  products: Product[] = [];
  properties: Property[] = [];
  operators: Operator[] = OPERATORS;
  loading = false;
  placeholderContent = PLACEHOLDER_CONTENT.NO_FILTER;

  constructor(private productsService: DatastoreService) {
    this.loadAllProducts();
    this.loadProperties();
  }

  setLoadingState(isLoading: boolean): void {
    this.loading = isLoading;
  }

  setPlaceholderContent(
    content: (typeof PLACEHOLDER_CONTENT)[keyof typeof PLACEHOLDER_CONTENT],
  ): void {
    this.placeholderContent = content;
  }

  loadAllProducts(): void {
    this.setLoadingState(true);
    this.productsService
      .getProducts()
      .pipe(catchError(() => this.handleError()))
      .subscribe((data: Product[] | null) => {
        this.allProducts = data || [];
        this.products = [...this.allProducts];
        this.setLoadingState(false);
        if (this.products.length === 0) {
          this.setPlaceholderContent(PLACEHOLDER_CONTENT.NO_PRODUCTS);
        }
      });
  }

  loadProperties(): void {
    this.productsService
      .getProperties()
      .pipe(catchError(() => this.handleError()))
      .subscribe((data: Property[] | null) => {
        this.properties = data || [];
      });
  }

  onFilterChange(filter: {
    property: Property;
    operator: Operator;
    value: any;
  }): void {
    if (!filter.property || !filter.operator) {
      this.products = [...this.allProducts];
      return;
    }
    this.products = this.allProducts.filter(product => {
      const propValue = product.property_values.find(
        pv => pv.property_id === filter.property.id,
      )?.value;
      switch (filter.operator.id) {
        case OPERATOR_IDS.EQUALS:
          return propValue == filter.value;
        case OPERATOR_IDS.GREATER_THAN:
          return typeof propValue === 'number' && propValue > filter.value;
        case OPERATOR_IDS.LESS_THAN:
          return typeof propValue === 'number' && propValue < filter.value;
        case OPERATOR_IDS.ANY:
          return (
            propValue !== undefined && propValue !== null && propValue !== ''
          );
        case OPERATOR_IDS.NONE:
          return (
            propValue === undefined || propValue === null || propValue === ''
          );
        case OPERATOR_IDS.IN:
          if (Array.isArray(filter.value)) {
            return filter.value.includes(propValue);
          }
          return (
            typeof filter.value === 'string' &&
            filter.value
              .split(',')
              .map(v => v.trim())
              .includes(String(propValue))
          );
        case OPERATOR_IDS.CONTAINS:
          return (
            typeof propValue === 'string' &&
            propValue.toLowerCase().includes(String(filter.value).toLowerCase())
          );
        default:
          return true;
      }
    });
  }

  clearFilter(): void {
    this.products = [...this.allProducts];
  }

  private handleError(): Observable<null> {
    this.setLoadingState(false);
    this.setPlaceholderContent(PLACEHOLDER_CONTENT.ERROR);
    return of(null);
  }
}
