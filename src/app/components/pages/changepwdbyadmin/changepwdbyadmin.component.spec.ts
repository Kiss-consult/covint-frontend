import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepwdbyadminComponent } from './changepwdbyadmin.component';

describe('ChangepwdbyadminComponent', () => {
  let component: ChangepwdbyadminComponent;
  let fixture: ComponentFixture<ChangepwdbyadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangepwdbyadminComponent]
    });
    fixture = TestBed.createComponent(ChangepwdbyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
