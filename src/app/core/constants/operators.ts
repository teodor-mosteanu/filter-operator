import { Operator } from '../../features/transactions/interfaces/filter.interface';
import { OPERATOR_IDS } from './operator.constants';

export const OPERATORS: Operator[] = [
  { text: 'Equals', id: OPERATOR_IDS.EQUALS },
  { text: 'Is greater than', id: OPERATOR_IDS.GREATER_THAN },
  { text: 'Is less than', id: OPERATOR_IDS.LESS_THAN },
  { text: 'Has any value', id: OPERATOR_IDS.ANY },
  { text: 'Has no value', id: OPERATOR_IDS.NONE },
  { text: 'Is any of', id: OPERATOR_IDS.IN },
  { text: 'Contains', id: OPERATOR_IDS.CONTAINS },
];
