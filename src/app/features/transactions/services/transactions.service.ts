import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedTransactions } from '../../../core/interfaces/payment-transaction';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../core/services/logger.service';
import {
  defaultPageSize,
  transationApiUrl,
} from '../../../core/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(
    private http: HttpClient,
    private loggerService: LoggerService,
  ) {}

  getFilteredTransactions(
    page?: number,
    createdAtStart?: string,
    createdAtEnd?: string,
    status?: string,
  ): Observable<PaginatedTransactions> {
    const size = defaultPageSize;
    const params = {
      ...(createdAtStart ? { createdAtStart } : {}),
      ...(createdAtEnd ? { createdAtEnd } : {}),
      ...(page ? { page } : {}),
      ...(status ? { status } : {}),
      size,
    };
    this.loggerService.log('Fetching transactions');
    return this.http.get<PaginatedTransactions>(transationApiUrl, { params });
  }

  getAllTransactions(): Observable<PaginatedTransactions> {
    this.loggerService.log('Fetching all transactions');
    return this.http.get<PaginatedTransactions>(transationApiUrl);
  }
}
