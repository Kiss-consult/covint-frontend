import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterablemarkersComponent } from './filterablemarkers.component';

describe('FilterablemarkersComponent', () => {
  let component: FilterablemarkersComponent;
  let fixture: ComponentFixture<FilterablemarkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterablemarkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterablemarkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
