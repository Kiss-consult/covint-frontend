import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramTestComponent } from './diagram-test.component';

describe('DiagramTestComponent', () => {
  let component: DiagramTestComponent;
  let fixture: ComponentFixture<DiagramTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagramTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
