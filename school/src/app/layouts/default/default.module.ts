import { SharedModule } from './../../shared/shared.module';
import { TeacherComponent } from './../../modules/teacher/teacher.component';
import { StudentComponent } from './../../modules/student/student.component';
import { DashboardComponent } from './../../modules/dashboard/dashboard.component';
import { HomeComponent } from './../../modules/home/home.component';
import { DefaultComponent } from './default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from 'src/app/modules/parent/parent.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StaffComponent } from 'src/app/modules/staff/staff.component';


// material Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { ManageStudentComponent } from 'src/app/modules/manage-student/manage-student.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ManageClassComponent } from 'src/app/modules/manage-class/manage-class.component';
import { ManageSectionComponent } from 'src/app/modules/manage-section/manage-section.component';
import { ManageCircularComponent } from 'src/app/modules/manage-circular/manage-circular.component';
import { ManageAttendanceComponent } from 'src/app/modules/manage-attendance/manage-attendance.component';
import { ManageAssignmentComponent } from 'src/app/modules/manage-assignment/manage-assignment.component';
import { ManageLeaveComponent } from 'src/app/modules/manage-leave/manage-leave.component';
import { ManageSyllabusComponent } from 'src/app/modules/manage-syllabus/manage-syllabus.component';
import { ManageSubjectComponent } from 'src/app/modules/manage-subject/manage-subject.component';
import { ManageExamScheduleComponent } from 'src/app/modules/manage-exam-schedule/manage-exam-schedule.component';
import { ManageExamResultComponent } from 'src/app/modules/manage-exam-result/manage-exam-result.component';
import { ManageFeesComponent } from 'src/app/modules/manage-fees/manage-fees.component';
import { ManageGalleryComponent } from 'src/app/modules/manage-gallery/manage-gallery.component';
import { ManageHolidayComponent } from 'src/app/modules/manage-holiday/manage-holiday.component';
import { ManageFeesDetailsComponent } from 'src/app/modules/manage-fees-details/manage-fees-details.component';
import { NonTeachingStaffComponent } from '../../modules/non-teaching-staff/non-teaching-staff.component';
import { SubjectTeacherComponent } from '../../modules/subject-teacher/subject-teacher.component';
import { DailyClassComponent } from '../../modules/daily-class/daily-class.component';





@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ParentComponent,
    DashboardComponent,
    StudentComponent,
    ManageStudentComponent,
    ManageClassComponent,
    ManageSectionComponent,
    ManageCircularComponent,
    ManageAttendanceComponent,
    ManageAssignmentComponent,
    ManageLeaveComponent,
    ManageSubjectComponent,
    ManageSyllabusComponent,
    ManageExamScheduleComponent,
    ManageExamResultComponent,
    ManageFeesComponent,
    ManageFeesDetailsComponent,
    ManageGalleryComponent,
    ManageHolidayComponent,
    TeacherComponent,
    StaffComponent,
    NonTeachingStaffComponent,
    SubjectTeacherComponent,
    DailyClassComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatRippleModule ,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatGridListModule,
    MatBadgeModule,
    MatChipsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    MatTableModule

  ]
})
export class DefaultModule { }
