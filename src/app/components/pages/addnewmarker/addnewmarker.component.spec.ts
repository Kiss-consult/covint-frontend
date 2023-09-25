import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewmarkerComponent } from './addnewmarker.component';

describe('AddnewmarkerComponent', () => {
  let component: AddnewmarkerComponent;
  let fixture: ComponentFixture<AddnewmarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewmarkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewmarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
