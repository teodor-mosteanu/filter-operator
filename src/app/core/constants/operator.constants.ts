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
