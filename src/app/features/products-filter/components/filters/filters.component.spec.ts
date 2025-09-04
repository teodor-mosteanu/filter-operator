import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';

xdescribe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    component.properties = [];
    component.operators = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
