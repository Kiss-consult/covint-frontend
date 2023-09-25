import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingusersComponent } from './waitingusers.component';

describe('WaitingusersComponent', () => {
  let component: WaitingusersComponent;
  let fixture: ComponentFixture<WaitingusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
