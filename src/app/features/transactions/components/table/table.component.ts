import { Property } from '../../interfaces/properties.interface';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Product } from '../../interfaces/products.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() products: Product[] = [];
  @Input() properties: Property[] = [];

  // Get the value of a specific property for a given product - if not found, return a default value
  getPropertyValue(
    product: Product,
    propertyId: number,
  ): string | number | undefined {
    const prop = product.property_values.find(
      pv => pv.property_id === propertyId,
    );
    return prop ? prop.value : '';
  }
}
