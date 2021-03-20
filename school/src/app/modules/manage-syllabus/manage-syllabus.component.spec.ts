import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSyllabusComponent } from './manage-syllabus.component';

describe('ManageSyllabusComponent', () => {
  let component: ManageSyllabusComponent;
  let fixture: ComponentFixture<ManageSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSyllabusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
