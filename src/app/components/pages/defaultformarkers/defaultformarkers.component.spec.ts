import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultformarkersComponent } from './defaultformarkers.component';

describe('DafaultformarkersComponent', () => {
  let component: DefaultformarkersComponent;
  let fixture: ComponentFixture<DefaultformarkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultformarkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultformarkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
