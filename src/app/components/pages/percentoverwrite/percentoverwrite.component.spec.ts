import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentoverwriteComponent } from './percentoverwrite.component';

describe('PercentoverwriteComponent', () => {
  let component: PercentoverwriteComponent;
  let fixture: ComponentFixture<PercentoverwriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentoverwriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercentoverwriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
