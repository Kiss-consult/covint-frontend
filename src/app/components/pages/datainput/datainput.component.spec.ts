import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatainputComponent } from './datainput.component';

describe('DatainputComponent', () => {
  let component: DatainputComponent;
  let fixture: ComponentFixture<DatainputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatainputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatainputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
