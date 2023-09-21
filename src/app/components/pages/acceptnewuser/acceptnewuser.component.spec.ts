import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptnewuserComponent } from './acceptnewuser.component';

describe('AcceptnewuserComponent', () => {
  let component: AcceptnewuserComponent;
  let fixture: ComponentFixture<AcceptnewuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptnewuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptnewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
