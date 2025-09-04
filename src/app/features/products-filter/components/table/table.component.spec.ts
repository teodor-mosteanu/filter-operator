import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit pageChange event when changePage is called', () => {
    const event = { first: 2, rows: 10 };
    const emitSpy = spyOn(component.pageChange, 'emit');
    component.changePage(event);
    expect(emitSpy).toHaveBeenCalledWith(component.currentPage);
  });

  it('should not emit pageChange event when changePage is called with same page', () => {
    const event = { first: 0, rows: 10 };
    component.currentPage = 0;
    const emitSpy = spyOn(component.pageChange, 'emit');
    component.changePage(event);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
