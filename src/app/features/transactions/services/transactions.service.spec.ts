import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TransactionsService } from './transactions.service';
import { PaginatedTransactions } from '../../../core/interfaces/payment-transaction';
import { LoggerService } from '../../../core/services/logger.service';
import { mockTransactions } from './transactions.service.mock';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let mockLoggerService: jasmine.SpyObj<LoggerService>;
  let httpMock: HttpTestingController;
  const mockData: PaginatedTransactions = mockTransactions

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TransactionsService,
        {
          provide: LoggerService,
          useValue: jasmine.createSpyObj('LoggerService', ['log']),
        },
      ],
    });
    service = TestBed.inject(TransactionsService);
    mockLoggerService = TestBed.inject(
      LoggerService
    ) as jasmine.SpyObj<LoggerService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return paginated transactions', () => {
    const createdAtStart = '2022-01-01';
    const createdAtEnd = '2022-01-31';
    const page = 1;
    const status = 'COMPLETED';

    service
      .getFilteredTransactions(page, createdAtStart, createdAtEnd, status)
      .subscribe((transactions: PaginatedTransactions) => {
        expect(transactions).toEqual(mockData);
      });

    expect(mockLoggerService.log).toHaveBeenCalled();
    const request = httpMock.expectOne(
      (req) =>
        req.url === 'http://localhost:8080/api/v1/payments' &&
        req.params.get('createdAtStart') === createdAtStart &&
        req.params.get('createdAtEnd') === createdAtEnd &&
        req.params.get('page') === page.toString() &&
        req.params.get('status') === status
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('createdAtStart')).toBe(createdAtStart);
    expect(request.request.params.get('createdAtEnd')).toBe(createdAtEnd);
    expect(request.request.params.get('page')).toBe(page.toString());
    expect(request.request.params.get('status')).toBe(status);

    request.flush(mockData);
  });

  it('should return all transactions', () => {
    service.getAllTransactions().subscribe((transactions: PaginatedTransactions) => {
      expect(transactions).toEqual(mockData);
    });

    expect(mockLoggerService.log).toHaveBeenCalled();
    const request = httpMock.expectOne(
      (req) => req.url === 'http://localhost:8080/api/v1/payments'
    );

    expect(request.request.method).toBe('GET');

    request.flush(mockData);
  });
});
