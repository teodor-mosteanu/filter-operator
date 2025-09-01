import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Property } from '../../interfaces/properties.interface';
import { Operator } from '../../interfaces/filter.interface';
import { OPERATOR_IDS } from '../../../../core/constants/operator.constants';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    CommonModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Input() properties: Property[] = [];
  @Input() operators: Operator[] = [];
  @Output() filterChange = new EventEmitter<any>();

  filterFormGroup = new FormGroup({
    property: new FormControl(),
    operator: new FormControl(),
    value: new FormControl(),
  });
  get filteredOperators(): Operator[] {
    const selectedProperty = this.filterFormGroup.get('property')?.value;
    if (!selectedProperty) {
      return [];
    }
    switch (selectedProperty.type) {
      case 'string':
        return this.operators.filter(op =>
          (
            [
              OPERATOR_IDS.EQUALS,
              OPERATOR_IDS.ANY,
              OPERATOR_IDS.NONE,
              OPERATOR_IDS.IN,
              OPERATOR_IDS.CONTAINS,
            ] as readonly string[]
          ).includes(op.id),
        );
      case 'number':
        return this.operators.filter(op =>
          (
            [
              OPERATOR_IDS.EQUALS,
              OPERATOR_IDS.GREATER_THAN,
              OPERATOR_IDS.LESS_THAN,
              OPERATOR_IDS.ANY,
              OPERATOR_IDS.NONE,
              OPERATOR_IDS.IN,
            ] as readonly string[]
          ).includes(op.id),
        );
      case 'enumerated':
        return this.operators.filter(op =>
          (
            [
              OPERATOR_IDS.EQUALS,
              OPERATOR_IDS.ANY,
              OPERATOR_IDS.NONE,
              OPERATOR_IDS.IN,
            ] as readonly string[]
          ).includes(op.id),
        );
      default:
        return [];
    }
  }

  get valueOptions(): string[] {
    const selectedProperty = this.filterFormGroup.get('property')?.value;
    return selectedProperty?.values || [];
  }

  filterProducts() {
    this.filterChange.emit(this.filterFormGroup.value);
  }

  clearFilters() {
    this.filterFormGroup.reset();
    this.filterChange.emit({});
  }
}
