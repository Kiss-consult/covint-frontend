import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormCreatorComponent } from './custom-form-creator.component';

describe('CustomFormCreatorComponent', () => {
  let component: CustomFormCreatorComponent;
  let fixture: ComponentFixture<CustomFormCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFormCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomFormCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
