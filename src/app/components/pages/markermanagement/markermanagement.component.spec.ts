import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkermanagementComponent } from './markermanagement.component';

describe('MarkermanagementComponent', () => {
  let component: MarkermanagementComponent;
  let fixture: ComponentFixture<MarkermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkermanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
