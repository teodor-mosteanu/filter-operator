import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PLACEHOLDER_CONTENT } from '../../../../core/constants/app.constants';
import { OPERATOR_IDS } from '../../constants/operator.constants';
import { OPERATORS } from '../../constants/operator.constants';
import { Product } from '../../interfaces/products.interface';
import { Property } from '../../interfaces/properties.interface';
import { Operator } from '../../interfaces/operator.interface';
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

import { ViewStatus } from '../../../../core/interfaces/view-status.enum';

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
  ViewStatus = ViewStatus;
  allProducts: Product[] = [];
  products: Product[] = [];
  properties: Property[] = [];
  operators: Operator[] = OPERATORS;
  status: ViewStatus = ViewStatus.Loading;
  placeholderContent = PLACEHOLDER_CONTENT.LOADING;

  constructor(
    private productsService: DatastoreService,
    private loggerService: LoggerService,
  ) {
    this.loadData();
  }

  loadData(): void {
    this.status = ViewStatus.Loading;
    this.placeholderContent = PLACEHOLDER_CONTENT.LOADING;
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
        this.loggerService.log('Error loading products or properties');
        this.status = ViewStatus.Error;
        this.placeholderContent = PLACEHOLDER_CONTENT.ERROR;
        return;
      }
      this.status = ViewStatus.Ready;
      this.allProducts = products;
      this.products = [...this.allProducts];
      this.properties = properties;
    });
  }

  // Removed handleLoadError and setLoadingState/setPlaceholderContent methods

  /**
   * Applies the current filter to the products list and updates the displayed products.
   * Emits a placeholder message if no products match.
   */
  onFilterChange(filter: {
    property: Property;
    operator: Operator;
    value: any;
  }): void {
    if (!filter.property || !filter.operator) {
      this.products = [...this.allProducts];
      this.placeholderContent = PLACEHOLDER_CONTENT.NO_PRODUCTS;
      return;
    }
    this.products = this.allProducts.filter(product =>
      this.matchesFilter(product, filter),
    );
  }

  /**
   * Checks if a product matches the given filter criteria.
   * Returns true if the product should be included in the filtered list.
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
}
