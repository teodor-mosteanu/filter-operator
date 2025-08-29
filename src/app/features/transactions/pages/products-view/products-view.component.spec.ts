import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionViewComponent } from './transaction-view.component';
import { TransactionsService } from '../../services/transactions.service';
import {
  PaymentStatus,
  PLACEHOLDER_CONTENT,
} from '../../../../core/constants/app.constants';
import { of } from 'rxjs';
import { TransactionFilters } from '../../interfaces/filters.interface';

describe('TransactionViewComponent', () => {
  let component: TransactionViewComponent;
  let fixture: ComponentFixture<TransactionViewComponent>;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionViewComponent],
      providers: [
        {
          provide: TransactionsService,
          useValue: jasmine.createSpyObj('TransactionsService', [
            'getFilteredTransactions',
          ]),
        },
      ],
    }).compileComponents();

    transactionsService = TestBed.inject(TransactionsService);
    fixture = TestBed.createComponent(TransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set loading state', () => {
    component.setLoadingState(true);
    expect(component.loading).toBeTrue();
    component.setLoadingState(false);
    expect(component.loading).toBeFalse();
  });

  it('should set placeholder content', () => {
    component.setPlaceholderContent(PLACEHOLDER_CONTENT.NO_TRANSACTIONS);
    expect(component.placeholderContent).toEqual(
      PLACEHOLDER_CONTENT.NO_TRANSACTIONS,
    );
  });

  it('should get transactions', () => {
    const getFilteredTransactionsSpy = (
      transactionsService.getFilteredTransactions as jasmine.Spy
    ).and.returnValue(of({ items: [] }));
    component.getTransactions();
    expect(getFilteredTransactionsSpy).toHaveBeenCalled();
  });

  it('should filter transactions', () => {
    const filters: TransactionFilters = {
      startDate: new Date(),
      endDate: new Date(),
      selectedStatus: PaymentStatus.COMPLETED,
    };
    const getTransactionsSpy = spyOn(component, 'getTransactions');
    component.filterTransactions(filters);
    expect(component.createdDateAtStart).toEqual(
      filters.startDate?.toISOString().split('T')[0],
    );
    expect(component.createdDateAtEnd).toEqual(
      filters.endDate?.toISOString().split('T')[0],
    );
    expect(component.filterStatus).toEqual(filters.selectedStatus);
    expect(getTransactionsSpy).toHaveBeenCalled();
  });

  it('should change page', () => {
    const getTransactionsSpy = spyOn(component, 'getTransactions');
    component.changePage(2);
    expect(component.currentPage).toEqual(2);
    expect(getTransactionsSpy).toHaveBeenCalled();
  });
});
