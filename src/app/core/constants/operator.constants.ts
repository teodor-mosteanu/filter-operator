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
