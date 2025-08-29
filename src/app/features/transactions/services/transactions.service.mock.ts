import { PaginatedTransactions } from '../../../core/interfaces/payment-transaction';

export const mockTransactions: PaginatedTransactions = {
  totalNumberOfItems: 25,
  numberOfPages: 5,
  currentPage: 0,
  pageSize: 5,
  hasNext: true,
  items: [
    {
      id: 'TXID_sdfb-sodj-nd-3r3brb',
      amount: 24.35,
      currency: 'USD',
      description: 'Test payment made only for this technical task #18',
      status: 'SETTLED',
      createdAt: '2021-07-24T12:27:07.965',
    },
    {
      id: 'TXID_sdfb-sodj-3gb34-b5',
      amount: 47.46,
      currency: 'GBP',
      description: 'Test payment made only for this technical task #8',
      status: 'COMPLETED',
      createdAt: '2021-07-23T12:27:07.965',
    },
    {
      id: 'TXID_sdfb-sodj-3gb34-45b',
      amount: 57,
      currency: 'GBP',
      description: 'Test payment made only for this technical task #21',
      status: 'COMPLETED',
      createdAt: '2021-07-22T12:27:07.965',
    },
    {
      id: 'TXID_sdfb-sodj-45nub-3r3brb',
      amount: 25.24,
      currency: 'CHF',
      description: 'Test payment made only for this technical task #20',
      status: 'CREATED',
      createdAt: '2021-07-21T12:27:07.965',
    },
    {
      id: 'TXID_sdfb-v35-3gb34-3r3brb',
      amount: 3.35,
      currency: 'USD',
      description: 'Test payment made only for this technical task #22',
      status: 'CAPTURED',
      createdAt: '2021-07-20T12:27:07.965',
    },
  ],
};
