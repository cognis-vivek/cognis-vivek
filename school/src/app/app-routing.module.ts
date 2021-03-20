import { ManageHolidayComponent } from './modules/manage-holiday/manage-holiday.component';
import { ManageSyllabusComponent } from './modules/manage-syllabus/manage-syllabus.component';
import { ManageSubjectComponent } from './modules/manage-subject/manage-subject.component';
import { ManageLeaveComponent } from './modules/manage-leave/manage-leave.component';
import { ManageGalleryComponent } from './modules/manage-gallery/manage-gallery.component';
import { ManageFeesComponent } from './modules/manage-fees/manage-fees.component';
import { ManageExamScheduleComponent } from './modules/manage-exam-schedule/manage-exam-schedule.component';
import { ManageExamResultComponent } from './modules/manage-exam-result/manage-exam-result.component';
import { ManageCircularComponent } from 'src/app/modules/manage-circular/manage-circular.component';
import { ManageAssignmentComponent } from 'src/app/modules/manage-assignment/manage-assignment.component';
import { ManageAttendanceComponent } from './modules/manage-attendance/manage-attendance.component';
import { TeacherComponent } from './modules/teacher/teacher.component';
import { DefaultComponent } from './layouts/default/default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ParentComponent } from './modules/parent/parent.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { StudentComponent } from './modules/student/student.component';
import { StaffComponent } from './modules/staff/staff.component';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { LoginComponent } from './modules/login/login.component';
import { ManageStudentComponent } from './modules/manage-student/manage-student.component';
import { ManageClassComponent } from './modules/manage-class/manage-class.component';
import { ManageSectionComponent } from './modules/manage-section/manage-section.component';
import { ManageFeesDetailsComponent } from './modules/manage-fees-details/manage-fees-details.component';
import { DailyClassComponent } from './modules/daily-class/daily-class.component';
import { SubjectTeacherComponent } from './modules/subject-teacher/subject-teacher.component';
import { NonTeachingStaffComponent } from './modules/non-teaching-staff/non-teaching-staff.component';

// import { ManageFeesDetailsComponent } from './modules/manage-fees-details/manage-fees-details.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: HomeComponent,
  }, {
    path: 'parent',
    component: ParentComponent,
  }, {
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'student',
    component: StudentComponent,
  }, {
    path: 'teacher',
    component: TeacherComponent,
  },{
    path: 'manage-student',
    component: ManageStudentComponent
  },{
    path: 'manage-class',
    component: ManageClassComponent
  },{
      path: 'manage-section',
      component: ManageSectionComponent
    },{
      path: 'manage-assignment',
      component: ManageAssignmentComponent
    },{
      path: 'manage-attendance',
      component: ManageAttendanceComponent
    },  {
      path: 'manage-circular',
      component: ManageCircularComponent
    }, {
      path: 'manage-exam-result',
      component: ManageExamResultComponent
    }, {
      path: 'manage-exam-schedule',
      component: ManageExamScheduleComponent
    }, {
      path: 'manage-fees',
      component: ManageFeesComponent
    }, 
    {
      path: 'manage-fees-details',
      component: ManageFeesDetailsComponent
    },
    {
      path: 'manage-gallery',
      component: ManageGalleryComponent
    }, {
      path: 'manage-leave',
      component: ManageLeaveComponent
    },{
      path: 'manage-subject',
      component: ManageSubjectComponent
    },{
      path: 'manage-holiday',
      component: ManageHolidayComponent
    }, {
      path: 'manage-syllabus',
      component: ManageSyllabusComponent
    }, 
    {
    path: 'staff',
    component: StaffComponent,
    },
    {
      path: 'non-teaching-staff',
      component: NonTeachingStaffComponent
    },
    {
      path: 'subject-teacher',
      component: SubjectTeacherComponent
    },
    {
      path: 'daily-class',
      component: DailyClassComponent
    }
    
  ]
}, {
  path: '',
  component: FullwidthComponent,
  children: [{
    path: 'logout',
    component: LogoutComponent,
  },{
    path: 'login',
    component: LoginComponent,
  }],

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
