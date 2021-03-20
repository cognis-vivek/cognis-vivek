import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeesDetailsComponent } from './manage-fees-details.component';

describe('ManageFeesDetailsComponent', () => {
  let component: ManageFeesDetailsComponent;
  let fixture: ComponentFixture<ManageFeesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFeesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
