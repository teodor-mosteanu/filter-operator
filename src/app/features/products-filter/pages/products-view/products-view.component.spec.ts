import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsViewComponent } from './products-view.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { TableComponent } from '../../components/table/table.component';
import { PlaceholderComponent } from '../../../../shared/components/placeholder/placeholder.component';
import { DatastoreService } from '../../services/products.service';
import { LoggerService } from '../../../../core/services/logger.service';
import { PLACEHOLDER_CONTENT } from '../../../../core/constants/app.constants';
import { ViewStatus } from '../../../../core/interfaces/view-status.enum';
import { of } from 'rxjs';
import { datastore } from './datastore.mock';

class MockDatastoreService {
  getProducts() {
    return of(datastore.products);
  }
  getProperties() {
    return of(datastore.properties);
  }
}

class MockLoggerService {
  log(msg: string) {}
}

describe('ProductsViewComponent', () => {
  let component: ProductsViewComponent;
  let fixture: ComponentFixture<ProductsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsViewComponent,
        FiltersComponent,
        TableComponent,
        PlaceholderComponent,
      ],
      providers: [
        { provide: DatastoreService, useClass: MockDatastoreService },
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products and properties from datastore', () => {
    expect(component.allProducts.length).toBe(datastore.products.length);
    expect(component.properties.length).toBe(datastore.properties.length);
    expect(component.status).toBe(ViewStatus.Ready);
  });

  it('should show all products when no filter is applied', () => {
    component.onFilterChange({
      property: null,
      operator: null,
      value: null,
    } as any);
    expect(component.products.length).toBe(datastore.products.length);
    expect(component.placeholderContent).toBe(PLACEHOLDER_CONTENT.NO_PRODUCTS);
  });

  it('should filter products by "Equals" operator', () => {
    const property = component.properties.find(p => p.name === 'Product Name');
    const operator = component.operators.find(o => o.id === 'equals');
    expect(property).toBeDefined();
    expect(operator).toBeDefined();
    component.onFilterChange({
      property: property!,
      operator: operator!,
      value: 'Headphones',
    });
    expect(component.products.length).toBe(1);
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Headphones'),
      ),
    ).toBeTrue();
  });

  it('should filter products by "Is greater than" operator', () => {
    const property = component.properties.find(p => p.name === 'weight (oz)');
    const operator = component.operators.find(o => o.id === 'greater_than');
    expect(property).toBeDefined();
    expect(operator).toBeDefined();
    component.onFilterChange({
      property: property!,
      operator: operator!,
      value: 4,
    });
    expect(component.products.length).toBe(3);
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Headphones'),
      ),
    ).toBeTrue();
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Hammer'),
      ),
    ).toBeTrue();
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Keyboard'),
      ),
    ).toBeTrue();
  });

  it('should filter products by "Contains" operator', () => {
    const property = component.properties.find(p => p.name === 'Product Name');
    const operator = component.operators.find(o => o.id === 'contains');
    expect(property).toBeDefined();
    expect(operator).toBeDefined();
    component.onFilterChange({
      property: property!,
      operator: operator!,
      value: 'phone',
    });
    expect(component.products.length).toBe(2);
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Headphones'),
      ),
    ).toBeTrue();
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Cell Phone'),
      ),
    ).toBeTrue();
  });

  it('should filter products by "Is any of" operator', () => {
    const property = component.properties.find(p => p.name === 'Product Name');
    const operator = component.operators.find(o => o.id === 'in');
    expect(property).toBeDefined();
    expect(operator).toBeDefined();
    component.onFilterChange({
      property: property!,
      operator: operator!,
      value: ['Headphones', 'Key'],
    });
    expect(component.products.length).toBe(2);
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Headphones'),
      ),
    ).toBeTrue();
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Key'),
      ),
    ).toBeTrue();
  });

  it('should filter products by "Has any value" operator', () => {
    const property = component.properties.find(p => p.name === 'Product Name');
    const operator = component.operators.find(o => o.id === 'any');
    expect(property).toBeDefined();
    expect(operator).toBeDefined();
    component.onFilterChange({
      property: property!,
      operator: operator!,
      value: null,
    });
    expect(component.products.length).toBe(datastore.products.length);
  });

  it('should filter products by "Has no value" operator', () => {
    const property = component.properties.find(p => p.name === 'wireless');
    const operator = component.operators.find(o => o.id === 'none');
    expect(property).toBeDefined();
    expect(operator).toBeDefined();
    component.onFilterChange({
      property: property!,
      operator: operator!,
      value: null,
    });
    // Only products without wireless property
    expect(component.products.length).toBe(3);
    expect(
      component.products.every(
        p =>
          p.property_values.find(v => v.property_id === property!.id) ===
          undefined,
      ),
    ).toBeTrue();
  });

  it('should set error state if products or properties fail to load', () => {
    const mockService = TestBed.inject(DatastoreService) as any;
    spyOn(mockService, 'getProducts').and.returnValue(of(null));
    spyOn(mockService, 'getProperties').and.returnValue(
      of(datastore.properties),
    );
    const logger = TestBed.inject(LoggerService);
    const logSpy = spyOn(logger, 'log');
    component.loadData();
    expect(component.status).toBe(ViewStatus.Error);
    expect(component.placeholderContent).toBe(PLACEHOLDER_CONTENT.ERROR);
    expect(logSpy).toHaveBeenCalledWith('Error loading products or properties');
  });
  it('should filter products by "Is less than" operator', () => {
    const property = component.properties.find(p => p.name === 'weight (oz)');
    const operator = component.operators.find(o => o.id === 'less_than');
    expect(property).toBeDefined();
    expect(operator).toBeDefined();
    component.onFilterChange({
      property: property!,
      operator: operator!,
      value: 4,
    });
    // Should match products with weight < 4 (Key, Cup, Cell Phone)
    expect(component.products.length).toBe(3);
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Key'),
      ),
    ).toBeTrue();
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Cup'),
      ),
    ).toBeTrue();
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Cell Phone'),
      ),
    ).toBeTrue();
  });

  it('should filter products by "Is any of" operator with comma-separated string', () => {
    const property = component.properties.find(p => p.name === 'Product Name');
    const operator = component.operators.find(o => o.id === 'in');
    expect(property).toBeDefined();
    expect(operator).toBeDefined();
    component.onFilterChange({
      property: property!,
      operator: operator!,
      value: 'Headphones,Key',
    });
    expect(component.products.length).toBe(2);
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Headphones'),
      ),
    ).toBeTrue();
    expect(
      component.products.some(p =>
        p.property_values.some(v => v.value === 'Key'),
      ),
    ).toBeTrue();
  });
});
