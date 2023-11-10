import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverrideuserComponent } from './overrideuser.component';

describe('OverrideuserComponent', () => {
  let component: OverrideuserComponent;
  let fixture: ComponentFixture<OverrideuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverrideuserComponent]
    });
    fixture = TestBed.createComponent(OverrideuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
