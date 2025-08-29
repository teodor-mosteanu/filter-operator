import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import {
  PaymentStatus,
  PLACEHOLDER_CONTENT,
} from '../../../../core/constants/app.constants';
import {
  PaginatedTransactions,
  PaymentTransaction,
} from '../../../../core/interfaces/payment-transaction';
import { FiltersComponent } from '../../components/filters/filters.component';
import { TableComponent } from '../../components/table/table.component';
import { TransactionsService } from '../../services/transactions.service';
import { PlaceholderComponent } from '../../components/placeholder/placeholder.component';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-products-view',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    FiltersComponent,
    TableComponent,
    PlaceholderComponent,
  ],
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.scss',
})
export class ProductsViewComponent {
  transactions: PaginatedTransactions | undefined = undefined;
  paymentTransactions: PaymentTransaction[];

  loading = false;
  currentPage = 0;

  createdDateAtStart: string | undefined = undefined;
  createdDateAtEnd: string | undefined = undefined;
  filterStatus: PaymentStatus | undefined = undefined;

  placeholderContent = PLACEHOLDER_CONTENT.NO_FILTER;

  constructor(private transactionsService: TransactionsService) {}

  setLoadingState(isLoading: boolean): void {
    this.loading = isLoading;
  }

  setPlaceholderContent(
    content: (typeof PLACEHOLDER_CONTENT)[keyof typeof PLACEHOLDER_CONTENT],
  ): void {
    this.placeholderContent = content;
  }

  getTransactions(): void {
    this.setLoadingState(true);
    this.transactionsService
      .getFilteredTransactions(
        this.currentPage,
        this.createdDateAtStart,
        this.createdDateAtEnd,
        this.filterStatus,
      )
      .pipe(catchError(() => this.handleError()))
      .subscribe(data => this.handleData(data));
  }

  private handleData(data: PaginatedTransactions | null): void {
    this.setLoadingState(false);
    if (data) {
      this.transactions = data;
      this.paymentTransactions = data.items;
      if (data.items.length === 0) {
        this.setPlaceholderContent(PLACEHOLDER_CONTENT.NO_TRANSACTIONS);
      }
    }
  }

  private handleError(): Observable<null> {
    this.setLoadingState(false);
    this.setPlaceholderContent(PLACEHOLDER_CONTENT.ERROR);
    return of(null);
  }

  filterTransactions(filters): void {
    this.createdDateAtStart = filters.startDate?.toISOString().split('T')[0];
    this.createdDateAtEnd = filters.endDate?.toISOString().split('T')[0];
    this.filterStatus = filters.selectedStatus;
    this.currentPage = 0;
    this.getTransactions();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.getTransactions();
  }
}
