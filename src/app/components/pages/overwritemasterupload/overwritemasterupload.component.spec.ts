import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverwritemasteruploadComponent } from './overwritemasterupload.component';

describe('OverwritemasteruploadComponent', () => {
  let component: OverwritemasteruploadComponent;
  let fixture: ComponentFixture<OverwritemasteruploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverwritemasteruploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverwritemasteruploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
