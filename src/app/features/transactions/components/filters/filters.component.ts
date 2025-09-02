import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Property } from '../../interfaces/properties.interface';
import { Operator } from '../../interfaces/filter.interface';
import { OPERATOR_IDS } from '../../../../core/constants/operator.constants';
import { PROPERTY_TYPE_OPERATORS } from '../../../../core/constants/operator.constants';
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
} from '../../utils/filter-angular-validators';

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
  ngOnInit() {
    this.filterFormGroup.get('property')?.valueChanges.subscribe(() => {
      this.updateValueValidators();
    });
    this.filterFormGroup.get('operator')?.valueChanges.subscribe(() => {
      this.updateValueValidators();
    });
  }

  updateValueValidators() {
    const property = this.filterFormGroup.get('property')?.value;
    const operator = this.filterFormGroup.get('operator')?.value;
    const valueControl = this.filterFormGroup.get('value');
    if (!property || !operator) {
      valueControl?.clearValidators();
      valueControl?.updateValueAndValidity();
      return;
    }
    if (property.type === 'number' && operator.id === this.OPERATOR_IDS.IN) {
      valueControl?.setValidators(numberInOperatorValidator());
    } else if (
      property.type === 'enumerated' &&
      operator.id === this.OPERATOR_IDS.IN
    ) {
      valueControl?.setValidators(enumeratedInOperatorValidator());
    } else {
      valueControl?.setValidators(
        requiredValueValidator(operator.id, this.OPERATOR_IDS),
      );
    }
    valueControl?.updateValueAndValidity();
  }
  showValueError = false;
  valueErrorMessage = '';
  private submitted = false;
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
    const validOps =
      PROPERTY_TYPE_OPERATORS[
        selectedProperty.type as keyof typeof PROPERTY_TYPE_OPERATORS
      ] || [];
    return this.operators.filter(op =>
      validOps.map(String).includes(String(op.id)),
    );
  }

  get valueOptions(): string[] {
    const selectedProperty = this.filterFormGroup.get('property')?.value;
    return selectedProperty?.values || [];
  }

  filterProducts() {
    this.submitted = true;
    this.showValueError = false;
    this.valueErrorMessage = '';
    const valueControl = this.filterFormGroup.get('value');
    if (valueControl?.invalid) {
      const errors = valueControl.errors || {};
      this.showValueError = true;
      this.valueErrorMessage = Object.values(errors)[0] as string;
      return;
    }
    // For number IN operator, parse value to array of numbers
    const property = this.filterFormGroup.get('property')?.value;
    const operator = this.filterFormGroup.get('operator')?.value;
    let value = valueControl?.value;
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
  ngAfterViewInit() {
    this.filterFormGroup.get('value')?.valueChanges.subscribe(() => {
      if (this.submitted) {
        this.showValueError = false;
        this.valueErrorMessage = '';
      }
    });
  }

  clearFilters() {
    this.filterFormGroup.reset();
    this.filterChange.emit({});
  }
}
