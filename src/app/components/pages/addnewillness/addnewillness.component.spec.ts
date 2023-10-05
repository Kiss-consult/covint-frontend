import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewillnessComponent } from './addnewillness.component';

describe('AddnewillnessComponent', () => {
  let component: AddnewillnessComponent;
  let fixture: ComponentFixture<AddnewillnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewillnessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewillnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
