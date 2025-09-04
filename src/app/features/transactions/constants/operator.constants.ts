import { Operator } from '../interfaces/operator.interface';

export const OPERATOR_IDS = {
  EQUALS: 'equals',
  GREATER_THAN: 'greater_than',
  LESS_THAN: 'less_than',
  ANY: 'any',
  NONE: 'none',
  IN: 'in',
  CONTAINS: 'contains',
} as const;

export type OperatorId = (typeof OPERATOR_IDS)[keyof typeof OPERATOR_IDS];

/* These are the possible operators for each property type [TM 02/09/25] */
export const PROPERTY_TYPE_OPERATORS = {
  string: [
    OPERATOR_IDS.EQUALS,
    OPERATOR_IDS.ANY,
    OPERATOR_IDS.NONE,
    OPERATOR_IDS.IN,
    OPERATOR_IDS.CONTAINS,
  ],
  number: [
    OPERATOR_IDS.EQUALS,
    OPERATOR_IDS.GREATER_THAN,
    OPERATOR_IDS.LESS_THAN,
    OPERATOR_IDS.ANY,
    OPERATOR_IDS.NONE,
    OPERATOR_IDS.IN,
  ],
  enumerated: [
    OPERATOR_IDS.EQUALS,
    OPERATOR_IDS.ANY,
    OPERATOR_IDS.NONE,
    OPERATOR_IDS.IN,
  ],
};

export const OPERATORS: Operator[] = [
  { text: 'Equals', id: OPERATOR_IDS.EQUALS },
  { text: 'Is greater than', id: OPERATOR_IDS.GREATER_THAN },
  { text: 'Is less than', id: OPERATOR_IDS.LESS_THAN },
  { text: 'Has any value', id: OPERATOR_IDS.ANY },
  { text: 'Has no value', id: OPERATOR_IDS.NONE },
  { text: 'Is any of', id: OPERATOR_IDS.IN },
  { text: 'Contains', id: OPERATOR_IDS.CONTAINS },
];
