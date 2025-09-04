import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Property } from '../../interfaces/properties.interface';
import { Operator } from '../../interfaces/operator.interface';
import { OPERATOR_IDS } from '../../constants/operator.constants';
import { PROPERTY_TYPE_OPERATORS } from '../../constants/operator.constants';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import {
  numberInOperatorValidator,
  enumeratedInOperatorValidator,
  requiredValueValidator,
} from '../../utils/filter-validators';

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
  private submitted = false;
  public OPERATOR_IDS = OPERATOR_IDS;

  @Input() properties: Property[] = [];
  @Input() operators: Operator[] = [];
  @Output() filterChange = new EventEmitter<any>();

  filterFormGroup = new FormGroup({
    property: new FormControl(),
    operator: new FormControl(),
    value: new FormControl(),
  });

  get propertyControl() {
    return this.filterFormGroup.get('property');
  }
  get operatorControl() {
    return this.filterFormGroup.get('operator');
  }
  get valueControl() {
    return this.filterFormGroup.get('value');
  }

  get selectedProperty() {
    return this.propertyControl?.value;
  }
  get selectedOperator() {
    return this.operatorControl?.value;
  }

  get filteredOperators(): Operator[] {
    const property = this.selectedProperty;
    if (!property) {
      return [];
    }
    const validOps =
      PROPERTY_TYPE_OPERATORS[
        property.type as keyof typeof PROPERTY_TYPE_OPERATORS
      ] || [];
    return this.operators.filter(op =>
      validOps.map(String).includes(String(op.id)),
    );
  }

  get valueOptions(): string[] {
    return this.selectedProperty?.values || [];
  }

  ngOnInit() {
    this.propertyControl?.valueChanges.subscribe(() =>
      this.updateValueValidators(),
    );
    this.operatorControl?.valueChanges.subscribe(() =>
      this.updateValueValidators(),
    );
    this.valueControl?.valueChanges.subscribe(() => {
      if (this.submitted) {
        this.showValueError = false;
        this.valueErrorMessage = '';
      }
    });
  }

  /**
   * Dynamically sets validators for the value control based on selected property and operator.
   */
  updateValueValidators() {
    const property = this.selectedProperty;
    const operator = this.selectedOperator;
    if (!property || !operator) {
      this.valueControl?.clearValidators();
      this.valueControl?.updateValueAndValidity();
      return;
    }
    if (property.type === 'number' && operator.id === this.OPERATOR_IDS.IN) {
      this.valueControl?.setValidators(numberInOperatorValidator());
    } else if (
      property.type === 'enumerated' &&
      operator.id === this.OPERATOR_IDS.IN
    ) {
      this.valueControl?.setValidators(enumeratedInOperatorValidator());
    } else {
      this.valueControl?.setValidators(requiredValueValidator(operator.id));
    }
    this.valueControl?.updateValueAndValidity();
  }

  /**
   * Handles filter form submission, displays validation errors, and emits filter changes.
   */
  filterProducts() {
    this.submitted = true;
    this.showValueError = false;
    this.valueErrorMessage = '';
    if (this.valueControl?.invalid) {
      const errors = this.valueControl.errors || {};
      this.showValueError = true;
      this.valueErrorMessage = Object.values(errors)[0];
      return;
    }
    const property = this.selectedProperty;
    const operator = this.selectedOperator;
    let value = this.valueControl?.value;
    if (
      property &&
      property.type === 'number' &&
      operator &&
      operator.id === this.OPERATOR_IDS.IN
    ) {
      value = value.split(',').map((v: string) => Number(v.trim()));
    }
    this.filterChange.emit({
      ...this.filterFormGroup.value,
      value,
    });
  }

  clearFilters() {
    this.filterFormGroup.reset();
    this.filterChange.emit({});
  }
}
