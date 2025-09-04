import {
  numberInOperatorValidator,
  enumeratedInOperatorValidator,
  requiredValueValidator,
} from './filter-validators';
import { OPERATOR_IDS } from '../constants/operator.constants';

describe('filter-validators', () => {
  describe('numberInOperatorValidator', () => {
    const validator = numberInOperatorValidator();
    it('should return null for valid comma-separated numbers', () => {
      expect(validator({ value: '1,2,3' } as any)).toBeNull();
      expect(validator({ value: '10, 20, 30' } as any)).toBeNull();
    });
    it('should return error for non-numeric values', () => {
      expect(validator({ value: '1,a,3' } as any)).toEqual({
        numberIn: 'Only numbers separated by commas are allowed.',
      });
      expect(validator({ value: 'abc' } as any)).toEqual({
        numberIn: 'Only numbers separated by commas are allowed.',
      });
    });
    it('should return error for empty or invalid input', () => {
      expect(validator({ value: '' } as any)).toEqual({
        numberIn: 'Please enter one or more numbers separated by commas.',
      });
      expect(validator({ value: null } as any)).toEqual({
        numberIn: 'Please enter one or more numbers separated by commas.',
      });
      expect(validator({ value: undefined } as any)).toEqual({
        numberIn: 'Please enter one or more numbers separated by commas.',
      });
    });
  });

  describe('enumeratedInOperatorValidator', () => {
    const validator = enumeratedInOperatorValidator();
    it('should return null for valid array input', () => {
      expect(validator({ value: ['a', 'b'] } as any)).toBeNull();
    });
    it('should return error for empty array', () => {
      expect(validator({ value: [] } as any)).toEqual({
        enumeratedIn: 'Please select one or more values.',
      });
    });
    it('should return error for non-array or empty input', () => {
      expect(validator({ value: null } as any)).toEqual({
        enumeratedIn: 'Please select one or more values.',
      });
      expect(validator({ value: undefined } as any)).toEqual({
        enumeratedIn: 'Please select one or more values.',
      });
      expect(validator({ value: '' } as any)).toEqual({
        enumeratedIn: 'Please select one or more values.',
      });
    });
  });

  describe('requiredValueValidator', () => {
    it('should return null for valid value (not ANY or NONE)', () => {
      const validator = requiredValueValidator(OPERATOR_IDS.EQUALS);
      expect(validator({ value: 'test' } as any)).toBeNull();
    });
    it('should return error for missing value (not ANY or NONE)', () => {
      const validator = requiredValueValidator(OPERATOR_IDS.EQUALS);
      expect(validator({ value: '' } as any)).toEqual({
        requiredValue: 'Value is required.',
      });
      expect(validator({ value: null } as any)).toEqual({
        requiredValue: 'Value is required.',
      });
      expect(validator({ value: undefined } as any)).toEqual({
        requiredValue: 'Value is required.',
      });
    });
    it('should return null for ANY or NONE operator even if value is missing', () => {
      const validatorAny = requiredValueValidator(OPERATOR_IDS.ANY);
      const validatorNone = requiredValueValidator(OPERATOR_IDS.NONE);
      expect(validatorAny({ value: '' } as any)).toBeNull();
      expect(validatorNone({ value: '' } as any)).toBeNull();
    });
  });
});
