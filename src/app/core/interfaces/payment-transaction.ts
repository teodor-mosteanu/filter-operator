export type PaymentStatus =
  | 'CAPTURED'
  | 'COMPLETED'
  | 'CREATED'
  | 'FAILED'
  | 'SETTLED';

export interface PaymentTransaction {
  amount: number;
  createdAt: string; // ISO date-time string
  currency: string;
  description: string;
  id: string;
  status: PaymentStatus;
}

export interface PaginatedTransactions {
  currentPage: number;
  hasNext: boolean;
  items: PaymentTransaction[];
  numberOfPages: number;
  pageSize: number;
  totalNumberOfItems: number;
}
