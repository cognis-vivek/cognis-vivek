import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExamResultComponent } from './manage-exam-result.component';

describe('ManageExamResultComponent', () => {
  let component: ManageExamResultComponent;
  let fixture: ComponentFixture<ManageExamResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExamResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
