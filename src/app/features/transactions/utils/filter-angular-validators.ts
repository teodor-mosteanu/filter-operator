import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numberInOperatorValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || typeof value !== 'string') {
      return {
        numberIn: 'Please enter one or more numbers separated by commas.',
      };
    }
    const values = value.split(',').map((v: string) => v.trim());
    if (
      values.length === 0 ||
      values.some((v: string) => v === '' || isNaN(Number(v)))
    ) {
      return { numberIn: 'Only numbers separated by commas are allowed.' };
    }
    return null;
  };
}

export function enumeratedInOperatorValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || !Array.isArray(value) || value.length === 0) {
      return { enumeratedIn: 'Please select one or more values.' };
    }
    return null;
  };
}

export function requiredValueValidator(
  operatorId: string,
  OPERATOR_IDS: any,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (
      operatorId !== OPERATOR_IDS.ANY &&
      operatorId !== OPERATOR_IDS.NONE &&
      !value
    ) {
      return { requiredValue: 'Value is required.' };
    }
    return null;
  };
}
