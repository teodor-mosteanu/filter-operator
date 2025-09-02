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
import { catchError, of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { LoggerService } from '../../../../core/services/logger.service';
import {
  matchEquals,
  matchGreaterThan,
  matchLessThan,
  matchAny,
  matchNone,
  matchIn,
  matchContains,
} from '../../utils/filter-matchers';

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
  placeholderContent = PLACEHOLDER_CONTENT.NO_PRODUCTS;
  showError = false;

  constructor(
    private productsService: DatastoreService,
    private loggerService: LoggerService,
  ) {
    this.loadData();
  }

  loadData(): void {
    this.setLoadingState(true);
    forkJoin({
      products: this.productsService
        .getProducts()
        .pipe(catchError(() => of(null))),
      properties: this.productsService
        .getProperties()
        .pipe(catchError(() => of(null))),
    }).subscribe(({ products, properties }) => {
      const hasError = !products || !properties;
      if (hasError) {
        this.handleLoadError();
        return;
      }
      this.showError = false;
      this.allProducts = products;
      this.products = [...this.allProducts];
      this.properties = properties;
      this.setLoadingState(false);
      if (this.products.length === 0) {
        this.setPlaceholderContent(PLACEHOLDER_CONTENT.NO_PRODUCTS);
      }
    });
  }

  private handleLoadError(): void {
    //logging would be normally handled in the error interceptor
    this.loggerService.log('Error loading products or properties');
    this.setLoadingState(false);
    this.setPlaceholderContent(PLACEHOLDER_CONTENT.ERROR);
    this.showError = true;
  }

  setLoadingState(isLoading: boolean): void {
    this.loading = isLoading;
    this.setPlaceholderContent(PLACEHOLDER_CONTENT.LOADING);
  }

  setPlaceholderContent(
    content: (typeof PLACEHOLDER_CONTENT)[keyof typeof PLACEHOLDER_CONTENT],
  ): void {
    this.placeholderContent = content;
  }

  /**
   * Updates the displayed products based on the selected filter.
   *
   * @param filter - The filter object containing property, operator, and value.
   *
   * If no property or operator is selected, resets the product list to all products.
   * Otherwise, filters products by matching the selected property value against the filter value
   * using the chosen operator (equals, greater than, less than, any, none, in, contains).
   * Updates the placeholder message if no products match the filter.
   */
  onFilterChange(filter: {
    property: Property;
    operator: Operator;
    value: any;
  }): void {
    if (!filter.property || !filter.operator) {
      this.products = [...this.allProducts];
      this.setPlaceholderContent(PLACEHOLDER_CONTENT.NO_PRODUCTS);
      return;
    }
    this.products = this.allProducts.filter(product =>
      this.matchesFilter(product, filter),
    );
    if (this.products.length === 0) {
      this.setPlaceholderContent(PLACEHOLDER_CONTENT.NO_PRODUCTS);
    }
  }

  /**
   * Determines if a product matches the given filter.
   * @param product - The product to check.
   * @param filter - The filter criteria.
   */
  private matchesFilter(
    product: Product,
    filter: { property: Property; operator: Operator; value: any },
  ): boolean {
    const propValue = product.property_values.find(
      pv => pv.property_id === filter.property.id,
    )?.value;
    switch (filter.operator.id) {
      case OPERATOR_IDS.EQUALS:
        return matchEquals(propValue, filter.value);
      case OPERATOR_IDS.GREATER_THAN:
        return matchGreaterThan(propValue, filter.value);
      case OPERATOR_IDS.LESS_THAN:
        return matchLessThan(propValue, filter.value);
      case OPERATOR_IDS.ANY:
        return matchAny(propValue);
      case OPERATOR_IDS.NONE:
        return matchNone(propValue);
      case OPERATOR_IDS.IN:
        return matchIn(propValue, filter.value, filter.property.type);
      case OPERATOR_IDS.CONTAINS:
        return matchContains(propValue, filter.value);
      default:
        return true;
    }
  }

  clearFilter(): void {
    this.products = [...this.allProducts];
  }
}
