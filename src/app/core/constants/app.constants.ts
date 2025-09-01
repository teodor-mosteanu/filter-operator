/* app title [TM 20/03/24] */
export const appTitle = 'Salsify | Operator Product Filter';

/* api auth details [TM 19/03/24] */
export const apiUsername = 'user';
export const apiPassword = 'userPass';

/* Get transactions URL [TM 20/03/24] */
export const transationApiUrl = 'http://localhost:8080/api/v1/payments';

/* default page size [TM 21/03/24] */
export const defaultPageSize = 5;

/* Default payment statuses [TM 21/03/24] */
export enum PaymentStatus {
  CAPTURED = 'CAPTURED',
  COMPLETED = 'COMPLETED',
  CREATED = 'CREATED',
  FAILED = 'FAILED',
  SETTLED = 'SETTLED',
}

/* placeholder messages [TM 28/03/24] */
export const PLACEHOLDER_CONTENT = {
  NO_FILTER: {
    title: 'No filter selected',
    message:
      'Begin by creating a filter to view transactions. Click apply with empty filters to get all data.',
  },
  NO_PRODUCTS: {
    title: 'No products found',
    message: 'No products found with the selected filter',
  },
  ERROR: {
    title: 'An error occurred',
    message:
      'An error occurred while fetching products. Please try again later.',
  },
};
