import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Property } from '../../interfaces/properties.interface';
import { Operator } from '../../interfaces/filter.interface';
import { OPERATOR_IDS } from '../../../../core/constants/operator.constants';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
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
    MultiSelectModule,
    CommonModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  showValueError = false;
  valueErrorMessage = '';
  public OPERATOR_IDS = OPERATOR_IDS;
  get selectedProperty() {
    return this.filterFormGroup.get('property')?.value;
  }

  get selectedOperator() {
    return this.filterFormGroup.get('operator')?.value;
  }
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
    const { property, operator, value } = this.filterFormGroup.value;
    this.showValueError = false;
    this.valueErrorMessage = '';

    // Validation for 'Is any of' operator on number property
    if (
      property &&
      property.type === 'number' &&
      operator &&
      operator.id === OPERATOR_IDS.IN
    ) {
      // Accept comma-separated numbers
      if (!value || typeof value !== 'string') {
        this.showValueError = true;
        this.valueErrorMessage =
          'Please enter one or more numbers separated by commas.';
        return;
      }
      const values = value.split(',').map(v => v.trim());
      if (
        values.length === 0 ||
        values.some(v => v === '' || isNaN(Number(v)))
      ) {
        this.showValueError = true;
        this.valueErrorMessage =
          'Only numbers separated by commas are allowed.';
        return;
      }
      // Pass array of numbers to filter
      this.filterChange.emit({
        ...this.filterFormGroup.value,
        value: values.map(Number),
      });
      return;
    }

    // Validation for 'Is any of' operator on enumerated property (multi-select)
    if (
      property &&
      property.type === 'enumerated' &&
      operator &&
      operator.id === OPERATOR_IDS.IN
    ) {
      if (!value || !Array.isArray(value) || value.length === 0) {
        this.showValueError = true;
        this.valueErrorMessage = 'Please select one or more values.';
        return;
      }
      // Pass array of selected values to filter
      this.filterChange.emit({ ...this.filterFormGroup.value, value });
      return;
    }

    // General required value check
    if (
      operator &&
      operator.id !== OPERATOR_IDS.ANY &&
      operator.id !== OPERATOR_IDS.NONE &&
      !value
    ) {
      this.showValueError = true;
      this.valueErrorMessage = 'Value is required.';
      return;
    }
    this.filterChange.emit(this.filterFormGroup.value);
  }

  clearFilters() {
    this.filterFormGroup.reset();
    this.filterChange.emit({});
  }
}
