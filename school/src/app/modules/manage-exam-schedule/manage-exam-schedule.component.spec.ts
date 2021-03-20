import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExamScheduleComponent } from './manage-exam-schedule.component';

describe('ManageExamScheduleComponent', () => {
  let component: ManageExamScheduleComponent;
  let fixture: ComponentFixture<ManageExamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExamScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
